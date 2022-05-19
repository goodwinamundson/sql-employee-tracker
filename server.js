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
  
  
  
 