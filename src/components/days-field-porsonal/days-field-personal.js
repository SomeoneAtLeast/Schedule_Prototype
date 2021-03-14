import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {ClearAllDays, ChangeDayType, SelectWorker} from "../../store/actions"

import "./days-field-personal.scss"

import DaysFieldItemPersonal from "../days-field-personal-item";


class DaysFieldPresonal extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.SelectWorker(this.props.selectedWorker);
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

        daysInMonth.push(
            <td className = "days-field-personal-item" 
                key={workerNumber}>
                {workers[workerNumber].name}
            </td>
        )
        const daysFieldElements = visibleWorkers[workerNumber].days.map((item) => {
            
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
        const {workers, selectedWorker, filter} = this.props;
        const visibleDays = this.filterDays(workers[selectedWorker].days, filter)

        const daysNumbers = visibleDays.map((item) => {

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
    SelectWorker: PropTypes.func,
    ClearAllDays: PropTypes.func,
    filter: PropTypes.string,
    ChangeDayType: PropTypes.func,
    days: PropTypes.array,
    workers: PropTypes.array,
    selectedWorker: PropTypes.number

}

const mapDispatchToProps = { 
    ClearAllDays, 
    ChangeDayType,
    SelectWorker
}

const mapStateToProps = ({workers, selectedDay, filter, selectedWorker}) => {
    return {
        workers,
        selectedWorker,
        selectedDay,
        filter,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldPresonal);