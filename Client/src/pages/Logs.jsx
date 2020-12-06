import React, { useState, useEffect, useContext } from "react";
import { baseURL } from "../lib/api"
import axios from "axios";
import MissingData from "./MissingData";
import HashLoader from "react-spinners/HashLoader";
import override from "../styles/Loader.jsx"
import styles from "../styles/Logs.module.css"
import BackToTop from "../components/BackToTop"
import { UidContext } from "../lib/Context"
import SearchBotForm from "../components/SearchBotForm"



function Logs() {
    const { uid, loading, setLoading } = useContext(UidContext)
    const [logs, setLogs] = useState([])
    const [erroMsg, setErrorMsg] = useState('');


    const inforOrError = (text) => {
        const string = text[0].split("]")
        if (string[0] === "[INFO") {
            return styles.infoColor
        } else if (string[0] === "[ERROR") {
            return styles.errorColor
        } else {
            return styles.warningColor
        }
    }
    const checkContStyle = () => {
        if (!uid.length) {
            return styles.emptyContainer
        }
    }

    
    useEffect(() => {
        const source = axios.CancelToken.source();
        const fetchLogs =  (uid) => {
            axios.get(baseURL + 'logs/' + uid, {
                cancelToken: source.token
            }).then(response => {
                setLoading(false)
                setLogs(response.data.logs)
            }).catch(err => {
                console.log("Catched error: " + err.message);
                setLoading(false)
                setLogs(['missing data'])
                setErrorMsg(err.message)
            });
        }
        if (!uid) {
            setLoading(false)
        }
        if (uid.length) {
            fetchLogs(uid)
        }
        return () => {
            source.cancel("Component got unmounted");
        };
    }, [uid, setLoading])


    return (
        <>
            {loading ?
                <div className={styles.sweet_loading}>
                    <HashLoader
                        css={override}
                        color={"#F2AC57"}
                        loading={loading}
                        size={100}
                    />
                </div>
                :
                <div className={`container pt-5 ${checkContStyle()}`}>
                    <div className="d-flex align-items-center justify-content-center header mb-4">
                        <img src="/robot.png" className={styles.headerImg} alt="robot" />
                        <h1 className={`text-center ml-3 ${styles.logsHeader}`}> Bot {uid !== 'logs' && uid} Logs</h1>
                    </div>
                    {logs.length > 0 && logs[0] !== "missing data" &&
                        <div>
                            <ol className={styles.logsContainer} style={{ counterReset: `index ${logs.length + 1}` }}>
                                {logs.map(log => {
                                    return (
                                        <li key={log[0]} className={`${styles.logItem} ${inforOrError(log)}`} >{log}</li>
                                    )
                                })}
                            </ol>
                        </div>}

                    {logs[0] === "missing data" && <MissingData msg={erroMsg} />}

                    {!uid.length && logs[0] !== "missing data" &&
                        <SearchBotForm />
                    }
                </div>
            }
            <BackToTop />
        </>
    )
}

export default Logs;
