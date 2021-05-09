const WorkersLoaded = (workers) => {
    return {
        type: "Workers-Loaded",
        workers
    }
}

const GetWorkersOnServer = (workers) => {
    return {
        type: "Get-Workers-On-Server",
        workers
    }
}

const SeatsLoaded = (seats) => {
    return {
        type: "Seats-Loaded",
        seats
    }
}

const ShiftsLoaded = (shifts, shiftsKm) => {
    return {
        type: "Shifts-Loaded",
        shifts,
        shiftsKm
    }
}

const SelectWorker = (id) => {
    return {
        type: "Select-Worker",
        id
    }
}

const ClearAllDays = () => {
    return {
        type: "Clear-All-Days"
    }
}

const ChangeDayType = (workerId, dayId, objKey, workingTime, hoursCount, scheduleType = "common") => {
    return {
        type: "Change-Day-Type",
        workerId,
        dayId,
        objKey,
        workingTime,
        hoursCount,
        scheduleType
    }
}

const ChangeMonth = (direction) => {
    return {
        type: "Change-Month",
        direction
    }
}

const ChangeYear = (direction) => {
    return {
        type: "Change-Year",
        direction
    }
}

const FilterSelect = (filter) => {
    return {
        type: "Filter-Select",
        filter
    }
}

const MakeFilterActive = (id) => {
    return {
        type: "Make-Filter-Active",
        id
    }
}

const SelectDay = (selectedWorker, selectedDay) => {
    return {
        type: "Select-Day",
        selectedWorker, 
        selectedDay,
    }
}

const ChangeScheduleText = (workerId, dayId, objKey, e) => {
    return {
        type: "Change-Schedule-Text",
        workerId,
        dayId,
        objKey,
        e 
    }
}

const ChangeShiftText = (id, dataArr, objKey, e) => {
    return {
        type: "Change-Shift-Text",
        id, 
        dataArr,
        objKey,
        e
    }
}

const ChangeSeatText = (id, NewOldIp, NewNewIp, NewSeatNumber) => {
    return {
        type: "Change-Seat-Text",
        NewOldIp, 
        NewNewIp,
        NewSeatNumber,
        id
    }
}


const MakeActiveNavBtn = (btnName) => {
    return {
        type: "Make-Active-Nav-Btn",
        btnName
    }
}

const ChangeSelectedPage = (location) => {
    return {
        type: "Change-Selected-Page",
        location
    }
}

const ShowOrCloseWorkingHours = () => {
    return {
        type: "Show-Or-Close-Working-Hours",
    }
}

export {
    WorkersLoaded,
    SeatsLoaded,
    ShiftsLoaded,
    SelectWorker,
    ClearAllDays,
    ChangeDayType,
    ChangeMonth,
    ChangeYear,
    FilterSelect,
    MakeFilterActive,
    SelectDay,
    ChangeShiftText,
    ChangeSeatText,
    MakeActiveNavBtn,
    ChangeSelectedPage,
    ShowOrCloseWorkingHours,
    ChangeScheduleText,
    GetWorkersOnServer
}