import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './ag-theme-v3.css';

const Grid = ({gridData}) => {
  const columns = gridData.length > 0 ? Object.keys(gridData[0]).map(key => ({ headerName: key, field: key })) : [];
  const rowData = gridData.length > 0 ? gridData : [];


  return (
    <div>
      <div className={`ag-theme-v3`} style={{ height: 320 , width: '100%' }}>
      <AgGridReact
          rowData={rowData}
          columnDefs={columns.map(column => ({
            ...column,
            // floatingFilterComponentParams: { color: 'white' },
          }))}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            suppressMovable: false,
            suppressDragLeaveHidesColumns: true,
            // floatingFilter: true, // Enable floating filters
            suppressMenu: false, // Add this line
          }}
          rowSelection="multiple" // Enable row selection
          onGridReady={params => params.api.sizeColumnsToFit()} // Enable column resizing
        />
      </div>
    </div>
  );
};

export default Grid;
