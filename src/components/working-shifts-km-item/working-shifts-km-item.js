import React from "react";
import {connect} from "react-redux"
import PropTypes from 'prop-types';

import  "./working-shifts-km-item.scss"

const WorkingShiftsKmItem = ({kmShifts, id, onTextChange}) => {

    return (
        <tr 
            className="working-shifts__table-row working-shifts__table-row-workers">
            <td 
                className="working-shifts__table-cell working-shifts__table-cell-worker"
                colSpan="3">
                    <input
                        className="working-shifts__table-input-value"
                        type="text"
                        maxLength={31}
                        value={kmShifts[id - 100].worker}
                        onChange={(e) => onTextChange(id, kmShifts, "worker", e)}/>
                </td>
            <td className="working-shifts__table-cell working-shifts__table-cell-worker">
            <input
                        className="working-shifts__table-input-value"
                        type="text"
                        maxLength={6}
                        value={kmShifts[id - 100].shiftNumber}
                        onChange={(e) => onTextChange(id, kmShifts, "shiftNumber", e)}/>
            </td>
        </tr>
    )
}

WorkingShiftsKmItem.propTypes = {
    kmShifts: PropTypes.array,
    id: PropTypes.number,
    onTextChange: PropTypes.func
}

export default connect()(WorkingShiftsKmItem);