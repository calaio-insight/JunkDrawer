import './App.css'
import {Container} from "react-bootstrap";
import {NavbarComponent} from "./components/navbar.component.tsx";
import {RouterComponent} from "./components/router.component.tsx";

function App() {
    return (
        <>            
            <NavbarComponent />
            <Container className="mt-4">
                <RouterComponent/>  
            </Container>
        </>
    )
}

export default App
