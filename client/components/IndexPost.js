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
import SendIcon from "@mui/icons-material/Send";
import Comment from "./Comment";
import IndexLikeCounter from "./IndexLikeCounter";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { avatar_MD, bgc, htmlDecode } from "../config/config";
import { server, client } from "../../config/config";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { format, formatDistance, subDays, parseISO } from "date-fns";
import Link from "next/link";
import { toastOptions } from "../config/config";

function IndexPost({
  postID,
  content,
  likes,
  comments,
  author,
  date,
  setPostCreated,
}) {
  const { user } = useContext(UserContext);
  const [commentContent, setCommentContent] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [hasComments, setHasComments] = useState(false);
  const [hideCommentLength, setHideCommentLength] = useState(false);
  const router = useRouter();
  const [postDate, setPostDate] = useState(new Date(date));

  useEffect(() => {
    // console.log("postID: ", postID);
    // console.log("content: ", content);
    // console.log("likes: ", likes);
    // console.log("comments: ", comments);
    // console.log("author: ", author);
    console.log("date: ", date);
    console.log("date: ", typeof date);
    setTimeout(() => console.log(typeof postDate), 500);
    // console.log("setPostCreated: ", setPostCreated);
    setCommentData(comments);
    setHasComments(comments?.length ? true : false);
    console.log(date);
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
        setPostCreated(true);
        toast.success("Comment successfully created.", toastOptions);
        setCommentContent("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
      });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }} id={postID}>
      <Stack>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Link href={`${client}/profile/${author?._id}`}>
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
              <Link href={`${client}/profile/${author?._id}`}>
                <a>
                  {author?.firstName} {author?.lastName}
                </a>
              </Link>
            </Typography>
            <Typography
              variant="body2"
              component="p"
              // title={format(new Date(date), "PPpp")}
            >
              {/* {formatDistance(new Date(date), new Date(), {
                addSuffix: true,
              })} */}
              {postDate.toLocaleTimeString("en-US")}
              {" on "}
              {(postDate.getMonth() > 8
                ? postDate.getMonth() + 1
                : "0" + (postDate.getMonth() + 1)) +
                "/" +
                (postDate.getDate() > 9
                  ? postDate.getDate()
                  : "0" + postDate.getDate()) +
                "/" +
                postDate.getFullYear()}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="body1" component="p" sx={{ my: 2 }}>
          {htmlDecode(content)}
        </Typography>
        <Stack direction="row" sx={{ justifyContent: "start", mt: 2 }}>
          <IndexLikeCounter
            style={{ alignSelf: "center" }}
            postID={postID}
            likes={likes}
            author={author}
          />
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
            onClick={() => setHideCommentLength(!hideCommentLength)}
          >
            <Typography>Comments &nbsp;</Typography>
            {!hideCommentLength && (
              <Typography> ({comments?.length})</Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            {commentData?.map((item) => (
              <Comment
                key={item._id}
                author={item.author}
                content={item.content}
                date={item.date}
                likes={item.likes}
              />
            ))}
            {!hasComments && (
              <Typography
                variant="h6"
                component="h6"
                textAlign="center"
                sx={{ my: 2, color: "#999" }}
              >
                This post doesn't have any comments.
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Paper>
  );
}

export default IndexPost;
