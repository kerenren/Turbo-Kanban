import React from "react";
import styles from "../styles/MissingData.module.css"


export default function MissingData(props) {
    return (
        <div className={`container d-flex align-items-center justify-content-center`}>
            <img src="/unicorn_question.png" alt="an unicron with questions" width="20%" />
            <div className={styles.missingDataBubble}>
                {props.msg && <p className={styles.missingDataMsg}> {props.msg}. </p>}
                {" "}
                <p className={styles.missingDataMsg}> UH OH… </p>
                {" "}
                <p className={styles.missingDataMsg}> OUR unicorn ATE THIS PAGE  </p>
                {" "}
                <p className={styles.missingDataMsg}> LET’S TRY AGAIN.</p>
            </div>
        </div>
    )
}
