import React from "react";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";

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
        <a href="https://github.com/DorianDeptuch" styles={styles}>
          <GitHubIcon></GitHubIcon>
        </a>
        <Typography variant="body1" component="p" sx={styles}>
          Copyright &copy; 2022
        </Typography>
      </Stack>
    </Box>
  );
}

export default Footer;
