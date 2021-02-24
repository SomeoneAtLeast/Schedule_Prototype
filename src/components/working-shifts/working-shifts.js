import React, {Component} from "react";

import  "./working-shifts.scss"

import {shifts, kmShifts, kmArr, glTable, workTeamsNames, months} from "../../models/shift-model/shift-model"

import WorkingShiftsSocialItem from "../working-shifts-social-item"
import WorkingShiftsKmItem from "../working-shifts-km-item"

export default class WorkingShifts extends Component {
    constructor() {
        super();

        this.state = {
            shifts: shifts,
            glTable: glTable,
            kmTable: kmArr,
            kmShifts: kmShifts,
            workTeamsNames: workTeamsNames,
            months: months,
        }
    }

    render() {
        const {shifts, glTable, kmTable, kmShifts, workTeamsNames, months} = this.state;

        const onTextChange = (id, dataArr, objKey) => (e) => {
            this.setState(() => {
                const index = dataArr.findIndex(elem => elem.id === id); 
                const obj = dataArr[index];
                obj[objKey] = e.target.value;
                const newArr = [...dataArr.slice(0, index), obj, ...dataArr.slice(index + 1)];
                if (dataArr === shifts) {
                    return {
                        shifts: newArr
                    } 
                } else if (dataArr === glTable) {
                    return {
                        glTable: newArr
                    } 
                } else if (dataArr === kmShifts) {
                    return {
                        kmShifts: newArr
                    } 
                } else if (dataArr === kmTable) {
                    return {
                        kmTable: newArr
                    } 
                } else if (dataArr === workTeamsNames) {
                    return {
                        workTeamsNames: newArr
                    } 
                } else if (dataArr === months) {
                    return {
                        months: newArr
                    } 
                }
            })
        }

        const table = (startTime, finishTime, numberOfRows, shiftNumber, key) => {
            let rows = [];
            
            for (let i = 0; i <= numberOfRows; i++) {
                rows.push(<WorkingShiftsSocialItem shift={shifts[shiftNumber]} shifts={shifts} onTextChange={onTextChange} key={key} id={key}/>);
            }
    
            return (
                <table className="working-shifts__table" key={key}>
                    <tbody>
                        <tr className={`working-shifts__table-row-header working-shifts__table-row-${startTime}-${finishTime}`}>
                            <th 
                                className={`working-shifts__table-header working-shifts__table-header-${startTime}-${finishTime}`}
                                colSpan="4"
                                >
                                    С
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        value={startTime}
                                        onChange={onTextChange(key, this.state.shifts, "startTime")}/>
                                    до
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        value={finishTime}
                                        onChange={onTextChange(key, this.state.shifts, "finishTime")}/>
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
                rows.push(<WorkingShiftsKmItem kmShifts={this.state.kmShifts} key={this.state.kmShifts[i].id} id={this.state.kmShifts[i].id} onTextChange={onTextChange}/>);
            }
            return (
                rows
            )
        }
        
        const getGlCells = (state, value, className, colSpan = 1) => {
            const glCells = this.state[state].map((item) => {
                const {id} = item;

                let insideValue = "";

                if (value == "name") {
                    insideValue = "name"
                } else if (value == "teamName") {
                    insideValue = "teamName"
                } else if (value == "shiftNumber") {
                    insideValue = "shiftNumber"
                } else if (value == "shiftName") {
                    insideValue = "shiftName"
                }

                return (
                    <td 
                        className={className}
                        key={id}
                        colSpan={colSpan}>
                        <input
                            className="working-shifts__table-header-value"
                            type="text"
                            onChange={onTextChange(id, this.state[state], insideValue)}
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
                            className="working-shifts__table-header-value"
                            type="text"
                            onChange={onTextChange(2, this.state.months, "month")}
                            value={this.state.months[0].month}
                            />
                </div>
                <div className="working-shifts__table-wrapper">
                    <table className="working-shifts__table">
                        <caption className="working-shifts__table-caption">
                            <input
                                className="working-shifts__table-header-value"
                                type="text"
                                onChange={onTextChange(1, this.state.workTeamsNames, "workTeamsName")}
                                value={this.state.workTeamsNames[0].workTeamsName}
                                />
                        </caption>
                        <tbody>
                            <tr className="working-shifts__table-row-header working-shifts__table-row-gl">
                                {getGlCells("glTable", "name", "working-shifts__table-header working-shifts__table-header-gl")}
                            </tr>
                            <tr className="working-shifts__table-row working-shifts__table-row-team">
                                {getGlCells("glTable", "teamName", "working-shifts__table-cell working-shifts__table-cell-team")}
                            </tr> 
                            <tr className="working-shifts__table-row working-shifts__table-row-shifts">
                                {getGlCells("glTable", "shiftNumber", "working-shifts__table-cell working-shifts__table-cell-shift")}
                            </tr>
                        </tbody>
                    </table>
                    {tables(7)}
                </div>
                <div className="working-shifts__table-wrapper">
                    <table className="working-shifts__table">
                        <caption className="working-shifts__table-caption">
                            <input
                                    className="working-shifts__table-header-value"
                                    type="text"
                                    onChange={onTextChange(2, this.state.workTeamsNames, "workTeamsName")}
                                    value={this.state.workTeamsNames[1].workTeamsName}
                                    />
                        </caption>
                        <tbody>
                            <tr className="working-shifts__table-row-header working-shifts__table-row-gl">
                                {getGlCells("kmTable", "name", "working-shifts__table-header working-shifts__table-header-gl", 3)}
                                {getGlCells("kmTable", "shiftName", "working-shifts__table-header working-shifts__table-header-gl")}

                            </tr>
                            {tableKmRows(7)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}