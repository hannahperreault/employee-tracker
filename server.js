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
        console.log("viewing record");
      } else if (answer.chooseAction === "ADD") {
        //function to add record
        //   addRecord();
        console.log("adding record");
      } else if (answer.chooseAction === "UPDATE") {
        //function to update record
        //updateRecord();

        console.log("updating record");
      } else {
        connection.end();
      }
    });
};
