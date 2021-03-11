/* eslint-disable react/prop-types */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {SelectWorker, ClearAllDays, ChangeDayType} from "../../store/actions"

import "./days-field-personal.scss"

import DaysFieldItemPersonal from "../days-field-personal-item";


class DaysFieldPresonal extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.SelectWorker();
        this.props.ClearAllDays();
    }

    componentWillUnmount() {
        this.props.ClearAllDays();
    }

    getWorkerPresonalDays (workerNumber) {
        const {workers, ChangeDayType} = this.props;

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
                            onClick={() => ChangeDayType(workers[workerNumber].id, item.id, "selected", "personal")}>
                                <DaysFieldItemPersonal
                                    workingHours={item.workingHours}
                                    onMakeDayWorking={() => ChangeDayType(workers[workerNumber].id, item.id, "worked", "personal")}
                                    onMakeDayWeekend={() => ChangeDayType(workers[workerNumber].id, item.id, "weekend", "personal")}
                                    onMakeDayVacation={() => ChangeDayType(workers[workerNumber].id, item.id, "vacation", "personal")}/>
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
        // закончить тут
        const visibleDays = this.filterDays(workers[selectedWorker].days, filter)
        const visibleWorkers = this.filterWorkers(workers[selectedWorker].days, selectedWorker, filter)

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

days = {visibleDays}
workers = {visibleWorkers}
selectedWorker = {id - 1}
ChangeDayType = {ChangeDayType}
SelectWorker = {() => SelectWorker(id - 1)}
ClearAllDays = {ClearAllDays}

const mapDispatchToProps = {
    SelectWorker, 
    ClearAllDays, 
    ChangeDayType
}

const mapStateToProps = ({workers, selectedWorker, selectedDay, filter}) => {
    return {
        workers,
        selectedWorker,
        selectedDay,
        filter,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldPresonal);