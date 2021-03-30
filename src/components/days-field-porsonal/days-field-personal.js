import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {ClearAllDays, ChangeDayType, SelectWorker, ShowOrCloseWorkingHours} from "../../store/actions"

import "./days-field-personal.scss"

import DaysFieldItemPersonal from "../days-field-personal-item";


class DaysFieldPresonal extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.SelectWorker(this.props.id);
        this.props.ClearAllDays();
    }

    componentWillUnmount() {
        this.props.ClearAllDays();
    }

    filterDays(workers, filter) {
        if(filter === "worked") {
            return  workers.filter(item => item.worked)
        } else if (filter === "weekends") {
            return  workers.filter(item => item.weekend) 
        } else if (filter === "vacation") {
            return  workers.filter(item => item.vacation) 
        } else {
            return  workers
        }
    }

    filterWorkers(workersArr, selectedWorker, filter) {
        const {workers} = this.props;
        if(filter === "worked") {
            const workedDays = workersArr.filter(item => item.worked);
            const newWorker = {...workers[selectedWorker], days: workedDays}
            const newWorkers = [...workers.slice(0, selectedWorker), newWorker, ...workers.slice(selectedWorker + 1)];
            return  newWorkers
        } else if (filter === "weekends") {
            const weekendDays = workersArr.filter(item => item.weekend);
            const newWorker = {...workers[selectedWorker], days: weekendDays}
            const newWorkers = [...workers.slice(0, selectedWorker), newWorker, ...workers.slice(selectedWorker + 1)];
            return  newWorkers
        } else if (filter === "vacation") {
            const vacationDays = workersArr.filter(item => item.vacation);
            const newWorker = {...workers[selectedWorker], days: vacationDays}
            const newWorkers = [...workers.slice(0, selectedWorker), newWorker, ...workers.slice(selectedWorker + 1)];
            return  newWorkers
        } else {
            return  workers
        }
    }

    getWorkerPresonalDays (workerNumber) {
        const {workers, ChangeDayType, selectedWorker, filter} = this.props;
        const visibleWorkers = this.filterWorkers(workers[selectedWorker].days, selectedWorker, filter)
        let daysInMonth = [];

        if (visibleWorkers[workerNumber].days.length === 0) {
            daysInMonth.push(
                <td className = "days-field-personal__item days-field-personal__no-items" 
                    key={workerNumber}>
                        Здесь пусто
                </td>
            )
        } else {
            daysInMonth.push(
                <td className = "days-field-personal__item" 
                    key={workerNumber}>
                    {workers[workerNumber].name}
                </td>
            )
        }

        const daysFieldElements = visibleWorkers[workerNumber].days.map((item) => {
            
            let classNames = "days-field-personal__item";
            const {weekend, vacation, worked, selected, workingShiftDay, changeShiftMenuOpen} = item;

            if(selected) {
                classNames += " days-field-personal--selected ";
            }

            if (changeShiftMenuOpen) {
                classNames += " days-field-personal--show-working-hours";
            }
            
            if (worked) {
                classNames += ` days-field-personal--worked-${workingShiftDay}`;
            }

            if(weekend) {
                classNames += " days-field-personal--weekend";
            }

            if(vacation) {
                classNames += " days-field-personal--vacation";
            }

            return (
                <td className = {classNames} 
                    key = {item.id}>
                        <DaysFieldItemPersonal
                            workingHours = {item.workingHours}
                            workerNumber = {workers[workerNumber].id}
                            dayNumber = {item.id}
                            openDayMenu = {() => ChangeDayType(workers[workerNumber].id, item.id, "selected", null, null, "personal")}
                            openChangeShiftMenu = {() => ChangeDayType(workers[workerNumber].id, item.id, "changeShiftMenuOpen", null, null, "personal")}
                            onMakeDayWeekend = {() => ChangeDayType(workers[workerNumber].id, item.id, "weekend", null, null, "personal")}
                            onMakeDayVacation = {() => ChangeDayType(workers[workerNumber].id, item.id, "vacation", null, null, "personal")}
                            closeDayMenu = {() => ChangeDayType(workers[workerNumber].id, item.id, "selected", null, null, "personal")}/>
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
        const {workers, selectedWorker, filter, id} = this.props;
        const visibleDays = this.filterDays(workers[selectedWorker].days, filter)

        const daysNumbers = visibleDays.map((item) => {

            return (
                <th className = "days-field-personal__item" 
                    key={item.id}>
                        <div>
                            {item.id}
                        </div>
                        <div>
                            {item.dayName}
                        </div>
                </th>
            )
        })

        return (
            <div className="days-field-personal-wrapper">
                <div className="days-field-personal-content-field">
                    <table className = "days-field-personal">
                        <tbody>
                            <tr className = "days-field-personal-items-row">
                                <th className = "days-field-personal__item">
                                    Апрель
                                </th>
                                {daysNumbers}
                            </tr>
                            <tr className = "days-field-personal-items-row">
                                {this.getWorkerPresonalDays(id)}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )  
    }
}

DaysFieldPresonal.propTypes = {
    SelectWorker: PropTypes.func,
    ClearAllDays: PropTypes.func,
    filter: PropTypes.string,
    ChangeDayType: PropTypes.func,
    days: PropTypes.array,
    workers: PropTypes.array,
    selectedWorker: PropTypes.number,
    id: PropTypes.number,
    ShowOrCloseWorkingHours: PropTypes.func,
}

const mapDispatchToProps = { 
    ClearAllDays, 
    ChangeDayType,
    SelectWorker,
    ShowOrCloseWorkingHours
}

const mapStateToProps = ({workers, selectedDay, filter, selectedWorker, makeWorkingBtnActive}) => {
    return {
        workers,
        selectedWorker,
        selectedDay,
        filter,
        makeWorkingBtnActive
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldPresonal);