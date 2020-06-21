ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'oupidenf87';
FLUSH PRIVILEGES;

DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

-- Design the following database schema containing three tables:
-- * **department**:
--   * **id** - INT PRIMARY KEY
--   * **name** - VARCHAR(30) to hold department name
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    dept_name VARCHAR(30)
);


-- * **role**:

--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role belongs to
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    title VARCHAR(30),
    salary DECIMAL,
    dept_id INT
);

-- * **employee**:

--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);



-- * starter data for each database
INSERT INTO employee (
    first_name, last_name, role_id, manager_id
)
VALUES ("Hannah", "Perreault", 3, 5), ("Coco", "Bananas", 8, 9);


INSERT INTO roles (
    title, salary, dept_id
)
VALUES ("Astronaut", 7000, 5), ("Space Monkey", 1000000, 2);


INSERT INTO department (
    dept_name
)
VALUES ("Space Food"), ("Science");
