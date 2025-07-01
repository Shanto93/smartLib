import { Outlet } from "react-router";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;
