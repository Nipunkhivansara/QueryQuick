import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import Sidebar from "../Sidebar/Sidebar";
import Appbar from "../Appbar/Appbar";
import QueryEngineCell from "../QueryEngine/QueryEngineCell";
import Cell from "../Cell/Cell";



const Notebook = ({ menuBarWidth, open, logout, user, handleDrawerToggle }) => {
  const { notebook_name, notebook_id } = useParams();
  const [cells, setCells] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState(notebook_name);
  const nextCellID = useRef(1);

  const [cellDatabaseType, setCellDatabaseType] = useState("");
  const [celldatabase, setCellDatabase] = useState("");
  const [prompt, setPrompt] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchNotebook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getNotebook`, {
          params: { notebook_id: 1, user_id: 1 },
        });
        const { notebook, cells } = response.data;
        setTitle(notebook.title || "Default Title");
        setCells(cells);
      } catch (error) {
        console.error("Error fetching notebook:", error);
      }
    };

    fetchNotebook();
  }, [notebook_id, user.user_id]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const addCell = (type) => {
    setCells([
      ...cells,
      {
        id: nextCellID.current,
        notebook_id: notebook_id,
        user_id: 1, // TO be changed
        cellType: type,
        cellValue: "",
        cellDatabase: "",
        cellDatabaseType: "",
        prompt: "",
        query: "",
      },
    ]);
    nextCellID.current++;
    handleMenuClose();
  };

  const updateCell = (index, value) => {
    const newCells = [...cells];
    newCells[index].cellValue = value;
    setCells(newCells);
  };

  const onQueryEngineChange = (index, prop, val) => {
    const newCells = [...cells];
    if (prop === "cellDatabaseType") {
      setCellDatabaseType(val);
      newCells[index].cellDatabaseType = val;
    }
    if (prop === "cellDatabase") {
      setCellDatabase(val);
      newCells[index].cellDatabase = val;
    }
    if (prop === "prompt") {
      setPrompt(val);
      newCells[index].prompt = val;
    }
    if (prop === "query") {
      setQuery(val);
      newCells[index].query = val;
    }
    setCells(newCells);
  };

  const deleteCell = (index) => {
    const newCells = [...cells];
    newCells.splice(index, 1);
    setCells(newCells);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSave = async () => {
    const notebookData = {
      notebook_id,
      user_id: user.email,
      title,
      cells,
    };

    console.log(notebookData);

    try {
      await axios.post("http://localhost:5000/saveNotebook", notebookData);
      alert("Notebook saved successfully!");
    } catch (error) {
      console.error("Error saving notebook:", error);
      alert("Failed to save notebook.");
    }
  };

  return (
    <div>
      <Box
        sx={{
          zIndex: 1,
          display: "flex",
          bgcolor: "#222B3D",
        }}
      >
        <Appbar
          handleDrawerToggle={handleDrawerToggle}
          menuBarWidth={menuBarWidth}
          user={user}
        />
        <Sidebar
          open={open}
          menuBarWidth={menuBarWidth}
          logout={logout}
          user={user}
        />

        <Box
          sx={{
            marginLeft: "-30px",
            marginTop: "75px",
            marginRight: "30px",
            marginBottom: "100px",
            width: "99%",
            minHeight: "81.9vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <TextField
                value={title}
                onChange={handleTitleChange}
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  style: {
                    color: "#fff",
                    fontSize: "1.9rem",
                    paddingLeft: "0px",
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#fff",
                    padding: 0,
                  },
                  "& fieldset": { border: "none" },
                }}
              />
              <Typography
                variant="body10"
                color="white"
                sx={{
                  marginTop: "6px",
                  paddingLeft: "0px",
                  fontSize: "1.0rem",
                }}
              >
                Created By: {user.name}
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                color: "primary",
                backgroundColor: "#1A202D",
                padding: "6px 12px",
                fontSize: "0.875rem",
                width: "fit-content",
              }}
            >
              Save Notebook
            </Button>
          </Box>

          <div style={{color:'#fff'}}>
            {JSON.stringify(cells)}
          </div>

          <Box sx={{ width: "100%", paddingLeft: "0px", marginTop: "16px" }}>
            <IconButton onClick={handleMenuOpen}>
              <AddIcon style={{ color: "#fff" }} />
            </IconButton>
          </Box>

          <Box>
            {cells.map((cell, index) =>
              cell.cellType === "queryEngine" ? (
                <QueryEngineCell
                  key={index}
                  dType={cell.cellDatabaseType}
                  db={cell.cellDatabase}
                  userInput={cell.prompt}
                  userQuery={cell.query}
                  onQueryEngineChange={onQueryEngineChange}
                  index={index}
                  onDelete={() => deleteCell(index)}
                />
              ) : (
                <Cell
                  key={index}
                  type={cell.cellType}
                  value={cell.cellValue}
                  onChange={(e) => updateCell(index, e.target.value)}
                  onDelete={() => deleteCell(index)}
                  handleMenuOpen={handleMenuOpen}
                />
              )
            )}
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => addCell("textBlock")}>Text Block</MenuItem>
            <MenuItem onClick={() => addCell("queryEngine")}>
              Query Engine
            </MenuItem>
            <MenuItem onClick={() => addCell("heading1")}>Heading 1</MenuItem>
            <MenuItem onClick={() => addCell("heading2")}>Heading 2</MenuItem>
            <MenuItem onClick={() => addCell("heading3")}>Heading 3</MenuItem>
            <MenuItem onClick={() => addCell("info")}>Info</MenuItem>
            <MenuItem onClick={() => addCell("horizontalDivider")}>
              Horizontal Divider
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </div>
  );
};

export default Notebook;
