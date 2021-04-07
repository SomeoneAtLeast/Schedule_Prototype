const totalDays = 30;
const dayNames7 = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const dayNames30 = [
    ...dayNames7, ...dayNames7, ...dayNames7, ...dayNames7, dayNames7[0], dayNames7[1]
    ];


const totalWorkers = 30;
let emptyWorkers = [];

for (let i = 1; i <= totalWorkers; i++) {
    emptyWorkers.push(
        {
            name: `Иванов Иван Иванович № ${i}`,
            id: i,
            days: [],
            workingShiftTotal: null,
        }
    )
}

emptyWorkers.forEach((item) => {
    for (let i = 1; i <= totalDays; i++) {
        item.days.push(
            {   
                dayName: dayNames30[i - 1],
                selected: false,
                worked: false,
                weekend: false,
                vacation: false,
                workingHours: 0,
                changeShiftMenuOpen: false,
                workingShiftDay: null,
                id: i
            }
        )
    }
})

export const workers = emptyWorkers;