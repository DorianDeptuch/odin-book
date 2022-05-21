import React, { useEffect, useContext } from "react";
import Container from "@mui/material/Container";
import ProfileHeader from "../../components/ProfileHeader";
import { server } from "../../../config/config";
import { UserContext } from "../_app";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { toastOptions } from "../../config/config";
import Unauthorized from "../../components/Unauthorized";

export const ProfileContext = React.createContext();

function profileDetail({ data, id }) {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      toast.warn(
        "You must to be logged in to view this resource",
        toastOptions
      );
      return;
    }
  }, []);

  return (
    <Container sx={{ mt: 2 }}>
      {user ? (
        <ProfileContext.Provider value={data}>
          <ProfileHeader id={id} />
        </ProfileContext.Provider>
      ) : (
        <Unauthorized />
      )}
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
    props: { data: data, id: id },
  };
}
