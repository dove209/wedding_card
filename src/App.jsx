import { Suspense } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import LookBook from "./components/LookBook";

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lookbook" element={<LookBook />} />
      </Routes>
    </Suspense>
  );
}

export default App;
