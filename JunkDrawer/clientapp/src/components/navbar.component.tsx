import {Container, Navbar, Nav} from "react-bootstrap";
import viteLogo from '/vite.svg'
import {useContext} from "react";
import {UserContext} from "../contexts/user.context.tsx";
import {Link} from "react-router-dom";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";

export const NavbarComponent = () => {
    const userContext = useContext(UserContext);
    const currentUser = userContext?.currentUser;
    
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/app"><img src={viteLogo} className="logo" alt="Vite logo"/> Junk
                    Drawer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {currentUser &&                                        
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/app/homes">Homes</Nav.Link>
                            <Nav.Link as={Link} to="/app/neighbors">Trusted Neighbors</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {currentUser
                            ?
                            <>
                                <div className={"row"}>                                    
                                    <div className={"col"}>
                                        <img src={currentUser.photoUrl} className={"userIcon"} alt={""} /> 
                                        Welcome, {currentUser.firstName}!
                                    </div>
                                   
                                    <Nav.Link as={Link} to="/app" onClick={userContext?.logout} className={"col-2"}>
                                        Logout
                                    </Nav.Link>
                                </div>
                            </>
                            : 
                            <>
                                <GoogleLogin 
                                    onSuccess={(response:CredentialResponse) => {
                                        console.log(response);
                                        userContext?.login(response);
                                    }} 
                                    onError={() => alert('Login Failed.')} />
                            </>
                        }
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>            
        </Navbar>        
    )
}