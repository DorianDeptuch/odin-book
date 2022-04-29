import React, { useState, useEffect, useContext } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { toast } from "react-toastify";
import { toastOptions } from "../config/config";
import { UserContext } from "../pages/_app";
import { server, client } from "../../config/config";
import { useRouter } from "next/router";

function IndexLikeCounter({ postID, likes, author, likers }) {
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [disabledTrigger, setDisabledTrigger] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLiked(likers?.includes(user?.user?._id) ? true : false);
  }, [user]);

  const handleDisableLike = () => {
    setDisabledTrigger(true);
    let timer1 = setTimeout(() => {
      setDisabledTrigger(false);
    }, 60000);

    return () => {
      clearTimeout(timer1);
    };
  };

  const handleLikePost = (e) => {
    e.preventDefault();

    const data = {
      postID,
      sender: user?.user?._id,
      recipient: author._id,
    };

    fetch(`${server}/profile/${author?._id}/likePost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        handleDisableLike();
        setLiked(true);
        setLikeCount((prev) => prev + 1);
        // router.push(`${client}/profile/${profile?._id}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
      });
  };

  const handleUnlikePost = (e) => {
    e.preventDefault();

    const data = {
      postID,
      sender: user?.user?._id,
      recipient: author._id,
    };

    fetch(`${server}/profile/${author?._id}/unlikePost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        handleDisableLike();
        setLiked(false);
        setLikeCount((prev) => prev - 1);
        // router.push(`${client}/profile/${profile?._id}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
      });
  };

  return (
    <Stack direction="row">
      <Typography variant="subtitle1" component="p">
        {likes === 1 && <strong>{likeCount} like</strong>}
        {likes !== 1 && <strong>{likeCount} likes</strong>}
      </Typography>
      {!liked && (
        <form action="/likePost" method="POST" onSubmit={handleLikePost}>
          <Button
            type="submit"
            disabled={disabledTrigger}
            variant="contained"
            sx={{ mx: 1 }}
          >
            <ThumbUpOffAltIcon></ThumbUpOffAltIcon>&nbsp;Like
          </Button>
        </form>
      )}
      {liked && (
        <form action="/unlikePost" method="POST" onSubmit={handleUnlikePost}>
          <Button
            type="submit"
            disabled={disabledTrigger}
            variant="contained"
            sx={{ mx: 1 }}
          >
            <ThumbUpIcon></ThumbUpIcon>&nbsp;Liked
          </Button>
        </form>
      )}
    </Stack>
  );
}

export default IndexLikeCounter;
