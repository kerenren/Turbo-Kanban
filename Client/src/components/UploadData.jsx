import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/UploadData.css'
import DisplayFile from "./DisplayFile"
import { uploadData } from "../lib/api"
import { SuccessAlert, ErrorAlert } from "./DismissingAlert"
import styles from "../styles/Buttons.module.css"
import { Container } from 'react-bootstrap';

export default function UploadData(props) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')

    const onDrop = useCallback(acceptedFiles => {
        setSuccessMessage('')

        if (acceptedFiles.length) {
            handleFiles(acceptedFiles);
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const formData = new FormData()

    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            setSelectedFiles(prevArray => [
                ...prevArray,
                files[i]
            ]);
        }
    }

    const onUpload = () => {
        console.log('selectedFiles', selectedFiles)
        selectedFiles.forEach((file, index) => {
            formData.append(`file${index}`, file, file.name);
        })
        uploadData(formData, props.pathPara).then(results => {
            if (results.data['status'] === 'success') {
                setSuccessMessage(prevMsg => [...prevMsg, JSON.stringify(results.data)])
                setSelectedFiles([])
            }
            else {
                setErrorMessage(JSON.stringify(results.data))
            }
        });
    }

    const onRemove = (fileNameToRemove) => {
        selectedFiles.forEach((file, index) => {
            if (file.name === fileNameToRemove) {
                setSelectedFiles(prevArray => prevArray.slice(0, index).concat(prevArray.slice(index + 1)))
            }
        })
    }


    return (
        <div className="uploading-data-cont container text-center h-100">
            <h1 className="mt-5 title" >Uploading {props.pathPara}</h1>
            <div className="drop-container mt-5 mb-5">
                <div className="drop-message" {...getRootProps()}>
                    <div className="upload-icon d-flex align-items-center justify-content-center">
                        <i className="fa fa-upload" aria-hidden="true"></i>
                    </div>
                    <input {...getInputProps()} /> {
                        isDragActive ? <p>Drop the files here ...</p> : <p>Drag {'&'}
                        drop some files here, or click to select files</p>
                    } </div>

            </div>
            <Container className='w-100'>
                {errorMessage[0] && <ErrorAlert message={errorMessage} className="mt-1 w-75" />}
                {successMessage[0] && <SuccessAlert message={successMessage} className="mt-1 w-75" />}
            </Container>
            {!successMessage[0] && <DisplayFile className='mt-1' selectedFiles={selectedFiles} onRemove={onRemove} />}
            <button className={`upload-btn mt-5 ${styles.hvr_pulse_grow}`} onClick={onUpload} disabled={!selectedFiles.length} >Upload</button>
        </div>
    )
}
