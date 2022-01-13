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
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function SignupModal({}) {
  return (
    <Paper elevation={5}>
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
      <Box padding={2}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <TextField
              fullWidth
              id="firstName"
              label="First Name"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              variant="outlined"
            />
          </Grid>
          <Grid item md={12}>
            <TextField fullWidth id="email" label="Email" variant="outlined" />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="newPassword"
              label="Password"
              variant="outlined"
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
      <Box padding={2}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <Stack direction="row">
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
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
    </Paper>
  );
}
