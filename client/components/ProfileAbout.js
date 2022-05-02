import React, { useContext } from "react";
import { UserContext } from "../pages/_app";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProfileBio from "./ProfileBio";
import ProfileInfo from "./ProfileInfo";
import ProfileIntro from "./ProfileIntro";
import ProfileDetailsForm from "./ProfileDetailsForm";
import Modal from "@mui/material/Modal";
import { bgc } from "../config/config";

function ProfileAbout({ id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useContext(UserContext);
  const ownProfile = user?.user?._id === id ? true : false;
  const bioWidth = ownProfile ? "60%" : "100%";
  const bioMargin = ownProfile ? 2 : 0;
  return (
    <Box sx={{ backgroundColor: bgc, mx: -3 }}>
      <Stack direction="row" sx={{ flexWrap: ["wrap", "nowrap", "nowrap"] }}>
        <Paper
          elevation={3}
          sx={{ width: ["100%", "40%"], p: 2, mr: [0, 2], mb: 2 }}
        >
          <ProfileIntro />
        </Paper>
        <Paper elevation={3} sx={{ width: ["100%", "60%"], p: 2, ml: [0, 2] }}>
          <ProfileInfo />
        </Paper>
      </Stack>
      <Stack direction="row">
        <Paper
          elevation={3}
          sx={{ width: bioWidth, p: 2, mt: 2, mr: bioMargin }}
        >
          <ProfileBio />
        </Paper>
        {ownProfile && (
          <Paper elevation={3} sx={{ width: "40%", p: 2, mt: 2, ml: 2 }}>
            <Box>
              <Stack>
                <Typography variant="h6" component="h6">
                  Edit Your Profile Info
                </Typography>
                <Button onClick={handleOpen} variant="contained" sx={{ my: 1 }}>
                  Edit Details
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <ProfileDetailsForm handleClose={handleClose} />
                </Modal>
              </Stack>
            </Box>
          </Paper>
        )}
      </Stack>
    </Box>
  );
}

export default ProfileAbout;
