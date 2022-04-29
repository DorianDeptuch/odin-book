import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Image } from "cloudinary-react";

function ProfilePhotosModal({ handleClose, content, cloudName, publicId }) {
  return (
    <Box>
      <Stack>
        {/* <img src={src} alt={alt} style={{ width: "100%" }}></img> */}
        <Image
          cloudName={cloudName}
          publicId={publicId}
          crop="scale"
          style={{ width: "100%" }}
        />
        <Typography variant="body1" component="p" sx={{ p: 2 }}>
          {content}
        </Typography>
        <Button
          onClick={handleClose}
          variant="contained"
          color="error"
          sx={{ mx: "auto", my: 2 }}
        >
          Close
        </Button>
      </Stack>
    </Box>
  );
}

export default ProfilePhotosModal;
