import React, { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../pages/profile/[id]";
import { IndexContext } from "../pages/index";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Input from "@mui/material/Input";
import CloseIcon from "@mui/icons-material/Close";
import { avatar_MD } from "../config/config";

function StatusUpdate() {
  const user = useContext(ProfileContext);
  const index = useContext(IndexContext);
  const [showChooseFile, setShowChooseFile] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const { results } = user || index;
    setProfile(results);
  }, []);

  const handleChooseFile = () => setShowChooseFile(!showChooseFile);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Stack>
        <Stack direction="row">
          <Avatar
            src={profile?.profilePicture || ""}
            sx={{
              height: avatar_MD,
              width: avatar_MD,
              borderRadius: "50%",
              mr: 2,
            }}
          ></Avatar>
          <form
            action="/statusUpdateForm"
            method="POST"
            noValidate
            style={{ width: "100%" }}
          >
            <Stack direction="row">
              <TextField
                fullWidth
                id="statusUpdate"
                variant="outlined"
                name="statusUpdateForm"
                placeholder="What's on your mind?"
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                sx={{ mx: 1, height: "100%", alignSelf: "center" }}
              >
                <SendIcon></SendIcon>
              </Button>
            </Stack>
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
          </form>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default StatusUpdate;
