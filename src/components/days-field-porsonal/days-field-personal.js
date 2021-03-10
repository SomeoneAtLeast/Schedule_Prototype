/* eslint-disable react/prop-types */
import React, { Component } from "react";
import PropTypes from 'prop-types';

import "./days-field-personal.scss"

import DaysFieldItemPersonal from "../days-field-personal-item";


export default class DaysFieldPresonal extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.onSelectWorker();
        this.props.onClearAllDays();
    }

    componentWillUnmount() {
        this.props.onClearAllDays();
    }

    getWorkerPresonalDays (workerNumber) {
        const {workers, onChangeDayType} = this.props;

        let daysInMonth = [];

        daysInMonth.push(
            <td className = "days-field-personal-item" 
                key={workerNumber}>
                {workers[workerNumber].name}
            </td>
        )
        const daysFieldElements = workers[workerNumber].days.map((item) => {
            
            let classNames = "days-field-personal__item";
            const {weekend, worked, vacation, selected} = item;

            if(selected) {
                classNames += " selected";
            }

            if (worked) {
                classNames += " worked";
            }
            
            if(weekend) {
                classNames += " weekend";
            }

            if(vacation) {
                classNames += " vacation";
            }
            
            return (
                <td className = {classNames} 
                            key = {item.id}
                            onClick={() => onChangeDayType(workers[workerNumber].id, item.id, "selected", "personal")}>
                                <DaysFieldItemPersonal
                                    workingHours={item.workingHours}
                                    onMakeDayWorking={() => onChangeDayType(workers[workerNumber].id, item.id, "worked", "personal")}
                                    onMakeDayWeekend={() => onChangeDayType(workers[workerNumber].id, item.id, "weekend", "personal")}
                                    onMakeDayVacation={() => onChangeDayType(workers[workerNumber].id, item.id, "vacation", "personal")}/>
                </td>
            )
        })

        daysInMonth.push (
            daysFieldElements
        )

        return (
            daysInMonth
        )
    }

    render() {
        const {days, selectedWorker} = this.props;

        const daysNumbers = days.map((item) => {

            return (
                <th className = "days-field-personal-item" 
                    key={item.id}>
                    {item.id} {item.dayName}
                </th>
            )
        })

        return (
            <table className = "days-field-personal">
                <tbody>
                    <tr className = "days-field-personal-items-row">
                        <th className = "days-field-personal-item">
                        </th>
                        {daysNumbers}
                    </tr>
                    <tr className = "days-field-personal-items-row">
                        {this.getWorkerPresonalDays(selectedWorker)}
                    </tr>
                </tbody>
            </table>
        )
    }
}

DaysFieldPresonal.propTypes = {
    onChangeDayType: PropTypes.func,
    days: PropTypes.array,
    workers: PropTypes.array,
    selectedWorker: PropTypes.number

}
