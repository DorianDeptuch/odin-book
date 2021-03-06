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

const mobileStyles = {
  mx: 2,
  alignSelf: "center",
};

function Footer() {
  return (
    <Box sx={{ mt: [0, 20, 20] }}>
      <Box
        sx={{
          bgcolor: grey[300],
          p: 2,
          mt: 5,
          display: ["none", "block"],
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
      <Box
        sx={{
          bgcolor: grey[300],
          p: 2,
          mt: 5,
          display: ["block", "none"],
        }}
      >
        <Stack>
          <Stack direction="row" sx={mobileStyles}>
            <a href="https://github.com/DorianDeptuch">
              <GitHubIcon sx={mobileStyles}></GitHubIcon>
            </a>
            <a href="https://www.linkedin.com/in/doriandeptuch/">
              <LinkedInIcon sx={mobileStyles}></LinkedInIcon>
            </a>
            <a href="mailto:dorian.deptuch@gmail.com">
              <EmailIcon sx={mobileStyles}></EmailIcon>
            </a>
          </Stack>
          <Typography variant="body1" component="p" sx={mobileStyles}>
            Made by <strong>Dorian Deptuch</strong>
          </Typography>
          <Typography variant="body1" component="p" sx={mobileStyles}>
            Copyright &copy; 2022
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default Footer;
