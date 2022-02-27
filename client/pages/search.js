import React from "react";
import Search from "../components/Search";
import Container from "@mui/material/Container";

function search({ data }) {
  return (
    <Container>
      <Search data={data}></Search>
    </Container>
  );
}

export default search;

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3001/search");
  const data = await res.json();
  console.log(data);
  return {
    props: { data: data },
  };
}
