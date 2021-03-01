const totalDays = 30;
let emptyDays = [];
const dayNames7 = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const dayNames30 = [
    ...dayNames7, ...dayNames7, ...dayNames7, ...dayNames7, dayNames7[0], dayNames7[1]
    ];

for (let i = 1; i <= totalDays; i++) {
    emptyDays.push(
        {
            dayNumber: i,
            dayName: dayNames30[i - 1],
            id: i,
        }
    )
}

export const days = emptyDays;

const totalWorkers = 30;
let emptyWorkers = [];

for (let i = 1; i <= totalWorkers; i++) {
    emptyWorkers.push(
        {
            name: `Сотрудник ${i}`,
            id: i,
            days: []
        }
    )
}

const dayStatus = {
    selected: false,
    worked: false,
    weekend: false,
    vacation: false,
    workingHours: 0
}

emptyWorkers.forEach((item) => {
    for (let i = 1; i <= days.length; i++) {
        item.days.push(
            dayStatus
        )
    }
})



console.log(emptyWorkers);

export const workers = emptyWorkers;