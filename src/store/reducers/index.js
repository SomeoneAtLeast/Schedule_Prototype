import {workers} from "../../models/schedule-model"
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
    seats,
    scheduleActive: true,
    seatsActive: false,
    workingshiftsActive: false,
    makeWorkingBtnActive: false
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

            if (action.workingTime === undefined) {
                action.workingTime = null
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
                newWorkers[workerIndex].days[dayIndex].workingShiftDay = action.workingTime;
                newWorkers[workerIndex].days[dayIndex].workingHours = action.hoursCount;
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
                                item.workingShiftDay = action.workingTime;
                                item.workingHours = action.hoursCount;
                                state.selectedWorker = 0;
                                state.selectedDay = 0;
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
                                item.workingShiftDay = null;
                                item.workingHours = 0;
                                state.selectedWorker = 0;
                                state.selectedDay = 0;
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
                                item.workingShiftDay = null;
                                item.workingHours = 0;
                                state.selectedWorker = 0;
                                state.selectedDay = 0;
                            }
                        })
                    })
                } else if (action.objKey === "takeOf") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.vacation = false
                                item.worked = false;
                                item.weekend = false;
                                item.selected = false;
                                item.workingShiftDay = null;
                                item.workingHours = 0;
                                state.selectedWorker = 0;
                                state.selectedDay = 0;
                            }
                        })
                    })
                } else if (action.objKey === "clear") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.selected = false;
                                state.selectedWorker = 0;
                                state.selectedDay = 0;
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
        case "Make-Filter-Active": {
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
        case "Make-Active-Nav-Btn": {
            if (action.btnName === "scheduleBtn") {
                return {
                    ...state,
                    scheduleActive: true,
                    seatsActive: false,
                    workingshiftsActive: false
                }
            } else if (action.btnName === "seatsBtn") {
                return {
                    ...state,
                    scheduleActive: false,
                    workingshiftsActive: false,
                    seatsActive: true
                }
            } else if (action.btnName === "workingshiftsBtn") {
                return {
                    ...state,
                    scheduleActive: false,
                    seatsActive: false,
                    workingshiftsActive: true
                }
            }
        }
        break;
        case "Change-Selected-Page": {
            if(action.location.pathname === "/seats/") {
                return {
                    ...state,
                    scheduleActive: false,
                    workingshiftsActive: false,
                    seatsActive: true
                }
            } else if (action.location.pathname === "/workingshifts/") {
                return {
                    ...state,
                    scheduleActive: false,
                    workingshiftsActive: true,
                    seatsActive: false
                }
            } else if (action.location.pathname === "/") {
                return {
                    ...state,
                    scheduleActive: true,
                    workingshiftsActive: false,
                    seatsActive: false
                }
            } else {
                return {
                    ...state
                }
            }
        }
        case "Show-Or-Close-Working-Hours": {
            return {
                ...state,
                makeWorkingBtnActive: !state.makeWorkingBtnActive
            }
        }
        default:
            return state;    
    }
}
export default reducer;