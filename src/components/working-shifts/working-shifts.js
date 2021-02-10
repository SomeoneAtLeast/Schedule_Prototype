/* eslint-disable react/prop-types */
import React, {Component} from "react";

import  "./working-shifts.scss"
export default class WorkingShifts extends Component {
    constructor() {
        super();

        this.state = {
            scheduleActive: true,
            arrangementsActive: false
        }
    }

    render() {

        return (
            <div className="working-shifts">
                <div className="working-shifts__table-wrapper">
                    <table className="working-shifts__table">
                        <caption className="working-shifts__table-caption">
                            Февраль
                        </caption>
                        <tr className="working-shifts__table-row-header working-shifts__table-row-gl">
                            <th className="working-shifts__table-header working-shifts__table-header-gl">Групп-лидер 1</th>
                            <th className="working-shifts__table-header working-shifts__table-header-gl">Групп-лидер 2</th>
                            <th className="working-shifts__table-header working-shifts__table-header-gl">Групп-лидер 3</th>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-team">
                            <td className="working-shifts__table-cell working-shifts__table-cell-team">Команда 1</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-team">Команда 2</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-team">Команда 3</td>
                        </tr> 
                        <tr className="working-shifts__table-row working-shifts__table-row-shifts">
                            <td className="working-shifts__table-cell working-shifts__table-cell-shift">Смена 1</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-shift">Смена 2</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-shift">Смена 1 и 2</td>
                        </tr>
                    </table>
                    <table className="working-shifts__table">
                        <tr className="working-shifts__table-row-header working-shifts__table-row-8-20">
                            <th 
                                className="working-shifts__table-header working-shifts__table-header-8-20"
                                colSpan="3">С 08 до 20</th>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                        </tr>
                    </table>
                    <table className="working-shifts__table">
                        <tr className="working-shifts__table-row-header working-shifts__table-row-9-21">
                            <th 
                                className="working-shifts__table-header working-shifts__table-header-9-21"
                                colSpan="3">С 09 до 21</th>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                        </tr>
                    </table>
                    <table className="working-shifts__table">
                        <tr className="working-shifts__table-row-header working-shifts__table-row-10-22">
                            <th 
                                className="working-shifts__table-header working-shifts__table-header-10-22"
                                colSpan="3">С 10 до 22</th>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                        </tr>
                    </table>
                    <table className="working-shifts__table">
                        <tr className="working-shifts__table-row-header working-shifts__table-row-11-23">
                            <th 
                                className="working-shifts__table-header working-shifts__table-header-11-23"
                                colSpan="3">С 11 до 23</th>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                        </tr>
                    </table>
                    <table className="working-shifts__table">
                        <tr className="working-shifts__table-row-header working-shifts__table-row-12-24">
                            <th 
                                className="working-shifts__table-header working-shifts__table-header-12-24"
                                colSpan="3">С 12 до 24</th>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                        </tr>
                    </table>
                    <table className="working-shifts__table">
                        <tr className="working-shifts__table-row-header working-shifts__table-row-14-02">
                            <th 
                                className="working-shifts__table-header working-shifts__table-header-14-02"
                                colSpan="3">С 14 до 02</th>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                        </tr>
                    </table>
                    <table className="working-shifts__table">
                        <tr className="working-shifts__table-row-header working-shifts__table-row-21-09">
                            <th 
                                className="working-shifts__table-header working-shifts__table-header-21-09"
                                colSpan="3">С 21 до 09</th>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                        </tr>
                        <tr className="working-shifts__table-row working-shifts__table-row-workers">
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker">Сотрудник</td>
                            <td className="working-shifts__table-cell working-shifts__table-cell-worker"></td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}