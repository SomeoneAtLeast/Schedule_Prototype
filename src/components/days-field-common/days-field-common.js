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

    let i = 0;
    const workersElements = workers.map((item) => {
        i++
        return (
            <td className = "days-field-common-item" 
                key={i}>
                {item[`day${i}`]}
            </td>
        )
    })

    return (
    <table className = "days-field-common">
        <tr className = "days-field-common-items-row">
            {daysNumbers}
        </tr>
        <tr className = "days-field-common-items-row">
            {workersElements}
        </tr>
        <tr className = "days-field-common-items-row">
            {workersElements}
        </tr>
        <tr className = "days-field-common-items-row">
            {workersElements}
        </tr>
        <tr className = "days-field-common-items-row">
            {workersElements}
        </tr>
        <tr className = "days-field-common-items-row">
            {workersElements}
        </tr>
        <tr className = "days-field-common-items-row">
            {workersElements}
        </tr>
        <tr className = "days-field-common-items-row">
            {workersElements}
        </tr>
        <tr className = "days-field-common-items-row">
            {workersElements}
        </tr>
        <tr className = "days-field-common-items-row">
            {workersElements}
        </tr>
        <tr className = "days-field-common-items-row">
            {workersElements}
        </tr>
        <tr className = "days-field-common-items-row">
            {workersElements}
        </tr>
        <tr className = "days-field-common-items-row">
            {workersElements}
        </tr>
    </table>
    )
}


export default DaysFieldCommon;
