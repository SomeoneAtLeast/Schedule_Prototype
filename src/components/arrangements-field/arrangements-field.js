import React from "react";

import "./arrangements-field.scss"

import ArrangementsItem from "../arrangements-item";

const totalSeats = 3;
let emptySeatsArr = [];

for (let i = 1; i <= totalSeats; i++) {
    emptySeatsArr.push(
        {
            oldIp: "10.160.140.111",
            newIp: "10.160.149.221",
            seatNumber: "3019.65 (127)",
            id: i + 10
        }
    )
}

const seats = emptySeatsArr;

const ArrangementsField = () => {


        const ArrangementsFieldElements = seats.map((item) => {
            const {oldIp, newIp, seatNumber, id} = item;
    
            return (
                <td 
                    className="arrangements-table__сell"
                    key={id}>
                    <ArrangementsItem
                        oldIp={oldIp}
                        newIp={newIp}
                        seatNumber={seatNumber}/>
                </td>
            )
        })
    

        return (
            <div className="arrangements-field">
                <table className="arrangements-table">
                    <tr className="arrangements-table__row">
                        {ArrangementsFieldElements}
                    </tr>
                    <tr className="arrangements-table__row">
                        {ArrangementsFieldElements}
                    </tr>
                </table>
            </div>
        )

}

export default ArrangementsField;