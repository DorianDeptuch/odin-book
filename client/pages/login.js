import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const styles = {
  p: 2,
  m: 2,
};

function login() {
  return (
    <Container>
      <Stack direction="row">
        <Stack>
          <Typography
            variant="h3"
            color="primary.main"
            sx={{ fontWeight: "bold" }}
          >
            OdinBook
          </Typography>
          <Typography variant="h5">
            Connect with friends and the world <wbr />
            around you on OdinBook.
          </Typography>
        </Stack>
        <Paper elevation={5} sx={{ ...styles }}>
          <Stack spacing={2}>
            <Typography>
              Log in to <span color="primary.main">OdinBook</span>
            </Typography>
            <TextField label="Email" variant="outlined" />
            <TextField label="Password" variant="outlined" />
            <Button variant="contained">Log In</Button>
            <Button sx={{ mb: 2 }} variant="contained" color="success">
              Create an account
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

export default login;
