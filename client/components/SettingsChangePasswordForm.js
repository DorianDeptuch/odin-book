import React, { useState } from "react";
import { server } from "../../config/config";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from "react-toastify";
import { toastOptions } from "../config/config";

function SettingsChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    const data = {
      changePasswordForm_Old: oldPassword,
      changePasswordForm_New: newPassword,
      currentUser: user?.user?._id,
    };

    fetch(`${server}/settings/changePasswordForm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        toast.success("Settings updated.", toastOptions);
        setOldPassword("");
        setNewPassword("");
        setExpanded(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
        setOldPassword("");
        setNewPassword("");
      });
  };

  return (
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
          onSubmit={handlePasswordSubmit}
        >
          <Stack>
            <Typography variant="body" component="p">
              Current Password
            </Typography>
            <TextField
              sx={{ mt: 1, mb: 2 }}
              label="Current Password"
              name="changePasswordForm_Old"
              value={oldPassword}
              type="password"
              variant="outlined"
              placeholder="Enter your Current Password here"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Typography variant="body" component="p">
              New Password
            </Typography>
            <TextField
              sx={{ mt: 1, mb: 2 }}
              label="New Password"
              name="changePasswordForm_New"
              value={newPassword}
              type="password"
              variant="outlined"
              placeholder="Enter a New Password here"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </AccordionDetails>
    </Accordion>
  );
}

export default SettingsChangePasswordForm;
