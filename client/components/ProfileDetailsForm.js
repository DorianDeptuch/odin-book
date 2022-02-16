import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ProfileDetailsForm() {
  return (
    <Paper elevation={3} sx={{ p: 1 }}>
      <Typography variant="h6" component="h6">
        <strong>Edit Details</strong>
      </Typography>
      <form action="/profileDetailsForm" method="PUT">
        <Stack>
          <Box sx={{ my: 2 }}>
            <TextField
              fullWidth
              label="Hobbies"
              name="hobbies"
              variant="outlined"
              placeholder="Enter your hobbies here"
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              variant="outlined"
              placeholder="Enter your bio here"
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <TextField
              fullWidth
              label="Hometown"
              name="hometown"
              variant="outlined"
              placeholder="Enter your hometown here"
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <TextField
              fullWidth
              label="Current City"
              name="currentCity"
              variant="outlined"
              placeholder="Enter your current city here"
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <TextField
              fullWidth
              label="School"
              name="school"
              variant="outlined"
              placeholder="Enter your school here"
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <TextField
              fullWidth
              label="Marital Status"
              name="maritalStatus"
              variant="outlined"
              placeholder="Enter your marital status here here"
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <TextField
              fullWidth
              label="Place of Employment"
              name="employment"
              variant="outlined"
              placeholder="Enter your place of employment here here"
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              variant="outlined"
              placeholder="Enter your date of birth here"
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <TextField
              fullWidth
              label="Sex"
              name="sex"
              variant="outlined"
              placeholder="Enter your sex here"
            />
          </Box>
          <Button variant="contained">Submit</Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default ProfileDetailsForm;
