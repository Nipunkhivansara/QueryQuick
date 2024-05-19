import React, { useState, useEffect } from "react";
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
import {
  Delete as DeleteIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material";

const QueryEngineCell = ({ index, onDelete, onQueryEngineChange }) => {
  const [databaseType, setDatabaseType] = useState("");
  const [database, setDatabase] = useState("");
  const [prompt, setPrompt] = useState("");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("table");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [showQuery, setShowQuery] = useState(false); // State to manage showing query after lightning icon click
  const [isOpen, setIsOpen] = useState(false);

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
    setDatabaseType(event.target.value);
    onQueryEngineChange(index, "databaseType", event.target.value);
  };

  const handleDatabaseChange = (event) => {
    setDatabase(event.target.value);
    onQueryEngineChange(index, "database", event.target.value);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
    onQueryEngineChange(index, "prompt", event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleGetQuery = () => {
    // Simulate fetching query
    setLoading(true);
    setTimeout(() => {
      setQuery("SELECT * FROM example_table");
      onQueryEngineChange(index, "query", "SELECT * FROM example_table");
      setLoading(false);
      setShowQuery(true); // Set showQuery to true after query is loaded
    }, 1000);
  };

  const handleRunQuery = () => {
    // Simulate running query and fetching data
    setLoading(true);
    setTimeout(() => {
      setData([
        { id: 1, title: "A Quiet Place Part II", year: 2022, rating: 7.3 },
        { id: 2, title: "Black Widow", year: 2022, rating: 6.8 },
        { id: 3, title: "Dune", year: 2022, rating: 8.1 },
        { id: 4, title: "No Time to Die", year: 2022, rating: 7.4 },
        { id: 5, title: "The French Dispatch", year: 2022, rating: 7.5 },
      ]);
      setLoading(false);
    }, 1000);
  };

  const commonStyles = {
    fontSize: "0.700rem",
    color: "#fff",
    "& .MuiSelect-select, & .MuiInputBase-input": {
      padding: "8px 14px",
      borderRadius: "4px",
      backgroundColor: "#222B3D",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1A202D",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1A202D",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1A202D",
    },
  };

  const dropDownStyles = {
    marginLeft: "10px",
    "& .MuiSelect-root": {
      backgroundColor: isOpen ? "#fff" : "#f0f0f0", // Example background color change on open
      borderRadius: isOpen ? "4px 4px 0 0" : "4px", // Example border radius change on open
      width: "fit-content", // Adjust width dynamically
      minWidth: "150px", //
      fontSize: "0.700 rem",
      padding: "8px 14px",
    },
    "& .MuiListItem-root": {
      fontSize: "14px", // Example font size
      color: "#fff", // Example text color
      backgroundColor: isOpen ? "#f0f0f0" : "#fff", // Example background color change on open
      "&:hover": {
        backgroundColor: "#e0e0e0", // Example hover background color
      },
      fontSize: "0.700 rem",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        bgcolor: "#1A202D",
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
        <Select
          value={databaseType}
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
          <MenuItem value="" disabled sx={{ fontSize: "0.700rem" }}>
            Select Database Type
          </MenuItem>
          <MenuItem value="MySQL" sx={{ fontSize: "0.700rem" }}>
            MySQL
          </MenuItem>{" "}
          <MenuItem value="PostgreSQL" sx={{ fontSize: "0.700rem" }}>
            PostgreSQL
          </MenuItem>
          {/* Add more database types as needed */}
        </Select>
        <Box sx={{ marginLeft: "10px" }}>
          <Select
            value={database}
            onChange={handleDatabaseChange}
            displayEmpty
            sx={{
              ...commonStyles,
              ...dropDownStyles,
              minWidth: "200px",
            }}
          >
            <MenuItem value="" disabled sx={{ fontSize: "0.700rem" }}>
              Select Database Schema
            </MenuItem>
            <MenuItem value="db1" sx={{ fontSize: "0.700rem" }}>
              Database 1
            </MenuItem>
            <MenuItem value="db2" sx={{ fontSize: "0.700rem" }}>
              Database 2
            </MenuItem>
            {/* Add more databases as needed */}
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
            backgroundColor: hovered ? "#1565C0" : "#222B3D",
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
            InputProps={{ disableUnderline: true }}
            sx={{
              width: "100%",
              borderRadius: "4px",
              fontSize: "0.700rem",
              color: "#fff",
              "& .MuiSelect-select, & .MuiInputBase-input": {
                padding: "8px 14px",
                backgroundColor: "#222B3D",
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
        <Box sx={{ marginRight: "10px" }}>
          <TextField
            value={query}
            placeholder="Loading query..."
            InputProps={{ disableUnderline: true, readOnly: true }}
            sx={{
              "& .MuiInputBase-input": {
                color: "#7F848E",
                fontSize: "0.700rem",
                padding: "8px 14px",
                borderRadius: "0px",
                backgroundColor: "#222B3D",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#222B3D",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#777",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#888",
              },
              marginBottom: "10px",
              marginLeft: "10px",
              marginRight: "10px", // Corrected margin-right property
              width: "100%",
            }}
          />
          <Button
            variant="contained"
            onClick={handleRunQuery}
            endIcon={<PlayArrowIcon />}
            sx={{
              variant: "contained",
              color: "primary",
              padding: "4px 8px", // Adjust the padding to make the button smaller
              fontSize: "0.875rem",
              width: "fit-content",
              marginLeft: "10px",
              fontSize: "0.700rem",
            }}
          >
            Run
          </Button>
        </Box>
      )}
      {data && (
        <>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            sx={{ marginTop: "16px", color: "#fff", marginLeft: "16px" }}
          >
            <Tab label="Table" value="table" />
            <Tab label="Charts" value="charts" />
          </Tabs>
          {tab === "table" && (
            <Box
              sx={{
                height: 300,
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
              {/* Placeholder for dynamically rendered table */}
              <Typography variant="h6">
                Table will be rendered here...
              </Typography>
            </Box>
          )}
          {tab === "charts" && (
            <Box
              sx={{
                height: 300,
                width: "100%",
                backgroundColor: "#333",
                borderRadius: "4px",
                marginTop: "10px",
                color: "#fff",
                padding: "10px",
                boxShadow: 3,
                marginLeft: "10px",
              }}
            >
              {/* Placeholder for dynamically rendered chart */}
              <Typography variant="h6">
                Chart will be rendered here...
              </Typography>
            </Box>
          )}
        </>
      )}
      <IconButton
        onClick={onDelete}
        className="delete-button"
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "0.700rem",
          ...commonStyles,
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default QueryEngineCell;
