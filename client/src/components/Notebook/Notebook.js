import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import Sidebar from "../Sidebar/Sidebar";
import Appbar from "../Appbar/Appbar";
import QueryEngineCell from "../QueryEngine/QueryEngineCell";
import Cell from "../Cell/Cell";



const Notebook = ({ menuBarWidth, open, logout, user, handleDrawerToggle,
  miniDrawerWidth, maxDrawerWidth, setMenuBarWidth, setOpen
 }) => {
  const { notebook_name, notebook_id } = useParams();
  const [cells, setCells] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState(notebook_name);
  const [nextCellID, setNextCellID] = useState(1);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [cellDatabaseType, setCellDatabaseType] = useState("");
  const [celldatabase, setCellDatabase] = useState("");
  const [prompt, setPrompt] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchNotebook = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/getNotebook`, {
          params: { notebook_id: notebook_id, email: user.email },
        });
        const { notebook, cells } = response.data;
        setTitle(notebook.name || "Untitled Notebook");
        setCells(cells);

        // Determine the next cell ID
        if (cells && cells.length > 0) {
          const lastCellID = cells[cells.length - 1].id;
          setNextCellID(lastCellID + 1);
        } else {
          setNextCellID(1);
        }
      } catch (error) {
        console.error("Error fetching notebook:", error);
      }
    };

    fetchNotebook();
  }, [notebook_id, user.email]);

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
        id: nextCellID,
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
    setNextCellID(nextCellID + 1);
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

  const deleteCell = async (index) => {
    const cellToDelete = cells[index];
    const newCells = [...cells];
    newCells.splice(index, 1);
    setCells(newCells);

    try {
      await axios.post(`http://localhost:5001/deleteCell`, {
        id: cellToDelete.id, notebook_id: cellToDelete.notebook_id, user_id: cellToDelete.user_id, email: user.email
      });
    } catch (error) {
      console.error("Error deleting cell:", error);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSave = async () => {
    const notebookData = {
      notebook_id,
      name: title,
      user_id: user.email,
      cells,
    };

    console.log(notebookData);

    try {
      await axios.post("http://localhost:5001/saveNotebook", notebookData);
      setOpenSuccess(true);
    } catch (error) {
      console.error("Error saving notebook:", error);
      setOpenError(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <div>
      <Box
        sx={{
          zIndex: 1,
          display: "flex",
          bgcolor: "#383838",
        }}
      >
        <Appbar
          handleDrawerToggle={handleDrawerToggle}
          menuBarWidth={menuBarWidth}
          user={user}
        />
        <Sidebar
          open={open}
          setOpen={setOpen}
          menuBarWidth={menuBarWidth}
          miniDrawerWidth={miniDrawerWidth}
          maxDrawerWidth={maxDrawerWidth}
          setMenuBarWidth={setMenuBarWidth}
          logout={logout}
          user={user}
        />

        <Box
          sx={{
            marginLeft: "0px",
            marginTop: "75px",
            marginRight: "75px",
            marginBottom: "100px",
            width: "99%",
            minHeight: "83.7vh",
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
                  style: {
                    color: "#fff",
                    fontSize: "1.9rem",
                    paddingLeft: "15px",
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
                  paddingLeft: "15px",
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
                backgroundColor: "green",
                padding: "6px 12px",
                fontSize: "0.800rem",
                width: "fit-content",
                '&:hover': {
                  backgroundColor: "darkgreen", // Added hover effect
                }
              }}
            >
              Save Notebook
            </Button>
          </Box>

          <Box sx={{ width: "100%", paddingLeft: "0px", marginTop: "16px" }}>
            <IconButton onClick={handleMenuOpen} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}>
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
                  handleMenuOpen={handleMenuOpen}
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
            <MenuItem onClick={() => addCell("textBlock")} sx={{ fontSize: '0.800rem' }}>Text Block</MenuItem>
            <MenuItem onClick={() => addCell("queryEngine")} sx={{ fontSize: '0.800rem' }}>
              Query Engine
            </MenuItem>
            <MenuItem onClick={() => addCell("heading1")} sx={{ fontSize: '0.800rem' }}>Heading 1</MenuItem>
            <MenuItem onClick={() => addCell("heading2")} sx={{ fontSize: '0.800rem' }}>Heading 2</MenuItem>
            <MenuItem onClick={() => addCell("heading3")} sx={{ fontSize: '0.800rem' }}>Heading 3</MenuItem>
            <MenuItem onClick={() => addCell("info")} sx={{ fontSize: '0.800rem' }}>Info</MenuItem>
            <MenuItem onClick={() => addCell("horizontalDivider")} sx={{ fontSize: '0.800rem' }}>
              Horizontal Divider
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Snackbar open={openSuccess} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} TransitionComponent={(props) => <Slide {...props} direction="left" />}>
        <MuiAlert onClose={handleClose} severity="success" variant="filled">
          Notebook saved successfully!
        </MuiAlert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} TransitionComponent={(props) => <Slide {...props} direction="left" />}>
        <MuiAlert onClose={handleClose} severity="error" variant="filled">
          Failed to save notebook.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Notebook;
