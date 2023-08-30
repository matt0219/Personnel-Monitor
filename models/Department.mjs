import db from '../db.mjs';

class Department {
    getAllDepartments() {
        return db.promise().query('SELECT * FROM department');
    }

    addDepartment(departmentName) {
        return db.promise().query('INSERT INTO department (name) VALUES (?)', [departmentName]);
    }

    updatedDepartmentName(departmentId, newName) {
        return db.promise().query('UPDATE department SET name = ? WHERE id = ?', [newName, departmentId]);
    }

    deleteDepartment(departmentId) {
        return db.promise().query('DELETE FROM department WHERE id = ?', [departmentId]);
    }
}

export default Department;