import { useState } from "react";

//background color
export const bgc = "#f1f2f6";

export const avatar_SM = 35;

export const avatar_MD = 50;

export const avatar_LG = 100;

export const avatar_XL = 150;

export const toastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const htmlDecode = (input) => {
  let doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

export const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
};
