import React, { useState, createRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import "../styles/Command.css"
import FileList from '../components/FileList'
import styles from "../styles/Buttons.module.css"
import { SuccessAlert, ErrorAlert } from "../components/DismissingAlert"
import { getDirInfoByType, execute_command_by_type } from "../lib/api"
import { FileContext } from "../lib/Context"
import Container from 'react-bootstrap/Container';


export default function Command() {
    const [commandType, setCmdType] = useState('')
    const [formInputMode, setFormInputMode] = useState({ 'disableCommandTitle': true, 'disableRemoteFile': true, 'disableKargs': true, 'enableFileToDownload': false })
    const [filesInfo, setFilesInfo] = useState([])
    const [tempMsg, setTempMsg] = useState({ 'successMessage': '', 'errorMessage': '' })


    const uid = createRef()
    const commandTitle = createRef()
    const remoteFileName = createRef()
    const kargs = createRef()
    const fileToDownload = createRef()

    const disableAllInput = (boolean) => {
        setFormInputMode({
            ...formInputMode, 'disableCommandTitle': boolean,
            'disableRemoteFile': boolean,
            'disableKargs': boolean,
            'enableFileToDownload': !boolean
        })
    }


    const onComandType = (e) => {
        const cmdType = e.target.value
        setCmdType(cmdType)
        emptyMsg()

        switch (cmdType) {

            case 'command':
                setFormInputMode({
                    ...formInputMode, 'disableCommandTitle': false,
                    'disableRemoteFile': false,
                    'disableKargs': false,
                    'enableFileToDownload': false
                })
                break;

            case 'upload_module':
                setFormInputMode({
                    ...formInputMode, 'enableFileToDownload': true,
                    'disableRemoteFile': false,
                    'disableCommandTitle': true,
                    'disableKargs': true
                })

                getDirInfoByType('module').then(resp => {
                    setFilesInfo(resp.data["files_info"])
                    if (!resp.data["files_info"].length) {
                        setCmdType('')
                    }
                }).catch(error => setTempMsg({ ...tempMsg, 'errorMessage': error }))
                break;

            case 'upload_file':
                setFormInputMode({
                    ...formInputMode, 'enableFileToDownload': true,
                    'disableRemoteFile': false,
                    'disableCommandTitle': true,
                    'disableKargs': true
                })
                getDirInfoByType('file').then(resp => {
                    setFilesInfo(resp.data["files_info"])
                    if (!resp.data["files_info"].length) {
                        setCmdType('')
                    }
                }).catch(error => setTempMsg({ ...tempMsg, 'errorMessage': error }))
                break;

            case 'delete_module':
                setFormInputMode({
                    ...formInputMode, 'disableCommandTitle': true,
                    'disableRemoteFile': false,
                    'disableKargs': true,
                    'enableFileToDownload': false
                })
                break;

            case 'stop_module':
                setFormInputMode({
                    ...formInputMode, 'disableCommandTitle': false,
                    'disableRemoteFile': true,
                    'disableKargs': true,
                    'enableFileToDownload': false
                })
                break;

            case 'update_config':
                setFormInputMode({
                    ...formInputMode, 'disableCommandTitle': true,
                    'disableRemoteFile': true,
                    'disableKargs': false,
                    'enableFileToDownload': false
                })
                break;

            default:
                disableAllInput(true)
                alert(`this cmd_type feature ${cmdType} is WIP`)
        }
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        switch (commandType) {
            case 'command':
                const formValues = { 'uid': uid.current.value, 'commandTitle': commandTitle.current.value, 'remoteFileName': remoteFileName.current.value, 'kargs': kargs.current.value }
                execute_command_by_type(formValues, 'add_command').then(resp => {
                    if (resp.data['status'] === 'success') {
                        clearForm()
                        setTempMsg({ ...tempMsg, 'successMessage': JSON.stringify(resp.data) })
                    }
                }).catch(error => setTempMsg({ ...tempMsg, 'errorMessage': error }))
                break;

            case 'upload_file':
                const fileFormValues = { 'uid': uid.current.value, 'fileToDownload': fileToDownload.current.value, 'remoteFileName': remoteFileName.current.value }
                execute_command_by_type(fileFormValues, 'upload_file').then(resp => {
                    if (resp.data['status'] === 'success') {
                        clearForm()
                        setTempMsg({ ...tempMsg, 'successMessage': JSON.stringify(resp.data) })
                    }
                }).catch(error => setTempMsg({ ...tempMsg, 'errorMessage': error }))
                break;

            case 'upload_module':
                const moduleFormValues = { 'uid': uid.current.value, 'fileToDownload': fileToDownload.current.value, 'remoteFileName': remoteFileName.current.value }
                execute_command_by_type(moduleFormValues, 'upload_module').then(resp => {
                    if (resp.data['status'] === 'success') {
                        clearForm()
                        setTempMsg({ ...tempMsg, 'successMessage': JSON.stringify(resp.data) })
                    }
                }).catch(error => setTempMsg({ ...tempMsg, 'errorMessage': error }))
                break;

            case 'delete_module':
                const deleteModuleValues = { 'uid': uid.current.value, 'remoteFileName': remoteFileName.current.value }
                execute_command_by_type(deleteModuleValues, 'delete_module').then(resp => {
                    if (resp.data['status'] === 'success') {
                        clearForm()
                        setTempMsg({ ...tempMsg, 'successMessage': JSON.stringify(resp.data) })
                    }
                }).catch(error => setTempMsg({ ...tempMsg, 'errorMessage': error }))
                break;

            case 'stop_module':
                const stopModuleValues = { 'uid': uid.current.value, 'commandTitle': commandTitle.current.value }
                execute_command_by_type(stopModuleValues, 'stop_module').then(resp => {
                    if (resp.data['status'] === 'success') {
                        clearForm()
                        setTempMsg({ ...tempMsg, 'successMessage': JSON.stringify(resp.data) })
                    }
                }).catch(error => setTempMsg({ ...tempMsg, 'errorMessage': error }))
                break;

            case 'update_config':
                const configValues = { 'uid': uid.current.value, 'kargs': kargs.current.value }
                execute_command_by_type(configValues, 'update_config').then(resp => {
                    if (resp.data['status'] === 'success') {
                        clearForm()
                        setTempMsg({ ...tempMsg, 'successMessage': JSON.stringify(resp.data) })
                    }
                }).catch(error => setTempMsg({ ...tempMsg, 'errorMessage': error }))
                break;

            default:
                alert(`this cmd_type feature ${commandType} is WIP`)
        }
    }

    const emptyMsg = () => {
        setTempMsg({ 'successMessage': '', 'errorMessage': '' })
    }

    const clearForm = () => {
        uid.current.value = ''
        disableAllInput(true)
        setCmdType('')
        setFilesInfo([])
        emptyMsg()
    }


    return (
        <FileContext.Provider value={filesInfo}>
            <div className='container command-card'>
                {tempMsg.successMessage && <SuccessAlert message={tempMsg.successMessage} className="mt-5" />}
                {tempMsg.errorMessage && <ErrorAlert message={tempMsg.errorMessage} className="mt-5" />}

                <Form onSubmit={onFormSubmit}>
                    <Form.Group className='mt-5'>
                        <Form.Row>
                            <Form.Label column lg={3}>Uid</Form.Label>
                            <Col>
                                <Form.Control type="number" required placeholder="Enter the bot uid" ref={uid} onInput={emptyMsg} />
                            </Col>
                        </Form.Row>

                        <Form.Row className='mt-4'>
                            <Form.Label column lg={3} >Selete cmd_type</Form.Label>
                            <Col>
                                <Form.Control as="select" value={commandType} custom onChange={onComandType} className='select_icon'>

                                    <option hidden > Selete cmd_type</option>
                                    <option> command</option>
                                    <option> delete_module</option>
                                    <option> stop_module</option>
                                    <option> update_config</option>
                                    <option> upload_module</option>
                                    <option> upload_file</option>
                                </Form.Control>
                            </Col>
                        </Form.Row>

                        <Form.Row className='mt-4' hidden={formInputMode['disableCommandTitle']}>
                            <Form.Label column lg={3}>
                                cmd_title
                        </Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="the name of the command" disabled={formInputMode['disableCommandTitle']} required={!formInputMode['disableCommandTitle']} ref={commandTitle} />
                            </Col>
                        </Form.Row>

                        {formInputMode['enableFileToDownload'] &&
                            <Form.Row className='mt-4'>
                                <Form.Label column lg={3} >File to download</Form.Label>
                                <Col>
                                    <Form.Control as="select" custom ref={fileToDownload}>
                                        <option hidden>Select a local path of file to upload</option>
                                        <FileList />
                                    </Form.Control>
                                </Col>
                            </Form.Row>}


                        <Form.Row className='mt-3' hidden={formInputMode['disableRemoteFile']}>
                            <Form.Label column lg={3}>
                                Remote file name
                        </Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="where the file shall be stored/deleted on the bot" disabled={formInputMode['disableRemoteFile']} required={!formInputMode['disableRemoteFile']} ref={remoteFileName} />
                            </Col>
                        </Form.Row>

                        <Form.Row className='mt-3' hidden={formInputMode['disableKargs']}>
                            <Form.Label column lg={3} >
                                kargs
                        </Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="arguments to be passed" disabled={formInputMode['disableKargs']} required={!formInputMode['disableKargs']} ref={kargs} />
                            </Col>
                        </Form.Row>

                    </Form.Group>

                    <Container className='d-flex justify-content-center align-items-center mt-5'>
                        <Button variant="primary" type="submit" className={`${styles.transparentBtn} ${styles.hvr_icon_pulse_grow}`} disabled={!commandType}>
                            <i className={`fas fa-bolt  ${styles.hvr_icon}`}></i>{' '}
                            Excute command
                        </Button>
                    </Container>

                </Form>
            </div>

        </FileContext.Provider>
    );
}
