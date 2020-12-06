import React, { useState } from 'react'
import styles from "../styles/DismissingAlert.module.css"



export function ErrorAlert(props) {
    const [show, setShow] = useState(true);

    return (
        <>
            {show &&
                <div role="alert" className={`fade alert alert-dismissible show ${styles.errorAlert}`} >
                    <button type="button" className={`close ${styles.hvr_icon_spin}`} onClick={() => setShow(false)}>
                        <i aria-hidden="true" className={`${styles.hvr_icon} fas fa-times`}></i>
                        <span className="sr-only">
                            Close alert
                    </span>
                    </button>
                    <p>
                        <img src='/unicorn_question.png' className={styles.alertIcon} alt='error icon' />
                        {props.message}
                    </p>
                </div>}
        </>
    );
}

export function SuccessAlert(props) {
    const [show, setShow] = useState(true);

    return (
        <>
            {show &&
                <div role="alert" className={`fade alert alert-dismissible show ${styles.successAlert}`} >
                    <button type="button" className={`close ${styles.hvr_icon_spin}`} onClick={() => setShow(false)}>
                        <i aria-hidden="true" className={`${styles.hvr_icon} fas fa-times`}></i>
                        <span className="sr-only">
                            Close alert
                    </span>
                    </button>
                    <p className="d-flex align-items-center justify-content-around">
                        <img src='/unicorn_success.png' className={styles.alertIcon} alt='success icon' />
                        <span>
                        {props.message}
                        </span>
                    </p>
                </div>}
        </>
    );
}
