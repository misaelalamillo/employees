var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Amady$97",
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});


function start() {

    console.log(`
    ___________________________________
    |     _____            _____      |
    |    |     |          |     |     | 
    |    |_____|          |_____|     |
    |                                 |
    |                                 |
    |     \                    /      |
    |      \                  /       |
    |       \________________/        |     
    |                                 |
    |                                 |
    |                                 |
    |                                 |
    |_________________________________|
    `)
  //  * Add departments, roles, employees

 // * View departments, roles, employees

  //* Update employee roles

    inquirer
    .prompt({
      type: "list",
      name: "choices",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View all Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role"
      ]
    })
    .then(function(answer) {
        console.log(answer);
      switch (answer.choices) {
      case "View All Employees":
        viewAllEmployees();
        break;

      case "View All Employees By Department":
        viewAllEmployeesDept();
        break;

      case "View All Employees By Manager":
        viewAllEmployeesManager();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Remove Employee":
        removeEmployee();
        break;

      
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      }
    });
}

function viewAllEmployeesDept() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "View All Employees By Department"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM departments WHERE ?", { departments: answer.departments }, function(err, res) {
        if(err) throw err;
        console.log(
          "Name: " +
            res[0].name
        );
        start();
      });
    });
}

function viewAllEmployeesManager() {
  inquirer
    .prompt({
      name: "manager",
      type: "input",
      message: "View All Employees By Manager"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM employees WHERE ?", { manager_id: answer.manager_id }, function(err, res) {
        if(err) throw err;
        console.log(
          "Name: " +
            res[0].manager_id
        );
        start();
      });
    });
}

// function viewAllEmployees() {
//   var query = "SELECT * FROM employees";
//   connection.query(query,{ }, function(err, res) {
//       if (err) throw err;
//       for (var i = 0; i < res.length; i++) {
//         console.table("First Name: " + res[i].first_name + " || Last name: " + res[i].last_name + " || Role id: " + res[i].role_id + " || Manager id: " + res[i].manager_id);
//       }
//       start();
//     });
// }
function viewAllEmployees() {
  inquirer
    .prompt({
      name: "allEmployees",
      type: "input",
      message: "View All Employees"
    })
    .then(function(answer) {
     var query = "FROM roles INNER JOIN employees ON roles.first_name.last_name = roles.employees AND employees.departments ";

      connection.query(query, [answer.employees, answer.employees], function(err, res) {
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            i+1 + ".) " +
              "First Name: " +
              res[i].first_name +
              " Last Name: " +
              res[i].last_name +
              " || Role Id: " +
              res[i].role_id +
              " || Manager Id: " +
              res[i].manager_id
        
          );
        }

        runSearch();
      });
    });
  }

function addEmployee() {
  inquirer
    .prompt({
      name: "addemployee",
      type: "list",
      message: "Add Employee",
      choices: ["ADD", "EXIT"]
    })
    .then(function(answer) {
      if (answer.addemployee === "ADD") {
        postEmployee();
      }
     else{
        connection.end();
      }
    });
}

function postEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employees first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employees last name?"
      },
      {
        name: "roleId",
        type: "input",
        message: "What is the employees role id?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id
        },
        function(err) {
          if (err) throw err;
          console.log("You have successfully entered the employee");
          start();
        }
      );
    });
}

function removeEmployee() {
  inquirer
    .prompt({
      name: "removeEmployee",
      type: "list",
      message: "Remove employee",
      choices: ["REMOVE", "EXIT"]
    })
    .then(function(answer) {
      if (answer.removeEmployee === "REMOVE") {
        deleteEmployee();
      }
     else{
        connection.end();
      }
    });
}

function deleteEmployee() {
  inquirer
    .prompt([
      {
        name: "removefirst",
        type: "input",
        message: "What is the employees first name?"
      },
      {
        name: "removelast",
        type: "input",
        message: "What is the employees last name?"
      },
      {
        name: "removeroleId",
        type: "input",
        message: "What is the employees role id?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query(
        "DELETE * FROM employees", function(err) {
          if (err) throw err;
          console.log("You have successfully removed an employee");
          start();
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt({
      name: "updateEmployee",
      type: "list",
      message: "Update employee id",
      choices: ["UPDATE", "EXIT"]
    })
    .then(function(answer) {
      if (answer.updateEmployee === "UPDATE") {
        updateEmployee();
      }
     else{
        connection.end();
      }
    });
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        name: "updateEmployee",
        type: "input",
        message: "What is the employees role id you would like to update?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query(
        "UPDATE * FROM employees WHERE role_id = ?", function(err) {
          if (err) throw err;
          console.log("You have successfully updated the employees role id.");
          start();
        }
      );
    });
}





