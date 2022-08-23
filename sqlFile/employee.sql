use seeds;

SET GLOBAL FOREIGN_KEY_CHECKS=0;

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES('John', 'Doe', 1, NULL);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES('Mike', 'Chan', 2, 1);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES('Ashley', 'Rodriguez', 3, NULL);


INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES('Kevin', 'Tupik', 4, 3);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES('Kunal', 'Singh', 5, NULL);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES('Malia', 'Brown', 6, 5);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES('Sarah', 'Lourd', 7, NULL);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES('Tom', 'Allen', 8, 7);