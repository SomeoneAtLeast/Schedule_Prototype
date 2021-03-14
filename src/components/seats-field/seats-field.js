import React from "react";
import {connect} from "react-redux"
import PropTypes from 'prop-types';

import "./seats-field.scss"

import SeatsItem from "../seats-item";


const SeatsField = ({seats}) => {

    const table = (elements, upfrom, upTo, lower) => {
        const upseats = elements.filter((item) => {
            return item.key >= upfrom && item.key <= upTo;
        })
    
        const lowerseats = elements.filter((item) => {
            return item.key > upTo && item.key < lower;
        })

        return (
         <table className="seats-table">
             <tbody>
                <tr className="seats-table__row">
                    {upseats}
                </tr>
                <tr className="seats-table__row">
                    {lowerseats}
                </tr>
             </tbody>
         </table>
        )
    };

    const arrangementsFieldElements = seats.map((item) => {
        const {oldIp, newIp, seatNumber, id} = item;

        return (
            <td 
                className="seats-table__сell"
                key={id}>
                <SeatsItem
                    id={id}
                    oldIp={oldIp}
                    newIp={newIp}
                    seatNumber={seatNumber}/>
            </td>
        )
    })
    
    return (
        <div className="seats-field">
            {table(arrangementsFieldElements, 10, 12, 16)}
            {table(arrangementsFieldElements, 16, 18, 22)}
            {table(arrangementsFieldElements, 22, 24, 28)}
            {table(arrangementsFieldElements, 28, 30, 34)}
        </div>
    )
}

SeatsField.propTypes = {
    seats: PropTypes.array,
}


const mapStateToProps = ({seats}) => {
    return {
        seats
    }
}

export default connect(mapStateToProps)(SeatsField);