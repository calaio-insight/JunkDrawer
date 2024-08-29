import {Nav} from "react-bootstrap";
import {IHome} from "../../interfaces/home.interface.ts";


interface IHomeTabsProps {
    homes: IHome[];
}
export const HomeTabs = ({homes}:IHomeTabsProps) => {

    const firstHome = homes[0].homeId;
    
    return (
        <Nav variant="tabs" defaultActiveKey={'#home' + firstHome}>
            {homes.map((home) => {
                return (<Nav.Item key={home.homeId}>
                    <Nav.Link href={"#home" + home.homeId}>{home.homeName}</Nav.Link>
                </Nav.Item>)
            })}
        </Nav>
    )
}