/* eslint-disable react/prop-types */
import React, {Component} from "react";

import  "./working-shifts.scss"

import WorkingShiftsSocialItem from "../working-shifts-social-item"
import WorkingShiftsKmItem from "../working-shifts-km-item"

const totalShifts = 6;
let emptyShifts = [];
const getRandomNumber = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }


for (let i = 0; i <= totalShifts; i++) {
    if (i <= 4) {
        emptyShifts.push(
            {
                startTime: 8 + i,
                finishTime: 20 + i,
                firstShiftNumber: 1,
                secondShiftNumber: 2,
                thirdShiftNumber: 1,
                fourthShiftNumber: 2,
                id: i + 100
            }
        )
    } else if (i === 5) {
        emptyShifts.push(
            {
                startTime: 14,
                finishTime: "02",
                firstShiftNumber: 1,
                secondShiftNumber: 2,
                thirdShiftNumber: 1,
                fourthShiftNumber: 2,
                id: 105
            }
        )
    } else if (i === 6) {
        emptyShifts.push(
            {
                startTime: 21,
                finishTime: "09",
                firstShiftNumber: 1,
                secondShiftNumber: 2,
                thirdShiftNumber: 1,
                fourthShiftNumber: 2,
                id: 106
            }
        )
    }
}

const totalWorkers = 12;

emptyShifts.forEach(item => {
    for (let i = 0; i <= totalWorkers; i++) {
        item[`worker${i}`] = getRandomNumber(0, 1) ? "Сотрудник" : "-";
    }
});

const shifts = emptyShifts;


const totalKmShifts = 6;
let emptyKmShifts = [];

for (let i = 0; i <= totalKmShifts; i++) {
        emptyKmShifts.push(
            {   
                worker: getRandomNumber(0, 1) ? "Сотрудник" : "-",
                shiftNumber: 1,
                id: i + 100
            }
        )
}

const kmShifts = emptyKmShifts;

let glArr = [
    {
        glName: "Групп-лидер 1",
        teamName: "Команда 1",
        shiftNumber: "Смена 1",
        id: 1001
    },
    {
        glName: "Групп-лидер 2",
        teamName: "Команда 2",
        shiftNumber: "Смена 2",
        id: 1002
    },
    {
        glName: "Групп-лидер 3",
        teamName: "Команда 3",
        shiftNumber: "Смена 1 и 2",
        id: 1003
    },
    {
        shiftName: "№ Смены",
        firstShiftNumber: "1",
        secondShiftNumber: "2",
        id: 1004
    }, {
        glName: "Групп-лидер",
        shiftName: "№ Смены",
        id: 1005
    },
];

const glTable = glArr;

const workTeamsNames = [
    {
        workTeamsName: "Социальные Сети",
        id: 1
    },
    {
        workTeamsName: "КМ",
        id: 2
    },
]

const months = [
    {
        month: "Февраль",
        id: 2
    },
]
export default class WorkingShifts extends Component {
    constructor() {
        super();

        this.state = {
            shifts: shifts,
            glTable: glTable,
            kmShifts: kmShifts,
            workTeamsNames: workTeamsNames,
            months: months,
        }
    }

    render() {
        const {shifts, glTable} = this.state;

        const onTextChange = (id, dataArr, objKey) => (e) => {
            this.setState(() => {
                const index = dataArr.findIndex(elem => elem.id === id); 
                const obj = dataArr[index];
                obj[objKey] = e.target.value;
                const newShifts = [...dataArr.slice(0, index), obj, ...dataArr.slice(index + 1)];
                if (dataArr === this.state.shifts) {
                    return {
                        shifts: newShifts
                    } 
                } else if (dataArr === this.state.glTable) {
                    return {
                        glTable: newShifts
                    } 
                } else if (dataArr === this.state.kmShifts) {
                    return {
                        kmShifts: newShifts
                    } 
                } else if (dataArr === this.state.workTeamsNames) {
                    return {
                        workTeamsNames: newShifts
                    } 
                } else if (dataArr === this.state.months) {
                    return {
                        months: newShifts
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
                                <th className="working-shifts__table-header working-shifts__table-header-gl">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTextChange(1001, this.state.glTable, "glName")}
                                        value={glTable[0].glName}
                                        />
                                    </th>
                                <th className="working-shifts__table-header working-shifts__table-header-gl">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTextChange(1002, this.state.glTable, "glName")}
                                        value={glTable[1].glName}
                                        />
                                </th>
                                <th className="working-shifts__table-header working-shifts__table-header-gl">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTextChange(1003, this.state.glTable, "glName")}
                                        value={glTable[2].glName}
                                        />
                                </th>
                                <th className="working-shifts__table-header working-shifts__table-header-gl">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTextChange(1004, this.state.glTable, "shiftName")}
                                        value={glTable[3].shiftName}
                                        />
                                    </th>
                            </tr>
                            <tr className="working-shifts__table-row working-shifts__table-row-team">
                                <td className="working-shifts__table-cell working-shifts__table-cell-team">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTextChange(1001, this.state.glTable, "teamName")}
                                        value={glTable[0].teamName}
                                        />
                                    </td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-team">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTextChange(1002, this.state.glTable, "teamName")}
                                        value={glTable[1].teamName}
                                        />
                                    </td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-team">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTextChange(1003, this.state.glTable, "teamName")}
                                        value={glTable[2].teamName}
                                        />
                                    </td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-team">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTextChange(1004, this.state.glTable, "firstShiftNumber")}
                                        value={glTable[3].firstShiftNumber}
                                        />
                                    </td>
                            </tr> 
                            <tr className="working-shifts__table-row working-shifts__table-row-shifts">
                                <td className="working-shifts__table-cell working-shifts__table-cell-shift">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTextChange(1001, this.state.glTable, "shiftNumber")}
                                        value={glTable[0].shiftNumber}
                                        />
                                </td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-shift">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTextChange(1002, this.state.glTable, "shiftNumber")}
                                        value={glTable[1].shiftNumber}
                                        />
                                </td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-shift">
                                    <input
                                            className="working-shifts__table-header-value"
                                            type="text"
                                            onChange={onTextChange(1003, this.state.glTable, "shiftNumber")}
                                            value={glTable[2].shiftNumber}
                                            />
                                </td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-shift">
                                <input
                                            className="working-shifts__table-header-value"
                                            type="text"
                                            onChange={onTextChange(1004, this.state.glTable, "secondShiftNumber")}
                                            value={glTable[3].secondShiftNumber}
                                            />
                                </td>
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
                                <th 
                                    className="working-shifts__table-header working-shifts__table-header-gl"
                                    colSpan="3">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTextChange(1005, this.state.glTable, "glName")}
                                        value={this.state.glTable[4].glName}
                                        />
                                    </th>
                                <td className="working-shifts__table-header working-shifts__table-header-gl">
                                    <input
                                            className="working-shifts__table-header-value"
                                            type="text"
                                            onChange={onTextChange(1005, this.state.glTable, "shiftName")}
                                            value={this.state.glTable[4].shiftName}
                                            />
                                    </td>
                            </tr>
                            {tableKmRows(7)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}