import React from 'react';
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import the default styles for react-tabs
import { AgGridReact } from 'ag-grid-react';
import { Button } from 'react-bootstrap';
import ChartModal from '../ChartModal/ChartModal';
import ChartComponent from '../ChartComponent/ChartComponent';
import './Result.css'

const Result = ({ onGridReady, columnDefs, databaseRecords }) => {

    const [showModal, setShowModal] = useState(false);
    const [chartType, setChartType] = useState('Bar');
    const [xCoord, setXCoord] = useState('option1');
    const [yCoord, setYCoord] = useState('option1');
    const [zCoord, setZCoord] = useState('option1');

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleSubmit = (chartType, xCoord, yCoord, zCoord='') => {
        setChartType(chartType);
        setXCoord(xCoord);
        setYCoord(yCoord);
        setZCoord(zCoord);
        handleClose();
    };


    return (
        <div className="result-container">
            <Tabs className="tabs-container">
                <TabList >
                    <Tab className="tab">Tables</Tab>
                    <Tab className="tab">Charts</Tab>
                </TabList>

                <TabPanel className="tab-panel">
                    <h2>Grid</h2>
                    <div className="ag-theme-alpine" >
                        <AgGridReact
                            onGridReady={onGridReady}
                            columnDefs={columnDefs}
                            rowData={databaseRecords}
                            rowSelection="multiple"
                            pagination={true}
                            paginationPageSize={15}
                            domLayout='autoHeight'
                        />
                    </div>
                </TabPanel>

                <TabPanel className="tab-panel">
                    <div>
                        <h2>Chart</h2>
                        {/* {JSON.stringify(databaseRecords)} */}
                        <div>

                            <Button className="chart-button" variant="primary" onClick={handleShow}>
                                Open Modal
                            </Button>
                            <ChartModal data = {databaseRecords} show={showModal} handleClose={handleClose} handleSubmit={handleSubmit} />
                            <ChartComponent chartType={chartType} xCoord={xCoord} yCoord={yCoord} zCoord={zCoord} data={databaseRecords} />
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Result;
