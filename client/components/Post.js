import React from "react";
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

function Post() {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Stack>
        <Stack direction="row" sx={{ mb: 2 }}>
          <Avatar
            sx={{
              height: avatar_MD,
              width: avatar_MD,
              mr: 1,
            }}
          ></Avatar>
          <Stack>
            <Typography variant="h6" component="h6">
              John Smith
            </Typography>
            <Typography variant="body2" component="p">
              5h ago
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="body1" component="p">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi a est
          atque, aliquam vel sunt velit repellat beatae omnis dicta harum
          voluptatibus illo nemo expedita recusandae ullam quaerat labore! Natus
          eos doloribus non, aliquam hic culpa nostrum maxime quos dolorem.
          Magnam maxime, deserunt quos perspiciatis iusto distinctio, libero
          explicabo ut pariatur a at laborum fugiat odit. Expedita porro et
          repudiandae recusandae. Ipsam voluptas, illum dicta animi distinctio
          doloremque saepe ex iusto obcaecati quae quidem aliquam labore
          reprehenderit nulla magni ducimus est autem excepturi aut unde sint,
          dignissimos praesentium. Optio, eveniet! Nam, rem ipsam ratione iusto
          placeat doloribus non distinctio quia.
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
            >
              <Stack direction="row">
                <TextField
                  fullWidth
                  id="new-comment"
                  name="postCommentForm"
                  variant="outlined"
                  placeholder="Write a comment..."
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
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Paper>
  );
}

export default Post;
