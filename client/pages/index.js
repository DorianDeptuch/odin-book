import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserSidebar from "../components/UserSidebar";
import Newsfeed from "../components/Newsfeed";
import FriendSidebar from "../components/FriendSidebar";

export default function Home() {
  return (
    <Box maxWidth="1980px">
      <Grid container>
        <Grid item md={3}>
          <UserSidebar />
        </Grid>
        <Grid item md={6}>
          <Newsfeed />
        </Grid>
        <Grid item md={3}>
          <FriendSidebar />
        </Grid>
      </Grid>
    </Box>
  );
}
