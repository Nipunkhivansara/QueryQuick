import React from "react";
import { BarChart, Bar, AreaChart, Area, Tooltip } from "recharts";
import { CardHeader } from "react-bootstrap";
import { Box, Typography, Card, CardContent } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const data1 = [
  { name: "Jan", uv: 4000 },
  { name: "Feb", uv: 3000 },
  { name: "Mar", uv: 2000 },
  { name: "Apr", uv: 2780 },
  { name: "May", uv: 1890 },
  { name: "Jun", uv: 2390 },
  { name: "Jul", uv: 3490 },
  { name: "Aug", uv: 3490 },
  { name: "Sep", uv: 3490 },
  { name: "Oct", uv: 3000 },
  { name: "Nov", uv: 2876 },
  { name: "Dec", uv: 3108 },
];

const data2 = [
  { name: "Jan", uv: 4000 },
  { name: "Feb", uv: 3000 },
  { name: "Mar", uv: 5001 },
  { name: "Apr", uv: 4000 },
  { name: "May", uv: 2000 },
  { name: "Jun", uv: 2780 },
  { name: "Jul", uv: 2000 },
];

const data3 = [
  { name: "Jan", uv: 3000 },
  { name: "Feb", uv: 4000 },
  { name: "Mar", uv: 2000 },
  { name: "Apr", uv: 2780 },
  { name: "May", uv: 2000 },
  { name: "Jun", uv: 1800 },
  { name: "Jul", uv: 2600 },
  { name: "Sep", uv: 3490 },
  { name: "Oct", uv: 3000 },
  { name: "Nov", uv: 2876 },
  { name: "Dec", uv: 3108 },
];

const data4 = [
  { name: "Jan", uv: 4000 },
  { name: "Feb", uv: 3000 },
  { name: "Mar", uv: 2000 },
  { name: "Apr", uv: 2780 },
  { name: "May", uv: 2000 },
  { name: "Jun", uv: 1800 },
  { name: "Jul", uv: 2600 },
];

const Performance = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginLeft: "10px",
          marginRight: "10px",
          marginTop: "30px",
        }}
      >
        <Card
          style={{
            width: '20%',
            margin: 0,
            height: 180,
            backgroundColor: "#1F1E1F",
            borderRadius: "15px",
          }}
        >
          <CardContent>
            <CardHeader style={{ color: "#95A2B3", textAlign: "center"}}>
              Total Notebooks
            </CardHeader>
            <Typography
              variant="h4"
              component="div"
              style={{
                color: "#95A2B3",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              307
              <TrendingUpIcon
                style={{
                  color: "#00E499",
                  fontSize: "30px",
                  marginLeft: "10px",
                }}
              />
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              style={{ marginTop: "0px" }}
            >
              <BarChart width={250} height={75} data={data1}>
                <Tooltip />
                <Bar dataKey="uv" fill="#8884d8" barSize={10} />
              </BarChart>
            </Box>
          </CardContent>
        </Card>

        <Card
          style={{
            width: '20%',
            margin: 0,
            height: 180,
            backgroundColor: "#1F1E1F",
            borderRadius: "15px",
          }}
        >
          <CardContent>
            <CardHeader style={{ color: "#95A2B3", textAlign: "center" }}>
              Database Queries
            </CardHeader>
            <Typography
              variant="h4"
              component="div"
              style={{
                color: "#95A2B3",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              9485 {/* Replace this with your number */}
              <TrendingDownIcon
                style={{
                  color: "#FF4D4D",
                  fontSize: "30px",
                  marginLeft: "10px",
                }}
              />
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              style={{ marginTop: "0px" }}
            >
              <AreaChart width={250} height={75} data={data2}>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#00E499"
                  fill="#226059"
                  strokeWidth={4}
                />
              </AreaChart>
            </Box>
          </CardContent>
        </Card>

        <Card
          style={{
            width: '20%',
            margin: 0,
            height: 180,
            backgroundColor: "#1F1E1F",
            borderRadius: "15px",
          }}
        >
          <CardContent>
            <CardHeader style={{ color: "#95A2B3", textAlign: "center" }}>
              Total Collaborations
            </CardHeader>
            <Typography
              variant="h4"
              component="div"
              style={{
                color: "#95A2B3",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              218 {/* Replace this with your number */}
              <TrendingUpIcon
                style={{
                  color: "#00E499",
                  fontSize: "30px",
                  marginLeft: "10px",
                }}
              />
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              style={{ marginTop: "0px" }}
            >
              <BarChart width={250} height={75} data={data3}>
                <Tooltip />
                <Bar dataKey="uv" fill="#047FD9" barSize={10} />
              </BarChart>
            </Box>
          </CardContent>
        </Card>

        <Card
          style={{
            width: '20%',
            margin: 0,
            height: 180,
            backgroundColor: "#1F1E1F",
            borderRadius: "15px",
          }}
        >
          <CardContent>
            <CardHeader style={{ color: "#95A2B3", textAlign: "center" }}>
              Connection Requests
            </CardHeader>
            <Typography
              variant="h4"
              component="div"
              style={{
                color: "#95A2B3",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              869 {/* Replace this with your number */}
              <TrendingDownIcon
                style={{
                  color: "#FF4D4D",
                  fontSize: "30px",
                  marginLeft: "10px",
                }}
              />
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              style={{ marginTop: "0px" }}
            >
              <AreaChart width={250} height={75} data={data4}>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#DF9A35"
                  fill="#1F1E1F"
                  strokeWidth={4}
                />
              </AreaChart>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Performance;
