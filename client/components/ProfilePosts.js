import React, { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../pages/profile/[id]";
import { UserContext } from "../pages/_app";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Biography from "./Biography";
import StatusUpdate from "./StatusUpdate";
import Post from "./Post";
import FriendsList from "./FriendsList";
import Loader from "./Loader";

const mobileStyles = {
  display: ["none", "block", "block"],
};

function ProfilePosts({ id }) {
  const { user } = useContext(UserContext);
  const currentProfile = useContext(ProfileContext);
  const [profilePosts, setProfilePosts] = useState([]);
  const ownProfile = user?.user?._id === id ? true : false;
  const [hasPosts, setHasPosts] = useState(false);
  const [postCreated, setPostCreated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(currentProfile);
    const { results } = currentProfile;
    const { posts } = results;

    setProfilePosts(posts);
    // console.log(posts);
    setHasPosts(results.posts.length ? true : false);
    setLoading(false);
  }, [currentProfile, postCreated]);

  return (
    <Box sx={{ mx: [0, -3], ml: [-5], mr: [-3] }}>
      <Stack direction="row">
        <Stack sx={{ width: ["0%", "40%"], mr: 2, display: ["none", "block"] }}>
          <Biography id={id} sx={{ ...mobileStyles }} />
          <FriendsList sx={{ my: 2, ...mobileStyles }} />
        </Stack>
        <Stack sx={{ width: ["100%", "60%", "60%"], ml: 2 }}>
          {ownProfile && <StatusUpdate setPostCreated={setPostCreated} />}
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" component="h6">
              Posts
            </Typography>
          </Paper>
          {loading && <Loader />}
          {profilePosts.map((item) => (
            <Post
              key={item._id}
              postID={item._id}
              content={item.content}
              likes={item.likes}
              image={item.image}
              comments={item.comments}
              author={item.author}
              date={item.date}
              setPostCreated={setPostCreated}
            />
          ))}
          {!hasPosts && !loading && (
            <Typography
              variant="h6"
              component="h6"
              textAlign="center"
              sx={{ my: 2, color: "#999" }}
            >
              {currentProfile.results.firstName} hasn't made any posts yet.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default ProfilePosts;
