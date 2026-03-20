const asyncHandler = require("express-async-handler");
const Log = require("../models/logModel");
//GET

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
module.exports = { getLogs };
