import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function ProfileBio() {
  return (
    <Stack>
      <Typography variant="h6" component="h6">
        Bio
      </Typography>
      <Typography variant="body1" component="p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
        dolorum excepturi hic reprehenderit autem unde harum laboriosam, vitae
        doloribus laborum! Suscipit eaque consectetur soluta officiis!
      </Typography>
    </Stack>
  );
}

export default ProfileBio;
