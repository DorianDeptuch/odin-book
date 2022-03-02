import React from "react";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const styles = {
  mx: 2,
};

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: grey[300],
        p: 2,
        mt: 5,
      }}
    >
      <Stack direction="row">
        <Typography variant="body1" component="p" sx={styles}>
          Made by <strong>Dorian Deptuch</strong>
        </Typography>
        <a href="https://github.com/DorianDeptuch">
          <GitHubIcon sx={styles}></GitHubIcon>
        </a>
        <a href="https://www.linkedin.com/in/doriandeptuch/">
          <LinkedInIcon sx={styles}></LinkedInIcon>
        </a>
        <a href="mailto:dorian.deptuch@gmail.com">
          <EmailIcon sx={styles}></EmailIcon>
        </a>
        <Typography variant="body1" component="p" sx={styles}>
          Copyright &copy; 2022
        </Typography>
      </Stack>
    </Box>
  );
}

export default Footer;
