export function convertStringToDate(date: string, hour: string){
    if(date != "" && hour != ""){
        const parts = date.split("/");
        const timeParts = hour.split(":")
        const year = parseInt(parts[2], 10) < 50 ? 2000 + parseInt(parts[2], 10) : 1900 + parseInt(parts[2], 10);
        const dateObject = new Date(year, parseInt(parts[1], 10) - 1, parseInt(parts[0], 10), parseInt(timeParts[0], 10), parseInt(timeParts[1], 10));

        return dateObject
    }

    return undefined
}