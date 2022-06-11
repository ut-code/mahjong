import { useState } from "react";
import logo from "./logo.svg";
import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PostScreen from "./PostScreen";
import Answer from "./pages/Answer";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/postscreen' element={<PostScreen/>} />
            <Route path='/answer' element={<Answer/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
