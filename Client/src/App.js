import React, { useState } from 'react';
import './App.css';
import DashBoard from './pages/DashBoard'
import NavBar from './components/NavBar'
import Uploading from './pages/Uploading'
import Command from './pages/Command'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from './pages/Home'
import Logs from './pages/Logs'
import MissingData from "./pages/MissingData"
import { UidContext } from "./lib/Context"


function App() {
    const [uid, setUid] = useState("")
    const [loading, setLoading] = useState(true)


    return (
        <UidContext.Provider
            value={{ uid, setUid, loading, setLoading }}
        >
            <div className="app-container h-auto">
                <Router>
                    <NavBar />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={() => (<Redirect to="/home" />)} />
                        <Route
                            path='/home'
                            component={() => (<Home />)} />
                        <Route
                            path='/uploading'
                            component={() => (<Uploading />)} />
                        <Route
                            path='/dashboard'
                            component={() => (<DashBoard />)} />
                        <Route
                            path='/command'
                            component={() => (<Command />)} />
                        <Route
                            path='/logs'
                            component={() => (<Logs />)}
                        />
                        <Route status={404} component={() => (<MissingData msg={'Wrong url. The page is not found'} />)} />
                    </Switch>

                </Router>
            </div>
            </UidContext.Provider>
    );
}

export default App;
