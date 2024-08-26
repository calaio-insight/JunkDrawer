import {Routes, Route} from "react-router-dom";
import {Homes} from "../pages/homes.page.tsx";
import {HomeComponent} from "./homes/home.component.tsx";

export const RouterComponent = () => {
    
    return (
        <Routes>            
            <Route path={'/app/homes/:homeId'} element={<HomeComponent />} />
            <Route path={'/app/homes'} Component={Homes} />
            <Route path={'/app/*'} element={<div>This is a landing screen</div>} />
        </Routes>
    )
}