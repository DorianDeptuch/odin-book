import React, { useState, useEffect, useContext } from "react";
import StatusUpdate from "./StatusUpdate";
import Post from "./Post";
import Box from "@mui/material/Box";
import { UserContext } from "../pages/_app";

function Newsfeed() {
  const { user } = useContext(UserContext);
  const [indexPosts, setIndexPosts] = useState([]);
  const [hasPosts, setHasPosts] = useState(false);

  useEffect(async () => {
    const arrayOfFriendsPosts = [];
    await user?.user?.friends.forEach((friend) => {
      friend.posts.forEach((post) => arrayOfFriendsPosts.push(post));
    });
    await arrayOfFriendsPosts.push(user?.user?.posts);
    await arrayOfFriendsPosts.flat(2);
    // await setIndexPosts(
    // arrayOfFriendsPosts.sort((a, z) => (a.createdAt > z.createdAt ? 1 : -1));
    // );
    await setIndexPosts((prev) => [
      ...prev,
      arrayOfFriendsPosts.sort((a, z) => (a.createdAt > z.createdAt ? 1 : -1)),
    ]);
    await console.log(indexPosts);
    await console.log(arrayOfFriendsPosts);
    // setHasPosts(results.posts.length ? true : false)
  }, [user, user?.user?.friends]);

  return (
    <Box sx={{ m: 2 }}>
      <StatusUpdate />
      {}
    </Box>
  );
}

export default Newsfeed;
