import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { server } from "../../config/config";
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

const schema = Yup.object().shape({
  email: Yup.string().email().required("Please enter an Email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Please enter a Password"),
});

function login() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log(data);
    console.log("you're logged in!");

    fetch(`${server}/loginForm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
        // router.push("/");
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

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
            <form
              action="/loginForm"
              method="POST"
              onSubmit={handleSubmit(submitForm)}
            >
              <Stack spacing={2}>
                <TextField
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  label="Email"
                  name="email"
                  variant="outlined"
                  {...register("email")}
                />
                <TextField
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  {...register("password")}
                />
                <Button type="submit" variant="contained">
                  Log In
                </Button>
              </Stack>
            </form>
            <Button
              type="submit"
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
            <SignupModal handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
}

export default login;
