import "./Filters.css";
const Filters = ({
  searchText,
  setSearchText,
  selectedLevel,
  setSelectedLevel,
  selectedService,
  setSelectedService,
  searchInput,
  setSearchInput,
}) => {
  return (
    <div className="filters-container">
      <div className="filters-search">
        <input
          type="text"
          placeholder="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="filter-input"
        ></input>
        <button
          className="input-button"
          onClick={() => {
            setSearchText(searchInput);
          }}
        >
          Search
        </button>
      </div>
      <div className="filters-select">
        <select
          value={selectedLevel}
          onChange={(e) => {
            setSelectedLevel(e.target.value);
          }}
          className="filter-select"
        >
          <option value="">ALL LEVELS</option>
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
        </select>

        <select
          value={selectedService}
          onChange={(e) => {
            setSelectedService(e.target.value);
          }}
          className="filter-select"
        >
          <option value="">ALL SERVICES</option>
          <option value="auth">AUTH</option>
          <option value="payments">PAYMENTS</option>
          <option value="notifications">NOTIFICATIONS</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
