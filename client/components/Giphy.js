import React, { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";
import { useAsync } from "react-async-hook";

const giphyFetch = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY);

function Giphy() {
  const [gif, setGif] = useState(null);
  useAsync(async () => {
    const { data } = await giphyFetch.gif("fpXxIjftmkk9y");
    setGif(data);
  }, []);
  return gif && <Gif gif={gif} width={200} />;
}

export default Giphy;
