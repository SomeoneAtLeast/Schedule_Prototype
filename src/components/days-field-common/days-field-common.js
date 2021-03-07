/* eslint-disable react/prop-types */
import React from "react";
import {Link} from 'react-router-dom';
import "./days-field-common.scss"

const DaysFieldCommon = ({workers, onSelectWorker}) => {

    const daysNumbers = workers[0].days.map((item) => {

        return (
            <th className = "days-field-common-item" 
                key={item.id}>
                {item.id} {item.dayName}
            </th>
        )
    })

    const getWorkerElement = (workerNumber) => {
        let daysInMonth = [];

        daysInMonth.push(
            <td className = "days-field-common-item" 
                key={workerNumber}
                onClick={() => onSelectWorker(workerNumber)}>
                    <Link to={`/personalschedule/${workerNumber + 1}`} className = "days-field-common-item-link">
                        {workers[workerNumber].name}
                    </Link>
            </td>
        )

        for (let i = 1; i <= workers[0].days.length; i++) {
            let classNames = "days-field-common-item";

            
            if (workers[workerNumber].days[i - 1].worked) {
                classNames += " worked";
            }

            if (workers[workerNumber].days[i - 1].weekend) {
                classNames += " weekend";
            }

            if (workers[workerNumber].days[i - 1].vacation) {
                classNames += " vacation";
            }

            daysInMonth.push(
                <td className = {classNames}
                    key={i + 1000}>
                    {workers[workerNumber].days[i - 1].id}
                </td>
            )
        }

        return (
            daysInMonth
        )
    }

    const getWorkersElements = () => {
        let i = 0;

        const WorkersElements = workers.map((worker) => {
            i++
            return (
                <tr 
                    className = "days-field-common-items-row"
                    key={worker.name}>
                    {getWorkerElement(i - 1)}
                </tr>
            )
        });

        return (
            WorkersElements
        )
    }



    return (
    <table className = "days-field-common">
        <tbody>
            <tr className = "days-field-common-items-row">
                <th className = "days-field-common-item">
                </th>
                {daysNumbers}
            </tr>
            {getWorkersElements()}
        </tbody>
    </table>
    )
}


export default DaysFieldCommon;
