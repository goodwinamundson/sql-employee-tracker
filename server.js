const connection = require('./db/connection');
const inquirer = require('inquirer');


// Connect to Database
connection.connect(
  console.log(`

  WELCOME TO EMPLOYEE TRACKER

  `)
);
function promptQuestions() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'initMenu',
          message: 'What would you like to do?',
          choices: [
            'View Employees',
            'View Departments',
            'View Roles',
            'Add Employee',
            'Update Employee Role',
            'Leave'
          ],
        },
      ])
      .then((answers) => {
        const { initMenu } = answers;
  
        if (initMenu === 'View Employees') {
          allEmployees();
        }
  
        if (initMenu === 'View Departments') {
          allDepartments();
        }
        if (initMenu === 'View Roles') {
          allRoles();
        }
        if (initMenu === 'Add Employee') {
          addEmployee();
        }
        if (initMenu === 'Update Employee Role') {
          updateEmployee();
        }
        if (initMenu === 'Leave') {
        
          connection.end(
            console.log(`
        
                GOODBYE
        
          
          `)
          );
        }
      })
      .catch((error) => {
        if (error) throw error;
      });
  }
  
   // View Employees
   const allEmployees = () => {
    let sql = `SELECT employee.id, employee.first_name,
               employee.last_name, department.department_name AS Department, role.salary
               FROM employee, role, department
               WHERE department.id = role.department_id
               AND role.id = employee.role_id`;
  
    connection.query(sql, (err, res) => {
      if (err) throw err;
      console.table(res);
      promptQuestions(
        console.log(`
      
            EMPLOYEES LISTED ABOVE
      
      
      
      `)
      );
    });
  };
  
  // View Departments 
  const allDepartments = () => {
    let sql = `SELECT department.id, department.department_name 
               AS Departments
               FROM department`;
  
    connection.query(sql, (error, res) => {
      if (error) throw error;
      console.table(res);
      promptQuestions(
        console.log(`
      
              DEPARTMENTS LISTED ABOVE
      
      
      
      `)
      );
    });
  };
  
  // View Roles function
  const allRoles = () => {
    let sql = `SELECT role.id, role.title, department.department_name AS department
               FROM role
               LEFT JOIN department ON role.department_id`;
  
    connection.query(sql, (err, res) => {
      if (err) throw err;
      console.table(res);
      promptQuestions(
        console.log(`
      
             ROLES LISTED ABOVE
      
      
      
      `)
      );
    });
  };
  
  // View Add Employee function
  const addEmployee = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'employeeFirst',
          message: 'What is the first name of your employee?',
          validate: (firstName) => {
            if (firstName) {
              return true;
            } else {
              console.log(`Please enter your employee's first name`);
              return false;
            }
          },
        },
        {
          type: 'input',
          name: 'employeeLast',
          message: 'What is the last name of your employee?',
          validate: (lastName) => {
            if (lastName) {
              return true;
            } else {
              console.log(`Enter your employee's first name`);
              return false;
            }
          },
        },
      ])
      .then((answer) => {
        const employeeInfo = [answer.employeeFirst, answer.employeeLast];
  
        // Capture new employee's role
        const sqlRole = `SELECT role.id, role.title
                       FROM role`;
  
        connection.query(sqlRole, (err, data) => {
          if (err) throw err;
  
          const rolesData = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'role',
                message: `What is your new employee's role?`,
                choices: rolesData,
              },
            ])
            .then((newRole) => {
              const employeeRole = newRole.employeeRole;
              employeeInfo.push(employeeRole);
  
              // Capture new employee's manager
              const sqlManager = `SELECT * FROM employee`;
              connection.query(sqlManager, (err, data) => {
                if (err) throw err;
                const newManager = data.map(({ id, first_name, last_name }) => ({
                  name: first_name + ' ' + last_name,
                  value: id,
                }));
  
                inquirer
                  .prompt([
                    {
                      type: 'list',
                      name: 'employeeManager',
                      message: `Who is your new employee's manager?`,
                      choices: newManager,
                    },
                  ])
                  .then((chosenManager) => {
                    const selectedManager = chosenManager.employeeManager;
                    employeeInfo.push(selectedManager);
  
                    const addEmployeeSql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                            VALUES (?, ?, ?, ?)`;
                    connection.query(addEmployeeSql, employeeInfo, (error, res) => {
                      if (error) throw error;
                      console.log(`
             
                        NEW EMPLOYEE ADDED
             
         
                       `);
  
                      promptQuestions();
                    });
                  });
              });
            });
        });
      });
  };
  
  // Update an Employee function
  const updateEmployee = () => {
    let employees = [];
    let roles = [];
  
    connection.query()
      .then((answers) => {
        return push(answers).all([
          connection.query(`SELECT id, title FROM role ORDER BY title`),
          connection.query(
            `SELECT employee.id, employee.first_name, " ", employee.last_name AS Employee FROM employee ORDER BY Employee`
          ),
        ]);
      })
      .then(([roles, employees]) => {
  
        for (i = 0; i < roles.length; i++) {
          roles.push(employees.title);
        }
        for (i = 0; i < employees.length; i++){
          employees.push(employees.employee);
      }
        return push.all([roles, employees]);
      })
      .then(([roles, employees]) => {
  
        inquirer.prompt([
          {
            type: 'list',
            name: 'newEmployRole',
            message: 'Whose role would you like to update?',
            choices: employees,
          },
          {
            type: 'list',
            name: 'employeeRoles',
            message: `What is this employee's new role?`,
            choices: roles,
          },
        ]);
      })
      .then((answer) => {
        let roleId;
        let employeesId;
  
        for (i = 0; i < roles.length; i++) {
          if (answer.role === roles.title) {
            roleId = roles.id;
          }
        }
  
        for (i = 0; i < employees.length; i++) {
          if (answer.employee === employees.Employee) {
            employeesId = employees.id;
          }
        }
  
        connection.query(
          `UPDATE employee SET role_id = ${roleId} WHERE id = ${employeesId}`,
          (error, res) => {
            if (error) return error;
  
            console.log(`
      
            EMPLOYEE UPDATED
      
      `);
            promptQuestions();
          }
        );
      });
  };
  
  promptQuestions();
  
  
 