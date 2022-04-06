import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../pages/_app";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import SendIcon from "@mui/icons-material/Send";
import Comment from "./Comment";
import LikeCounter from "./LikeCounter";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { avatar_MD, bgc } from "../config/config";
import { server, client } from "../../config/config";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { format, formatDistance, subDays } from "date-fns";
import Link from "next/link";

function Post({ postID, content, likes, comments, author, date }) {
  const { user } = useContext(UserContext);
  const [commentContent, setCommentContent] = useState("");
  const [commentData, setCommentData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log(comments);
    setCommentData(comments);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      content: commentContent,
      author: user?.user?._id,
      post: postID,
    };
    console.log(data);

    fetch(`${server}/postCommentForm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        router.push(`${client}/`);
        // router.reload()
        toast.success("Post successfully created.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCommentContent("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Stack>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Link href={`${client}/profile/${author._id}`}>
            <Avatar
              src={author?.profilePicture || ""}
              sx={{
                height: avatar_MD,
                width: avatar_MD,
                mr: 1,
              }}
            ></Avatar>
          </Link>
          <Stack>
            <Typography variant="h6" component="h6">
              <Link href={`${client}/profile/${author._id}`}>
                <a>
                  {author?.firstName} {author?.lastName}
                </a>
              </Link>
            </Typography>
            <Typography
              variant="body2"
              component="p"
              title={format(new Date(date), "PPpp")}
            >
              {formatDistance(subDays(new Date(date), 3), new Date(date), {
                addSuffix: true,
              })}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="body1" component="p">
          {content}
        </Typography>
        <Stack direction="row" sx={{ justifyContent: "start", mt: 2 }}>
          <LikeCounter style={{ alignSelf: "center" }} />
          <Button variant="contained" sx={{ mx: 1 }}>
            <ThumbUpOffAltIcon></ThumbUpOffAltIcon> Like
          </Button>
        </Stack>
        <Box sx={{ my: 2 }}>
          <Stack direction="row">
            <Avatar
              src={user?.user?.profilePicture || ""}
              sx={{
                alignSelf: "center",
                mr: 2,
                height: avatar_MD,
                width: avatar_MD,
              }}
            ></Avatar>
            <form
              action="/postCommentForm"
              method="POST"
              style={{ width: "100%" }}
              onSubmit={handleSubmit}
            >
              <Stack direction="row">
                <TextField
                  fullWidth
                  id="new-comment"
                  name="postCommentForm"
                  variant="outlined"
                  placeholder="Write a comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mx: 1, height: "100%", alignSelf: "center" }}
                >
                  <SendIcon></SendIcon>
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
        <Accordion sx={{ backgroundColor: bgc }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Comments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {commentData.map((item) => (
              <Comment
                key={item._id}
                author={item.author}
                content={item.content}
                date={item.date}
                likes={item.likes}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Paper>
  );
}

export default Post;
