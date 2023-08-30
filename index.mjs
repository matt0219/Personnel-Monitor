import inquirer from 'inquirer';
import Department from './models/Department.mjs';
import Role from './models/Role.mjs';
import Employee from './models/Employee.mjs';
    
    function mainMenu() {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'choice',
                    message: 'What would you like to do?',
                    choices: [
                        'View all departments',
                        'View all roles',
                        'View all employees',
                        'Add a department',
                        'Add a role',
                        'Add an employee',
                        'Update an employee role',
                        'Exit'
                    ]
                }
            ])
            .then(answer => {
                switch (answer.choice) {
                    case 'View all departments':
                        Department.getAllDepartments()
                        .then(([rows]) => {
                            console.table(rows);
                            mainMenu();
                        })
                        .catch(err => {
                            console.error('Error viewing departments:', err);
                        });
                        break;
                    case 'View all roles':
                        Role.getAllRoles()
                        .then(([rows]) => {
                            console.table(rows);
                            mainMenu();
                        })
                        .catch(err => {
                            console.error('Error viewing roles:', err);
                        });
                        break;
                    case 'View all employees':
                        Employee.getAllEmployees()
                        .then(([rows]) => {
                            console.table(rows);
                            mainMenu();
                        })
                        .catch(err => {
                            console.error('Error viewing employees:', err);
                        });
                        break;
                    case 'Add a department':
                        addDepartment();
                        break;
                    case 'Add a role':
                        addRole();
                        break;
                    case 'Add an employee':
                        addEmployee();
                        break;
                    case 'Update an employee role':
                        updateEmployeeRole();
                        break;
                    case 'Exit':
                        console.log('Goodbye')
                        process.exit(0);
                        break;
                }
            });
    }
    
    function addDepartment() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the name of the new department:'
                }
            ])
            .then(answers => {
                Department.addDepartment(answers.departmentName)
                .then(() => {
                    console.log('Department added successfully!');
                    mainMenu(); // Return to main menu
                })
                .catch(err => {
                    console.error('Error adding department:', err);
                });
            });
    }
    
    function addRole() {
        Department.getAllDepartments()
        .then(([departments]) => {
            const departmentChoices = departments.map(department => ({
                name: department.name,
                value: department.id
            }));
    
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Enter the title of the new role:'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the salary for the new role:'
                    },
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Select the department for the new role:',
                        choices: departmentChoices
                    }
                ])
                .then(answers => {
                    Role.addRole(answers.title, answers.salary, selectedDepartmentId)
                    .then(() => {
                        console.log('Role added successfully!');
                        mainMenu(); // Return to main menu
                    })
                    .catch(err => {
                        console.error('Error adding role:', err);
                    });
                });
        })
        .catch(err => {
            console.error('Error fetching departments:', err);
        });
    }
    
    function addEmployee() {
        Role.getAllRoles()
        .then(([roles]) => {
            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id
            }));
    
            Employee.getAllEmployees()
            .then(([employees]) => {
                const managerChoices = employees.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }));
    
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: "Enter the employee's first name:"
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: "Enter the employee's last name:"
                        },
                        {
                            type: 'list',
                            name: 'roleId',
                            message: "Select the employee's role:",
                            choices: roleChoices
                        },
                        {
                            type: 'list',
                            name: 'managerId',
                            message: "Select the employee's manager:",
                            choices: [
                                {
                                    name: 'None', value: null
                                },
                                ...managerChoices
                            ]
                        }
                    ])
                    .then(answers => {
                        Employee.addEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId)
                            .then(() => {
                                console.log('Employee added successfully!');
                                mainMenu(); // Return to main menu
                            })
                            .catch(err => {
                                console.error('Error adding employee:', err);
                            });
                    });
            })
            .catch(err => {
                console.error('Error fetching employees:', err);
            });
        })
        .catch(err => {
            console.error('Error fetching roles:', err);
        });
    }
    
    function updateEmployeeRole() {
        Employee.getAllEmployees()
        .then(([employees]) => {
            const employeeChoices = employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }));
    
            Role.getAllRoles()
            .then(([roles]) => {
                const roleChoices = roles.map(role => ({
                    name: role.title,
                    value: role.id
                }));
    
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'employeeId',
                            message: 'Select the employee to update:',
                            choices: employeeChoices
                        },
                        {
                            type: 'list',
                            name: 'roleId',
                            message: 'Select the new role for the employee:',
                            choices: roleChoices
                        }
                    ])
                    .then(answers => {
                        Employee.updateEmployeeRole(answers.employeeId, answers.roleId)
                            .then(() => {
                                console.log('Employee role updated succesfully!');
                                mainMenu(); // Return to main menu
                            })
                            .catch(err => {
                                console.error('Error updating employee role:', err);
                            });
                    });
            })
            .catch(err => {
                console.error('Error fetching roles:', err);
            });
        })
        .catch(err => {
            console.error('Error fetching employees:', err);
        });
    }
    
    // Call the mainMenu function to start the application
    mainMenu();