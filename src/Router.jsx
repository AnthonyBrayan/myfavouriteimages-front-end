import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import AddImage from "./Views/AddImage/AddImage.jsx";


const Router = () => {
 return (    
<>
<Navbar />
<Routes>
     <Route path="/" element={<Home />} />
     <Route path="/addimage" element={<AddImage />} />
   </Routes>
</>
 );
};

export default Router;