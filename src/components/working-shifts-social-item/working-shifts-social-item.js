/* eslint-disable react/prop-types */
import React, {Component} from "react";

import  "./working-shifts-social-item.scss"
export default class WorkingShiftsSocialItem extends Component {
    constructor(props) {
        super(props);
    }

    makeCells(startNumber, finishNumber) {
        let cells = [];
        for (let i = startNumber; i <= finishNumber; i++) {
            cells.push(<td className="working-shifts__table-cell working-shifts__table-cell-worker" key={i}>{this.props.shifts[`worker${i}`]}</td>);
        }

        cells.push(<td className="working-shifts__table-cell working-shifts__table-cell-worker" key={startNumber + finishNumber}>{this.props.shifts.shiftNumber}</td>);

        return cells
    }

    render() {
        return (
            <>
                <tr className="working-shifts__table-row working-shifts__table-row-workers">
                    {this.makeCells(1, 3)}
                </tr>
                <tr className="working-shifts__table-row working-shifts__table-row-workers">
                    {this.makeCells(3, 5)}
                </tr>
            </>
        )
    }
}