CREATE DATABASE  seeds 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE seeds;
SET GLOBAL FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS department;
CREATE TABLE department(
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    CONSTRAINT PRIMARY KEY(id)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role(
	id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    CONSTRAINT PRIMARY KEY(id, department_id)
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
	id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT(11) NULL DEFAULT NULL ,
    CONSTRAINT PRIMARY KEY(id, role_id)
);

-- add a foreign key
ALTER TABLE role
    ADD CONSTRAINT fk_role_department
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
    
ALTER TABLE employee
    ADD CONSTRAINT fk_employee_role
    FOREIGN KEY(role_id)
    REFERENCES role(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
    
ALTER TABLE employee
    ADD CONSTRAINT fk_employee_emplyee
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;