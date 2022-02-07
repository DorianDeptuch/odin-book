import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SignupModal from "../components/SignupModal";
import Modal from "@mui/material/Modal";

import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const styles = {
  p: 2,
  m: 2,
};

const centerAlign = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  my: 6,
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

function login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container sx={centerAlign}>
      <Stack direction="row" sx={centerAlign}>
        <Stack sx={{ width: "40%", marginRight: "4rem" }}>
          <Typography
            variant="h3"
            color="primary.main"
            sx={{ fontWeight: "bold" }}
          >
            OdinBook
          </Typography>
          <Typography variant="h5">
            Connect with friends and the world <wbr />
            around you on OdinBook.
          </Typography>
        </Stack>
        <Paper elevation={5} sx={{ ...styles, width: "40%" }}>
          <Stack spacing={2}>
            <Typography>
              Log in to <span color="primary.main">OdinBook</span>
            </Typography>
            <form action="/loginForm" method="POST" noValidate>
              <Stack spacing={2}>
                <TextField label="Email" name="email" variant="outlined" />
                <TextField
                  label="Password"
                  name="password"
                  variant="outlined"
                />
                <Button type="submit" variant="contained">
                  Log In
                </Button>
              </Stack>
            </form>
            <Button
              sx={{ mb: 2 }}
              onClick={handleOpen}
              variant="contained"
              color="success"
            >
              Create an account
            </Button>
          </Stack>
        </Paper>
      </Stack>
      <Modal
        sx={centerAlign}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <SignupModal />
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
}

export default login;
