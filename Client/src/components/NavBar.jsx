import Navbar from 'react-bootstrap/Navbar'
import React, { useState } from "react";
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import "../styles/NavBar.css"
import SearchBotForm from "./SearchBotForm"


export default function NavBar() {
    const [scrollState, setScrollState] = useState("top");

    document.addEventListener("scroll", e => {
        const scrolled = document.scrollingElement.scrollTop
        if (scrolled >= 30) {
            if (scrollState !== "overNav") {
                setScrollState("overNav")
            }
        } else {
            if (scrollState !== "top") {
                setScrollState("top")
            }
        }
    })

    return (
        <>
            <Navbar className="nav-bar-container shadow-lg w-100"
                fixed="top"
                variant="dark"
                expand="lg"
                style={{ backgroundColor: scrollState === "top" ? 'rgba(255, 255, 255, 0.5)' : '#2C2738' }}
            >
                <img className="mr-2 nav-icon" src="/unicorn_icon.png" alt="logo" />
                <Navbar.Brand href="/home">
                    Turbo Kanban
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <Nav.Link href="/dashboard" className='m-auto'><i className="fas fa-chart-line"></i> Dash board</Nav.Link>
                        <Nav.Link href="/logs" className='m-auto'><i className="fas fa-robot"></i> Bot Logs</Nav.Link>
                        <Nav.Link href="/command" className='m-auto'><i className="fas fa-code"></i> Command</Nav.Link>
                        <div className='ml-3 d-flex  flex-row justify-content-center align-items-center nav-link'>
                            <i className="fas fa-cloud-upload-alt "></i>
                            <NavDropdown title="uploading">
                                <NavDropdown.Item href="/uploading/files">File</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/uploading/modules">Module</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Nav>
                    <SearchBotForm />
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
