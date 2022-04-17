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

function ProfilePosts({ id }) {
  const { user } = useContext(UserContext);
  const currentProfile = useContext(ProfileContext);
  const [profilePosts, setProfilePosts] = useState([]);
  const ownProfile = user?.user?._id === id ? true : false;
  const [hasPosts, setHasPosts] = useState(false);

  useEffect(() => {
    // console.log(currentProfile);
    const { results } = currentProfile;
    const { posts } = results;
    setProfilePosts(posts);
    // console.log(posts);
    setHasPosts(results.posts.length ? true : false);
  }, [currentProfile]);

  return (
    <Box sx={{ mx: -3 }}>
      <Stack direction="row">
        <Stack sx={{ width: "40%", mr: 2 }}>
          <Biography id={id} />
          <FriendsList sx={{ my: 2 }} />
        </Stack>
        <Stack sx={{ width: "60%", ml: 2 }}>
          {ownProfile && <StatusUpdate />}
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" component="h6">
              Posts
            </Typography>
          </Paper>
          {profilePosts.map((item) => (
            <Post
              key={item._id}
              postID={item._id}
              content={item.content}
              likes={item.likes}
              comments={item.comments}
              author={item.author}
              date={item.date}
            />
          ))}
          {!hasPosts && (
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
