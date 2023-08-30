import db from '../db.mjs';

class Role {
    getAllRoles() {
        return db.promise().query(`
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        INNER JOIN department ON role.department_id = department.id
        `);
    }

    addRole(title, salary, departmentId) {
        return db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
    }

    updateRoleTitle(roleId, newTitle) {
        return db.promise().query('UPDATE role SET title = ? WHERE id = ?', [newTitle, roleId]);
    }

    deleteRole(roleId) {
        return db.promise().query('DELETE FROM role WHERE id = ?', [roleId]);
    }
}

export default Role;