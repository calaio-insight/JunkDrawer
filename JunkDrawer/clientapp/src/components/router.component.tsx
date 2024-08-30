import {Routes, Route} from "react-router-dom";
import {Homes} from "../pages/homes.page.tsx";
import {TrustedNeighbors} from "../pages/trustedNeighbors.page.tsx";
import {Home} from "../pages/home.page.tsx";

export const RouterComponent = () => {
    
    return (
        <Routes>
            <Route path={'/app/neighbors'} Component={TrustedNeighbors} />    
            <Route path={'/app/homes/:homeId'} element={<Home />} />
            <Route path={'/app/homes'} Component={Homes} />            
            <Route path={'/app/*'} element={<div>This is a landing screen</div>} />
        </Routes>
    )
}