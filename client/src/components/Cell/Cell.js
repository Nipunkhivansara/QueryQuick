import React, { useState } from "react";
import { Box, TextField, IconButton, Divider } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

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
    padding: "8px 8px", // Adjust padding as needed
    backgroundColor: "#e7f3fe",
    borderLeft: "4px solid #2196F3",
  },
  horizontalDivider: {
    borderTop: "1px solid #ddd",
    margin: "8px 0",
  },
};

const Cell = ({ type, value, onChange, onDelete, handleMenuOpen }) => {
  const [hover, setHover] = useState(false);

  const inputProps = {
    style: { ...styles[type], paddingLeft: "0px" },
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", width: "100%" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <IconButton
        onClick={handleMenuOpen}
        sx={{ "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" } }}
      >
        <AddIcon style={{ color: "#fff" }} />
      </IconButton>

      {type === "horizontalDivider" ? (
        <Divider style={styles.horizontalDivider} />
      ) : (
        <TextField
          fullWidth
          multiline={type === "textBlock" || type === "info"}
          value={value}
          placeholder="Start typing..."
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

      {hover && (
        <IconButton onClick={onDelete}>
          <DeleteIcon style={{ color: "#fff", fontSize: 16 }} />
        </IconButton>
      )}
    </Box>
  );
};

export default Cell;
