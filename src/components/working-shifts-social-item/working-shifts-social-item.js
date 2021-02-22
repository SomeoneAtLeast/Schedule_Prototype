/* eslint-disable react/prop-types */
import React, {Component} from "react";

import  "./working-shifts-social-item.scss"
export default class WorkingShiftsSocialItem extends Component {
    constructor(props) {
        super(props);
    }

    makeCells(startNumber, finishNumber, shiftNumberName) {
        let cells = [];
        for (let i = startNumber; i <= finishNumber; i++) {
            cells.push(
                <td 
                    className="working-shifts__table-cell working-shifts__table-cell-worker" 
                    key={i + 500}>
                        <input
                            className="working-shifts__table-header-value"
                            type="text"
                            value={this.props.shift[`worker${i}`]}
                            onChange={this.props.onTextChange((this.props.id), this.props.shifts, `worker${i}`)}/>
                </td>
            );
        }
        
        cells.push(<td className="working-shifts__table-cell working-shifts__table-cell-worker" key={this.props.id}>
                        <input
                            className="working-shifts__table-header-value"
                            type="text"
                            value={this.props.shifts[this.props.id - 100][shiftNumberName]}
                            onChange={this.props.onTextChange(this.props.id, this.props.shifts, shiftNumberName)}/>
            </td>);


        return cells
    }

    render() {
        return (
            <>
                <tr className="working-shifts__table-row working-shifts__table-row-workers">
                    {this.makeCells(0, 2, "firstShiftNumber")}
                </tr>
                <tr className="working-shifts__table-row working-shifts__table-row-workers">
                    {this.makeCells(3, 5, "secondShiftNumber")}
                </tr>
                <tr className="working-shifts__table-row working-shifts__table-row-workers">
                    {this.makeCells(6, 8, "thirdShiftNumber")}
                </tr>
                <tr className="working-shifts__table-row working-shifts__table-row-workers">
                    {this.makeCells(9, 11, "fourthShiftNumber")}
                </tr>
            </>
        )
    }
}