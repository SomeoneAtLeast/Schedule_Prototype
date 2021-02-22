/* eslint-disable react/prop-types */
import React, {Component} from "react";

import  "./working-shifts-km-item.scss"
export default class WorkingShiftsKmItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {kmShifts, id} = this.props;
        return (
            <tr 
                className="working-shifts__table-row working-shifts__table-row-workers">
                <td 
                    className="working-shifts__table-cell working-shifts__table-cell-worker"
                    colSpan="3">
                        <input
                            className="working-shifts__table-header-value"
                            type="text"
                            value={kmShifts[id - 100].worker}
                            onChange={this.props.onTextChange(id, kmShifts, "worker")}/>
                    </td>
                <td className="working-shifts__table-cell working-shifts__table-cell-worker">
                <input
                            className="working-shifts__table-header-value"
                            type="text"
                            value={kmShifts[id - 100].shiftNumber}
                            onChange={this.props.onTextChange(id, kmShifts, "shiftNumber")}/>
                </td>
            </tr>
        )
    }
}