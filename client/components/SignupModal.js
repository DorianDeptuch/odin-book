import * as React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

export default function SignupModal({ handleClose }) {
  return (
    <Paper
      elevation={5}
      sx={{
        overflowY: "scroll",
        maxHeight: "96vh",
        position: "relative",
      }}
    >
      <Button
        onClick={handleClose}
        sx={{ position: "absolute", top: 0, right: 0, p: 2 }}
      >
        <CloseTwoToneIcon />
      </Button>
      <Box sx={{ borderBottom: "1px solid gray" }} padding={2}>
        <Typography
          id="transition-modal-title"
          sx={{ fontWeight: "bold" }}
          variant="h4"
          component="h2"
        >
          Sign Up
        </Typography>
        <Typography variant="body1" component="p">
          It's quick and easy.
        </Typography>
      </Box>
      <form action="/signupForm" method="POST" noValidate>
        <Box padding={2}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <TextField
                fullWidth
                name="firstName"
                id="firstName"
                label="First Name*"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                fullWidth
                name="lastName"
                id="lastName"
                label="Last Name*"
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} md={6}>
              <TextField
                fullWidth
                name="newEmail"
                id="newEmail"
                label="Email*"
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} md={6}>
              <InputLabel>Date of Birth</InputLabel>
              <Input
                fullWidth
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                label="Date of Birth"
                variant="outlined"
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                fullWidth
                name="newPassword"
                type="password"
                id="newPassword"
                label="Password*"
                variant="outlined"
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                fullWidth
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                label="Confirm Password*"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>
        <Box padding={2}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sex</FormLabel>
            <RadioGroup aria-label="sex" defaultValue="" name="sex">
              <Stack direction="row">
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>
        <Box padding={2} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            paddingX={3}
            color="success"
            sx={{ width: "40%" }}
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
