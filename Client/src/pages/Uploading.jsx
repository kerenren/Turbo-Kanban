import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles/Uploading.css"
import UploadData from '../components/UploadData'


export default function Uploading() {

    return (
        <div className='container'>
            <Router>
                <Switch>
                    <Route path='/uploading/files'
                        component={
                            () => (
                                <UploadData pathPara={'files'} />)
                        } />
                    <Route path='/uploading/modules'
                        component={
                            () => (
                                <UploadData pathPara={'modules'} />)
                        } />
                </Switch>
            </Router>

        </div>
    )
}
