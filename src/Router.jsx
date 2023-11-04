import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Category from "./Views/AddImage.jsx";


const Router = () => {
 return (    
<>
<Navbar />
<Routes>
     <Route path="/" element={<Home />} />
     <Route path="/addimage" element={<Category />} />
   </Routes>
</>
 );
};

export default Router;