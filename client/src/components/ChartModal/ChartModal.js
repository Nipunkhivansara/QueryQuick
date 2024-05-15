import React, { useState } from 'react';
import { Modal, Dropdown, Button } from 'react-bootstrap';

const ChartModal = ({ data, show, handleClose, handleSubmit }) => {
    const [chartType, setChartType] = useState('Bar');
    const [xCoord, setXCoord] = useState(data[0] ? Object.keys(data[0])[0] : '');
    const [yCoord, setYCoord] = useState(data[0] ? Object.keys(data[0])[0] : '');
    const [zCoord, setZCoord] = useState(data[0] ? Object.keys(data[0])[0] : '');

    const chartData = data;
    const xCoordOptions = Object.keys(chartData[0]);
    const yCoordOptions = Object.keys(chartData[0]);
    const zCoordOptions = Object.keys(chartData[0]);

    return (
        <Modal show={show} onHide={handleClose} animation={true} centered>
            <Modal.Header closeButton>
                <Modal.Title>Pick Chart Options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Dropdown for selecting chart type */}
                <h5>Pick your chart</h5>
                <Dropdown onSelect={(selectedKey) => setChartType(selectedKey)}>
                    <Dropdown.Toggle variant="info" id="dropdown-variant-Info">
                        {chartType}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="Bar">Bar</Dropdown.Item>
                        <Dropdown.Item eventKey="Scatter">Scatter</Dropdown.Item>
                        <Dropdown.Item eventKey="Line">Line</Dropdown.Item>
                        <Dropdown.Item eventKey="Pie">Pie</Dropdown.Item>
                        <Dropdown.Item eventKey="Doughnut">Doughnut</Dropdown.Item>
                        <Dropdown.Item eventKey="Bubble">Bubble</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {/* Dropdown for selecting X coordinate */}
                <h5>Pick X coordinate</h5>
                <Dropdown onSelect={(selectedKey) => setXCoord(selectedKey)}>
                    <Dropdown.Toggle variant="info" id="dropdown-variant-Info">
                        {xCoord}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {xCoordOptions.map((option, index) => (
                            <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                {/* Dropdown for selecting Y coordinate */}
                <h5>Pick Y coordinate</h5>
                {/* Dropdown items for Y coordinate */}
                <Dropdown onSelect={(selectedKey) => setYCoord(selectedKey)}>
                    <Dropdown.Toggle variant="info" id="dropdown-variant-Info">
                        {yCoord}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {yCoordOptions.map((option, index) => (
                            <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>


                {
                    chartType=== 'Bubble'?
                    (<div>
                        <h5>Pick Z coordinate</h5>
                        <Dropdown onSelect={(selectedKey) => setZCoord(selectedKey)}>
                            <Dropdown.Toggle variant="info" id="dropdown-variant-Info">
                                {zCoord}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {zCoordOptions.map((option, index) => (
                                    <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown> </div>) :(
                            <div></div>
                        )
                }

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmit(chartType, xCoord, yCoord,zCoord)}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ChartModal;