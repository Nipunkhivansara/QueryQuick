import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './ag-theme-v2.css';

const Grid = () => {
  const [gridTheme, setGridTheme] = useState('ag-theme-alpine');

  const rowData = [
    {
      "event_id": 1,
      "description": "High-intensity Interval Training (HIIT) Bootcamp",
      "space_id": 2,
      "start_time": "2023-02-26T08:00:00.000Z",
      "end_time": "2023-06-05T07:00:00.000Z",
      "capacity": 33
    },
    {
      "event_id": 2,
      "description": "Water Volleyball",
      "space_id": 6,
      "start_time": "2023-02-23T08:00:00.000Z",
      "end_time": "2023-03-12T08:00:00.000Z",
      "capacity": 20
    },
    {
      "event_id": 3,
      "description": "Aqua Aerobics Classes",
      "space_id": 3,
      "start_time": "2023-02-05T08:00:00.000Z",
      "end_time": "2023-03-27T07:00:00.000Z",
      "capacity": 40
    },
    {
      "event_id": 4,
      "description": "Kids' Pool Party",
      "space_id": 2,
      "start_time": "2023-01-24T08:00:00.000Z",
      "end_time": "2023-03-17T07:00:00.000Z",
      "capacity": 28
    },
    {
      "event_id": 5,
      "description": "Aqua Aerobics Classes",
      "space_id": 1,
      "start_time": "2023-01-09T08:00:00.000Z",
      "end_time": "2023-05-06T07:00:00.000Z",
      "capacity": 36
    },
    {
      "event_id": 6,
      "description": "Martial Arts Demonstration",
      "space_id": 7,
      "start_time": "2023-02-02T08:00:00.000Z",
      "end_time": "2023-04-26T07:00:00.000Z",
      "capacity": 24
    },
    {
      "event_id": 7,
      "description": "Spin Bike Marathon",
      "space_id": 3,
      "start_time": "2023-02-02T08:00:00.000Z",
      "end_time": "2023-05-26T07:00:00.000Z",
      "capacity": 31
    },
    {
      "event_id": 8,
      "description": "Basketball Freestyle Show",
      "space_id": 7,
      "start_time": "2023-01-01T08:00:00.000Z",
      "end_time": "2023-04-26T07:00:00.000Z",
      "capacity": 39
    },
    {
      "event_id": 9,
      "description": "Aqua Yoga",
      "space_id": 1,
      "start_time": "2023-01-03T08:00:00.000Z",
      "end_time": "2023-05-26T07:00:00.000Z",
      "capacity": 29
    },
    {
      "event_id": 10,
      "description": "Slam Ball Challenges",
      "space_id": 4,
      "start_time": "2023-01-27T08:00:00.000Z",
      "end_time": "2023-04-26T07:00:00.000Z",
      "capacity": 29
    },
    {
      "event_id": 11,
      "description": "Pool Float Day",
      "space_id": 1,
      "start_time": "2023-02-02T08:00:00.000Z",
      "end_time": "2023-04-21T07:00:00.000Z",
      "capacity": 23
    },
    {
      "event_id": 12,
      "description": "Zumba Dance Party",
      "space_id": 6,
      "start_time": "2023-01-03T08:00:00.000Z",
      "end_time": "2023-05-26T07:00:00.000Z",
      "capacity": 40
    },
    {
      "event_id": 13,
      "description": "High-intensity Interval Training (HIIT) Bootcamp",
      "space_id": 7,
      "start_time": "2023-02-23T08:00:00.000Z",
      "end_time": "2023-06-10T07:00:00.000Z",
      "capacity": 23
    },
    {
      "event_id": 14,
      "description": "Basketball Freestyle Show",
      "space_id": 7,
      "start_time": "2023-01-21T08:00:00.000Z",
      "end_time": "2023-05-16T07:00:00.000Z",
      "capacity": 36
    },
    {
      "event_id": 15,
      "description": "Martial Arts Demonstration",
      "space_id": 5,
      "start_time": "2023-01-03T08:00:00.000Z",
      "end_time": "2023-04-06T07:00:00.000Z",
      "capacity": 34
    },
    {
      "event_id": 16,
      "description": "Diving Board Contests",
      "space_id": 6,
      "start_time": "2023-02-02T08:00:00.000Z",
      "end_time": "2023-05-26T07:00:00.000Z",
      "capacity": 28
    },
    {
      "event_id": 17,
      "description": "Strength Training Seminars",
      "space_id": 4,
      "start_time": "2023-01-27T08:00:00.000Z",
      "end_time": "2023-04-26T07:00:00.000Z",
      "capacity": 29
    },
    {
      "event_id": 18,
      "description": "Dive-in Movie Night",
      "space_id": 6,
      "start_time": "2023-01-18T08:00:00.000Z",
      "end_time": "2023-03-22T07:00:00.000Z",
      "capacity": 35
    },
    {
      "event_id": 19,
      "description": "Midnight Basketball",
      "space_id": 4,
      "start_time": "2023-02-08T08:00:00.000Z",
      "end_time": "2023-03-12T08:00:00.000Z",
      "capacity": 27
    },
    {
      "event_id": 20,
      "description": "Diving Board Contests",
      "space_id": 1,
      "start_time": "2023-01-03T08:00:00.000Z",
      "end_time": "2023-04-21T07:00:00.000Z",
      "capacity": 22
    },
    {
      "event_id": 21,
      "description": "Hydrotherapy Sessions",
      "space_id": 5,
      "start_time": "2023-02-08T08:00:00.000Z",
      "end_time": "2023-06-05T07:00:00.000Z",
      "capacity": 23
    },
    {
      "event_id": 22,
      "description": "Midnight Basketball",
      "space_id": 3,
      "start_time": "2023-02-26T08:00:00.000Z",
      "end_time": "2023-03-22T07:00:00.000Z",
      "capacity": 38
    },
    {
      "event_id": 23,
      "description": "Pilates in the Pool",
      "space_id": 1,
      "start_time": "2023-02-08T08:00:00.000Z",
      "end_time": "2023-04-21T07:00:00.000Z",
      "capacity": 38
    },
    {
      "event_id": 24,
      "description": "Martial Arts Demonstration",
      "space_id": 3,
      "start_time": "2023-01-01T08:00:00.000Z",
      "end_time": "2023-04-01T07:00:00.000Z",
      "capacity": 24
    },
    {
      "event_id": 25,
      "description": "Stretch and Flexibility Workshop",
      "space_id": 3,
      "start_time": "2023-02-17T08:00:00.000Z",
      "end_time": "2023-04-11T07:00:00.000Z",
      "capacity": 22
    },
    {
      "event_id": 26,
      "description": "Strength Training Seminars",
      "space_id": 4,
      "start_time": "2023-01-27T08:00:00.000Z",
      "end_time": "2023-05-26T07:00:00.000Z",
      "capacity": 20
    },
    {
      "event_id": 27,
      "description": "Pilates in the Pool",
      "space_id": 7,
      "start_time": "2023-02-23T08:00:00.000Z",
      "end_time": "2023-04-11T07:00:00.000Z",
      "capacity": 38
    },
    {
      "event_id": 28,
      "description": "Water Polo Matches",
      "space_id": 5,
      "start_time": "2023-02-11T08:00:00.000Z",
      "end_time": "2023-05-16T07:00:00.000Z",
      "capacity": 30
    },
    {
      "event_id": 29,
      "description": "High-intensity Interval Training (HIIT) Bootcamp",
      "space_id": 5,
      "start_time": "2023-01-15T08:00:00.000Z",
      "end_time": "2023-05-31T07:00:00.000Z",
      "capacity": 40
    },
    {
      "event_id": 30,
      "description": "Nutrition and Fitness Workshop",
      "space_id": 4,
      "start_time": "2023-02-23T08:00:00.000Z",
      "end_time": "2023-04-06T07:00:00.000Z",
      "capacity": 32
    },
    {
      "event_id": 31,
      "description": "Basketball Shooting Contests",
      "space_id": 5,
      "start_time": "2023-01-21T08:00:00.000Z",
      "end_time": "2023-03-12T08:00:00.000Z",
      "capacity": 26
    },
    {
      "event_id": 32,
      "description": "Circuit Training Class",
      "space_id": 5,
      "start_time": "2023-01-03T08:00:00.000Z",
      "end_time": "2023-06-10T07:00:00.000Z",
      "capacity": 32
    },
    {
      "event_id": 33,
      "description": "Stretch and Flexibility Workshop",
      "space_id": 2,
      "start_time": "2023-02-05T08:00:00.000Z",
      "end_time": "2023-04-16T07:00:00.000Z",
      "capacity": 20
    },
    {
      "event_id": 34,
      "description": "Senior Swim Sessions",
      "space_id": 4,
      "start_time": "2023-01-01T08:00:00.000Z",
      "end_time": "2023-03-22T07:00:00.000Z",
      "capacity": 27
    },
    {
      "event_id": 35,
      "description": "Hydrotherapy Sessions",
      "space_id": 3,
      "start_time": "2023-01-15T08:00:00.000Z",
      "end_time": "2023-06-05T07:00:00.000Z",
      "capacity": 27
    },
    {
      "event_id": 36,
      "description": "Sauna Relaxation Evening",
      "space_id": 2,
      "start_time": "2023-02-26T08:00:00.000Z",
      "end_time": "2023-04-06T07:00:00.000Z",
      "capacity": 36
    },
    {
      "event_id": 37,
      "description": "TRX Training Workshop",
      "space_id": 2,
      "start_time": "2023-02-20T08:00:00.000Z",
      "end_time": "2023-04-16T07:00:00.000Z",
      "capacity": 20
    },
    {
      "event_id": 38,
      "description": "Aqua Aerobics Classes",
      "space_id": 3,
      "start_time": "2023-01-06T08:00:00.000Z",
      "end_time": "2023-04-26T07:00:00.000Z",
      "capacity": 26
    },
    {
      "event_id": 39,
      "description": "Cardio Kickboxing Class",
      "space_id": 5,
      "start_time": "2023-01-03T08:00:00.000Z",
      "end_time": "2023-04-01T07:00:00.000Z",
      "capacity": 21
    },
    {
      "event_id": 40,
      "description": "Basketball Freestyle Show",
      "space_id": 1,
      "start_time": "2023-01-18T08:00:00.000Z",
      "end_time": "2023-04-16T07:00:00.000Z",
      "capacity": 27
    },
    {
      "event_id": 41,
      "description": "Diving Board Contests",
      "space_id": 3,
      "start_time": "2023-01-18T08:00:00.000Z",
      "end_time": "2023-03-22T07:00:00.000Z",
      "capacity": 22
    },
    {
      "event_id": 42,
      "description": "High-intensity Interval Training (HIIT) Bootcamp",
      "space_id": 1,
      "start_time": "2023-01-03T08:00:00.000Z",
      "end_time": "2023-04-16T07:00:00.000Z",
      "capacity": 28
    },
    {
      "event_id": 43,
      "description": "Summer Splash Fest",
      "space_id": 1,
      "start_time": "2023-02-11T08:00:00.000Z",
      "end_time": "2023-05-06T07:00:00.000Z",
      "capacity": 30
    },
    {
      "event_id": 44,
      "description": "Nutrition and Fitness Workshop",
      "space_id": 1,
      "start_time": "2023-02-20T08:00:00.000Z",
      "end_time": "2023-04-21T07:00:00.000Z",
      "capacity": 32
    },
    {
      "event_id": 45,
      "description": "Strength Training Seminars",
      "space_id": 7,
      "start_time": "2023-02-26T08:00:00.000Z",
      "end_time": "2023-05-26T07:00:00.000Z",
      "capacity": 23
    },
    {
      "event_id": 46,
      "description": "Sauna Relaxation Evening",
      "space_id": 2,
      "start_time": "2023-01-27T08:00:00.000Z",
      "end_time": "2023-05-11T07:00:00.000Z",
      "capacity": 35
    },
    {
      "event_id": 47,
      "description": "Kids' Pool Party",
      "space_id": 1,
      "start_time": "2023-01-12T08:00:00.000Z",
      "end_time": "2023-05-11T07:00:00.000Z",
      "capacity": 22
    },
    {
      "event_id": 48,
      "description": "Senior Swim Sessions",
      "space_id": 4,
      "start_time": "2023-01-15T08:00:00.000Z",
      "end_time": "2023-04-16T07:00:00.000Z",
      "capacity": 30
    },
    {
      "event_id": 49,
      "description": "CrossFit Intro Session",
      "space_id": 7,
      "start_time": "2023-02-02T08:00:00.000Z",
      "end_time": "2023-03-12T08:00:00.000Z",
      "capacity": 39
    },
    {
      "event_id": 50,
      "description": "TRX Training Workshop",
      "space_id": 5,
      "start_time": "2023-02-11T08:00:00.000Z",
      "end_time": "2023-04-16T07:00:00.000Z",
      "capacity": 35
    }
  ];

  const columns = [
    { headerName: 'Event ID', field: 'event_id', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Space ID', field: 'space_id', sortable: true, filter: true },
    { headerName: 'Start Time', field: 'start_time', sortable: true, filter: true },
    { headerName: 'End Time', field: 'end_time', sortable: true, filter: true },
    { headerName: 'Capacity', field: 'capacity', sortable: true, filter: true }
  ];

  const handleThemeChange = (event) => {
    setGridTheme(event.target.value);
  };

  return (
    <div>
      <div className={`ag-theme-v2`} style={{ height: 600, width: '100%' }}>
      <AgGridReact
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
            floatingFilter: true, // Enable floating filters
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
