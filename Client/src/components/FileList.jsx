import React from "react"
import { FileContext } from "../lib/Context"

export default function FileList() {


    return (
        <FileContext.Consumer>
            {(filesInfo) => {
                if (filesInfo.length) {
                    return filesInfo.map(fileInfo => {
                        return <option key={fileInfo['file_path']}> {fileInfo['file_path']} </option>
                    })
                }
                else {
                    return <option>no available files</option>
                }
            }}
        </FileContext.Consumer>
    )

}
