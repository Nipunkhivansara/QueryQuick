import React, { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './ag-theme-v2.css';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';

const Grid = ({ gridData }) => {
  const gridRef = useRef(null); // Create a reference for the grid

  const columns = gridData.length > 0 ? Object.keys(gridData[0]).map(key => ({ headerName: key, field: key })) : [];
  const rowData = gridData.length > 0 ? gridData : [];

  const onBtnExport = () => {
    const api = gridRef.current.api;
    const allData = [];
    api.forEachNode(node => allData.push(node.data));

    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'grid-data.xlsx');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <Button
          onClick={onBtnExport}
          variant="contained"
          startIcon={<SaveAltIcon />}
          sx={{
            backgroundColor: '#3f51b5',
            marginTop: '15px',
            marginRight: '15px',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#303f9f',
            },
          }}
        >
          Export
        </Button>
      </div>
      <div className={`ag-theme-v2`} style={{ height: 600, width: '100%' }}>
        <AgGridReact
          ref={gridRef} // Assign the grid reference
          rowData={rowData}
          columnDefs={columns.map(column => ({
            ...column,
            floatingFilterComponentParams: { color: 'white' },
          }))}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            suppressMovable: false,
            suppressDragLeaveHidesColumns: true,
            floatingFilter: true,
            suppressMenu: false,
          }}
          rowSelection="multiple"
          onGridReady={params => params.api.sizeColumnsToFit()}
        />
      </div>
    </div>
  );
};

export default Grid;
