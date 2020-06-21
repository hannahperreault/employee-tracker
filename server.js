const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err, res) => {
  if (err) {
    throw err;
  }
  start();
});

// function which prompts the user for what action they should take
const start = () => {
  inquirer
    .prompt({
      name: "chooseAction",
      type: "list",
      message:
        "Would you like to [VIEW] all records, [ADD] a record, or [UPDATE] an existing record?",
      choices: ["VIEW", "ADD", "UPDATE", "EXIT"],
    })
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.chooseAction === "VIEW") {
        //function to view records
        //   viewRecords();
        viewRecords();
      } else if (answer.chooseAction === "ADD") {
        //function to add record
        addRecord();
      } else if (answer.chooseAction === "UPDATE") {
        //function to update record
        updateRecord();
      } else {
        connection.end();
      }
    });
};

const viewRecords = () => {
  inquirer
    .prompt({
      name: "chooseAction",
      type: "list",
      message: "What do you want to view?",
      choices: ["ROLES", "DEPARTMENT", "EMPLOYEE"],
    })
    .then(function (answer) {
      connection.query(`SELECT * FROM ${answer.chooseAction}`, (err, res) => {
        if (err) {
          throw err;
        }
        console.table(res);
        start();
      });
    });
};

const addRecord = () => {
  inquirer
    .prompt([
      {
        name: "table_type",
        type: "list",
        message: "What kind of record do you want to add?",
        choices: ["DEPARTMENT", "EMPLOYEE", "ROLE"],
      },
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info

      //add a new DEPARTMENT:
      if (answer.table_type === "DEPARTMENT") {
        console.log("yes, department");
        inquirer
          .prompt([
            {
              name: "dept_name_insert",
              type: "input",
              message: "What is the department name you want to add?",
            },
          ])
          .then(function (answer) {
            connection.query(
              "INSERT INTO department SET ?",
              {
                dept_name: answer.dept_name_insert,
              },
              (err) => {
                if (err) {
                  throw err;
                }
              }
            );
          });
      }
      //add a new ROLE:
      else if (answer.table_type === "ROLE") {
        console.log("yes, role");
        inquirer
          .prompt([
            {
              name: "role_title",
              type: "input",
              message: "What is the role title you want to add?",
            },
            {
              name: "role_salary",
              type: "input",
              message: "What is the salary for this role?",
            },
            {
              name: "role_dept_id",
              type: "input",
              message: "What is the associated department ID?",
            },
          ])
          .then(function (answer) {
            connection.query(
              "INSERT INTO roles SET ?",
              {
                title: answer.role_title,
                salary: answer.role_salary,
                dept_id: answer.role_dept_id,
              },
              (err) => {
                if (err) {
                  throw err;
                }
              }
            );
          });
      }
      //add a new EMPLOYEE
      else if (answer.table_type === "EMPLOYEE") {
        inquirer
          .prompt([
            {
              name: "employee_first_name",
              type: "input",
              message: "What is the employee's first name?",
            },
            {
              name: "employee_last_name",
              type: "input",
              message: "What is their last name?",
            },
            {
              name: "employee_role_id",
              type: "input",
              message: "What is the associated role ID?",
            },
            {
              name: "employee_manager_id",
              type: "input",
              message: "What is the associated manager ID?",
            },
          ])
          .then(function (answer) {
            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answer.employee_first_name,
                last_name: answer.employee_last_name,
                role_id: answer.employee_role_id,
                manager_id: answer.employee_manager_id,
              },
              (err) => {
                if (err) {
                  throw err;
                }
              }
            );
          });
      }
    });
};

// updateRecord is selected:
const updateRecord = () => {
  inquirer
    .prompt([
      {
        name: "table_type",
        type: "list",
        message: "Which kind of record do you want to update?",
        choices: ["DEPARTMENT", "EMPLOYEE", "ROLE"],
      },
    ])
    .then(function (answer) {
      // when finished prompting, update an existing record in the selected table

      //update a DEPARTMENT:
      if (answer.table_type === "DEPARTMENT") {
        inquirer
          .prompt([
            {
              name: "update_choice",
              type: "input",
              message:
                "What is the ID number of the [DEPARTMENT] record you want to change?",
            },
            {
              name: "update_name",
              type: "input",
              message: "What is the new name for this department?",
            },
          ])
          .then(function (answer) {
            connection.query(
              "UPDATE department SET ? WHERE ?",
              [
                {
                  dept_name: answer.update_name,
                },
                {
                  id: answer.update_choice,
                },
              ],
              (err, res) => {
                if (err) {
                  throw err;
                }
                console.log("The record has been updated!");
              }
            );
          });

        //update a role record
      } else if (answer.table_type === "ROLE") {
        inquirer
          .prompt([
            {
              name: "update_choice",
              type: "input",
              message:
                "What is the ID number of the [ROLES] record you want to change?",
            },
            {
              name: "update_title",
              type: "input",
              message: "What is the new tile for this role?",
            },
            {
              name: "update_salary",
              type: "input",
              message: "What is the new salary for this role?",
            },
            {
              name: "update_dept_id",
              type: "input",
              message:
                "What is the new associated department id for this role?",
            },
          ])
          .then(function (answer) {
            connection.query(
              "UPDATE roles SET ? WHERE ?",
              [
                {
                  title: answer.update_title,
                  salary: answer.update_salary,
                  dept_id: answer.update_dept_id,
                },
                {
                  id: answer.update_choice,
                },
              ],
              (err, res) => {
                if (err) {
                  throw err;
                }
                console.log("The record has been updated!");
              }
            );
          });
        //update employee record
      }
      //update an employee record
      else if (answer.table_type === "EMPLOYEE") {
        inquirer
          .prompt([
            {
              name: "update_choice",
              type: "input",
              message:
                "What is the ID number of the [EMPLOYEE] record you want to change?",
            },
            {
              name: "update_first_name",
              type: "input",
              message: "What is the new first name for this employee?",
            },
            {
              name: "update_last_name",
              type: "input",
              message: "What is the new last name for this employee?",
            },
            {
              name: "update_role_id",
              type: "input",
              message: "What is the new role id for this employee?",
            },
            {
              name: "update_manager_id",
              type: "input",
              message: "What is the new manager id for this employee?",
            },
          ])
          .then(function (answer) {
            connection.query(
              "UPDATE employee SET ? WHERE ?",
              [
                {
                  first_name: answer.update_first_name,
                  last_name: answer.update_last_name,
                  role_id: answer.update_role_id,
                  manager_id: answer.update_manager_id,
                },
                {
                  id: answer.update_choice,
                },
              ],
              (err, res) => {
                if (err) {
                  throw err;
                }
                console.log("The record has been updated!");
              }
            );
          });
      }
    });
};
