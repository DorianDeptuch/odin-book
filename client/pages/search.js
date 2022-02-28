import React from "react";
import Search from "../components/Search";
import Container from "@mui/material/Container";
import { server } from "../../config/config";

function search({ data }) {
  return (
    <Container>
      <Search data={data}></Search>
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
