import React, { useEffect, useState, useRef } from "react";
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
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { toastOptions } from "../config/config";

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

const mobileStyles = {
  flexDirection: ["column", "row"],
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
  const [exampleUserEmail, setExampleUserEmail] = useState(
    process.env.NEXT_PUBLIC_TEST_USER_EMAIL
  );
  const [exampleUserPassword, setExampleUserPassword] = useState(
    process.env.NEXT_PUBLIC_TEST_USER_PASSWORD
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    fetch(`${server}/loginForm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          router.push("/");
        } else {
          toast.error("Invalid Credentials.", toastOptions);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleExampleUser = (e) => {
    e.preventDefault();

    const data = {
      email: exampleUserEmail,
      password: exampleUserPassword,
    };

    fetch(`${server}/loginExampleUser`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container sx={centerAlign}>
      <Stack direction="row" sx={(centerAlign, mobileStyles)}>
        <Stack
          sx={{
            width: ["100%", "40%"],
            marginRight: [0, "4rem"],
            my: [0, "auto"],
          }}
        >
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
        <Paper
          elevation={5}
          sx={{ ...styles, width: ["100%", "40%"], alignSelf: "center" }}
        >
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
            <form
              action="/exampleUser"
              method="POST"
              onSubmit={handleExampleUser}
              style={{ width: "100%" }}
            >
              <TextField
                label="EmailExampleUser"
                name="emailExampleUser"
                sx={{ display: "none" }}
                value={exampleUserEmail}
              />
              <TextField
                label="PasswordExampleUser"
                name="passwordExampleUser"
                type="password"
                value={exampleUserPassword}
                sx={{ display: "none" }}
              />
              <Button type="submit" variant="contained" sx={{ width: "100%" }}>
                Log In as Example User
              </Button>
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
        sx={{ ...centerAlign, width: ["100%", "100%"] }}
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
          <Box sx={{ ...modalStyle, width: ["90%", "80%"] }}>
            <SignupModal handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
}

export default login;
