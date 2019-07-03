var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "IloveU@pril21!!",
  database: "bamazonDB"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

//first i am going to create a inquirer list with customer manager supervisor and exit
function start() {
    inquirer
      .prompt({
        name: "bamazonCustomer",
        type: "list",
        message: "please select an option from the menu",
        choices: ["View products sales by department", "Create new department", "Exit"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.bamazonCustomer === "View products sales by department") {
        displayTable();
        console.log('\n'
        
        
        
        );
        customer();
        } else if (answer.bamazonCustomer === "Create new department") {
            displayTable();
            console.log('\n'
            
            
            
            );
            customer();
        }else{
          connection.end();
        }
      });
  }

  function salesDepartment(){
    connection.query("SELECT * FROM products ", function(err, results){
        if (err) throw err;
        console.table(results)
        // customer(results\\);
    })

  }