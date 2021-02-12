/* eslint-disable react/prop-types */
import React, {Component} from "react";

import  "./working-shifts-social-item.scss"
export default class WorkingShiftsSocialItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {shifts} = this.props;
        return (
            <tr className="working-shifts__table-row working-shifts__table-row-workers">
                <td className="working-shifts__table-cell working-shifts__table-cell-worker">{shifts.worker1}</td>
                <td className="working-shifts__table-cell working-shifts__table-cell-worker">{shifts.worker2}</td>
                <td className="working-shifts__table-cell working-shifts__table-cell-worker">{shifts.worker3}</td>
                <td className="working-shifts__table-cell working-shifts__table-cell-worker">{shifts.shiftNumber}</td>
            </tr>
        )
    }
}