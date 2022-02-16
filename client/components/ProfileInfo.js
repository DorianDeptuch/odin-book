import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function ProfileInfo() {
  return (
    <Stack>
      <Typography variant="h6" component="h6">
        Info
      </Typography>
      <Typography variant="body1" component="p">
        Age: <strong>64</strong>
      </Typography>
      <Typography variant="body1" component="p">
        Date of Birth: <strong>12/4/1957</strong>
      </Typography>
      <Typography variant="body1" component="p">
        Sex: <strong>Male</strong>
      </Typography>
      <Typography variant="body1" component="p">
        Hobbies include: <strong>Knitting</strong>
      </Typography>
    </Stack>
  );
}

export default ProfileInfo;
