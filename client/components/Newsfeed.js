import React, { useState, useEffect, useContext } from "react";
import StatusUpdate from "./StatusUpdate";
import Post from "./Post";
import Box from "@mui/material/Box";
import { UserContext } from "../pages/_app";

function Newsfeed() {
  const { user } = useContext(UserContext);
  const [indexPosts, setIndexPosts] = useState([]);
  const [hasPosts, setHasPosts] = useState(false);

  useEffect(() => {
    const arrayOfFriendsPosts = [];
    user?.user?.friends.forEach((friend) => {
      arrayOfFriendsPosts.push(friend.posts);
    });
    setIndexPosts(arrayOfFriendsPosts.flat().sort());
    // setIndexPosts(prev => [...prev, user?.user?.friends.forEach(friend => {
    //   friend.posts
    // })])
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
