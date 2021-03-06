import { useState } from "react";
import logo from "./logo.svg";
import { SWRConfig } from "swr";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostScreen from "./pages/PostScreen";
import Answer from "./pages/Answer";

function App() {
  return (

    <SWRConfig value={{refreshInterval: 3000}}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/postscreen" element={<PostScreen />} />
            <Route path="/answer" element={<Answer />} >
                <Route path=":postId" element={<Answer />}></Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </SWRConfig>
 );
}
export default App;
