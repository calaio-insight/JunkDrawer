import {Container, Navbar} from "react-bootstrap";
import viteLogo from '/vite.svg'
import {useContext} from "react";
import {UserContext} from "../contexts/user.context.tsx";
import {Link} from "react-router-dom";

export const NavbarComponent = () => {
    const currentUser = useContext(UserContext);
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/app/homes"><img src={viteLogo} className="logo" alt="Vite logo"/> Junk
                    Drawer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                   {/* <Nav className="me-auto">
                        <Nav.Link as={Link} to="/app/homes">My Homes</Nav.Link>
                        <Nav.Link as={Link} to="/link">Link</Nav.Link>                        
                    </Nav>*/}
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#">{currentUser?.displayName}</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>            
        </Navbar>        
    )
}