import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

const root = createRoot(document.getElementById("root"));

root.render(
   <BrowserRouter>
      {/* <ChakraProvider> */}
         <App />
      {/* </ChakraProvider> */}
   </BrowserRouter>
);

reportWebVitals();
