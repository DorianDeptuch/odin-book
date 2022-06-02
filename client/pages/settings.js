import React, { useState, useEffect, useContext } from "react";
import SettingsProfilePicForm from "../components/SettingsProfilePicForm";
import SettingsChangePasswordForm from "../components/SettingsChangePasswordForm";
import SettingsDeleteAccountForm from "../components/SettingsDeleteAccountForm";
import { server } from "../../config/config";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { toastOptions } from "../config/config";
import Unauthorized from "../components/Unauthorized";
import { UserContext } from "./_app";

function settings({ data }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      toast.warn(
        "You must to be logged in to view this resource",
        toastOptions
      );
      return;
    }
  }, []);

  return (
    <Container sx={{ my: 10 }}>
      {user ? (
        <Paper
          elevation={3}
          sx={{ m: [0, 1, 2], p: [0, 1, 2], mt: [2, 2, 0], mb: 10 }}
        >
          <Typography variant="h6" component="h6" sx={{ p: [2, 1, 0] }}>
            Settings
          </Typography>
          <Stack sx={{ my: 2 }}>
            <SettingsProfilePicForm data={data} />
            <SettingsChangePasswordForm data={data} />
            <SettingsDeleteAccountForm data={data} />

            {/* <Accordion
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
          </Accordion> */}
          </Stack>
        </Paper>
      ) : (
        <Unauthorized />
      )}
    </Container>
  );
}

export default settings;

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/settings`);
  const data = await res.json();
  return {
    props: { data: data },
  };
}
