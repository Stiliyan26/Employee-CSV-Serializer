import { getTimeSpentInMS, miliSecondsToDays } from './date';

export function getAllProjectsInfo(tableValues){
    const projects = {};

    for (let i = 0; i < tableValues.length; i++){
        const data = tableValues[i]
        const currentProjectId = data[1];

        //Checks if a projectId already exits in the object
        if (!projects[currentProjectId]){
            projects[currentProjectId] = {
                employees: {}
            };
        }

        //Setting data for every employee working on a certain project
        const currentEmpId = data[0];
        projects[currentProjectId].employees[currentEmpId] = {
            empId: currentEmpId,
            dateFrom: data[2],
            dateTo: data[3]
        };
    }
    
    return projects;
}

export function getAllPairs(projects){ 
    const pairs = {};
    const projectIds = Object.keys(projects);

    for (let i = 0; i < projectIds.length; i++){
        const currProjectId = projectIds[i];
        const currProjectEmpIds = Object.keys(projects[currProjectId].employees);
        const currentProjectEmployees = projects[currProjectId].employees;
        //Iteration over every employee id in the current project
        for (let j = 0; j < currProjectEmpIds.length - 1; j++)
        {
            for (let z = j + 1; z < currProjectEmpIds.length; z++){
                const currentPair = `${currProjectEmpIds[j]}_${currProjectEmpIds[z]}`;

                if (!pairs[currentPair]){
                    pairs[currentPair] = {};
                }

                pairs[currentPair][currProjectId] = {
                    firstEmpId: currProjectEmpIds[j],
                    secondEmpId: currProjectEmpIds[z],
                    firstDateFrom: currentProjectEmployees[currProjectEmpIds[j]].dateFrom,
                    secondDateFrom: currentProjectEmployees[currProjectEmpIds[z]].dateFrom,
                    firstDateTo: currentProjectEmployees[currProjectEmpIds[j]].dateTo,
                    secondDateTo: currentProjectEmployees[currProjectEmpIds[z]].dateTo,
                };
            }
        }
    }

    return pairs;
}

export function getLongestPair(pairs){
    let longestPair = {};
    let longestTotalTimeSpent = 0;

    const keyPairs = Object.keys(pairs);

    for (let i = 0; i < keyPairs.length; i++){
        const currentKeyPair = pairs[keyPairs[i]];
        const projectIds = Object.keys(currentKeyPair);

        const empId1 = keyPairs[i][0]; 
        const empId2 = keyPairs[i][2];

        let totalTimeSpent = 0;
        let currentPair = {};

        for (let j = 0; j < projectIds.length; j++){
            const currentProject = currentKeyPair[projectIds[j]];
            const currentProjectId = projectIds[j];
            const timeSpentTogether = getTimeSpentInMS(currentProject);

            currentPair[j] = {
                empId1,
                empId2,
                projectId: currentProjectId,
                timeSpent: miliSecondsToDays(timeSpentTogether)
            }

            totalTimeSpent += timeSpentTogether;
        }

        if (longestTotalTimeSpent < totalTimeSpent){
            longestTotalTimeSpent = totalTimeSpent;

            longestPair = currentPair;
            longestPair[totalTimeSpent] = miliSecondsToDays(longestTotalTimeSpent);
        }
    }

    return longestPair;
}


