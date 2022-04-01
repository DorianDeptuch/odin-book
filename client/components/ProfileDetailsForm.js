import React, { useState, useEffect, useContext } from "react";
// import { ProfileContext } from "../pages/profile/[id]";
import { UserContext } from "../pages/_app";
import { useRouter } from "next/router";
import { server, client } from "../../config/config";
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
import { toast } from "react-toastify";

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
  // const user = useContext(ProfileContext);
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [DOB, setDOB] = useState("");
  const [bio, setBio] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [sex, setSex] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [hometown, setHometown] = useState("");
  const [currentTown, setCurrentTown] = useState("");
  const [employment, setEmployment] = useState("");
  const [school, setSchool] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [timer, setTimer] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      bio,
      hobbies,
      sex,
      dateOfBirth,
      hometown,
      currentTown,
      employment,
      school,
      maritalStatus,
    };
    console.log(data);

    fetch(`${server}/profile/${user?.user?._id}/profileDetailsForm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        handleClose();
        router.push(`${client}/profile/${user?.user?._id}`);
        toast.success("Profile details updated.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  useEffect(() => {
    // const { results } = user;
    const { dateOfBirth } = user?.user;
    setDOB(dateOfBirth?.split("T")[0]);
    setProfile(user?.user);
    setTimeout(() => {
      setTimer(true);
    }, 500);
  }, []);

  useEffect(() => {
    setBio(profile.bio);
    setHobbies(profile.hobbies);
    setSex(profile.sex);
    setDateOfBirth(DOB);
    setHometown(profile.hometown);
    setCurrentTown(profile.currentTown);
    setEmployment(profile.employment);
    setSchool(profile.school);
    setMaritalStatus(profile.maritalStatus);
  }, [timer]);

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
      <form action="/profileDetailsForm" method="POST" onSubmit={handleSubmit}>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <TextField
              onChange={(e) => setBio(e.target.value)}
              fullWidth
              label="Bio"
              name="bio"
              value={bio}
              variant="outlined"
              placeholder="Enter your bio here"
              maxLength={200}
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <TextField
              onChange={(e) => setHobbies(e.target.value)}
              fullWidth
              label="Hobbies"
              name="hobbies"
              value={hobbies}
              variant="outlined"
              placeholder="Enter your hobbies here"
              maxLength={50}
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <InputLabel>Sex</InputLabel>
            <Select
              onChange={(e) => setSex(e.target.value)}
              fullWidth
              // value={sex || ""} fixes one warning, but creates another
              value={sex}
              label="Sex"
              name="sex"
              placeholder="Select your sex here"
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <InputLabel>Date of Birth</InputLabel>
            <Input
              onChange={(e) => setDateOfBirth(e.target.value)}
              type="date"
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              value={dateOfBirth}
              variant="outlined"
              placeholder="Enter your date of birth here"
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <TextField
              onChange={(e) => setHometown(e.target.value)}
              fullWidth
              label="Hometown"
              name="hometown"
              value={hometown}
              variant="outlined"
              placeholder="Enter your hometown here"
              maxLength={50}
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <TextField
              onChange={(e) => setCurrentTown(e.target.value)}
              fullWidth
              label="Current City"
              name="currentTown"
              value={currentTown}
              variant="outlined"
              placeholder="Enter your current city here"
              maxLength={50}
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <TextField
              onChange={(e) => setEmployment(e.target.value)}
              fullWidth
              label="Place of Employment"
              name="employment"
              value={employment}
              variant="outlined"
              placeholder="Enter your place of employment here"
              maxLength={50}
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <TextField
              onChange={(e) => setSchool(e.target.value)}
              fullWidth
              label="School"
              name="school"
              value={school}
              variant="outlined"
              placeholder="Enter your school here"
              maxLength={50}
            />
          </Grid>
          <Grid item md={6} sx={{ m: 1, width: "40%" }}>
            <InputLabel>Marital Status</InputLabel>
            <Select
              onChange={(e) => setMaritalStatus(e.target.value)}
              fullWidth
              name="maritalStatus"
              // value={maritalStatus || ""} fixes one warning but creates another
              value={maritalStatus}
              placeholder="Select your Marital Status here"
              label="Marital Status"
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
            <Button variant="contained" sx={{ width: "100%" }} type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default ProfileDetailsForm;
