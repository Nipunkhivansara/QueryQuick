import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const NewProject = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Create New Project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#222B3D",
            color: "white",
            width: "800px",
            height: "500px",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          Create New Project
        </DialogTitle>
        <DialogContent sx={{ marginTop: "20px" }}>
          <TextField
            sx={{ margin: "10px" }}
            label="Outlined secondary"
            color="secondary"
            focused
            fullWidth
          />
          <TextField
            sx={{ margin: "10px" }}
            label="Filled success"
            variant="filled"
            color="success"
            focused
          />
          <TextField
            sx={{ margin: "10px" }}
            label="Standard warning"
            variant="standard"
            color="warning"
            focused
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewProject;
