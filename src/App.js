import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./page/Top";
import Search from "./page/Search";
import Watch from "./page/Watch";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Top />}></Route>
          <Route path={`/search/`} element={<Search />}></Route>
          <Route path={`/watch/`} element={<Watch />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
