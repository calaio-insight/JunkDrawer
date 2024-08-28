import {Button, InputGroup, Modal, Form} from "react-bootstrap";
import {IUser} from "../../interfaces/user.interface.ts";
import {useState} from "react";
import {IUserTrustedNeighbor} from "../../interfaces/userTrustedNeighbor.ts";

interface ITrustedNeighborModalProps {
    show: boolean;
    handleClose: () => void;
    handleAddNeighbor: () => void;
    getPossibleNeighbor: (email: string) => void;
    possibleNeighbor: IUser|undefined;
    setPossibleNeighbor: any;
    trustedNeighbors: IUserTrustedNeighbor[];
    errorText: string;
    setErrorText: any;
}
export const TrustedNeighborModalComponent = (
{
    show,
    handleClose,
    handleAddNeighbor,
    getPossibleNeighbor,
    possibleNeighbor,
    setPossibleNeighbor,
    trustedNeighbors,
    errorText,
    setErrorText
}:ITrustedNeighborModalProps) => {
    const [neighborEmail, setNeighborEmail] = useState<string>("");
    
    const handleCloseModal = () => {
        setNeighborEmail("");
        handleClose();
    }
    
    const dupeCheck = () => {
        let hasDupe = trustedNeighbors.filter(n => n.email == neighborEmail).length > 0;
        if (hasDupe) {
            setErrorText("This user is already in your list of trusted neighbors.");
        }
        else{
            setErrorText("");
            getPossibleNeighbor(neighborEmail);            
        }
    }
       
    return (
        <Modal show={show} onHide={handleCloseModal}>   
            <Modal.Header closeButton>
                <Modal.Title>Add Neighbor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Enter email address..."
                        aria-label="Neighbor's email address"
                        value={neighborEmail}
                        onChange={(e) => setNeighborEmail(e.target.value)}
                        disabled={possibleNeighbor != undefined}
                    />
                    <Button variant="outline-secondary"
                            onClick={() => dupeCheck()}
                            disabled={possibleNeighbor != undefined}
                            className={possibleNeighbor != undefined ? "disabled-btn" : ""}
                    >
                        Search
                    </Button>
                </InputGroup>
                
                {errorText != "" &&
                    <div className={"invalid-text"}>
                        {errorText}
                    </div>
                }

                {possibleNeighbor != undefined &&
                    <>
                        <div className={"row"}>
                            <div className={"col"}>
                                <img src={possibleNeighbor.photoUrl} className={"userIcon"}
                                     alt=""/> {possibleNeighbor.displayName}
                            </div>
                        </div>

                        Add this user as a trusted neighbor?
                        <Button variant={"outline-success"} className={"mx-3"}
                                onClick={handleAddNeighbor}>YES</Button>
                        <Button variant={"outline-danger"}
                                onClick={() => setPossibleNeighbor(undefined)}>NO</Button>
                    </>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
            </Modal.Footer>

        </Modal>
    )
}