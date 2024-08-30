import {Nav} from "react-bootstrap";
import {IHome} from "../../interfaces/home.interface.ts";


interface IHomeTabsProps {
    home: IHome;
}
export const HomeTabs = ({home}:IHomeTabsProps) => {
    
    return (
        <Nav variant="tabs" defaultActiveKey={'#basicInfo'}>
            <Nav.Item key={"0"}>
                <Nav.Link href={"#basicInfo"}>Basic Info</Nav.Link>
            </Nav.Item>
            
            {/*{home.homeItems.map((item) => {
                return (<Nav.Item key={home.homeId}>
                    <Nav.Link href={"#home" + home.homeId}>{home.homeName}</Nav.Link>
                </Nav.Item>)
            })}*/}
        </Nav>
    )
}