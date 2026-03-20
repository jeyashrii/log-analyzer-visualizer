import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./LogStats.css";
const LogStats = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/logs/stats", {
        params: {
          seconds: 30,
        },
      });
      setStats(response.data);
    } catch (err) {
      console.log("error fetching status: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const intervalId = setInterval(() => {
      fetchStats();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const chartData = stats
    ? [
        { level: "INFO", count: stats.counts.INFO },
        { level: "WARN", count: stats.counts.WARN },
        { level: "ERROR", count: stats.counts.ERROR },
      ]
    : [];
  return (
    <>
      <h1>log statistics</h1>
      {isLoading && !stats && <p>loading stats...</p>}
      {stats && (
        <div className="stats-container">
          <div className="stats-details">
            <p>Total logs :{stats.totalLogs}</p>
            <p>Error Rate:{stats.errorRate}</p>
          </div>
          <div className="stats-chart">
            <ResponsiveContainer width="70%" height={240}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default LogStats;
