import db from '../db.mjs';

class Employee {
    getAllEmployees() {
        return db.promise().query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
        `);
    }

    addEmployee(firstName, lastName, roleId, managerId) {
        return db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
    }

    updateEmployee(employeeId, newRoleId) {
        return db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
    }

    updateEmployeeDetails(employeeId, newData) {
        // newData should be an object containing the fields to update
        const updateFields = Object.keys(newData)
        .map(field => `${field} = ?`)
        .join(', ');

        const updateValues = Object.values(newData);

        const query = `UPDATE employee SET ${updateFields} WHERE id = ?`;
        updateValues.push(employeeId);

        return db.promise().query(query, updateValues);
    }

    deleteEmployee(employeeId) {
        return db.promise().query('DELETE FROM employee WHERE id = ?', [employeeId]);
    }
}

export default Employee;