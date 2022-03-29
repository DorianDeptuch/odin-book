import React, { useContext, useEffect } from "react";
import { server } from "../../config/config";
import { UserContext } from "./_app";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserSidebar from "../components/UserSidebar";
import Newsfeed from "../components/Newsfeed";
import FriendSidebar from "../components/FriendSidebar";

export const IndexContext = React.createContext();

export default function Home({ data }) {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(data);
  }, []);

  return (
    <Container sx={{ mt: 2 }}>
      {/* <IndexContext.Provider value={data}> */}
      <Box>
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
      {/* </IndexContext.Provider> */}
    </Container>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/`);
  const data = await res.json();
  return {
    props: { data: data },
  };
}
