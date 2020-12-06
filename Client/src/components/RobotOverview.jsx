import React from "react";
import Table from 'react-bootstrap/Table'
import ReactJson from 'react-json-view'
import styles from '../styles/RobotOverview.module.css'

export default function RobotOverview(props) {

    const address_list_str = props.botData['address_list']
    const address_list_json = JSON.parse(address_list_str)

    function replaceJsonEntryToString(oldJson) {
        const replacedItems = Object.keys(oldJson).map(oldKey => {
            const obj = oldJson[oldKey];
            const newKey = obj[0] || oldKey;
            return { [newKey]: obj }
        })
        return replacedItems.reduce((a, b) => Object.assign({}, a, b))
    }

    const replacedJson = replaceJsonEntryToString(address_list_json)


    return (
        <>
            <Table striped bordered responsive variant="light" className={styles.tableContainer}>
                <thead>
                    <tr>
                        <th>uid</th>
                        <th>hostname</th>
                        <th>external_ip</th>
                        <th>Timestamp</th>
                        <th>address_list</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.botData['uid']}</td>
                        <td>{props.botData['uid']}</td>
                        <td>{props.botData['external_ip']}</td>
                        <td>{props.botData['timestamp']}</td>
                        <td >
                            {
                                < ReactJson theme='bright:inverted'
                                    style={{ backgroundColor: 'transparent' }}
                                    collapsed={true}
                                    src={replacedJson} />
                            }
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
