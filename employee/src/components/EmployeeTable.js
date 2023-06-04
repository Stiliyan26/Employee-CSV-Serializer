import './EmployeeTable.css';

const EmployeeTable = ({ longestPair }) => {

    const projectRows = longestPair['pairInfo'].map((projectInfoObj, i) => {
        const { empId1, empId2, projectId, timeSpent } = projectInfoObj;
        
        return (
            <tr key={i}>
                <td>{empId1}</td>
                <td>{empId2}</td>
                <td>{projectId}</td>
                <td>{timeSpent}</td>
            </tr>
        )
    });

    return (
        <table>
            <thead>
                <tr id="headers">
                    <th>Employee ID #1</th>
                    <th>Employee ID #2</th>
                    <th>Project ID</th>
                    <th>Days worked</th>
                </tr>
            </thead>
            <tbody>
                { projectRows }
                <tr>
                    <td colSpan="3">Total days worked together</td>
                    <td>{longestPair.totalTimeSpent}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default EmployeeTable;