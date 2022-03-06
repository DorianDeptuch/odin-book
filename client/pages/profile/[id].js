import React from "react";
import Container from "@mui/material/Container";
import ProfileHeader from "../../components/ProfileHeader";
import { server } from "../../../config/config";

export const ProfileContext = React.createContext();

function profileDetail({ data }) {
  return (
    <Container sx={{ mt: 2 }}>
      <ProfileContext.Provider value={data}>
        <ProfileHeader />
      </ProfileContext.Provider>
    </Container>
  );
}

export default profileDetail;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const res = await fetch(`${server}/profile/${id}`);
  const data = await res.json();
  return {
    props: { data: data },
  };
}
