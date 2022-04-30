import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Image } from "cloudinary-react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import styles from "../styles/ProfilePhotosModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  visibility: "visible !important",
  opacity: "1 !important",
};

function ProfilePhotosModal({
  index,
  cloudName,
  publicId,
  content,
  firstName,
  lastName,
  open,
  handleOpen,
  handleClose,
  setOpen,
}) {
  const [closed, setClosed] = useState(false);

  const handleModalClose = () => {
    handleClose();
    // setClosed(true);
    handleOpen(null);
  };

  return (
    <ImageListItem onClick={() => handleOpen(index)} cols={1}>
      <img
        src={`https://res.cloudinary.com/${cloudName}/image/upload/v1651189593/${publicId}?w=248&fit=crop&auto=format`}
        srcSet={`https://res.cloudinary.com/${cloudName}/image/upload/v1651189593/${publicId}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={content}
        loading="lazy"
      />

      <Modal
        open={open === index}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={closed ? styles.modal_closed : ""}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stack>
              <Image
                cloudName={cloudName}
                publicId={publicId}
                crop="scale"
                style={{ width: "100%" }}
              />
              <Typography variant="body1" component="p" sx={{ p: 2 }}>
                {content}
              </Typography>
              <Button
                onClick={handleModalClose}
                variant="contained"
                color="error"
                sx={{ mx: "auto", my: 2 }}
              >
                Close
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
      <ImageListItemBar
        title={content}
        subtitle={`${firstName} ${lastName}`}
        actionIcon={
          <IconButton
            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
            aria-label={`info about ${content}`}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </ImageListItem>
  );
}

export default ProfilePhotosModal;
