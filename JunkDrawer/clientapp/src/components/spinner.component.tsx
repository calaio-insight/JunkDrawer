import {Spinner} from "react-bootstrap";

export const SpinnerComponent = () => {
    return (
        <Spinner animation={"border"} role={"status"}>
            <span className={"visually-hidden"}>Loading...</span>
        </Spinner>
    )
}