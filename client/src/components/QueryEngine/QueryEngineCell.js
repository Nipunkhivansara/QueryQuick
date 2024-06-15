import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  IconButton,
  Tabs,
  Tab,
  Typography,
  Paper,
  InputBase,
} from "@mui/material";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";
import DataArrayIcon from "@mui/icons-material/DataArray";
/* import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css"; */
/* import "prismjs/themes/prism-dark.css"; */
/* import "prismjs/themes/prism-dark.min.css"; */

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-gob";
import "ace-builds/src-noconflict/theme-dracula";

import {
  Add as AddIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material";
import Grid from "../Grid/Grid";
import getDataFromSql from "../../services/sqlservice";
import getDataFromMongoDB from "../../services/mongodbservice";
import Graphs from "../Graphs/Graphs";

const QueryEngineCell = ({
  index,
  onDelete,
  onQueryEngineChange,
  dType,
  db,
  userInput,
  userQuery,
  handleMenuOpen,
}) => {
  const [cellDatabaseType, setCellDatabaseType] = useState(dType);
  const [cellDatabase, setCellDatabase] = useState(db);
  const [prompt, setPrompt] = useState(userInput);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(userQuery);
  const [tab, setTab] = useState("table");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [showQuery, setShowQuery] = useState(userQuery != "");
  const [isOpen, setIsOpen] = useState(false);

  let mode = dType === "MySQL" ? "sql" : "javascript";

  const databaseOptions = {
    MySQL: ["UCI Arc", "UCI Langson Library", "ecommerce"],
    MongoDB: ["UCI MCS 2023"],
    PostgreSQL: [],
    Microsoft_SQL_Server: [],
    Oracle: [],
    SQLite: [],
    Redis: [],
    MariaDB: [],
    Elasticsearch: [],
    Firebase: [],
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleDatabaseTypeChange = (event) => {
    setCellDatabaseType(event.target.value);
    onQueryEngineChange(index, "cellDatabaseType", event.target.value);
  };

  const handleDatabaseChange = (event) => {
    const newDatabase = event.target.value;
    setCellDatabase(newDatabase);
    onQueryEngineChange(index, "cellDatabase", newDatabase);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
    onQueryEngineChange(index, "prompt", event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleGetQuery = async () => {
    let api = "";
    setLoading(true);
    setError(null);
    try {
      if (cellDatabaseType === "MySQL") {
        api = "http://localhost:5001/chat";
      } else if (cellDatabaseType === "MongoDB") {
        api = "http://localhost:5001/mongo/chat";
      }
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setQuery(data.msg);
      onQueryEngineChange(index, "query", data.msg);
      setShowQuery(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (code) => {
    setQuery(code);
    onQueryEngineChange(index, "query", code);
  };

  const handleRunQuery = async () => {
    console.log(cellDatabase);
    try {
      setError(null);
      setLoading(true);
      let data;
      if (cellDatabaseType === "MySQL") {
        data = await getDataFromSql({ query, cellDatabase: "ecommerce" });
      } else if (cellDatabaseType === "MongoDB") {
        data = await getDataFromMongoDB({ query, cellDatabase: "SampleUCI" });
      }
      console.log(data);
      setData(data);
      // setDatabaseRecords(data); // Wrap data in an array
      // if (gridApi) {
      //   gridApi.setRowData(data); // Wrap data in an array
      // }
      // console.log(databaseRecords);
    } catch (error) {
      console.log("Error fetching data from SQL:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const commonStyles = {
    fontSize: "0.800rem",
    color: "#fff",
    "& .MuiSelect-select, & .MuiInputBase-input": {
      padding: "8px 14px",
      borderRadius: "4px",
      backgroundColor: "#383838",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "& .MuiSelect-icon": {
      color: "#fff", // Set the arrow color to white
    },
  };

  const dropDownStyles = {
    marginLeft: "10px",
    "& .MuiSelect-root": {
      backgroundColor: isOpen ? "#fff" : "#f0f0f0", // Example background color change on open
      borderRadius: isOpen ? "4px 4px 0 0" : "4px", // Example border radius change on open
      width: "fit-content", // Adjust width dynamically
      minWidth: "150px", //
      fontSize: "0.800 rem",
      padding: "8px 14px",
    },
    "& .MuiListItem-root": {
      color: "#fff", // Example text color
      backgroundColor: isOpen ? "#f0f0f0" : "#fff", // Example background color change on open
      "&:hover": {
        backgroundColor: "#e0e0e0", // Example hover background color
      },
      fontSize: "0.800 rem",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        bgcolor: "#1F1E1F",
        borderRadius: "8px",
        boxShadow: 3,
        position: "relative",
        "&:hover .delete-button": {
          opacity: 1,
        },
        marginTop: "16px",
        marginBottom: "16px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <IconButton
          onClick={handleMenuOpen}
          sx={{ "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" } }}
        >
          <AddIcon style={{ color: "#fff" }} />
        </IconButton>
        <Select
          value={cellDatabaseType}
          onChange={handleDatabaseTypeChange}
          displayEmpty
          open={isOpen}
          onClose={handleClose}
          onOpen={handleOpen}
          sx={{
            minWidth: "150px",
            ...commonStyles,
            ...dropDownStyles,
          }}
        >
          <MenuItem value="" disabled sx={{ fontSize: "0.800rem" }}>
            Select Database Type
          </MenuItem>
          {Object.keys(databaseOptions).map((type) => (
            <MenuItem key={type} value={type} sx={{ fontSize: "0.800rem" }}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ marginLeft: "10px" }}>
          <Select
            value={cellDatabase}
            onChange={handleDatabaseChange}
            displayEmpty
            sx={{
              ...commonStyles,
              ...dropDownStyles,
              minWidth: "200px",
            }}
            disabled={!cellDatabaseType}
          >
            <MenuItem value="" disabled sx={{ fontSize: "0.800rem" }}>
              Select Database
            </MenuItem>
            {cellDatabaseType &&
              databaseOptions[cellDatabaseType].map((db) => (
                <MenuItem key={db} value={db} sx={{ fontSize: "0.800rem" }}>
                  {db}
                </MenuItem>
              ))}
          </Select>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          marginLeft: "10px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Paper
          component="form"
          sx={{
            marginleft: "10px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: hovered ? "#1565C0" : "#3E3E3E",
            // borderRadius: "8px",
            // boxShadow: hovered ? "0px 4px 20px rgba(21, 101, 192, 0.3)" : "0px 2px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <IconButton
            sx={{
              padding: "4px 8px", // Adjust the padding to make the button smaller
              fontSize: "0.200rem",
              borderRadius: "0px", // Square corners
              transition: "background-color 0.6s", // Add transition effect
            }}
            aria-label="search"
            onClick={handleGetQuery}
          >
            {hovered ? (
              <FlashOnOutlinedIcon
                sx={{
                  color: "#fff",
                  backgroundColor: "#1565C0", // Darker shade of blue on hover
                  width: "100%",
                }}
              />
            ) : (
              <DataArrayIcon sx={{ color: "#fff" }} />
            )}
          </IconButton>
          <InputBase
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Enter prompt..."
            sx={{
              width: "100%",
              borderRadius: "4px",
              fontSize: "0.800rem",
              color: "#fff",
              "& .MuiSelect-select, & .MuiInputBase-input": {
                padding: "8px 14px",
                backgroundColor: "#1F1E1F",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#777",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#777",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#888",
              },
            }}
          />
        </Paper>
      </Box>
      {showQuery && !loading && (
        <>
          <div
          // style={{
          //   zIndex: 1
          // }}
        >
          <AceEditor
            height="7rem"
            width="100%"
            value={query}
            mode={mode}
            theme="gob"
            fontSize="0.800rem"
            highlightActiveLine={true}
            onChange={(code) => handleQueryChange(code)}
            name="UNIQUE_ID_OF_DIV"
            placeholder="Loading query..."
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              useWorker: false,
            }}
          />
        </div>
          <Button
            variant="contained"
            onClick={handleRunQuery}
            endIcon={<PlayArrowIcon />}
            sx={{
              variant: "contained",
              color: "primary",
              padding: "4px 8px", // Adjust the padding to make the button smaller
              width: "fit-content",
              margin: "10px",
              fontSize: "0.800rem",
              "&:hover": {
                backgroundColor: "#45A049",
              },
            }}
          >
            Run
          </Button>
        </>
      )}
      {error ? (
        <Box
          sx={{
            width: "97%",
            backgroundColor: "#000", // Error background color
            borderRadius: "4px",
            marginTop: "10px",
            color: "#BC6764",
            padding: "10px",
            boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.25)", // Correctly formatted boxShadow
            textAlign: "center",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          {error}
        </Box>
      ) : (
        data && (
          <>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              sx={{
                // marginTop: "10px",
                color: "#fff",
                marginLeft: "16px",
                "& .MuiTab-root": {
                  fontSize: "0.800rem",
                  "&.Mui-selected": {
                    color: "#4CAF50",
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#4CAF50",
                },
              }}
            >
              <Tab
                sx={{ color: "#fff", fontSize: "0.800rem" }}
                label="Table"
                value="table"
              />
              <Tab
                sx={{ color: "#fff", fontSize: "0.800rem" }}
                label="Charts"
                value="charts"
              />
            </Tabs>
            {tab === "table" && (
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#333",
                  borderRadius: "4px",
                  marginTop: "10px",
                  color: "#fff",
                  padding: "1px",
                  boxShadow: 3,
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                <Grid gridData={data} />
              </Box>
            )}
            {tab === "charts" && (
              <Box
                sx={{
                  width: "98%",
                  backgroundColor: "#333",
                  borderRadius: "4px",
                  marginTop: "10px",
                  color: "#fff",
                  padding: "10px",
                  boxShadow: 3,
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                <Graphs graphData={data} />
              </Box>
            )}
          </>
        )
      )}
      <IconButton
        onClick={onDelete}
        className="delete-button"
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "0.800rem",
          ...commonStyles,
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      >
        <DeleteIcon sx={{ fontSize: "1rem" }} />
      </IconButton>
    </Box>
  );
};

export default QueryEngineCell;
