import React from 'react'
import '../styles/home.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function Home() {

    return (
        <div className='home'>
            <Row className='center justify-content-center align-items-center'>
                <Col className="text-right" xs={6}>
                    <img className='logo' alt ='log' src='/icon_otorio.png'/>
                </Col>
                <Col>
                    <h1 className='welcome text-left'>
                        Welcome to Turbo Kanban
                    </h1>
                </Col>
            </Row>
        </div>
    )
}
