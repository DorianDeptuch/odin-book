import React, { useContext, useEffect } from "react";
import { server } from "../../config/config";
import { UserContext } from "./_app";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserSidebar from "../components/UserSidebar";
import Newsfeed from "../components/Newsfeed";
import FriendSidebar from "../components/FriendSidebar";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { toastOptions } from "../config/config";
import Unauthorized from "../components/Unauthorized";

const mobileStyles = {
  display: ["none", "none", "block"],
};

export default function Home({ data }) {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!data.user) {
      router.push("/login");
      toast.warn(
        "You must to be logged in to view this resource",
        toastOptions
      );
      return;
    }
    setUser(data);
  }, []);

  return (
    <Container sx={{ mt: 2 }}>
      {data.user ? (
        <Box>
          <Grid container>
            <Grid item md={3}>
              <UserSidebar sx={mobileStyles} />
            </Grid>
            <Grid item md={6}>
              <Newsfeed />
            </Grid>
            <Grid item md={3}>
              <FriendSidebar sx={mobileStyles} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Unauthorized />
      )}
    </Container>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/`);
  const data = (await res.json()) || null;
  return {
    props: { data: data },
  };
}
