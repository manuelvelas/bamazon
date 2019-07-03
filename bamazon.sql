DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

create table products(
	item_id integer(11) not null auto_increment,
    product_name varchar(140) not null,
    department_name varchar(90) not null,
    price Decimal(10,4) not null, 
    stock_quantity integer(11) not null,
    product_sales integer(11), 
	PRIMARY KEY (item_id)
);

create table departments(
	department_id integer(11) not null auto_increment,
    department_name varchar(90)not null,
    over_head_costs decimal(10,4) not null,
    total_profit decimal(10,4),
    primary key (department_id)
);

insert into departments (department_name, over_head_costs)
values ("technology", 2000),
("disposables", 1000),
("clothing", 32000);

insert into products (product_name, department_name, price, stock_quantity)
values ("television", "Technology", 250.00, 400),
("toilet paper", "household", 20, 150),
("plastic cups", "disposables", 5, 500),
("cellphones", "Technology", 80.00, 230),
("books", "education", 35.00, 34),
("computers", "Technology", 800.00, 100),
("hats", "clothing", 23, 89),
("bagpack", "sports", 45, 60),
("coffe", "foods", 8.00, 22),
("shirts", "clothing", 13, 600);

select * from products; 
select * from departments