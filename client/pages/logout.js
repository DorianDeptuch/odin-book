import React, { useEffect, useContext } from "react";
import { UserContext } from "./_app";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { server } from "../../config/config";
import { toast } from "react-toastify";

function logout({ data }) {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
      displayLogoutSuccess();
      setUser(null);
    }, 500);
  }, []);

  const displayLogoutSuccess = () => {
    try {
      toast.success("You have successfully logged out.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
      toast.error(`${err.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Container>
      <Box sx={{ height: "100vh" }}>
        <Typography variant="h6" component="h6">
          Logging out...
        </Typography>
      </Box>
    </Container>
  );
}

export default logout;

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/logout`);
  const data = await res.json();
  return {
    props: { data: data },
  };
}
