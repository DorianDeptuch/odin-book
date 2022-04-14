import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../pages/_app";
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
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { server, client } from "../../config/config";

function StatusUpdate() {
  const { user } = useContext(UserContext);
  const [showChooseFile, setShowChooseFile] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleChooseFile = () => setShowChooseFile(!showChooseFile);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      content,
      author: user?.user?._id,
    };
    console.log(data);

    fetch(`${server}/statusUpdateForm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        router.push(`${client}/`);
        toast.success("Post successfully created.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setContent("");
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

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Stack>
        <Stack direction="row">
          <Avatar
            src={user?.user?.profilePicture || ""}
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
            onSubmit={handleSubmit}
          >
            <Stack direction="row">
              <TextField
                fullWidth
                id="statusUpdate"
                variant="outlined"
                value={content}
                name="statusUpdateForm"
                placeholder="What's on your mind?"
                onChange={(e) => setContent(e.target.value)}
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
