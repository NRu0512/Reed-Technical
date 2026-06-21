const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const date = new Date();
let dateRange;

date.setDate(date.getDate() + 7); 
const startDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date).replace(",", "");
dateRange = `${weekdays[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
dateRange += " – "

date.setDate(date.getDate() + 7); 
const endDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date).replace(",", "");
dateRange += `${weekdays[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;

export const flightData = {
    origin: 'Manila, Philippines',
    originCity: 'Manila',
    originCode: "MNL",
    destination: 'Boracay, Philippines',
    destinationCity: 'Boracay',
    destinationCode: "MPH",
    startDate: startDate,
    endDate: endDate,
    dateRange: dateRange
};