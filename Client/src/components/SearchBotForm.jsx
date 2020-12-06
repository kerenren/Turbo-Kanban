import React, { useContext, createRef } from "react";
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import styles from "../styles/SearchBotForm.module.css"
import { UidContext } from "../lib/Context"
import { useHistory } from "react-router-dom"




export default function SearchBotForm() {
    const { uid, setUid, setLoading } = useContext(UidContext)
    const formUid = createRef()
    const history = useHistory()

    const onSearchBotLogs = () => {
        setLoading(true)
        setUid(formUid.current.value)
        if (!history.location.pathname.includes('/logs')) {
            history.push(`/logs/${uid}`)
        }
        formUid.current.value = ""
    }
    const onSearchKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            setLoading(true)
            setUid(formUid.current.value)
            if (!history.location.pathname.includes('/logs')) {
                history.push(`/logs/${uid}`)
            }
            formUid.current.value = ""
        }
    }

    return (

        <div className={styles.searchContainer}>
            <Form inline className={styles.form}>
                <FormControl
                    type="number"
                    required
                    placeholder="Search bot logs by uid" className={`mr-sm-2 nav-search ${styles.searchInput}`}
                    onKeyDown={onSearchKeyDown}
                    ref={formUid} />

                <Button
                    variant="outline-light"
                    className={styles.hvr_underline_from_center}
                    onClick={onSearchBotLogs}  >
                    Search
                </Button>
            </Form>
        </div>
    )
}
