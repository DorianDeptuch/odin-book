import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import Switch from "@mui/material/Switch";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function settings() {
  const [expanded, setExpanded] = useState(false);
  const [showChooseFile, setShowChooseFile] = useState(false);

  const handleChooseFile = () => setShowChooseFile(!showChooseFile);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubmit = () => {};

  return (
    <Container>
      <Paper elevation={3} sx={{ m: 2, p: 2 }}>
        <Typography variant="h6" component="h6">
          Settings
        </Typography>
        <Stack sx={{ my: 2 }}>
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
                onSubmit={handleSubmit}
              >
                <Stack>
                  <TextField
                    label="Profile Picture"
                    variant="outlined"
                    name="settingsProfilePicForm"
                    placeholder="Enter your Profile Picture URL here"
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
                  <Button variant="contained">Submit</Button>
                </Stack>
              </form>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <strong>Change Password</strong>
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Change your current Password here
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form
                action="/changePasswordForm"
                method="POST"
                onSubmit={handleSubmit}
              >
                <Stack>
                  <Typography variant="body" component="p">
                    Current Password
                  </Typography>
                  <TextField
                    sx={{ mt: 1, mb: 2 }}
                    label="Current Password"
                    name="changePasswordForm_Old"
                    type="password"
                    variant="outlined"
                    placeholder="Enter your Current Password here"
                  />
                  <Typography variant="body" component="p">
                    New Password
                  </Typography>
                  <TextField
                    sx={{ mt: 1, mb: 2 }}
                    label="New Password"
                    name="changePasswordForm_New"
                    type="password"
                    variant="outlined"
                    placeholder="Enter a New Password here"
                  />
                  <Button variant="contained">Submit</Button>
                </Stack>
              </form>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <strong>General Settings</strong>
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Enable or Disable General Settings here
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Stack direction="row">
                  <Typography
                    variant="body"
                    sx={{ alignSelf: "center" }}
                    component="p"
                  >
                    Dark Mode
                  </Typography>
                  <Switch sx={{ alignSelf: "center" }} />
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <strong>Delete Account</strong>
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Delete your Account permanently here
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form
                action="/deleteAccountForm"
                method="POST"
                onSubmit={handleSubmit}
              >
                <Stack>
                  <Typography color="error" variant="body" component="p">
                    Enter your full name to Delete your Account
                  </Typography>
                  <TextField
                    name="deleteAccountForm"
                    label="Your Full Name"
                    color="error"
                    sx={{ mt: 1, mb: 2 }}
                    variant="outlined"
                    placeholder="Enter your full name here to delete your account"
                  />
                  <Button variant="contained" color="error">
                    DELETE ACCOUNT PERMANENTLY
                  </Button>
                </Stack>
              </form>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Paper>
    </Container>
  );
}

export default settings;
