import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function ProfileIntro() {
  return (
    <Stack>
      <Typography variant="h6" component="h6">
        Intro
      </Typography>
      <Typography variant="body1" component="p">
        Works at <strong>Google</strong>
      </Typography>
      <Typography variant="body1" component="p">
        Studied at <strong>CSUSM</strong>
      </Typography>
      <Typography variant="body1" component="p">
        Lives in <strong>San Diego, CA</strong>
      </Typography>
      <Typography variant="body1" component="p">
        From <strong>San Diego, CA</strong>
      </Typography>
      <Typography variant="body1" component="p">
        <strong>In a relationship</strong>
      </Typography>
    </Stack>
  );
}

export default ProfileIntro;
