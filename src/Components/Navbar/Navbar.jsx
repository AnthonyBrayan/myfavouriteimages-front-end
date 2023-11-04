// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     return (
//       <nav>
//       <Link to="/">Home</Link>
//       <Link to="/addimage">Add Image</Link>
//     </nav>
//     );
//    };
//    export default Navbar;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
          <img
              src="https://res.cloudinary.com/dipahj9kx/image/upload/v1699117341/Images/sjuobod1jrd4nk3u0tza.png"
              width="70"
              height="70"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">My gallery</Nav.Link>
            <Nav.Link href="/addimage">Add image</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;