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
                shiftNumber: 1,
                id: i + 100
            }
        )
    } else if (i === 5) {
        emptyShifts.push(
            {
                startTime: 14,
                finishTime: "02",
                shiftNumber: 1,
                id: 106
            }
        )
    } else if (i === 6) {
        emptyShifts.push(
            {
                startTime: 21,
                finishTime: "09",
                shiftNumber: 1,
                id: 107
            }
        )
    }
}

const totalWorkers = 6;

emptyShifts.forEach(item => {
    for (let i = 1; i <= totalWorkers; i++) {
        item[`worker${i}`] = getRandomNumber(0, 1) ? "Сотрудник" : "-";
    }
});

const shifts = emptyShifts;

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
    },
];

const glTable = glArr;

export default class WorkingShifts extends Component {
    constructor() {
        super();

        this.state = {
            shifts: shifts,
            glTable: glTable
        }
    }

    tableKmRows (number) {
        let rows = [];
        for (let i = 0; i < number; i++) {
            rows.push(<WorkingShiftsKmItem shifts={this.state.shifts[i]} key={this.state.shifts[i].id}/>);
        }
        return (
            rows
        )
    }

    render() {
            const {shifts, glTable} = this.state;

        const onStartTimeChange = (id) => (e) => {
            console.log(id, e.target.value);

            this.setState(({shifts}) => {
                const index = shifts.findIndex(elem => elem.id === (id + 100)); 
                const oldShift = shifts[index];
                const newShift = {...oldShift, startTime: e.target.value}
                const newShifts = [...shifts.slice(0, index), newShift, ...shifts.slice(index + 1)];
    
                return {
                    shifts: newShifts
                }
            })
        }

        const onFinishTimeChange = (id) => (e) => {
            console.log(id, e.target.value);

            this.setState(({shifts}) => {
                const index = shifts.findIndex(elem => elem.id === (id + 100)); 
                console.log(id)
                console.log(index)
                const oldShift = shifts[index];
                const newShift = {...oldShift, finishTime: e.target.value}
                const newShifts = [...shifts.slice(0, index), newShift, ...shifts.slice(index + 1)];
    
                return {
                    shifts: newShifts
                }
            })
        }

        const onGlNameChange = (id) => (e) => {
            this.setState(({glTable}) => {
                const index = glTable.findIndex(elem => elem.id === id); 
                const oldGlTableItem = glTable[index];
                const newGlTableItem = {...oldGlTableItem, glName: e.target.value}
                const newGlTable = [...glTable.slice(0, index), newGlTableItem, ...glTable.slice(index + 1)];
    
                return {
                    glTable: newGlTable
                }
            })
        }

        const onTeamNameChange = (id) => (e) => {
            this.setState(({glTable}) => {
                const index = glTable.findIndex(elem => elem.id === id); 
                const oldGlTableItem = glTable[index];
                const newGlTableItem = {...oldGlTableItem, teamName: e.target.value}
                const newGlTable = [...glTable.slice(0, index), newGlTableItem, ...glTable.slice(index + 1)];
    
                return {
                    glTable: newGlTable
                }
            })
        }

        const onShiftNumberChange = (id) => (e) => {
            this.setState(({glTable}) => {
                const index = glTable.findIndex(elem => elem.id === id); 
                const oldGlTableItem = glTable[index];
                const newGlTableItem = {...oldGlTableItem, shiftNumber: e.target.value}
                const newGlTable = [...glTable.slice(0, index), newGlTableItem, ...glTable.slice(index + 1)];
    
                return {
                    glTable: newGlTable
                }
            })
        }

        const onShiftNameChange = (id) => (e) => {
            this.setState(({glTable}) => {
                const index = glTable.findIndex(elem => elem.id === id); 
                const oldGlTableItem = glTable[index];
                const newGlTableItem = {...oldGlTableItem, shiftName: e.target.value}
                const newGlTable = [...glTable.slice(0, index), newGlTableItem, ...glTable.slice(index + 1)];
    
                return {
                    glTable: newGlTable
                }
            })
        }

        const onFirstShiftNumberChange = (id) => (e) => {
            this.setState(({glTable}) => {
                const index = glTable.findIndex(elem => elem.id === id); 
                const oldGlTableItem = glTable[index];
                const newGlTableItem = {...oldGlTableItem, firstShiftNumber: e.target.value}
                const newGlTable = [...glTable.slice(0, index), newGlTableItem, ...glTable.slice(index + 1)];
    
                return {
                    glTable: newGlTable
                }
            })
        }

        const onSecondShiftNumberChange = (id) => (e) => {
            this.setState(({glTable}) => {
                const index = glTable.findIndex(elem => elem.id === id); 
                const oldGlTableItem = glTable[index];
                const newGlTableItem = {...oldGlTableItem, secondShiftNumber: e.target.value}
                const newGlTable = [...glTable.slice(0, index), newGlTableItem, ...glTable.slice(index + 1)];
    
                return {
                    glTable: newGlTable
                }
            })
        }

        const table = (startTime, finishTime, numberOfRows, shiftNumber, key) => {
            let rows = [];
            
            for (let i = 0; i <= numberOfRows; i++) {
                rows.push(<WorkingShiftsSocialItem shifts={shifts[shiftNumber]} key={shifts[i].id}/>);
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
                                        onChange={onStartTimeChange(key)}/>
                                    до
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        value={finishTime}
                                        onChange={onFinishTimeChange(key)}/>
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
                tablesArr.push(table(shifts[i].startTime, shifts[i].finishTime, 1, i, i))
            }
    
            return tablesArr
        }

        return (
            <div className="working-shifts">
                <div className="working-shifts__table-month">
                        Февраль
                </div>
                <div className="working-shifts__table-wrapper">
                    <table className="working-shifts__table">
                        <caption className="working-shifts__table-caption">
                            Социальные Сети
                        </caption>
                        <tbody>
                            <tr className="working-shifts__table-row-header working-shifts__table-row-gl">
                                <th className="working-shifts__table-header working-shifts__table-header-gl">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onGlNameChange(1001)}
                                        value={glTable[0].glName}
                                        />
                                    </th>
                                <th className="working-shifts__table-header working-shifts__table-header-gl">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onGlNameChange(1002)}
                                        value={glTable[1].glName}
                                        />
                                </th>
                                <th className="working-shifts__table-header working-shifts__table-header-gl">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onGlNameChange(1003)}
                                        value={glTable[2].glName}
                                        />
                                </th>
                                <th className="working-shifts__table-header working-shifts__table-header-gl">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onShiftNameChange(1004)}
                                        value={glTable[3].shiftName}
                                        />
                                    </th>
                            </tr>
                            <tr className="working-shifts__table-row working-shifts__table-row-team">
                                <td className="working-shifts__table-cell working-shifts__table-cell-team">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTeamNameChange(1001)}
                                        value={glTable[0].teamName}
                                        />
                                    </td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-team">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTeamNameChange(1002)}
                                        value={glTable[1].teamName}
                                        />
                                    </td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-team">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onTeamNameChange(1003)}
                                        value={glTable[2].teamName}
                                        />
                                    </td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-team">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onFirstShiftNumberChange(1004)}
                                        value={glTable[3].firstShiftNumber}
                                        />
                                    </td>
                            </tr> 
                            <tr className="working-shifts__table-row working-shifts__table-row-shifts">
                                <td className="working-shifts__table-cell working-shifts__table-cell-shift">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onShiftNumberChange(1001)}
                                        value={glTable[0].shiftNumber}
                                        />
                                </td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-shift">
                                    <input
                                        className="working-shifts__table-header-value"
                                        type="text"
                                        onChange={onShiftNumberChange(1002)}
                                        value={glTable[1].shiftNumber}
                                        />
                                </td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-shift">
                                    <input
                                            className="working-shifts__table-header-value"
                                            type="text"
                                            onChange={onShiftNumberChange(1003)}
                                            value={glTable[2].shiftNumber}
                                            />
                                </td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-shift">
                                <input
                                            className="working-shifts__table-header-value"
                                            type="text"
                                            onChange={onSecondShiftNumberChange(1004)}
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
                            КМ
                        </caption>
                        <tbody>
                            <tr className="working-shifts__table-row-header working-shifts__table-row-gl">
                                <th 
                                    className="working-shifts__table-header working-shifts__table-header-gl"
                                    colSpan="3">
                                        Групп-лидер
                                    </th>
                                <td className="working-shifts__table-header working-shifts__table-header-gl">№ Смены</td>
                            </tr>
                            {this.tableKmRows(7)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}