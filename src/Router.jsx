import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Category from "./Views/Category.jsx";


const Router = () => {
 return (    
<>
<Navbar />
<Routes>
     <Route path="/" element={<Home />} />
     <Route path="/category" element={<Category />} />
   </Routes>
</>
 );
};

export default Router;