import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {TextChange} from "../../store/actions"

import  "./working-shifts-social-item.scss"
class WorkingShiftsSocialItem extends Component {
    constructor(props) {
        super(props);
    }

    makeCells(startNumber, finishNumber, shiftNumberName) {
        const {shift, shifts, id, TextChange} = this.props;

        let cells = [];
        for (let i = startNumber; i <= finishNumber; i++) {
            cells.push(
                <td 
                    className="working-shifts__table-cell working-shifts__table-cell-worker" 
                    key={i + 500}>
                        <input
                            className="working-shifts__table-header-value"
                            type="text"
                            value={shift[`worker${i}`]}
                            onChange={(e) => TextChange((id), shifts, `worker${i}`, e)}/>
                </td>
            );
        }
        
        cells.push(<td className="working-shifts__table-cell working-shifts__table-cell-worker" key={id}>
                        <input
                            className="working-shifts__table-header-value"
                            type="text"
                            value={shifts[id - 100][shiftNumberName]}
                            onChange={(e) => TextChange(id, shifts, shiftNumberName, e)}/>
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

WorkingShiftsSocialItem.propTypes = {
    shift: PropTypes.object,
    shifts: PropTypes.array,
    id: PropTypes.number,
    TextChange: PropTypes.func
}

const mapDispatchToProps = {
    TextChange
}

const mapStateToProps = ({shifts}) => {

    return {
        shifts,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkingShiftsSocialItem);