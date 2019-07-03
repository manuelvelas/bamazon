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
        message: "please pick a User?",
        choices: ["Customer", "Exit"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.bamazonCustomer === "Customer") {
        displayTable();
        console.log('\n'
        
        
        
        );
        customer();
        } else{
          connection.end();
        }
      });
  }
//custromer side, display Id's, names, prices of product
function displayTable(){
    // console.log("I am here");
    
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        console.table(results)
        // customer(results\\);
    })

}
//inquirer message 1) ask customer ID
function customer(inventoryTable){
    inquirer 
        .prompt({
            name: "productId",
            type: "input",
            message: "Please enter product ID",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              } 
        })

        .then(function(answer){

               
            //2) ask how many units
                inquirer 
                .prompt({
                name: "productUnits",
                type: "input",
                message: "Please enter the number of Units",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                    }
                })

                .then(function(answer2){
                    // console.log(answer.productId+"  "+answer2.productUnits);

                 
                    // inventory(answer.productId,answer.productUnits);
                    //if statement to verify if we have anough units
                    connection.query("SELECT * FROM products where item_id ="+answer.productId, function(err, results){
                        // console.log(results);

                    var availableStock = results[0].stock_quantity; 
                    var price = results[0].price;
                    



                    //yes.... place order update database(update query)
                    if(availableStock >= answer2.productUnits){

                        var updateStock = availableStock - answer2.productUnits; 
                        var total = price * answer2.productUnits;
                        var sales = results[0].product_sales + total;


                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                              {
                                stock_quantity: updateStock,
                                product_sales: sales
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



                    }else{

                         //no.... log, insufficient quantity, do not proccess order
                        console.log("At this point we do not have enough units of that product");
                        //send me again to inquirer list 
                        start();



                    }

                     
                })
  
        })
})


}







