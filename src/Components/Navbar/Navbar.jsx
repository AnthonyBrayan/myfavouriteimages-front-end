import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
      <nav>
      <Link to="/">Home</Link>
      <Link to="/Category">About</Link>
    </nav>
    );
   };
   export default Navbar;