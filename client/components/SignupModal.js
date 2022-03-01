import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { server } from "../../config/config";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

const schema = Yup.object().shape({
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your last name"),
  newEmail: Yup.string().email().required("Please enter an Email"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Please enter a Password"),
  confirmPassword: Yup.string().oneOf([Yup.ref("newPassword"), null]),
});

export default function SignupModal({ handleClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    console.log(data);

    fetch(`${server}/signupForm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper
      elevation={5}
      sx={{
        overflowY: "scroll",
        maxHeight: "96vh",
        position: "relative",
      }}
    >
      <Button
        onClick={handleClose}
        sx={{ position: "absolute", top: 0, right: 0, p: 2 }}
      >
        <CloseTwoToneIcon />
      </Button>
      <Box sx={{ borderBottom: "1px solid gray", p: 2 }}>
        <Typography
          id="transition-modal-title"
          sx={{ fontWeight: "bold" }}
          variant="h4"
          component="h2"
        >
          Sign Up
        </Typography>
        <Typography variant="body1" component="p">
          It's quick and easy.
        </Typography>
      </Box>
      <form
        action="/signupForm"
        method="POST"
        onSubmit={handleSubmit(submitForm)}
      >
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <TextField
                fullWidth
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
                name="firstName"
                id="firstName"
                label="First Name*"
                variant="outlined"
                // sx={errors.firstName ? { border: "1px solid red", borderRadius: "5px" } : {}}
                {...register("firstName")}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                fullWidth
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
                name="lastName"
                id="lastName"
                label="Last Name*"
                variant="outlined"
                {...register("lastName")}
              />
            </Grid>
            <Grid item md={12} md={6}>
              <TextField
                fullWidth
                error={Boolean(errors.newEmail)}
                helperText={errors.newEmail?.message}
                name="newEmail"
                id="newEmail"
                label="Email*"
                variant="outlined"
                {...register("newEmail")}
              />
            </Grid>
            <Grid item md={12} md={6}>
              <InputLabel>Date of Birth</InputLabel>
              <Input
                fullWidth
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                label="Date of Birth"
                variant="outlined"
                {...register("dateOfBirth")}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                fullWidth
                error={Boolean(errors.newPassword)}
                helperText={errors.newPassword?.message}
                name="newPassword"
                type="password"
                id="newPassword"
                label="Password*"
                variant="outlined"
                {...register("newPassword")}
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                fullWidth
                error={Boolean(errors.confirmPassword)}
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                label="Confirm Password*"
                variant="outlined"
                {...register("confirmPassword")}
              />
              <Typography variant="body" component="p" color="error">
                {errors.confirmPassword && "Passwords do not match!"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ p: 2 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sex</FormLabel>
            <RadioGroup
              aria-label="sex"
              defaultValue=""
              name="sex"
              {...register("sex")}
            >
              <Stack direction="row">
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ width: "40%", px: 3 }}
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
