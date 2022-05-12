import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Unauthorized() {
  return (
    <Box sx={{ height: "100vh", mx: "auto", mt: 10 }}>
      <Typography variant="h6" component="h6" align="center">
        401 - Unauthorized. Rerouting to login page...
      </Typography>
    </Box>
  );
}

export default Unauthorized;
