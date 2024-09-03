import {Nav} from "react-bootstrap";
import {IHome} from "../../interfaces/home.interface.ts";
import {usePermissionsHook} from "../../hooks/usePermissions.hook.ts";


interface IHomeTabsProps {
    home: IHome;
}
export const HomeTabs = ({home}:IHomeTabsProps) => {
    const {isOwner, canViewItems, canEditItems, canViewBasic, canEditBasic} = usePermissionsHook(home);

    return (
        <Nav variant="tabs" defaultActiveKey={'#basicInfo'}>
            {(isOwner || canViewBasic || canEditBasic) &&
                <Nav.Item key={"0"}>
                    <Nav.Link href={"#basicInfo"}>Basic Info</Nav.Link>
                </Nav.Item>
            }
            {(isOwner || canViewItems || canEditItems) &&
                <>
                    {/*{home.homeItems.map((item) => {
                        return (<Nav.Item key={home.homeId}>
                            <Nav.Link href={"#home" + home.homeId}>{home.homeName}</Nav.Link>
                        </Nav.Item>)
                        })}*/}
                </>                
            }            
        </Nav>
    )
}