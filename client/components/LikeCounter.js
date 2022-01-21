import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function LikeCounter() {
  return (
    <Box>
      <Typography variant="subtitle1" component="p">
        <strong>2 likes</strong>
      </Typography>
    </Box>
  );
}

export default LikeCounter;
