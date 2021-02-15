/* eslint-disable react/prop-types */
import React, {Component} from "react";

import  "./working-shifts-km-item.scss"
export default class WorkingShiftsKmItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {shifts} = this.props;
        return (
            <tr 
                className="working-shifts__table-row working-shifts__table-row-workers">
                <td 
                    className="working-shifts__table-cell working-shifts__table-cell-worker"
                    colSpan="3">
                        {shifts.worker1}
                    </td>
                <td className="working-shifts__table-cell working-shifts__table-cell-worker">{shifts.shiftNumber}</td>
            </tr>
        )
    }
}