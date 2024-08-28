import {Routes, Route} from "react-router-dom";
import {Homes} from "../pages/homes.page.tsx";
import {HomeComponent} from "./homes/home.component.tsx";
import {TrustedNeighbors} from "../pages/trustedNeighbors.page.tsx";

export const RouterComponent = () => {
    
    return (
        <Routes>
            <Route path={'/app/neighbors'} Component={TrustedNeighbors} />    
            <Route path={'/app/homes/:homeId'} element={<HomeComponent />} />
            <Route path={'/app/homes'} Component={Homes} />
            <Route path={'/app/*'} element={<div>This is a landing screen</div>} />
        </Routes>
    )
}