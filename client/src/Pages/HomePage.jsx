import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, capitalize } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ListItemAvatar,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import ConnectionComponent from "./ConnectionComponent";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
  OutlinedInput,
} from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const HomePage = ({ user }) => {
  const [notebooks, setNotebooks] = useState([]);
  const [notebookName, setNotebookName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const notebookName = formJson.name;
    const uniqueId = generateUniqueId(); // Function to generate unique ID

    const notebookData = {
      notebook_id: uniqueId,
      user_id: user.email,
      name: notebookName,
      cells: [],
    };

    console.log(notebookData);

    try {
      await axios.post("http://localhost:5001/saveNotebook", notebookData);
      alert("Notebook saved successfully!");
    } catch (error) {
      console.error("Error saving notebook:", error);
      alert("Failed to save notebook.");
    }

    // Navigate to the notebook page
    navigate(`/notebook/${uniqueId}`);

    handleClose();
  };

  const generateUniqueId = () => {
    // Function to generate a unique ID (you can use any method you prefer)
    const uuid = () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    };

    return uuid();
  };

  useEffect(() => {
    const fetchNotebooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/notebooks/ids",
          {
            params: {
              email: user.email,
            },
          }
        );
        setNotebooks(response.data);
      } catch (error) {
        console.error("Failed to fetch notebooks:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/allUsers");

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchNotebooks();
    fetchUsers();
  }, [user.email]);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const gotoNotebook = (notebookName, notebookId) => {
    navigate(`/notebook/${notebookId}`);
  };

  const handleCheckboxChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedUsers(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function capitalizeFirstLetter(string) {
    if (typeof string !== "string" || string.length === 0) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <Typography
        variant="h4"
        sx={{ m: 2, color: "white", marginLeft: 11, marginTop: 5 }}
      >
        Welcome, {capitalizeFirstLetter(user.name.split(" ")[0])}!
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 350,
          alignItems: "center",
          marginTop: 5,
          marginLeft: 10,
          marginRight: 10,
          boxShadow: 3,
          overflow: "hidden",
          border: "10px solid #4e6676",
          borderRadius: "30px",
          bgcolor: "#d1d1d1",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab
            label="Add Connection"
            style={{ fontWeight: "bold", fontSize: "16px" }}
            {...a11yProps(0)}
          />
          <Tab
            label="Create Notebook"
            style={{ fontWeight: "bold", fontSize: "16px" }}
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ConnectionComponent />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 500, fontSize: 25 }}>
              Create Notebook
            </span>
            <span style={{ color: grey }}>
              Start fresh with a new notebook.
            </span>

            <Card
              sx={{
                width: "100%",
                marginTop: 2,
                "&:hover": {
                  boxShadow: "0 0 11px rgba(33,33,33,.2)",
                  border: "1px solid black",
                },
              }}
            >
              <CardActionArea
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 2,
                }}
                onClick={handleClickOpen}
              >
                <AddIcon fontSize="large" />
                <Typography component="div" variant="h6">
                  Create Notebook
                </Typography>
              </CardActionArea>
            </Card>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                component: "form",
                onSubmit: handleSubmit,
                style: { minWidth: 500, minHeight: 200 },
              }}
            >
              <DialogTitle>Enter Notebook Name</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  variant="standard"
                  value={notebookName}
                  onChange={(e) => setNotebookName(e.target.value)}
                />

                <FormControl fullWidth margin="dense">
                  <InputLabel id="user-select-label">Select Users</InputLabel>
                  <Select
                    labelId="user-select-label"
                    id="user-select"
                    multiple
                    value={selectedUsers}
                    onChange={handleCheckboxChange}
                    input={<OutlinedInput label="Select Users" />}
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) => users.find((user) => user.id === id).username
                        )
                        .join(", ")
                    }
                  >
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        <Checkbox checked={selectedUsers.includes(user.id)} />
                        <ListItemAvatar>
                          <Avatar alt={user.username} src={user.profile} />
                        </ListItemAvatar>
                        <ListItemText primary={user.username} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Create</Button>
              </DialogActions>
            </Dialog>
          </div>
        </TabPanel>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2, px: 10, marginBottom: 10 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              bgcolor: "#d1d1d1",
            }}
          >
            <CardContent>
              <video width="100%" controls>
                <source src="https://www.youtube.com/watch?v=cjF734_cIEY" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              bgcolor: "#d1d1d1",
            }}
          >
            <CardContent>
              <Typography variant="h5">Notebooks</Typography>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 400, overflow: "auto" }}
              >
                <Table stickyHeader aria-label="notebook table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          backgroundColor: "#565656",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Notebook Name
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "#565656",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Users
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "#565656",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Last Modified
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notebooks?.map((row) => (
                      <TableRow key={row.notebookId}>
                        <TableCell
                          sx={{
                            backgroundColor: "#383838",
                            color: "#fff",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            gotoNotebook(row.noteook_name, row.notebook_id)
                          }
                        >
                          {row.notebook_name}
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "#383838",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          {row.associated_users.map((user) => (
                            <Avatar
                              key={user.username}
                              alt={user.username}
                              src={user.profile}
                              sx={{ margin: "5px" }}
                            />
                          ))}
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "#383838",
                            color: "#fff",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          12/12/2021
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
