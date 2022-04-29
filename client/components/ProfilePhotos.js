import React, { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../pages/profile/[id]";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { bgc } from "../config/config";
import Modal from "@mui/material/Modal";
import ProfilePhotosModal from "./ProfilePhotosModal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { Image } from "cloudinary-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
};

function ProfilePhotos() {
  const [open, setOpen] = useState(false);
  const currentProfile = useContext(ProfileContext);
  // const [profile, setProfile] = useState({});
  const [postsWithImages, setPostsWithImages] = useState([]);

  useEffect(() => {
    const { results } = currentProfile;
    // setProfile(results);
    setPostsWithImages(
      results.posts.filter((item) => (item?.image !== null ? item : null))
    );
    console.log(postsWithImages);
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ backgroundColor: bgc, mx: -3 }}>
      <Paper>
        <Stack>
          <Typography variant="h6" component="h6" sx={{ p: 2 }}>
            Photos
          </Typography>
          <ImageList sx={{ width: "100%" }} cols={3}>
            <ImageListItem key="Subheader" cols={3}>
              <ListSubheader component="div">
                {/* {profile.firstName}'s Photos */}
              </ListSubheader>
            </ImageListItem>
            {postsWithImages.length ? (
              postsWithImages.map((item) => (
                <ImageListItem onClick={handleOpen} key={item.image} cols={1}>
                  <img
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/v1651189593/${item.image}?w=248&fit=crop&auto=format`}
                    srcSet={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/v1651189593/${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.content}
                    loading="lazy"
                  />

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <ProfilePhotosModal
                          handleClose={handleClose}
                          content={item.content}
                          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                          publicId={item.image}
                        />
                      </Box>
                    </Fade>
                  </Modal>
                  <ImageListItemBar
                    title={item.content}
                    subtitle={`${item.author.firstName} ${item.author.lastName}`}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${item.content}`}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))
            ) : (
              <Typography
                variant="h6"
                component="h6"
                textAlign="center"
                sx={{ my: 2, color: "#999" }}
              >
                There are no photos to display.
              </Typography>
            )}
          </ImageList>
        </Stack>
      </Paper>
    </Box>
  );
}

export default ProfilePhotos;
