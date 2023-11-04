import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Navbar/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <div>
            <Navbar.Brand href="/">
              <img
                src="https://res.cloudinary.com/dipahj9kx/image/upload/v1699117341/Images/sjuobod1jrd4nk3u0tza.png"
                width="70"
                height="70"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
          </div>
          <div>
            <Nav className="me-auto">
              <Nav.Link href="/" className="fs-5 navbar-link">
                My gallery
              </Nav.Link>
              <Nav.Link href="/addimage" className="fs-5 navbar-link">
                Add image
              </Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
