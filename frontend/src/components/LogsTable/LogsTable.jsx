import "./LogsTable.css";

const LogsTable = ({ logs, isLoading }) => {
  return (
    <div>
      {isLoading && <p>Loading logs..</p>}
      {!isLoading && (
        <table className="logs-container">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Level</th>
              <th>Service</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => {
              return (
                <tr key={log._id}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.level}</td>
                  <td>{log.service}</td>
                  <td>{log.message}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogsTable;
