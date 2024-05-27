import React, { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './ag-theme-v2.css';
import * as XLSX from 'xlsx';
import { Button, Box } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';
import './ag-theme-v3.css';

const Grid = ({ gridData }) => {

  const columns = gridData.length > 0 ? Object.keys(gridData[0]).map(key => ({ headerName: key, field: key })) : [];
  const rowData = gridData.length > 0 ? gridData : [];
  const gridApi = useRef(null);

  const exportData = () => {
    const params = {
      fileName: 'grid-data.csv',
      onlySelected: false,
      skipHeader: false,
      columnSeparator: ','
    };
    gridApi.current.api.exportDataAsCsv(params);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={exportData}
          startIcon={<SaveAltIcon />}
        >
          Export
        </Button>
      </Box>
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
            floatingFilter: true,
            suppressMenu: false,
          }}
          rowSelection="multiple"
          onGridReady={params => {
            params.api.sizeColumnsToFit();
            gridApi.current = params;
          }}
        />
      </div>
    </div>
  );
};

export default Grid;
