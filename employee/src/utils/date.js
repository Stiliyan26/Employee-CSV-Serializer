export function getTimeSpentInMS(project){
    const startDateMS1 = getDateInMS(project.firstDateFrom);
    const endDateMS1 = getDateInMS(project.firstDateTo);

    const startDateMS2 = getDateInMS(project.secondDateFrom);
    const endDateMS2 = getDateInMS(project.secondDateTo);

    const lastToStartInProjectMS = Math.max(startDateMS1, startDateMS2);
    const firstToLeaveProjectMS = Math.min(endDateMS1, endDateMS2);

    const timeSpentTogether = firstToLeaveProjectMS - lastToStartInProjectMS;

    return timeSpentTogether;
}

//Parse date string to date and then into miliseconds
function getDateInMS(date){
    if (date == 'NULL'){
        date = new Date();
    } else {
        date = new Date(date);
    }
    
    return date.getTime();
}

export function miliSecondsToDays(dateInMs){
    const msInADays = 24 * 60 * 60 * 1000;
    const days = dateInMs / msInADays;

    return Math.floor(days);
}
