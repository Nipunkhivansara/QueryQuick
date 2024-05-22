import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './ag-grid-theme-builder.css';

const Grid = () => {
  const [rowData, setRowData] = useState([]);
  const [gridTheme, setGridTheme] = useState('ag-theme-alpine');

  useEffect(() => {
    const generateData = () => {
      let data = [];
      for (let i = 1; i <= 30; i++) {
        data.push({
          id: i,
          name: `Name ${i}`,
          age: 20 + (i % 10),
          country: `Country ${i % 5}`,
          email: `name${i}@example.com`
        });
      }
      setRowData(data);
    };
    generateData();
  }, []);

  const columns = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Age', field: 'age', sortable: true, filter: true },
    { headerName: 'Country', field: 'country', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true }
  ];

  const handleThemeChange = (event) => {
    setGridTheme(event.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label>Select Theme: </label>
        <select onChange={handleThemeChange} value={gridTheme}>
          <option value="ag-theme-alpine">Alpine</option>
          <option value="ag-theme-balham">Balham</option>
          <option value="ag-theme-material">Material</option>
          <option value="ag-theme-quartz">Quartz</option>
          <option value="ag-grid-theme-builder.css">Custom</option>
        </select>
      </div>
      <div className={gridTheme} style={{ height: 300, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            suppressMovable: false,
            suppressDragLeaveHidesColumns: true
          }}
        />
      </div>
    </div>
  );
};

export default Grid;
