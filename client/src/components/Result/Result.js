import React from 'react';
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import the default styles for react-tabs
import { AgGridReact } from 'ag-grid-react';
import { Button } from 'react-bootstrap';
import ChartModal from '../ChartModal/ChartModal';
import ChartComponent from '../ChartComponent/ChartComponent';

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
        <div style={{ margin: '20px' }}>
            <Tabs>
                <TabList >
                    <Tab >Grid</Tab>
                    <Tab >Other Tab</Tab>
                </TabList>

                <TabPanel>
                    <h2>Grid</h2>
                    <div className="ag-theme-alpine" style={{ height: '500px', width: '70%', marginTop: '10px' }}>
                        <AgGridReact
                            onGridReady={onGridReady}
                            columnDefs={columnDefs}
                            rowData={databaseRecords}
                            rowSelection="multiple"
                        />
                    </div>
                </TabPanel>

                <TabPanel>
                    <div>
                        <h2>Chart</h2>
                        {/* {JSON.stringify(databaseRecords)} */}
                        <div>

                            <Button variant="primary" onClick={handleShow}>
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
