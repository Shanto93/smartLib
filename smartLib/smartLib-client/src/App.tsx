import { Outlet } from "react-router";
import Navbar from "./shared/Navbar";

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default App;
