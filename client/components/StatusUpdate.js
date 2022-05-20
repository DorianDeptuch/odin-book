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
  height: "150px",
  mt: 1,
  mr: 10,
  position: "relative",
};

const avatarStyles = {
  height: avatar_MD,
  width: avatar_MD,
  borderRadius: "50%",
  mr: [1, 2],
};

const typographyStyles = {
  color: "#999",
  textAlign: "center",
  margin: "auto",
};

function StatusUpdate({ parent, setIndexPosts, setProfilePosts }) {
  const { user } = useContext(UserContext);
  const [showChooseFile, setShowChooseFile] = useState(false);
  const [content, setContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState([]);
  const regex =
    /(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*(?:[&\/\#].*)?/;
  const regex2 = /[a-z0-9]{20}/;
  const onDrop = useCallback(async (acceptedFile) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;
    const { signature, timestamp } = await getSignature();
    const formData = new FormData();
    console.log(acceptedFile);
    console.log("signature: ", signature);
    console.log("timestamp: ", timestamp);

    formData.append("file", acceptedFile[0]);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

    const response = await fetch(url, {
      method: "post",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    setUploadedImage([data]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: false,
    // maxSize: 300 * 1024 //300kb
  });

  const handleChooseFile = () => setShowChooseFile(!showChooseFile);

  const handleDeleteImage = () => {
    setUploadedImage(null);
    setShowChooseFile(false);
    //TODO: Delete image from cloudinary
  };

  const handleSubmittedPost = (post) => {
    if (parent === "Newsfeed") {
      setIndexPosts((prev) => [post, ...prev]);
      return;
    }
    if (parent === "ProfilePosts") {
      setProfilePosts((prev) => [post, ...prev]);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (regex.test(content) && uploadedImage.length) {
      toast.warn(
        "Posts cannot contain both a YouTube URL and an Image. Delete one before continuing.",
        toastOptions
      );
      return;
    }

    const data = {
      content,
      author: user?.user?._id,
      image: uploadedImage[0]?.public_id || null,
    };
    console.log(data);

    fetch(`${server}/statusUpdateForm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // router.push(`${client}/`);
        let submittedPost = data.post_list[data.post_list.length - 1];
        submittedPost.author = user?.user;
        toast.success("Post successfully created.", toastOptions);
        setContent("");
        setUploadedImage(null);
        setShowChooseFile(false);
        handleSubmittedPost(submittedPost);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
      });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Stack>
        <Stack direction="row">
          <Avatar
            src={
              regex2.test(user?.user?.profilePicture)
                ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/v1652941781/${user?.user?.profilePicture}.jpg`
                : user?.user?.profilePicture || ""
            }
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
                  sx={{
                    mx: 1,
                    height: "100%",
                    alignSelf: "center",
                    py: 2,
                    px: 0,
                  }}
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
                    key={image.asset_id}
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                    publicId={image.public_id}
                    height="150"
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
