const date = new Date();
date.setDate(date.getDate() + 7); 
const startDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
}).format(date).replace(",", "");
date.setDate(date.getDate() + 7); 
const endDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
}).format(date).replace(",", "");

export const flightData = {
    origin: 'Manila, Philippines',
    originCode: "MNL",
    destination: 'Boracay, Philippines',
    destinationCode: "MPH",
    startDate: startDate,
    endDate: endDate
};