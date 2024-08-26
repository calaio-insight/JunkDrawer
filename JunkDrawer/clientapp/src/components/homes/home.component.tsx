import {useParams} from "react-router-dom";


export const HomeComponent = () => {
    const {homeId} = useParams();
    
    return (
        <div>This is where 1 home would go, homeId: {homeId}</div>
    )
}