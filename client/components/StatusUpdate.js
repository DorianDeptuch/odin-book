import React, { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../pages/_app";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
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
import { toastOptions } from "../config/config";
import { useDropzone } from "react-dropzone";
import styles from "../styles/StatusUpdate.module.css";
import { Image } from "cloudinary-react";

const dropZoneStyles = {
  border: "3px #1976d3 dashed",
  height: "200px",
  mt: 1,
  mr: 10,
  position: "relative",
};

const avatarStyles = {
  height: avatar_MD,
  width: avatar_MD,
  borderRadius: "50%",
  mr: 2,
};

const typographyStyles = {
  color: "#999",
  textAlign: "center",
  margin: "auto",
};

function StatusUpdate({ cloudinary_name }) {
  const { user } = useContext(UserContext);
  const [showChooseFile, setShowChooseFile] = useState(false);
  const [content, setContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState([]);
  const router = useRouter();

  const onDrop = useCallback(async (acceptedFile) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudinary_name}/upload`;
    const { signature, timestamp } = await getSignature();
    const formData = new FormData();

    formData.append("file", acceptedFile);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

    const response = await fetch(url, {
      method: "post",
      body: formData,
    });
    const data = await response.json();
    setUploadedImage([data]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: false,
  });

  const handleChooseFile = () => setShowChooseFile(!showChooseFile);

  const handleDeleteImage = () => {
    setUploadedImage(null);
    setShowChooseFile(false);
    //TODO: Delete image from cloudinary
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      content,
      author: user?.user?._id,
      image: uploadedImage.public_id,
    };
    console.log(data);

    fetch(`${server}/statusUpdateForm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        router.push(`${client}/`);
        toast.success("Post successfully created.", toastOptions);
        setContent("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
      });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Stack>
        <p>{cloudinary_name}</p>
        <Stack direction="row">
          <Avatar
            src={user?.user?.profilePicture || ""}
            sx={avatarStyles}
          ></Avatar>

          <form
            action="/statusUpdateForm"
            method="POST"
            noValidate
            style={{ width: "100%", position: "relative" }}
            onSubmit={handleSubmit}
          >
            <Stack>
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
              {showChooseFile && (
                <>
                  {uploadedImage ? (
                    <Button
                      sx={{ ml: "auto", mr: 10 }}
                      onClick={handleDeleteImage}
                    >
                      <CloseIcon sx={{ mr: 0.25 }} color="error" />
                      <Typography color="error">Delete Image</Typography>
                    </Button>
                  ) : (
                    <Button
                      sx={{ ml: "auto", mr: 10 }}
                      onClick={handleChooseFile}
                    >
                      <CloseIcon sx={{ mr: 0.25 }} color="error" />
                      <Typography color="error">Close</Typography>
                    </Button>
                  )}
                </>
              )}
            </Stack>
            {uploadedImage?.length ? (
              <>
                {uploadedImage.map((image) => (
                  <Image
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                    publicId={image.public_id}
                    width="300"
                    crop="scale"
                  />
                ))}
              </>
            ) : (
              <Stack
                direction="row"
                sx={showChooseFile ? dropZoneStyles : ""}
                className={isDragActive ? styles.dropZone_active : ""}
                {...getRootProps()}
              >
                {showChooseFile && <Input type="file" {...getInputProps()} />}
                {!showChooseFile ? (
                  <Button
                    sx={{ ml: "auto", mr: 10 }}
                    onClick={handleChooseFile}
                  >
                    <AddAPhotoIcon sx={{ mr: 1 }} />
                    Add an Image
                  </Button>
                ) : (
                  <Typography
                    variant="h6"
                    component="h6"
                    textAlign="center"
                    sx={typographyStyles}
                  >
                    Drag or Drop images here
                  </Typography>
                )}
              </Stack>
            )}
          </form>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default StatusUpdate;

async function getSignature() {
  const response = await fetch(`${server}/uploadImage`);
  const data = await response.json();
  const { signature, timestamp } = data;
  return { signature, timestamp };
}
