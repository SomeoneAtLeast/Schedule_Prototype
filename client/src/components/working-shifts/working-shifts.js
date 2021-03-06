import React, {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux"
import {ShiftsLoaded, ChangeShiftText} from "../../store/actions"
import PropTypes from 'prop-types';
import {useHttp} from "../../hooks/http.hook"

import  "./working-shifts.scss"

import WorkingShiftsSocialItem from "../working-shifts-social-item"
import WorkingShiftsKmItem from "../working-shifts-km-item"
import NotReadyStub from "../not-ready-stub";
import DualBall from "../dual-ball";

const WorkingShifts = ({ShiftsLoaded, shifts, kmShifts, months, workTeamsNames, glTable, kmTable, ChangeShiftText}) => {

    const [loading, setLoading] = useState(true);

    const {request} = useHttp();
    
    const getShifts = useCallback(async () => {
        try {
            const shiftsData = await request("/api/shifts/shifts", "GET");
            const shiftsKmData = await request("/api/shifts/shifts-km", "GET");
            ShiftsLoaded(shiftsData, shiftsKmData);
            setLoading(false)
        } catch (e) {}
    }, [request, ShiftsLoaded]);

    useEffect(() => {
        getShifts();
    }, [getShifts])

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
                                        onChange={(e) => ChangeShiftText(key, shifts, "startTime", e)}/>
                                    до
                                    <input
                                        className="working-shifts__table-input-value"
                                        type="text"
                                        maxLength={2}
                                        value={finishTime}
                                        onChange={(e) => ChangeShiftText(key, shifts, "finishTime", e)}/>
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
            if (shifts.length === 0) {
                return
            }
            let tablesArr = [];
            for (let i = 0; i <= (tablesNumber - 1); i++) {
                tablesArr.push(table(shifts[i].startTime, shifts[i].finishTime, 0, i, i + 100))
            }
    
            return tablesArr
        }

        const tableKmRows = (number) => {
            let rows = [];
            for (let i = 0; i < number; i++) {
                rows.push(<WorkingShiftsKmItem kmShifts={kmShifts} key={kmShifts[i].id} id={kmShifts[i].id} onChangeShiftText={ChangeShiftText}/>);
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

                if (value === "name") {
                    insideValue = "name"
                }
                
                if (value === "teamName") {
                    insideValue = "teamName"
                }
                
                if (value === "shiftNumber") {
                    insideValue = "shiftNumber"
                }
                
                if (value === "shiftName") {
                    insideValue = "shiftName"
                    MaxLength = shiftNameMaxLength;
                }

                return (
                    <td 
                        className={className}
                        key={id}
                        colSpan={colSpan}>
                        <textarea
                            maxLength={MaxLength}
                            className="working-shifts__table-input-value"
                            type="text"
                            rows="2"
                            onChange={(e) => ChangeShiftText(id, state, insideValue, e)}
                            value={item[insideValue]}
                            />
                    </td>
                )
            })  

            return (
                glCells
            )
        }

        if (loading) {
            return (
                <div className="working-shifts">
                    <DualBall/>
                </div>
            )
        }

        return (
            <div className="working-shifts" key={123}>
                <NotReadyStub/>
                <div className="working-shifts__table-month">
                    <input
                            className="working-shifts__table-input-value"
                            type="text"
                            maxLength={15}
                            onChange={(e) => ChangeShiftText(2, months, "month", e)}
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
                                onChange={(e) => ChangeShiftText(1, workTeamsNames, "workTeamsName", e)}
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
                                    onChange={(e) => ChangeShiftText(2, workTeamsNames, "workTeamsName", e)}
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
    ChangeShiftText: PropTypes.func,
}


const mapDispatchToProps = {
    ChangeShiftText,
    ShiftsLoaded
}

const mapStateToProps = ({shifts, kmShifts, workTeamsNames, months, glTable, kmTable}) => {

    return {
        shifts,
        kmShifts,
        months,
        workTeamsNames,
        glTable,
        kmTable
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkingShifts);