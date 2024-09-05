import {Button, Modal} from "react-bootstrap";
import {useState} from "react";

interface ImageUploadModalProps {
    file: File|undefined;
    setFile: (file: File) => void;
    show: boolean;
    handleClose: () => void;
    handleUpload: () => void;
}
export const ImageUploadModal = (
    {
        file, 
        setFile, 
        show, 
        handleClose, 
        handleUpload
    }:ImageUploadModalProps) => 
{   
    const [preview, setPreview] = useState();
    const handleFileChange = (e: any) => {
        if (e.target.files){
            setFile(e.target.files[0]);
            // @ts-ignore
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Image Upload</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type={"file"} onChange={handleFileChange} accept={"image/*"} />
                <div>
                    {file &&
                        <div className={"mt-2"}>
                            <img src={preview} style={{height: "12rem"}} alt={""}/>
                        </div>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpload}>
                    Upload Image
                </Button>
            </Modal.Footer>
        </Modal>
    )
}