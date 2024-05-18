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

// CSS for the different cell types
const styles = {
  textBlock: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    padding: "8px 0", // Adjust padding as needed
  },
  heading1: {
    fontSize: "2em",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    padding: "8px 0", // Adjust padding as needed
  },
  heading2: {
    fontSize: "1.5em",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    padding: "8px 0", // Adjust padding as needed
  },
  heading3: {
    fontSize: "1.17em",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    padding: "8px 0", // Adjust padding as needed
  },
  info: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0", // Adjust padding as needed
    backgroundColor: "#e7f3fe",
    borderLeft: "4px solid #2196F3",
  },
  horizontalDivider: {
    borderTop: "1px solid #ddd",
    margin: "8px 0",
  },
};

const Cell = ({ type, value, onChange, onDelete, handleMenuOpen }) => {
  const inputProps = {
    disableUnderline: true,
    style: { ...styles[type], paddingLeft: "0px" },
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <IconButton onClick={handleMenuOpen}>
        <AddIcon style={{ color: "#fff" }} />
      </IconButton>
      <IconButton onClick={onDelete}>
        <DeleteIcon style={{ color: "#fff", fontSize: 16 }} />
      </IconButton>
      {type === "horizontalDivider" ? (
        <Divider style={styles.horizontalDivider} />
      ) : (
        <TextField
          fullWidth
          multiline={type === "textBlock" || type === "info"}
          variant="standard"
          value={value}
          onChange={onChange}
          InputProps={inputProps}
          sx={{
            "& .MuiInputBase-input": {
              color: type === "info" ? "#000" : "#fff",
              padding: 0, // Remove padding for alignment
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />
      )}
    </Box>
  );
};

const Notebook = ({ menuBarWidth, open, logout, user, handleDrawerToggle }) => {
  const { notebook_id } = useParams();
  const [cells, setCells] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState("Notebook Title");
  const nextCellID = useRef(1);

  const [databaseType, setDatabaseType] = useState("");
  const [database, setDatabase] = useState("");
  const [prompt, setPrompt] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchNotebook = async () => {
      try {
        const response = await axios.get(`/getNotebook`, {
          params: { user_id: user.user_id, notebook_id: notebook_id },
        });
        const { notebook, cells } = response.data;
        setTitle(notebook.title);
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
        cellId: nextCellID.current,
        type,
        value: "",
        database: "",
        databaseType: "",
        prompt: "",
        query: "",
      },
    ]);
    nextCellID.current++;
    handleMenuClose();
  };

  const updateCell = (index, value) => {
    const newCells = [...cells];
    newCells[index].value = value;
    setCells(newCells);
  };

  const onQueryEngineChange = (index, prop, val) => {
    const newCells = [...cells];
    if (prop === "databaseType") {
      setDatabaseType(val);
      newCells[index].databaseType = val;
    }
    if (prop === "database") {
      setDatabase(val);
      newCells[index].database = val;
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

  const handleChange = (event) => {
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
          minHeight: "100%",
          minWidth: "100%",
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
            minHeight: "975px",
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
                onChange={handleChange}
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

          <Box sx={{ width: "100%", paddingLeft: "0px", marginTop: "16px" }}>
            <IconButton onClick={handleMenuOpen}>
              <AddIcon style={{ color: "#fff" }} />
            </IconButton>
          </Box>

          <Box>
            {cells.map((cell, index) =>
              cell.type === "queryEngine" ? (
                <QueryEngineCell
                  key={index}
                  // databaseType={cell.databaseType}
                  // database={cell.database}
                  // prompt={cell.prompt}
                  // query={cell.query}
                  onQueryEngineChange={onQueryEngineChange}
                  index={index}
                  onDelete={() => deleteCell(index)}
                />
              ) : (
                <Cell
                  key={index}
                  type={cell.type}
                  value={cell.value}
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
