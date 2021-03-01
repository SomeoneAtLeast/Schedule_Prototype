/* eslint-disable react/prop-types */
import React from "react";

import "./days-field-common.scss"

const DaysFieldCommon = ({days, workers}) => {

    const daysNumbers = days.map((item) => {

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
                key={workerNumber}>
                {workers[workerNumber].name}
            </td>
        )

        for (let i = 1; i <= days.length; i++) {
            daysInMonth.push(
                <td className = "days-field-common-item" 
                    key={i}>
                    {workers[workerNumber].days[workerNumber].workingHours}
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
        <tr className = "days-field-common-items-row">
            <th className = "days-field-common-item">
            </th>
            {daysNumbers}
        </tr>
        {getWorkersElements()}
    </table>
    )
}


export default DaysFieldCommon;
