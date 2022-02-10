import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function settings() {
  return (
    <Container>
      <Paper elevation={3} sx={{ m: 2, p: 2 }}>
        <Typography variant="h6" component="h6">
          Settings
        </Typography>
        <Stack>
          <Box>
            <Typography variant="body" component="p">
              Profile Picture
            </Typography>
            <TextField variant="outlined" placeholder="Profile Picture URL" />
          </Box>
          <Box>
            <Typography variant="body" component="p">
              Change Password
            </Typography>
            <TextField variant="outlined" placeholder="New Password" />
          </Box>
          <Box>
            <Typography variant="body" component="p">
              Dark Mode
            </Typography>
            <TextField variant="outlined" placeholder="Dark Mode" />
          </Box>
          <Box>
            <Typography variant="body" component="p">
              Delete Account
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter your name to delete"
            />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}

export default settings;
