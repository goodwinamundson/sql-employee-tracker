-- Values for department table
INSERT INTO department (id, department_name)
VALUES 
(1, "Marketing"),
(2, "Design"),
(3, "IT"),
(4, "HR");

-- Values for role table
INSERT INTO role (id, title, salary, department_id)
VALUES
(11, "Salesperson", 80000, 1),
(12, "Salesperson", 70000, 1),
(13, "Senior Software Engineer", 120000, 2),
(14, "Software Engineer", 150000, 2),
(15, "IT Administrator", 160000, 3),
(16, "IT Engineer", 125000, 3),
(17, "HR Manager", 250000, 4),
(18, "Lawyer", 190000, 4),
(19, "Web Designer", 90000, 2);

-- Values for employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(22, "Carlman", "Clementia", 11, null),
(24, "Linton", "Aurora", 12, 22),
(44, "Susanee", "Primrose", 13, null),
(36, "Cesc", "Josefina", 14, 44),
(64, "Linwood", "Melanija", 15, null),
(66, "Modestine", "Miloslav", 16, 64),
(88, "Trecia", "Noah", 17, null),
(90, "Uta", "Rexanne", 18, 88),
(99, "Cirian", "Kamil", 19, null);