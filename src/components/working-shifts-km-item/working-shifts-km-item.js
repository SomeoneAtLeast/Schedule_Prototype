import React, {Component} from "react";
import PropTypes from 'prop-types';

import  "./working-shifts-km-item.scss"
export default class WorkingShiftsKmItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {kmShifts, id, onTextChange} = this.props;
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
                            onChange={(e) => onTextChange(id, kmShifts, "worker", e)}/>
                    </td>
                <td className="working-shifts__table-cell working-shifts__table-cell-worker">
                <input
                            className="working-shifts__table-header-value"
                            type="text"
                            value={kmShifts[id - 100].shiftNumber}
                            onChange={(e) => onTextChange(id, kmShifts, "shiftNumber", e)}/>
                </td>
            </tr>
        )
    }
}

WorkingShiftsKmItem.propTypes = {
    kmShifts: PropTypes.array,
    id: PropTypes.number,
    onTextChange: PropTypes.func
}