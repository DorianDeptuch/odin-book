import React, { useState, useEffect, useCallback } from "react";
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
import { toastOptions } from "../config/config";
import { useDropzone } from "react-dropzone";
import styles from "../styles/StatusUpdate.module.css";
import { Image } from "cloudinary-react";

const dropZoneStyles = {
  border: "3px #1976d3 dashed",
  height: "150px",
  my: 2,
  position: "relative",
  width: "100%",
};

const typographyStyles = {
  color: "#999",
  textAlign: "center",
  margin: "auto",
};

function SettingsProfilePicForm({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [showChooseFile, setShowChooseFile] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [uploadedImage, setUploadedImage] = useState([]);

  useEffect(() => {
    console.log(data);
    const { user } = data;
    setProfilePicture(user?.profilePicture);
  }, []);

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
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
    setShowChooseFile(false);
    //TODO: Delete image from cloudinary
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    const data = {
      profilePicture: uploadedImage[0].public_id || profilePicture,
      currentUser: user?.user?._id,
    };

    fetch(`${server}/settings/settingsProfilePicForm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        toast.success("Settings updated.", toastOptions);
        setProfilePicture("");
        setExpanded(false);
        setUploadedImage(null);
        setShowChooseFile(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
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
            {showChooseFile && (
              <>
                {uploadedImage?.length ? (
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
            <Stack direction="row">
              {uploadedImage?.length ? (
                <>
                  {uploadedImage.map((image) => (
                    <Image
                      key={image.asset_id}
                      cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                      publicId={image.public_id}
                      height="150"
                      crop="scale"
                      style={{ margin: "0 auto" }}
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
                    <Button sx={{ mr: 10 }} onClick={handleChooseFile}>
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
            </Stack>
            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
              Submit
            </Button>
          </Stack>
        </form>
      </AccordionDetails>
    </Accordion>
  );
}

export default SettingsProfilePicForm;

async function getSignature() {
  const response = await fetch(`${server}/uploadImage`);
  const data = await response.json();
  const { signature, timestamp } = data;
  return { signature, timestamp };
}
