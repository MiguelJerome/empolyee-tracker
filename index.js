const e = require('express');
const inquirer = require('inquirer');
const connection = require('./db');


var stringManager = [];
var employeeFirst_name;
var employeeLast_name;
var employeeRoleGlobal;


// TODO: Create a function to initialize app
function init() {

    promptManager("Employee manager");
}
    
    const promptManager = portfolioData => {
        console.log(`
      =================
      Employee
      Manager
      =================
      `);
     
        // If there's no 'projects' array property, create one
        if (!portfolioData.projects) {
          portfolioData.projects = [];
        }
       
    return inquirer
    .prompt(
        {
            type: 'list',
            name: 'menuMainEmployee',
            choices: ['View All Employee', 'Add Employee','Update Employee Role', 'View All Roles','Add Role','View All Departments','Add Department','Quit'],
            message: 'What would you like to do?',
            validate: menuMainEmployee => {
                if (menuMainEmployee) {
                  return true;
                } else {
                  console.log('Please enter what would you like to do?');
                  return false;
                }
              }
        })
          .then(({ menuMainEmployee }) => {
            if( menuMainEmployee === 'View All Employee')
            {

                let sql = ` SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(em.first_name, " ", em.last_name) AS manager 
                FROM role r
                JOIN department d
                ON d.id = r.department_id
                JOIN employee e
                ON r.id = e.role_id
                LEFT JOIN employee em
                ON e.manager_id = em.id
                ORDER BY e.id`;
        
                const result = connection.query(sql, function(err,results){
                    if (err) throw err;
                 
                  console.table(results);
                  promptManager("Back To Main Menu");
              }); 
            }
            else if( menuMainEmployee === 'Add Employee')
            {
                promptAddEmployee("Add Employee");
            }
            else if( menuMainEmployee === 'Update Employee Role')
            {
                console.log('Update Employee Role');
            }
            else if( menuMainEmployee === 'View All Roles')
            {
                let sql = ` SELECT r.id, r.title, d.name AS department, r.salary 
                            FROM role r
                            JOIN department d
                            ON d.id = r.department_id
                            ORDER BY r.id`;
        
      
                const result = connection.query(sql, function(err,results){
                    if (err) throw err;
                 
                  console.table(results);
                  promptManager("Back To Main Menu");
              });
               
            }
            else if( menuMainEmployee === 'Add Role')
            {
                promptAddRole("Add Role");
                   
            }
            else if( menuMainEmployee === 'View All Departments')
            {
                let sql = ` SELECT * 
                            FROM department
                            ORDER BY id`;
                            
                const result = connection.query(sql, function(err,results){
                    if (err) throw err;
                    
                  console.table(results);
                  promptManager("Back To Main Menu");
              });
              
            }
            else if( menuMainEmployee === 'Add Department')
            {
                promptAddDepartment("Add Department");
                
            }
            else if( menuMainEmployee === 'Quit')
            {
                console.table('finish with employee manager');
                process.exit(); 
            }
        });
        
    };

    const promptAddDepartment = portfolioData2 => {

        // tempory answer container
        let answerNameDepartment = 0;
          
        // If there's no 'projects' array property, create one
        if (!portfolioData2.projects) {
          portfolioData2.projects = [];
        }
        
    return inquirer
            .prompt([
                    {
                        type: 'input',
                        name: 'nameDepartment',
                        message: 'What is the new departmant name?',
                        validate: nameDepartment => {
                            if (nameDepartment) {
                                answerNameDepartment = nameDepartment;  
                                
                                let sql = ` INSERT INTO department ( name )
                                VALUES(?);`;
        
                        const result = connection.query(sql,[answerNameDepartment], function(err,results){
                        if (err) throw err;
                    });
                              return true;
                            } else {
                              console.log('Please enter the the new departmant name?');
                              return false;
                            }
                          }
                      }     
            ])
             .then ( promptManager);       
    };


    const promptAddRole = portfolioData3 => {

        // tempory answer container
        let answerNameRole = 0;
        let answerSalaryRole = 0;
        let answerExistingDepartment =0;
        var answerExistingDepartmentString;
        var jsonObjectDepartment;
        var stringTest = [];
        var idDepartment = 1;
        let sql = `  SELECT *
        FROM department;`;


connection.query(sql, function(err,results){
if (err) throw err;
answerExistingDepartment = results;

answerExistingDepartmentString = JSON.stringify(answerExistingDepartment);
jsonObjectDepartment = JSON.parse(answerExistingDepartmentString);


for(var i = 0; i < jsonObjectDepartment.length; i++)
{
   stringTest.push(jsonObjectDepartment[i].name);
}

});
        
        // If there's no 'projects' array property, create one
        if (!portfolioData3.projects) {
          portfolioData3.projects = [];
        }
        
    return inquirer
            .prompt([
                    {
                        type: 'input',
                        name: 'nameRole',
                        message: 'What is the name of the role?',
                        validate: nameRole => {
                            if (nameRole) {
                                answerNameRole = nameRole;   
                              return true;
                            } else {
                              console.log('Please enter the name of the role?');
                              return false;
                            }
                          }
                      },
                      {
                        type: 'input',
                        name: 'salaryRole',
                        message: 'What is the salary of the role?',
                        validate: salaryRole => {
                            if (salaryRole) {
                                answerSalaryRole = salaryRole;     
                              return true;
                            } else {
                              console.log('Please enter the salary of the role?');
                              return false;
                            }
                          }
                      },
                      {
                        type: 'list',
                        name: 'nameDepartment1',
                        choices: stringTest,
                        message: 'Which department does the role belong to?',
                      }
            ])
            .then(({ nameDepartment1 }) => {
               
                    for(var i= 0; i < jsonObjectDepartment.length; i++)
                    {
                        if( nameDepartment1.localeCompare(jsonObjectDepartment[i].name) == 0)
                        {
                            idDepartment = jsonObjectDepartment[i].id;  
                        }
                     }
                     let sql2 = `INSERT INTO role ( title, department_id, salary )
                     VALUES(?, ?, ?);`;
    
                        connection.query(sql2,[answerNameRole,idDepartment, answerSalaryRole], function(err,results){
                        if (err) throw err;
                        });
                        stringTest.splice(0,stringTest.length);
                        return false;
            })
           .then ( promptManager);       
    }; 


    const promptAddEmployee = portfolioData10 => {

        // tempory answer container
        let answerFirstNameEmployee = 0;
        let answerLastNameEmployee = 0;


        let answerExistingRole =0;
        var answerExistingRoleString;
        var jsonObjectRole;
        var stringTest = [];
        var idRole = 1;
        let sql = ` SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(em.first_name, " ", em.last_name) AS manager 
                FROM role r
                JOIN department d
                ON d.id = r.department_id
                JOIN employee e
                ON r.id = e.role_id
                LEFT JOIN employee em
                ON e.manager_id = em.id
                ORDER BY e.id`;


connection.query(sql, function(err,results){
if (err) throw err;
answerExistingRole = results;

answerExistingRoleString = JSON.stringify(answerExistingRole);
jsonObjectRole = JSON.parse(answerExistingRoleString);


for(var i = 0; i < jsonObjectRole.length; i++)
{
   stringTest.push(jsonObjectRole[i].title);
}
});


let answerExistingManager =0;
var answerExistingManagerString;
var jsonObjectManager;
var stringTest1 = [];
var idManager = 1;

let sql1 = ` SELECT DISTINCT CONCAT(e.first_name, " ", e.last_name) AS manager 
FROM employee em 
LEFT JOIN  employee e
ON e.id  = em.manager_id
where em.manager_id = e.id OR em.manager_id is NULL;`;


connection.query(sql1, function(err,results5){
if (err) throw err;
answerExistingManager = results5;

answerExistingManagerString = JSON.stringify(answerExistingManager);
jsonObjectManager = JSON.parse(answerExistingManagerString);

stringManager.push('none');
for(var i = 0; i < jsonObjectManager.length; i++)
{
    if(jsonObjectManager[i].manager == null)
    {
        stringTest1.push('none');
    }
    else
    {
        stringTest1.push(jsonObjectManager[i].manager);
        stringManager.push(jsonObjectManager[i].manager);
    }
}

});
  
        // If there's no 'projects' array property, create one
        if (!portfolioData10.projects) {
            portfolioData10.projects = [];
        }
        
    return inquirer
            .prompt([
                    {
                        type: 'input',
                        name: 'firstNameEmployee',
                        message: 'What is the employee s first name?',
                        validate: firstNameEmployee => {
                            if (firstNameEmployee) {
                                answerFirstNameEmployee = firstNameEmployee;  
                                employeeFirst_name = firstNameEmployee.slice();
                              return true;
                            } else {
                              console.log('Please enter the employee s first name?');
                              return false;
                            }
                          }
                      },
                      {
                        type: 'input',
                        name: 'lastNameEmployee',
                        message: 'What is the employee s last name?',
                        validate: lastNameEmployee => {
                            if (lastNameEmployee) {
                                answerLastNameEmployee = lastNameEmployee;  
                                employeeLast_name = lastNameEmployee.slice();
                              return true;
                            } else {
                              console.log('Please enter the employee s last name?');
                              return false;
                            }
                          }
                      },
                      {
                        type: 'list',
                        name: 'employeeRole',
                        choices: stringTest,
                        message: 'What is the employee s role?',
                      }
            ])
            .then(({ employeeRole }) => {
                employeeRoleGlobal =employeeRole;
              
                    for(var i= 0; i < jsonObjectRole.length; i++)
                    {
                        if( employeeRole.localeCompare(jsonObjectRole[i].title) == 0)
                        {
                            idRole = jsonObjectRole[i].id;
                            employeeRoleGlobal =idRole;
                        }
                     }
                     stringTest.splice(0,stringTest.length);
                        return false;      
            })
          .then (promptAddEmployeeManager) 
          .then ( promptManager);       
    };

    const promptAddEmployeeManager = portfolioData11 => {

let answerExistingManager =0;
var answerExistingManagerString;
var jsonObjectManager;
var stringTest32 = [];
var idManager = 1;

let sql2 = ` SELECT DISTINCT CONCAT(e.first_name, " ", e.last_name) AS manager 
FROM employee em 
LEFT JOIN  employee e
ON e.id  = em.manager_id
where em.manager_id = e.id OR em.manager_id is NULL;`;

connection.query(sql2, function(err,results5){
 
if (err) throw err;
answerExistingManager = results5;

answerExistingManagerString = JSON.stringify(answerExistingManager);
jsonObjectManager = JSON.parse(answerExistingManagerString);

});
for(var i = 0; i < stringManager.length; i++)
{
    stringTest32.push(stringManager[i]);
}

let answerExistingManager30 =0;
var answerExistingManagerString30;
var jsonObjectManager30;

let sql30 = ` SELECT DISTINCT em.id, CONCAT(e.first_name, " ", e.last_name) AS manager30 
FROM employee em 
LEFT JOIN  employee e
ON e.id  = em.id
GROUP BY em.id;`;


connection.query(sql30, function(err,results30){
   
if (err) throw err;
answerExistingManager30 = results30;

answerExistingManagerString30 = JSON.stringify(answerExistingManager30);
jsonObjectManager30 = JSON.parse(answerExistingManagerString30);

});
        // If there's no 'projects' array property, create one
        if (!portfolioData11.projects) {
            portfolioData11.projects = [];
        }
        
    return inquirer
            .prompt(
                
                      {
                        type: 'list',
                        name: 'employeeManager1',
                        choices: stringTest32,
                        message: 'Who is the employee s manager888?',
    
                      }
                      
            )
            .then(({ employeeManager1 }) => {
               
                            for(var y= 0; y < jsonObjectManager30.length; y++)
                            {
                                
                                if( employeeManager1.localeCompare('none') == 0)
                                {
                                    idManager = 0;
                                }
                                  else if( employeeManager1.localeCompare(jsonObjectManager30[y].manager30) == 0)
                                    {
                                        idManager = jsonObjectManager30[y].id;
                                    }
                             }
                            
                                 let sql20 = `INSERT INTO employee ( first_name, last_name, role_id, manager_id)
                                 VALUES(?, ?, ?, ?);`;
                
                                    connection.query(sql20,[employeeFirst_name,employeeLast_name,employeeRoleGlobal, idManager], function(err,results){
                                    if (err) throw err;
                                    });
                                   
                                    stringTest32.splice(0,stringTest32.length);
                                    stringManager.splice(0,stringManager.length);
                              
                               return false;
            });       
    }; 

    module.exports = init;