import React, { useState, useEffect } from "react";
import { server } from "../../config/config";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { toast } from "react-toastify";

function SettingsProfilePicForm({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [showChooseFile, setShowChooseFile] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    console.log(data);
    const { user } = data;
    setProfilePicture(user?.profilePicture);
  }, []);

  const handleChooseFile = () => setShowChooseFile(!showChooseFile);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    const data = {
      profilePicture,
    };

    fetch(`${server}/settings/settingsProfilePicForm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        toast.success("Settings updated.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setProfilePicture("");
        setExpanded(false);
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
        setProfilePicture("");
      });
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          <strong>Profile Picture</strong>
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Change your Profile Picture here
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form
          action="/settingsProfilePicForm"
          method="POST"
          onSubmit={handleProfileSubmit}
        >
          <Stack>
            <TextField
              label="Profile Picture"
              variant="outlined"
              value={profilePicture}
              name="profilePicture"
              placeholder="Enter your Profile Picture URL here"
              onChange={(e) => setProfilePicture(e.target.value)}
            />
            <Stack direction="row">
              {showChooseFile && <Input type="file" />}
              {!showChooseFile ? (
                <Button sx={{ mx: "auto" }} onClick={handleChooseFile}>
                  <AddAPhotoIcon sx={{ mr: 1 }} />
                  Add an Image
                </Button>
              ) : (
                <Button sx={{ mx: "auto" }} onClick={handleChooseFile}>
                  <CloseIcon sx={{ mr: 1 }} color="error" />
                  <Typography color="error">Close</Typography>
                </Button>
              )}
            </Stack>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </AccordionDetails>
    </Accordion>
  );
}

export default SettingsProfilePicForm;
