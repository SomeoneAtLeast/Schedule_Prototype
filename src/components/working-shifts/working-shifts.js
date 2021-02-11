/* eslint-disable react/prop-types */
import React, {Component} from "react";

import  "./working-shifts.scss"

import WorkingShiftsItem from "../working-shifts-item"


const totalShifts = 4;
let emptyShifts = [];
const getRandomNumber = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }


for (let i = 0; i <= totalShifts; i++) {
    emptyShifts.push(
        {
            startTime: 8 + i,
            finishTime: 20 + i,
            worker1: getRandomNumber(0, 1) ? "Сотрудник" : "-",
            worker2: getRandomNumber(0, 1) ? "Сотрудник" : "-",
            worker3: getRandomNumber(0, 1) ? "Сотрудник" : "-",
            shiftNumber: 1
        }
    )
}


emptyShifts.push(
    {
        startTime: 14,
        finishTime: "02",
        worker1: getRandomNumber(0, 1) ? "Сотрудник" : "-",
        worker2: getRandomNumber(0, 1) ? "Сотрудник" : "-",
        worker3: getRandomNumber(0, 1) ? "Сотрудник" : "-",
        shiftNumber: 1
    }
)

emptyShifts.push(
    {
        startTime: 21,
        finishTime: "09",
        worker1: getRandomNumber(0, 1) ? "Сотрудник" : "-",
        worker2: getRandomNumber(0, 1) ? "Сотрудник" : "-",
        worker3: getRandomNumber(0, 1) ? "Сотрудник" : "-",
        shiftNumber: 1
    }
)


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
        const tableRows = (number) => {
            let rows = [];
            for (let i = 0; i < number; i++) {
                rows.push(<WorkingShiftsItem shifts={shifts[i]}/>);
            }
            return (
                rows
            )
        }

        const table = (startTime, finishTime, numberOfRows) => {
            return (
                <table className="working-shifts__table">
                    <tr className={`working-shifts__table-row-header working-shifts__table-row-${startTime}-${finishTime}`}>
                        <th 
                            className={`working-shifts__table-header working-shifts__table-header-${startTime}-${finishTime}`}
                            colSpan="4">С {startTime} до {finishTime}</th>
                    </tr>
                    {tableRows(numberOfRows)}
                </table>
            )
        }

        const tables = (tablesNumber) => {
            let tablesArr = [];
            for (let i = 0; i <= (tablesNumber - 1); i++) {
                tablesArr.push(table(shifts[i].startTime, shifts[i].finishTime, getRandomNumber(1, 4)))
            }

            return tablesArr
        }

        return (
            <div className="working-shifts">
                <div className="working-shifts__table-wrapper">
                <div className="working-shifts__table-month">
                            Февраль
                        </div>
                    <table className="working-shifts__table">
                        <caption className="working-shifts__table-caption">
                            Социальные Сети
                        </caption>
                        <tr className="working-shifts__table-row-header working-shifts__table-row-gl">
                            <th className="working-shifts__table-header working-shifts__table-header-gl">Групп-лидер 1</th>
                            <th className="working-shifts__table-header working-shifts__table-header-gl">Групп-лидер 2</th>
                            <th className="working-shifts__table-header working-shifts__table-header-gl">Групп-лидер 3</th>
                            <td className="working-shifts__table-header working-shifts__table-header-gl">№ Смены</td>
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
                    </table>
                    {tables(5)}
                </div>
            </div>
        )
    }
}