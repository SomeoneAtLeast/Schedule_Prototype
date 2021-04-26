import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {ClearAllDays, ChangeDayType, SelectWorker, ShowOrCloseWorkingHours, ChangeMonth, ChangeYear} from "../../store/actions"

import "./days-field-personal.scss"

import DaysFieldItemPersonal from "../days-field-personal-item";


class DaysFieldPresonal extends Component {

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

        const {workers, currentYear, currentMonth} = this.props;
        const targetWorker = workers[selectedWorker];

        if(filter === "worked") {
            const workedDays = workersArr.filter(item => item.worked);
            const oldMonth = {...targetWorker.years[currentYear - 1].months[currentMonth - 1]};
            const newMonth = {...oldMonth, days: workedDays};
            const newMonths = [...targetWorker.years[currentYear - 1].months.slice(0, currentMonth - 1), newMonth, ...targetWorker.years[currentYear - 1].months.slice(currentMonth)];
            const oldYear = {...targetWorker.years[currentYear - 1]};
            const newYear = {...oldYear, months: newMonths};
            const newYears = [...targetWorker.years.slice(0, currentYear - 1), newYear, ...targetWorker.years.slice(currentYear)];
            const newWorker = {...targetWorker, years: newYears}
            const newWorkers = [...workers.slice(0, selectedWorker), newWorker, ...workers.slice(selectedWorker + 1)];
            return  newWorkers
        } else if (filter === "weekends") {
            const weekendDays = workersArr.filter(item => item.weekend);
            const oldMonth = {...targetWorker.years[currentYear - 1].months[currentMonth - 1]};
            const newMonth = {...oldMonth, days: weekendDays};
            const newMonths = [...targetWorker.years[currentYear - 1].months.slice(0, currentMonth - 1), newMonth, ...targetWorker.years[currentYear - 1].months.slice(currentMonth)];
            const oldYear = {...targetWorker.years[currentYear - 1]};
            const newYear = {...oldYear, months: newMonths};
            const newYears = [...targetWorker.years.slice(0, currentYear - 1), newYear, ...targetWorker.years.slice(currentYear)];
            const newWorker = {...targetWorker, years: newYears}
            const newWorkers = [...workers.slice(0, selectedWorker), newWorker, ...workers.slice(selectedWorker + 1)];
            return  newWorkers
        } else if (filter === "vacation") {
            const vacationDays = workersArr.filter(item => item.vacation);
            const oldMonth = {...targetWorker.years[currentYear - 1].months[currentMonth - 1]};
            const newMonth = {...oldMonth, days: vacationDays};
            const newMonths = [...targetWorker.years[currentYear - 1].months.slice(0, currentMonth - 1), newMonth, ...targetWorker.years[currentYear - 1].months.slice(currentMonth)];
            const oldYear = {...targetWorker.years[currentYear - 1]};
            const newYear = {...oldYear, months: newMonths};
            const newYears = [...targetWorker.years.slice(0, currentYear - 1), newYear, ...targetWorker.years.slice(currentYear)];
            const newWorker = {...targetWorker, years: newYears}
            const newWorkers = [...workers.slice(0, selectedWorker), newWorker, ...workers.slice(selectedWorker + 1)];
            return  newWorkers
        } else {
            return  workers
        }
    }

    getWorkerPresonalDays (workerNumber) {
        const {workers, ChangeDayType, currentYear, currentMonth, selectedWorker, filter} = this.props;
        const visibleWorkers = this.filterWorkers(workers[selectedWorker].years[currentYear - 1].months[currentMonth - 1].days, selectedWorker, filter)
        const visibleWorker = visibleWorkers[workerNumber];
        const targetWorker = workers[workerNumber];
        let daysInMonth = [];

        if (visibleWorker.years[currentYear - 1].months[currentMonth - 1].days.length === 0) {
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
                    {targetWorker.name}
                </td>
            )
        }

        const daysFieldElements = visibleWorker.years[currentYear - 1].months[currentMonth - 1].days.map((item) => {
            
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
                            workerNumber = {targetWorker.id}
                            dayNumber = {item.id}
                            openDayMenu = {() => ChangeDayType(targetWorker.id, item.id, "selected", null, null, "personal")}
                            openChangeShiftMenu = {() => ChangeDayType(targetWorker.id, item.id, "changeShiftMenuOpen", null, null, "personal")}
                            onMakeDayWeekend = {() => ChangeDayType(targetWorker.id, item.id, "weekend", null, null, "personal")}
                            onMakeDayVacation = {() => ChangeDayType(targetWorker.id, item.id, "vacation", null, null, "personal")}
                            closeDayMenu = {() => ChangeDayType(targetWorker.id, item.id, "selected", null, null, "personal")}
                            takeOff = {() => ChangeDayType(targetWorker.id, item.id, "takeOf", null, null, "personal")}/>
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
        const {workers, currentYear, currentMonth, selectedWorker, ChangeMonth, ChangeYear, ClearAllDays, filter, id} = this.props;
        const visibleDays = this.filterDays(workers[selectedWorker].years[currentYear - 1].months[currentMonth - 1].days, filter)

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

        // потом повесить на useEffect
        const ChangeYearAndClearDays = (value) => {
            ChangeYear(value);
            ClearAllDays();
        }
        
        const ChangeMonthAndClearDays = (value) => {
            ChangeMonth(value);
            ClearAllDays();
        }
        
        return (
            <div className="days-field-personal-wrapper">
                <div className = "days-field-personal-years">
                {/* Убрать cammon и сделать адаптив*/}

                    <div className = "days-field-common__days-item-btn-group days-field-common__days-item-btn-group--year">
                        <button
                            className = "days-field-common__days-item-btn days-field-common__days-item-btn-left"
                            onClick={() => ChangeYearAndClearDays("back")}>
                            ←
                        </button>
                        <div className = "days-field-common__days-item-year">
                            {workers[0].years[currentYear - 1].name}
                        </div>
                        <button
                            className = "days-field-common__days-item-btn days-field-common__days-item-btn-right"
                            onClick={() => ChangeYearAndClearDays("next")}>
                            →
                        </button>
                    </div>
                </div>
                <div className="days-field-personal-content-field">
                    <table className = "days-field-personal">
                        <tbody>
                            <tr className = "days-field-personal__items-row">
                                <th className = "days-field-personal__item">
                                    <div className = "days-field-personal__item-btn-group">
                                        <button
                                            className = "days-field-personal__item-btn days-field-personal__item-btn-left"
                                            onClick={() => ChangeMonthAndClearDays("back")}>
                                            ←
                                        </button>
                                        <div className = "days-field-personal__item-month">
                                            {workers[0].years[currentYear - 1].months[currentMonth - 1].name}
                                        </div>
                                        <button
                                            className = "days-field-personal__item-btn days-field-personal__item-btn-right"
                                            onClick={() => ChangeMonthAndClearDays("next")}>
                                            →
                                        </button>
                                    </div>
                                </th>
                                {daysNumbers}
                            </tr>
                            <tr className = "days-field-personal__items-row">
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
    ShowOrCloseWorkingHours,
    ChangeMonth,
    ChangeYear
}

const mapStateToProps = ({workers, selectedDay, filter, selectedWorker, makeWorkingBtnActive, currentMonth, currentYear}) => {
    return {
        workers,
        selectedWorker,
        selectedDay,
        filter,
        makeWorkingBtnActive,
        currentMonth,
        currentYear
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldPresonal);