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
import LikeCounter from "./LikeCounter";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { avatar_MD, bgc, htmlDecode } from "../config/config";
import { server, client } from "../../config/config";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { format, formatDistance, subDays } from "date-fns";
import Link from "next/link";
import { toastOptions } from "../config/config";
import { Image } from "cloudinary-react";
import YouTube from "react-youtube";

function Post({ postID, content, likes, comments, author, image, date }) {
  const { user } = useContext(UserContext);
  const [commentContent, setCommentContent] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [hasComments, setHasComments] = useState(false);
  const [commentLength, setCommentLength] = useState(comments?.length || 0);
  const [hideCommentLength, setHideCommentLength] = useState(false);
  const [hasYoutubeLink, setHasYoutubeLink] = useState(false);
  const [youtubeURL, setYoutubeURL] = useState("");
  const [parent, setParent] = useState("Post");
  const regex =
    /(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*(?:[&\/\#].*)?/;
  const router = useRouter();

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const onPlayerReady = (e) => {
    e.target.pauseVideo();
  };

  useEffect(() => {
    setCommentData(comments);
    setHasComments(comments.length ? true : false);
    setHasYoutubeLink(regex.test(htmlDecode(content)));
    setYoutubeURL(htmlDecode(content)?.match(regex) || "");
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
      .then((res) => res.json())
      .then((data) => {
        let submittedComment = data.comment_list[data.comment_list.length - 1];
        submittedComment.author = user?.user;
        toast.success("Comment successfully created.", toastOptions);
        setCommentContent("");
        setCommentData((prev) => [submittedComment, ...prev]);
        setHasComments(true);
        setCommentLength((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}`, toastOptions);
      });
  };

  return (
    <Paper elevation={3} sx={{ pt: 2, mt: 2 }} id={postID}>
      <Stack>
        <Stack direction="row" sx={{ mb: 2, px: 2 }}>
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
              {formatDistance(new Date(date), new Date(), {
                addSuffix: true,
              })}
            </Typography>
          </Stack>
        </Stack>
        {image && (
          <Image
            cloudName={`${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}`}
            publicId={`${image}`}
            crop="scale"
            style={{ width: "100%" }}
          />
        )}
        {hasYoutubeLink && (
          <YouTube
            videoId={youtubeURL[1]}
            opts={opts}
            onReady={onPlayerReady}
            style={{ width: "100%" }}
          />
        )}
        <Typography variant="body1" component="p" sx={{ my: 2, px: 2 }}>
          {htmlDecode(content)}
        </Typography>
        <Stack direction="row" sx={{ justifyContent: "start", mt: 2, px: 2 }}>
          <LikeCounter
            style={{ alignSelf: "center" }}
            postID={postID}
            likes={likes}
          />
        </Stack>
        <Box sx={{ my: 2, px: 2 }}>
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
                  sx={{
                    mx: 1,
                    height: "100%",
                    alignSelf: "center",
                    py: 2,
                    px: 0,
                  }}
                >
                  <SendIcon></SendIcon>
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
        <Accordion sx={{ backgroundColor: bgc, px: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => setHideCommentLength(!hideCommentLength)}
          >
            <Typography>Comments &nbsp;</Typography>
            {!hideCommentLength && <Typography> ({commentLength})</Typography>}
          </AccordionSummary>
          <AccordionDetails>
            {commentData.map((item) => (
              <Comment
                key={item._id}
                parent={parent}
                setCommentData={setCommentData}
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

export default Post;
