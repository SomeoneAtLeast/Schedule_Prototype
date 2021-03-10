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
                selectedWorker: action.selectedWorker
            };
        case "Filter-Days":
            if(action.filter === "worked") {
                return  action.workers.filter(item => item.worked)
            } else if (action.filter === "weekends") {
                return  action.workers.filter(item => item.weekend) 
            } else if (action.filter === "vacation") {
                return  action.workers.filter(item => item.vacation) 
            } else {
                return  action.workers
            }
        case "Filter-Worker":
            if(action.filter === "worked") {
                const workedDays = workers.filter(item => item.worked);
                const newWorker = {...this.state.workers[action.selectedWorker], days: workedDays}
                const newWorkers = [...this.state.workers.slice(0, action.selectedWorker), newWorker, ...this.state.workers.slice(action.selectedWorker + 1)];
                return  {
                    newWorkers
                }
            } else if (action.filter === "weekends") {
                const weekendDays = workers.filter(item => item.weekend);
                const newWorker = {...this.state.workers[action.selectedWorker], days: weekendDays}
                const newWorkers = [...this.state.workers.slice(0, action.selectedWorker), newWorker, ...this.state.workers.slice(action.selectedWorker + 1)];
                return  {
                    newWorkers

                }
            } else if (action.filter === "vacation") {
                const vacationDays = workers.filter(item => item.vacation);
                const newWorker = {...this.state.workers[action.selectedWorker], days: vacationDays}
                const newWorkers = [...this.state.workers.slice(0, action.selectedWorker), newWorker, ...this.state.workers.slice(action.selectedWorker + 1)];
                return  {
                    newWorkers

                }
            } else {
                return state.workers
            }
        default:
            return state;    
    }
}

export default reducer;
