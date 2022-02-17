import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: ["95%", "85%", "75%", "65%", "55%"],
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function ProfileDetailsForm({ handleClose }) {
  const [sex, setSex] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  return (
    <Box
      sx={{
        ...style,
        p: 2,
        overflowY: "scroll",
        maxHeight: "96vh",
        position: "relative",
      }}
    >
      <Typography variant="h6" component="h6">
        <strong>Edit Details</strong>
      </Typography>
      <Button
        onClick={handleClose}
        sx={{ position: "absolute", top: 0, right: 0, p: 2 }}
      >
        <CloseTwoToneIcon />
      </Button>
      <form action="/profileDetailsForm" method="PUT">
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              variant="outlined"
              placeholder="Enter your bio here"
              maxLength={200}
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <TextField
              fullWidth
              label="Hobbies"
              name="hobbies"
              variant="outlined"
              placeholder="Enter your hobbies here"
              maxLength={50}
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <InputLabel>Sex</InputLabel>
            <Select
              fullWidth
              value={sex}
              label="Sex"
              name="sex"
              placeHolder="Select your sex here"
              onChange={handleSexChange}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <InputLabel>Date of Birth</InputLabel>
            <Input
              type="date"
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              variant="outlined"
              placeholder="Enter your date of birth here"
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <TextField
              fullWidth
              label="Hometown"
              name="hometown"
              variant="outlined"
              placeholder="Enter your hometown here"
              maxLength={50}
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <TextField
              fullWidth
              label="Current City"
              name="currentCity"
              variant="outlined"
              placeholder="Enter your current city here"
              maxLength={50}
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <TextField
              fullWidth
              label="Place of Employment"
              name="employment"
              variant="outlined"
              placeholder="Enter your place of employment here"
              maxLength={50}
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <TextField
              fullWidth
              label="School"
              name="school"
              variant="outlined"
              placeholder="Enter your school here"
              maxLength={50}
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <InputLabel>Marital Status</InputLabel>
            <Select
              fullWidth
              name="maritalStatus"
              value={maritalStatus}
              placeholder="Select your Marital Status here"
              label="Marital Status"
              onChange={handleMaritalStatusChange}
            >
              <MenuItem value={"Single"}>Single</MenuItem>
              <MenuItem value={"In a Relationship"}>In a Relationship</MenuItem>
              <MenuItem value={"Engaged"}>Engaged</MenuItem>
              <MenuItem value={"Married"}>Married</MenuItem>
              <MenuItem value={"Separated"}>Separated</MenuItem>
              <MenuItem value={"Divorced"}>Divorced</MenuItem>
              <MenuItem value={"Widowed"}>Widowed</MenuItem>
              <MenuItem value={"It's Complicated"}>It's Complicated</MenuItem>
            </Select>
          </Grid>

          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <Button variant="contained" sx={{ width: "100%" }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default ProfileDetailsForm;
