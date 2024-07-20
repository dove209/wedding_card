import { Route, Routes, Link } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./components/Home";
import LookBook from "./components/LookBook";


function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lookbook" element={<LookBook />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
