// import logo from './logo.svg';
import './App.css';
// import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import {BrowserRouter} from "react-router-dom";

export default function App() {
  return (
      <div>
          <BrowserRouter basename={"/"}>
              <Navbar />
          </BrowserRouter>
      </div>

  );
}

