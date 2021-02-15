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

export default class WorkingShifts extends Component {
    constructor() {
        super();

        this.state = {
            shifts: shifts
        }
    }

    render() {
        const {shifts} = this.state;
        const tableKmRows = (number) => {
            let rows = [];
            for (let i = 0; i < number; i++) {
                rows.push(<WorkingShiftsKmItem shifts={shifts[i]} key={shifts[i].id}/>);
            }
            return (
                rows
            )
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
                                colSpan="4">С {startTime} до {finishTime}</th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            )
        }

        const tables = (tablesNumber) => {
            let tablesArr = [];
            for (let i = 0; i <= (tablesNumber - 1); i++) {
                tablesArr.push(table(shifts[i].startTime, shifts[i].finishTime, getRandomNumber(0, 2), i, i))
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
                                <th className="working-shifts__table-header working-shifts__table-header-gl">Групп-лидер 1</th>
                                <th className="working-shifts__table-header working-shifts__table-header-gl">Групп-лидер 2</th>
                                <th className="working-shifts__table-header working-shifts__table-header-gl">Групп-лидер 3</th>
                                <th className="working-shifts__table-header working-shifts__table-header-gl">№ Смены</th>
                            </tr>
                            <tr className="working-shifts__table-row working-shifts__table-row-team">
                                <td className="working-shifts__table-cell working-shifts__table-cell-team">Команда 1</td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-team">Команда 2</td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-team">Команда 3</td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-team">-</td>
                            </tr> 
                            <tr className="working-shifts__table-row working-shifts__table-row-shifts">
                                <td className="working-shifts__table-cell working-shifts__table-cell-shift">Смена 1</td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-shift">Смена 2</td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-shift">Смена 1 и 2</td>
                                <td className="working-shifts__table-cell working-shifts__table-cell-shift">-</td>
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
                            {tableKmRows(7)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}