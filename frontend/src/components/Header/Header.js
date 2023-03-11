import { Container, Row } from "react-bootstrap";

// menu Component for navigation
import Menu from "./Menu"; 

function Header(props) {
  return (
    <Container className="header text-center">
      <Row>
        <h1>Search itunes for anything</h1>
      </Row>
      <Row>
        <Menu></Menu>
      </Row>
    </Container>
  );
}

export default Header;
