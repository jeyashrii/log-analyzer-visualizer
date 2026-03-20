import { useState, useEffect } from "react";
import LogsTable from "./components/LogsTable/LogsTable.jsx";
import Filters from "./components/Filters/Filters.jsx";
import LogStats from "./components/Stats/LogStats.jsx";
import axios from "axios";

function App() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const getLogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/logs", {
        params: {
          level: selectedLevel,
          service: selectedService,
          search: searchText,
        },
      });
      const data = response.data.logs;
      setLogs(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getLogs();
    const intervalId = setInterval(() => {
      getLogs();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedLevel, selectedService, searchText]);

  return (
    <>
      <Filters
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        setSearchText={setSearchText}
        selectedService={selectedService}
        searchText={searchText}
        setSelectedService={setSelectedService}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      ></Filters>
      <LogsTable logs={logs} isLoading={isLoading}></LogsTable>
      <LogStats></LogStats>
    </>
  );
}

export default App;
