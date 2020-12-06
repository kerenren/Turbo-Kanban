import React from 'react'
import "../styles/DisplayFile.css"

export default function DisplayFile(props) {
    const selectedFiles = props.selectedFiles
    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }
    const fileSize = (size) => {
        if (size === 0) 
            return '0 Bytes';
        
        const k = 1024;
        const sizes = [
            'Bytes',
            'KB',
            'MB',
            'GB',
            'TB'
        ];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    return (
        <div className="file-display-container">
            {
            selectedFiles.map((data, i) => <div className="file-status-bar d-flex align-items-between"
                key={i}>
                <div className='d-flex align-items-between'>
                    <div className="file-type-logo justify-content-center">
                        <i className="fa fa-file-code-o" aria-hidden="true"></i>
                    </div>
                    <div className="file-type justify-content-center text-center">
                        {
                        fileType(data.name)
                    }</div>
                    <span className={
                        `file-name ${
                            data.invalid ? 'file-error' : ''
                        }`
                    }>
                        {
                        data.name
                    }</span>
                    <span className="file-size">({
                        fileSize(data.size)
                    })</span>
                    {
                    data.invalid ? <span className='file-error-message'>(File type not permitted)</span> : <span className='file-success-message'>(file is valid)</span>
                } </div>
                <div className="file-remove">
                <i className="fas fa-trash-alt" onClick={()=>props.onRemove(data.name)}></i>
                </div>
            </div>)
        } </div>

    )
}
