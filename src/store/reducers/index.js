import {workers} from "../../models/app-model"

const initialState = {
    workers: workers,
    selectedWorker: 0,
    selectedDay: 0,
    filter: "all",
    allActive: true,
    workedActive: false,
    weekendsActive: false,
    vacationActive: false
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
        default:
            return state;    
    }
}

export default reducer;
