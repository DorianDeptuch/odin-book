import React, { useState, useEffect, useContext, useCallback } from "react";
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

function ProfilePhotos() {
  const [open, setOpen] = useState(null);
  const currentProfile = useContext(ProfileContext);
  // const [profile, setProfile] = useState({});
  const [postsWithImages, setPostsWithImages] = useState([]);

  useEffect(() => {
    const { results } = currentProfile;
    // setProfile(results);

    setPostsWithImages(
      results.posts.filter((item) =>
        item.image !== undefined && item.image !== null ? item : null
      )
    );
    // console.log(postsWithImages);
    results.posts.filter((item) => console.log(item.image));
  }, []);
  const handleOpen = useCallback((index) => setOpen(index));
  const handleClose = () => setOpen(null);

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
              postsWithImages.map((item, index) => (
                <ProfilePhotosModal
                  key={item._id}
                  index={index}
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                  publicId={item.image}
                  content={item.content}
                  firstName={item.author.firstName}
                  lastName={item.author.lastName}
                  open={open}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                />
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
