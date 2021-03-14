import {workers} from "../../models/app-model"
import {shifts, kmShifts, kmArr, glTable, workTeamsNames, months} from "../../models/shift-model/shift-model"
import {seats} from "../../models/seats-model"

const initialState = {
    workers,
    selectedWorker: 0,
    selectedDay: 0,
    filter: "all",
    allActive: true,
    workedActive: false,
    weekendsActive: false,
    vacationActive: false,
    shifts,
    glTable,
    kmTable: kmArr,
    kmShifts,
    workTeamsNames,
    months,
    seats
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "Select-Worker":
            return {
                ...state,
                selectedWorker: action.id
            }
        case "Clear-All-Days": {
            const newWorkers = [...state.workers]
            newWorkers.forEach((item) => {
                item.days.forEach((item) => {
                    item.selected = false
                })
            })
            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Day-Type": {
            
            if (action.workerId === 0 || action.dayId === 0) {
                return {
                    ...state 
                }
            }

            const {workers} = state;
            const workerIndex = workers.findIndex(elem => elem.id === action.workerId);
            const dayIndex = workers[workerIndex].days.findIndex(elem => elem.id === action.dayId); 
            const oldDayStatus = workers[workerIndex].days[dayIndex];
            const newDayStatus = {...oldDayStatus}
            newDayStatus[action.objKey] = !oldDayStatus[action.objKey];
            const newDays = [...workers[workerIndex].days.slice(0, dayIndex), newDayStatus, ...workers[workerIndex].days.slice(dayIndex + 1)];
            const newWorker = {...workers[workerIndex], days: newDays}
            const newWorkers = [...workers.slice(0, workerIndex), newWorker, ...workers.slice(workerIndex + 1)];
    
            if (action.objKey === "worked") {
                newWorkers[workerIndex].days[dayIndex].weekend = false;
                newWorkers[workerIndex].days[dayIndex].vacation = false;
            } else if (action.objKey === "weekend") {
                newWorkers[workerIndex].days[dayIndex].worked = false;
                newWorkers[workerIndex].days[dayIndex].vacation = false;
            } else if (action.objKey === "vacation") {
                newWorkers[workerIndex].days[dayIndex].worked = false;
                newWorkers[workerIndex].days[dayIndex].weekend = false;
            }
    
            if (action.scheduleType === "common") {
                if (action.objKey === "worked") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.worked = true;
                                item.weekend = false;
                                item.vacation = false;
                                item.selected = false;
                            }
                        })
                    })
                } else if (action.objKey === "weekend") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.weekend = true
                                item.worked = false;
                                item.vacation = false;
                                item.selected = false;
                            }
                        })
                    })
                } else if (action.objKey === "vacation") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.vacation = true
                                item.worked = false;
                                item.weekend = false;
                                item.selected = false;
                            }
                        })
                    })
                } else if (action.objKey === "clear") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.vacation = false
                                item.worked = false;
                                item.weekend = false;
                                item.selected = false;
                            }
                        })
                    })
                }
            }
    
            if (action.scheduleType === "personal") {
                if (action.objKey === "selected") {
                    newWorkers[workerIndex].days.forEach(item => {
                        if (item.id !== (dayIndex + 1)) {
                            item[action.objKey] = false
                        }  
                        });
                }
            }
    
            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Filter-Select": {
            return {
                ...state,
                filter: action.filter,
                allActive: true,
                workedActive: false,
                weekendsActive: false,
                vacationActive: false
            }
        }
        case "Make-Active": {
            if (action.id === -1) {
                return {
                    ...state,
                    allActive: true,
                    workedActive: false,
                    weekendsActive: false,
                    vacationActive: false
                }
            } else if (action.id === -2) {
                return {
                    ...state,
                    workedActive: true,
                    allActive: false,
                    weekendsActive: false,
                    vacationActive: false
                }
            } else if (action.id === -3) {
                return {
                    ...state,
                    weekendsActive: true,
                    workedActive: false,
                    allActive: false,
                    vacationActive: false
                }
            } else if (action.id === -4) {
                return {
                    ...state,
                    vacationActive: true,
                    workedActive: false,
                    allActive: false,
                    weekendsActive: false
                }
            }
        }
        break;
        case "Select-Day": {
            return {
                ...state,
                selectedWorker: action.selectedWorker,
                selectedDay: action.selectedDay,
            }
        }
        case "Text-Change": {
            const index = action.dataArr.findIndex(elem => elem.id === action.id); 
            const obj = action.dataArr[index];
            const newObj = {...obj};
            newObj[action.objKey] = action.e.target.value;
            const newArr = [...action.dataArr.slice(0, index), newObj, ...action.dataArr.slice(index + 1)];
            if (action.dataArr === state.shifts) {
                return {
                    ...state,
                    shifts: newArr
                } 
            } else if (action.dataArr === state.glTable) {
                return {
                    ...state,
                    glTable: newArr
                } 
            } else if (action.dataArr === state.kmShifts) {
                return {
                    ...state,
                    kmShifts: newArr
                } 
            } else if (action.dataArr === state.kmTable) {
                return {
                    ...state,
                    kmTable: newArr
                } 
            } else if (action.dataArr === state.workTeamsNames) {
                return {
                    ...state,
                    workTeamsNames: newArr
                } 
            } else if (action.dataArr === state.months) {
                return {
                    ...state,
                    months: newArr
                } 
            }
        }
        break;
        case "Change-Seat-Text": {
            const index = state.seats.findIndex(elem => elem.id === action.id); 
            const oldSeat = state.seats[index];
            const newSeat = {...oldSeat, oldIp: action.NewOldIp, newIp: action.NewNewIp, seatNumber: action.NewSeatNumber}
            const newSeats = [...state.seats.slice(0, index), newSeat, ...state.seats.slice(index + 1)];
    
            return {
                ...state,
                seats: newSeats
            }
        }
        default:
            return state;    
    }
}

export default reducer;
