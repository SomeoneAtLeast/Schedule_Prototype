import React from "react";
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {TextChange} from "../../store/actions"

import  "./working-shifts.scss"

import WorkingShiftsSocialItem from "../working-shifts-social-item"
import WorkingShiftsKmItem from "../working-shifts-km-item"

const WorkingShifts = ({shifts, kmShifts, months, workTeamsNames, glTable, kmTable, TextChange}) => {

        const table = (startTime, finishTime, numberOfRows, shiftNumber, key) => {
            let rows = [];
            
            for (let i = 0; i <= numberOfRows; i++) {
                rows.push(<WorkingShiftsSocialItem shift={shifts[shiftNumber]} key={key} id={key}/>);
            }
    
            return (
                <table className="working-shifts__table" key={key}>
                    <tbody>
                        <tr className={`working-shifts__table-row-header working-shifts__table-row-${startTime}-${finishTime}`}>
                            <th 
                                className={`working-shifts__table-header
                                            working-shifts__table-header-hours
                                            working-shifts__table-header-${startTime}-${finishTime}`}
                                colSpan="3"
                                >
                                    С
                                    <input
                                        className="working-shifts__table-input-value"
                                        type="text"
                                        maxLength={2}
                                        value={startTime}
                                        onChange={(e) => TextChange(key, shifts, "startTime", e)}/>
                                    до
                                    <input
                                        className="working-shifts__table-input-value"
                                        type="text"
                                        maxLength={2}
                                        value={finishTime}
                                        onChange={(e) => TextChange(key, shifts, "finishTime", e)}/>
                            </th>
                            <th className="working-shifts__table-header-hours-empty">
                            </th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            )
        }

        const tables = (tablesNumber) => {
            let tablesArr = [];
            for (let i = 0; i <= (tablesNumber - 1); i++) {
                tablesArr.push(table(shifts[i].startTime, shifts[i].finishTime, 0, i, i + 100))
            }
    
            return tablesArr
        }

        const tableKmRows = (number) => {
            let rows = [];
            for (let i = 0; i < number; i++) {
                rows.push(<WorkingShiftsKmItem kmShifts={kmShifts} key={kmShifts[i].id} id={kmShifts[i].id} onTextChange={TextChange}/>);
            }
            return (
                rows
            )
        }
        
        const getGlCells = (state, value, className, colSpan = 1) => {
            const glCells = state.map((item) => {
                const {id, nameMaxLength, shiftNameMaxLength} = item;

                let insideValue = "";
                let MaxLength = nameMaxLength;

                if (value == "name") {
                    insideValue = "name"
                } else if (value == "teamName") {
                    insideValue = "teamName"
                } else if (value == "shiftNumber") {
                    insideValue = "shiftNumber"
                } else if (value == "shiftName") {
                    insideValue = "shiftName"
                    MaxLength = shiftNameMaxLength;
                }

                return (
                    <td 
                        className={className}
                        key={id}
                        colSpan={colSpan}>
                        <input
                            maxLength={MaxLength}
                            className="working-shifts__table-input-value"
                            type="text"
                            onChange={(e) => TextChange(id, state, insideValue, e)}
                            value={item[insideValue]}
                            />
                    </td>
                )
            })  

            return (
                glCells
            )
        }

        return (
            <div className="working-shifts" key={123}>
                <div className="working-shifts__table-month">
                    <input
                            className="working-shifts__table-input-value"
                            type="text"
                            maxLength={15}
                            onChange={(e) => TextChange(2, months, "month", e)}
                            value={months[0].month}
                            />
                </div>
                <div className="working-shifts__table-wrapper working-shifts__table-wrapper-social">
                    <table className="working-shifts__table">
                        <caption className="working-shifts__table-caption working-shifts__table-caption-social">
                            <input
                                className="working-shifts__table-input-value"
                                type="text"
                                maxLength={70}
                                onChange={(e) => TextChange(1, workTeamsNames, "workTeamsName", e)}
                                value={workTeamsNames[0].workTeamsName}
                                />
                        </caption>
                        <tbody>
                            <tr className="working-shifts__table-row-header working-shifts__table-row-gl">
                                {getGlCells(glTable, "name", "working-shifts__table-header working-shifts__table-header-gl")}
                            </tr>
                            <tr className="working-shifts__table-row working-shifts__table-row-team">
                                {getGlCells(glTable, "teamName", "working-shifts__table-cell working-shifts__table-cell-team")}
                            </tr> 
                            <tr className="working-shifts__table-row working-shifts__table-row-shifts">
                                {getGlCells(glTable, "shiftNumber", "working-shifts__table-cell working-shifts__table-cell-shift")}
                            </tr>
                        </tbody>
                    </table>
                    {tables(7)}
                </div>
                <div className="working-shifts__table-wrapper working-shifts__table-wrapper-km">
                    <table className="working-shifts__table">
                        <caption className="working-shifts__table-caption working-shifts__table-caption-km">
                            <input
                                    className="working-shifts__table-input-value"
                                    type="text"
                                    maxLength={35}
                                    onChange={(e) => TextChange(2, workTeamsNames, "workTeamsName", e)}
                                    value={workTeamsNames[1].workTeamsName}
                                    />
                        </caption>
                        <tbody>
                            <tr className="working-shifts__table-row-header working-shifts__table-row-gl">
                                {getGlCells(kmTable, "name", "working-shifts__table-header working-shifts__table-header-gl", 3)}
                                {getGlCells(kmTable, "shiftName", "working-shifts__table-header working-shifts__table-header-gl")}
                            </tr>
                            {tableKmRows(7)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
}

WorkingShifts.propTypes = {
    shifts: PropTypes.array,
    kmShifts: PropTypes.array,
    months: PropTypes.array,
    workTeamsNames: PropTypes.array,
    glTable: PropTypes.array,
    kmTable: PropTypes.array,
    TextChange: PropTypes.func,
}


const mapDispatchToProps = {
    TextChange
}

const mapStateToProps = ({shifts, kmShifts, workTeamsNames, months, glTable, kmTable}) => {

    return {
        shifts,
        kmShifts,
        months,
        workTeamsNames,
        glTable,
        kmTable,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkingShifts);