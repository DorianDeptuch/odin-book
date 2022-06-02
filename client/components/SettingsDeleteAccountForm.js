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
import { useRouter } from "next/router";
import { toastOptions } from "../config/config";

function SettingsDeleteAccountForm({ data }) {
  const [deleteAccount, setDeleteAccount] = useState("");
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const [settingsUser, setSettingsUser] = useState({});

  useEffect(() => {
    const { user } = data;
    setSettingsUser(data);
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();

    const data = {
      deleteAccountForm: deleteAccount,
      currentUser: settingsUser?.user?._id,
    };

    fetch(`${server}/settings/deleteAccountForm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        toast.success("Account successfully deleted", toastOptions);
        setDeleteAccount("");
        router.push("/login");
        // setUser(null)
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
        setDeleteAccount("");
      });
  };

  return (
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
          onSubmit={handleDeleteSubmit}
        >
          <Stack>
            <Typography color="error" variant="body" component="p">
              Enter your full name to Delete your Account
            </Typography>
            <TextField
              name="deleteAccountForm"
              value={deleteAccount}
              label="Your Full Name"
              color="error"
              sx={{ mt: 1, mb: 2 }}
              variant="outlined"
              placeholder="Enter your full name here to delete your account"
              onChange={(e) => setDeleteAccount(e.target.value)}
            />
            <Button variant="contained" color="error" type="submit">
              DELETE ACCOUNT PERMANENTLY
            </Button>
          </Stack>
        </form>
      </AccordionDetails>
    </Accordion>
  );
}

export default SettingsDeleteAccountForm;
