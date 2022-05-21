import React, { useEffect, useContext } from "react";
import Search from "../components/Search";
import Container from "@mui/material/Container";
import { server } from "../../config/config";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { toastOptions } from "../config/config";
import Unauthorized from "../components/Unauthorized";
import { UserContext } from "./_app";

function search({ data }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

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
    <Container>
      {user ? <Search data={data}></Search> : <Unauthorized />}
    </Container>
  );
}

export default search;

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/search`);
  const data = await res.json();
  return {
    props: { data: data },
  };
}
