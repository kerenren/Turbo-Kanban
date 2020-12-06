import React, { useState, useEffect,useContext } from 'react'
import RobotOverview from '../components/RobotOverview'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import '../styles/DashBoard.css'
import { getDataByTableName } from "../lib/api"
import MissingData from "./MissingData"
import { useHistory } from "react-router-dom"
import BackToTop from "../components/BackToTop"
import ReactTooltip from 'react-tooltip';
import HashLoader from "react-spinners/HashLoader";
import override from "../styles/Loader.jsx"
import styles from "../styles/Logs.module.css"
import { UidContext } from "../lib/Context"



export default function DashBoard() {
    const { setUid, loading, setLoading } = useContext(UidContext)
    const [data, setData] = useState([])

    const history = useHistory()

    const onBotClick = (e, botData) => {
        e.preventDefault()
        setLoading(true)
        setUid(botData.uid)
        history.push(`/logs/${botData.uid}`)
    }

    useEffect(() => {
        async function fetchData() {
            const result = await getDataByTableName('BOT_VIEW')
            if (result.status === 200) {
                setData(result.data)
                setLoading(false)
            }
        }
        fetchData()
    }, [setLoading])

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
        <Container className='dashboard-container'>
        
            {data ? data.map((botData, index) => {
                return (
                    <Row key={botData['uid']} className='mt-3 justify-content-center align-items-center'>
                        <Col md={10} className="text-uppercase mt-2">
                            {<h3 data-tip={`Check the bot(UID: ${botData.uid}) real time raw logs`} onClick={e => onBotClick(e, botData)}> <i className="fas fa-laptop-code"></i> {' '}Bot No. {index + 1} </h3>}
                            <RobotOverview botData={botData} />
                        </Col>
                        <ReactTooltip  place="right" textColor="#FFFFFF" backgroundColor="#fb8b02" />
                    </Row>
                )
            })
                :
                <MissingData />
            }
            <BackToTop />
        </Container>
        }
        </>
    )

}
