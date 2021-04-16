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

const SelectDay = (selectedWorker, selectedDay, ChangeDayType) => {
    return {
        type: "Select-Day",
        selectedWorker, 
        selectedDay,
        ChangeDayType
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

const SetError = (value) => {
    return {
        type: "Set-Error ",
        value
    }
}

const SetLoading = (value) => {
    console.log(value)
    return {
        type: "Set-Loading ",
        value
    }
}


export {
    SelectWorker,
    ClearAllDays,
    ChangeDayType,
    FilterSelect,
    MakeFilterActive,
    SelectDay,
    ChangeShiftText,
    ChangeSeatText,
    MakeActiveNavBtn,
    ChangeSelectedPage,
    ShowOrCloseWorkingHours,
    ChangeScheduleText,
    SetError,
    SetLoading
}