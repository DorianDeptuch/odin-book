import React, { useState, useEffect, useContext } from "react";
import StatusUpdate from "./StatusUpdate";
import IndexPost from "./IndexPost";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UserContext } from "../pages/_app";

function Newsfeed() {
  const { user } = useContext(UserContext);
  const [indexPosts, setIndexPosts] = useState([]);
  const [hasPosts, setHasPosts] = useState(false);
  const [postCreated, setPostCreated] = useState(false);

  useEffect(async () => {
    const arrayOfFriendsPosts = [];
    await user?.user?.friends.forEach((friend) => {
      friend.posts.forEach((post) => arrayOfFriendsPosts.push(post));
    });
    await user?.user?.posts.forEach((post) => arrayOfFriendsPosts.push(post));
    // await arrayOfFriendsPosts.flat(2);
    await setIndexPosts((prev) => [
      ...prev,
      arrayOfFriendsPosts.sort((a, z) => (a.createdAt > z.createdAt ? -1 : 1)),
    ]);
    await setIndexPosts((prev) => prev.flat());
    // setHasPosts(results.posts.length ? true : false)
  }, [user, user?.user?.friends]);

  return (
    <Box sx={{ m: 2 }}>
      <StatusUpdate />
      {indexPosts &&
        indexPosts.map((item) => (
          <IndexPost
            key={item._id}
            postID={item._id}
            content={item.content}
            likes={item.likes}
            comments={item.comments}
            author={item.author}
            date={item.date}
            setPostCreated={setPostCreated}
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
