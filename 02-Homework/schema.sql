DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
id INT AUTO_INCREMENT,
PRIMARY KEY (id),
`name` VARCHAR (30) 
);

CREATE TABLE roles (
id INT AUTO_INCREMENT,
title VARCHAR (30) NOT NULL,
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id) REFERENCES departments(id),
PRIMARY KEY (id) 
);

CREATE TABLE employees (
id INT AUTO_INCREMENT ,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY (role_id) REFERENCES roles(id),
FOREIGN KEY (manager_id) REFERENCES employees(id),
PRIMARY KEY (id)
);

