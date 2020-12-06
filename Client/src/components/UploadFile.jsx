import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/UploadFile.css'
import DisplayFile from "./DisplayFile"
import { uploadFiles } from "../lib/api"
import { SuccessAlert, ErrorAlert } from "./DismissingAlert"

export default function UploadFile() {
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
        console.log(...formData)
        uploadFiles(formData).then(results => {
            if (results.data['status'] === 'success') {
                console.log(results.data)
                setSuccessMessage(JSON.stringify(results.data))
                setSelectedFiles([])
            }
            else {
                setErrorMessage(JSON.stringify(results.data))
            }
        });
        setSuccessMessage('')
        setErrorMessage('')
    }

    return (
        <div className="container text-center">
            <h1 className="mt-5">Uploading files</h1>
            <div className="drop-container mt-5 mb-5">
                <div className="drop-message" {...getRootProps()}>
                    <div className="upload-icon">
                        <i className="fa fa-upload" aria-hidden="true"></i>
                    </div>
                    <input {...getInputProps()} /> {
                        isDragActive ? <p>Drop the files here ...</p> : <p>Drag {'&'}
                        drop some files here, or click to select files</p>
                    } </div>

            </div>
            {errorMessage && <ErrorAlert message={errorMessage} className="mt-1" />}
            {successMessage && <SuccessAlert message={successMessage} className="mt-1" />}
            <DisplayFile className='mt-1' selectedFiles={selectedFiles} />
            <button className="upload-btn mt-5" onClick={onUpload}>Upload</button>
        </div>
    )
}
