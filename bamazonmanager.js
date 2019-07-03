//inquirer lit
//view P. for sale, view low inventory
//add to inventory
//ADD NEW PRODUCT
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
function start() {
    inquirer
      .prompt({
        name: "bamazonCustomer",
        type: "list",
        message: "please select What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Inventory", "Exit"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.bamazonCustomer === "View Products for Sale") {
        displayTable();
        console.log('\n'
        
        
        
        );
        start();
        } else if (answer.bamazonCustomer === "View Low Inventory") {
            lowInventory();
            console.log('\n'
            
            
            
            );
           
        }else if (answer.bamazonCustomer === "Add to Inventory") {
            addtoInventory();
            console.log('\n'
            
            
            
            );
           
        }else if (answer.bamazonCustomer === "Add New Inventory") {
            addNew();
            console.log('\n'
            
            
            
            );
          
        }else{
          connection.end();
        }
      });
  }
  //view P. for sale) list or display items for sale IDs, names, prices, Q.
  function displayTable(){
    // console.log("I am here");
    
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        console.table(results)
        // customer(results\\);
    })

}




//view low inventory) display any products that have less that 5 items
function lowInventory(){
    connection.query("SELECT * FROM products where stock_quantity < 6", function(err, results){
        if (err) throw err;
        console.table(results)
        // customer(results\\);
    })

}




//add to inventory
function addtoInventory(){

    inquirer 
        .prompt({
            name: "productId",
            type: "input",
            message: "Please enter product ID would you like to add more units",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              } 
        })
        //promp add items by ID

        //quantity  Update query
        .then(function(answer){
            inquirer 
                .prompt({
                name: "productUnits",
                type: "input",
                message: "Please enter the number of Units you would like to add",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                    }
                })

                .then(function(answer2){
                    connection.query("SELECT * FROM products where item_id ="+answer.productId, function(err, results){
                        // console.log(results);

                    var availableStock = parseInt(results[0].stock_quantity); 
                    var updateStock = availableStock + parseInt(answer2.productUnits); 
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            stock_quantity: updateStock
                            
                          },
                          {
                            item_id: answer.productId
                          }
                        ],
                        function(error) {
                          if (error) throw err;
                          start();
                        }
                      );

                    })
                })


})
}




//add new prodcut
//complete add new product (create query)

function addNew(){
    inquirer
    .prompt([
      {
        name: "itemname",
        type: "input",
        message: "What is the product name?"
      },
      {
        name: "department",
        type: "input",
        message: "What is the department?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "stock",
        type: "input",
        message: "What is the stock quantity?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.itemname,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.stock
        },
        function(err) {
          if (err) throw err;
          console.log("Your aproduct has been succesfully added!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });

}


