import { useState } from "react";
import logo from "./logo.svg";
import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PostScreen from "./pages/PostScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/postscreen' element={<PostScreen/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
