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
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Comment from "./Comment";
import LikeCounter from "./LikeCounter";

function Post() {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Stack>
        <Stack direction="row">
          <Box
            sx={{
              backgroundColor: "green",
              borderRadius: "50%",
              height: "35px",
              width: "35px",
              mr: 1,
            }}
          ></Box>
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
        <LikeCounter />
        <Stack direction="row" sx={{ justifyContent: "center" }}>
          <Button variant="contained" sx={{ mx: 1 }}>
            <ThumbUpOffAltIcon></ThumbUpOffAltIcon> Like
          </Button>
          <Button variant="contained" sx={{ mx: 1 }}>
            <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon> Comment
          </Button>
        </Stack>
        <Accordion>
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
