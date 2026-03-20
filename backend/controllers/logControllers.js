const asyncHandler = require("express-async-handler");
const Log = require("../models/logModel");

//GET logs

const getLogs = asyncHandler(async (req, res) => {
  const {
    level,
    service,
    search,
    start,
    end,
    limit = 20,
    page = 1,
  } = req.query;

  const queryFilter = {};
  if (level) {
    queryFilter.level = level;
  }
  if (service) {
    queryFilter.service = service;
  }

  if (search) {
    queryFilter.message = {
      $regex: search,
      $options: "i",
    };
  }
  if (start || end) {
    queryFilter.timestamp = {};
    if (start) {
      queryFilter.timestamp.$gte = new Date(start);
    }
    if (end) {
      queryFilter.timestamp.$lte = new Date(end);
    }
  }

  const currentPage = Number(page);
  const pageSize = Number(limit);
  const skipCount = (currentPage - 1) * pageSize;

  const logs = await Log.find(queryFilter)
    .sort({ timestamp: -1 })
    .skip(skipCount)
    .limit(pageSize);

  const totalLogs = await Log.countDocuments(queryFilter);
  res.status(200).json({
    logs,
    totalLogs: totalLogs,
    page: currentPage,
    totalPages: Math.ceil(totalLogs / pageSize),
  });
});

//GET log stats

const getLogStats = asyncHandler(async (req, res) => {
  const seconds = Number(req.query.seconds) || 50;
  const startTime = new Date(Date.now() - seconds * 1000);

  const stats = await Log.aggregate([
    {
      $match: {
        timestamp: { $gte: startTime },
      },
    },
    {
      $group: {
        _id: "$level",
        count: { $sum: 1 },
      },
    },
  ]);

  let infoCount = 0;
  let warnCount = 0;
  let errorCount = 0;
  stats.forEach((item) => {
    if (item._id === "INFO") infoCount = item.count;
    if (item._id === "WARN") warnCount = item.count;
    if (item._id === "ERROR") errorCount = item.count;
  });
  const totalLogs = infoCount + warnCount + errorCount;
  const errorRate =
    totalLogs === 0 ? 0 : ((errorCount / totalLogs) * 100).toFixed(2);

  res.status(200).json({
    windowInSeconds: seconds,
    counts: {
      INFO: infoCount,
      WARN: warnCount,
      ERROR: errorCount,
    },
    totalLogs,
    errorRate: Number(errorRate),
  });
});
module.exports = { getLogs, getLogStats };
