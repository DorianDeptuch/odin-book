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

const styles = {
  width: "40%",
};

export default function SignupModal({}) {
  return (
    <Box sx={styles}>
      <Fade in={open}>
        <Paper elevation={5}>
          <Box sx={{ borderBottom: "1px solid gray" }} padding={1}>
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
          <Box padding={1}>
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField id="lastName" label="Last Name" variant="outlined" />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="newPassword"
                  label="Password"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
          <Box padding={1}>
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
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </Stack>
              </RadioGroup>
            </FormControl>
          </Box>
          <Button variant="contained" paddingX={3} color="success">
            Sign Up
          </Button>
        </Paper>
      </Fade>
    </Box>
  );
}
