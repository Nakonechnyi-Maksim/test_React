import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mockData from "./mockData";
import Pagination from "./pagination";
import Popup from "reactjs-popup";

function EndpointsTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const handleChange = () => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("search_val", searchValue);
    newSearchParams.set("endpoint_type", endpointType);
    newSearchParams.set("endpoint_tags", endpointTags);
    newSearchParams.set("page", currentPage.toString());
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search_val") || ""
  );
  const [endpointType, setEndpointType] = useState(
    searchParams.get("endpoint_type") || ""
  );
  const [endpointTags, setEndpointTags] = useState(
    searchParams.get("endpoint_tags") || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    setData(mockData);

    const filtered = data.filter((item) => {
      return (
        (!searchValue ||
          item.name.toLowerCase().includes(searchValue.toLowerCase())) &&
        (!endpointType || item.type === endpointType) &&
        (!endpointTags || item.tags === endpointTags)
      );
    });

    setFilteredData(filtered);
  }, [data, searchValue, endpointType, endpointTags]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleChange();
  };
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    handleChange();
  };

  const handleEndpointTypeChange = (e) => {
    setEndpointType(e.target.value);
    handleChange();
  };
  const handleEndpointTagsChange = (e) => {
    setEndpointTags(e.target.value);
    handleChange();
  };

  return (
    <div className="endpoints">
      <h2>Серверы и ПК</h2>

      <div className="search">
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <Popup trigger={<button> Trigger</button>} nested>
          <div className="filters">
            <h2>Фильтры</h2>
            <h3>Тип ПК</h3>
            <select value={endpointType} onChange={handleEndpointTypeChange}>
              <option value="">Все типы</option>
              <option value="server">Сервер</option>
              <option value="pc">ПК</option>
            </select>
            <h3>Тэги</h3>
            <select value={endpointTags} onChange={handleEndpointTagsChange}>
              <option value="">Все тэги</option>
              <option value="blue">blue</option>
              <option value="red">red</option>
              <option value="orange">orange</option>
            </select>
          </div>
        </Popup>
      </div>

      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Тип</th>
            <th>Тэги</th>
            <th>Местоположение</th>
            <th>Дата создания</th>
            <th>Дата обновления</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td style={{ color: `${item.tags}` }}>{item.tags}</td>
              <td>{item.location}</td>
              <td>{item.createDate}</td>
              <td>{item.updateDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default EndpointsTable;
