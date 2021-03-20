import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from "react-redux"
import {SelectWorker, ChangeDayType, SelectDay} from "../../store/actions"
import "./days-field-common.scss"

const DaysFieldCommon = ({workers, SelectWorker, SelectDay, ChangeDayType}) => {
    const daysNumbers = workers[0].days.map((item) => {

        return (
            <th className = "days-field-common-days-item" 
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

    const getWorkerElement = (workerNumber) => {
        let daysInMonth = [];

        daysInMonth.push(
            <td className = "days-field-common-item" 
                key={workerNumber}
                onClick={() => SelectWorker(workerNumber)}>
                    <Link to={`/personalschedule/${workerNumber + 1}`} className = "days-field-common-item-link">
                        {workers[workerNumber].name}
                    </Link>
            </td>
        )

        for (let i = 1; i <= workers[0].days.length; i++) {
            let classNames = "days-field-common-item";

            if (workers[workerNumber].days[i - 1].selected) {
                classNames += " selected";
            }

            if (workers[workerNumber].days[i - 1].worked) {
                classNames += " worked";
            }

            if (workers[workerNumber].days[i - 1].weekend) {
                classNames += " weekend";
            }

            if (workers[workerNumber].days[i - 1].vacation) {
                classNames += " vacation";
            }

            const SelectDayAndChangeDayType = () => {
                SelectDay(workers[workerNumber].id, workers[workerNumber].days[i - 1].id);
                ChangeDayType(workers[workerNumber].id, workers[workerNumber].days[i - 1].id, "selected")
            }
            daysInMonth.push(
                <td className = {classNames}
                    key={i + 1000}
                    onClick={() => SelectDayAndChangeDayType()}>
                    {workers[workerNumber].days[i - 1].workingHours}
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
                <th className = "days-field-common-days-item">
                    Апрель
                </th>
                {daysNumbers}
            </tr>
            {getWorkersElements()}
        </tbody>
    </table>
    )
}

DaysFieldCommon.propTypes = {
    workers: PropTypes.array,
    SelectWorker: PropTypes.func,
    SelectDay: PropTypes.func,
    ChangeDayType: PropTypes.func,
}

const mapDispatchToProps = {
    SelectWorker, 
    ChangeDayType,
    SelectDay
}

const mapStateToProps = ({workers}) => {
    return {
        workers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldCommon);