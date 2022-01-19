import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function ProfilePhotosModal({ src, srcSet, subtitle, alt }) {
  return (
    <Box>
      <Stack>
        <img src={src} alt={alt} style={{ width: "100%" }}></img>
        <Typography variant="h6" component="h6">
          Press 'Esc' to exit
        </Typography>
      </Stack>
    </Box>
  );
}

export default ProfilePhotosModal;
