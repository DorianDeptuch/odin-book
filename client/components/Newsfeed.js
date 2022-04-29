import React, { useState, useEffect, useContext } from "react";
import StatusUpdate from "./StatusUpdate";
import IndexPost from "./IndexPost";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UserContext } from "../pages/_app";

function Newsfeed() {
  const { user } = useContext(UserContext);
  const [indexPosts, setIndexPosts] = useState([]);
  const [postCreated, setPostCreated] = useState(false);

  useEffect(async () => {
    const arrayOfFriendsPosts = [];
    await user?.user?.friends.forEach((friend) => {
      friend.posts.forEach((post) => arrayOfFriendsPosts.push(post));
    });
    await user?.user?.posts.forEach((post) => arrayOfFriendsPosts.push(post));
    await setIndexPosts((prev) => [
      ...prev,
      arrayOfFriendsPosts.sort((a, z) => (a.createdAt > z.createdAt ? -1 : 1)),
    ]);
    await setIndexPosts((prev) => prev.flat());
  }, [user, user?.user?.friends, postCreated]);

  return (
    <Box sx={{ m: 2 }}>
      <StatusUpdate setPostCreated={setPostCreated} />
      {indexPosts &&
        indexPosts.map((item) => (
          <IndexPost
            key={item._id}
            postID={item._id}
            content={item.content}
            likes={item.likes}
            likers={item.likers}
            comments={item.comments}
            author={item.author}
            date={item.date}
            image={item.image || null}
            postCreated={postCreated}
          />
        ))}
      {!indexPosts.length && (
        <Typography
          variant="h6"
          component="h6"
          textAlign="center"
          sx={{ my: 2, color: "#999" }}
        >
          There are no Posts to display.
        </Typography>
      )}
    </Box>
  );
}

export default Newsfeed;
