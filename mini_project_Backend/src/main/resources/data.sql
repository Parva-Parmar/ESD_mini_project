-- Departments (engineering college context)
INSERT INTO departments (department_id, name, capacity)
VALUES
    (1, 'Accounts Office', 15),
    (2, 'Computer Science', 60)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    capacity = VALUES(capacity);

-- Employees (include an accounts office user for self-exclusion logic)
INSERT INTO employees (employee_id, first_name, last_name, email, title, photograph_path, department_id, monthly_salary)
VALUES
    (101, 'Anita', 'Iyer', 'accounts', 'Senior Accountant', NULL, 1, 55000.00),
    (102, 'Rahul', 'Verma', 'rahul.verma@ecollege.edu', 'Assistant Professor', NULL, 2, 60000.00),
    (103, 'Sneha', 'Kulkarni', 'sneha.kulkarni@ecollege.edu', 'Associate Professor', NULL, 2, 62000.00)
ON DUPLICATE KEY UPDATE
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    email = VALUES(email),
    title = VALUES(title),
    photograph_path = VALUES(photograph_path),
    department_id = VALUES(department_id),
    monthly_salary = VALUES(monthly_salary);

INSERT INTO departments (department_id, name, capacity)
VALUES
    (3, 'Electrical Engineering', 50),
    (4, 'Mechanical Engineering', 50)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    capacity = VALUES(capacity);

INSERT INTO employees (employee_id, first_name, last_name, email, title, photograph_path, department_id, monthly_salary)
VALUES
    (104, 'Prakash', 'Nair', 'prakash.nair@ecollege.edu', 'Professor', NULL, 3, 75000.00),
    (105, 'Meena', 'Shetty', 'meena.shetty@ecollege.edu', 'Professor', NULL, 4, 74000.00),
    (106, 'Vikram', 'Menon', 'vikram.menon@ecollege.edu', 'Assistant Professor', NULL, 2, 65000.00),
    (107, 'Kiran', 'Rao', 'kiran.rao@ecollege.edu', 'Assistant Professor', NULL, 2, 64000.00),
    (108, 'Suresh', 'Patel', 'suresh.patel@ecollege.edu', 'Accountant', NULL, 1, 50000.00),
    (109, 'Leela', 'Das', 'leela.das@ecollege.edu', 'Lab Assistant', NULL, 3, 35000.00),
    (110, 'Manoj', 'Sharma', 'manoj.sharma@ecollege.edu', 'Workshop Instructor', NULL, 4, 38000.00)
ON DUPLICATE KEY UPDATE
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    email = VALUES(email),
    title = VALUES(title),
    photograph_path = VALUES(photograph_path),
    department_id = VALUES(department_id),
    monthly_salary = VALUES(monthly_salary);

INSERT INTO employees (employee_id, first_name, last_name, email, title, photograph_path, department_id, monthly_salary)
VALUES
    (111, 'Rohit', 'Kulkarni', 'rohit.kulkarni@ecollege.edu', 'Assistant Professor', NULL, 2, 60000.00),
    (112, 'Neha', 'Bhat', 'neha.bhat@ecollege.edu', 'Assistant Professor', NULL, 2, 62000.00),
    (113, 'Ajay', 'Pai', 'ajay.pai@ecollege.edu', 'Lab Technician', NULL, 3, 42000.00),
    (114, 'Divya', 'Naik', 'divya.naik@ecollege.edu', 'Lab Technician', NULL, 4, 42000.00),
    (115, 'Sameer', 'Pandey', 'sameer.pandey@ecollege.edu', 'Workshop Assistant', NULL, 4, 43000.00),
    (116, 'Pooja', 'Reddy', 'pooja.reddy@ecollege.edu', 'Assistant Professor', NULL, 2, 65000.00),
    (117, 'Mahesh', 'Gowda', 'mahesh.gowda@ecollege.edu', 'Assistant Professor', NULL, 2, 64000.00),
    (118, 'Alok', 'Sinha', 'alok.sinha@ecollege.edu', 'Junior Accountant', NULL, 1, 45000.00),
    (119, 'Kavita', 'Mishra', 'kavita.mishra@ecollege.edu', 'Department Coordinator', NULL, 3, 48000.00),
    (120, 'Farhan', 'Ali', 'farhan.ali@ecollege.edu', 'Department Coordinator', NULL, 4, 48000.00)
ON DUPLICATE KEY UPDATE
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    email = VALUES(email),
    title = VALUES(title),
    photograph_path = VALUES(photograph_path),
    department_id = VALUES(department_id),
    monthly_salary = VALUES(monthly_salary);

-- More employees to reach a total of 60 (college staff and students)
INSERT INTO employees (employee_id, first_name, last_name, email, title, photograph_path, department_id, monthly_salary)
VALUES
    (121, 'Nikita', 'Shah', 'nikita.shah@ecollege.edu', 'Assistant Professor', NULL, 2, 70000.00),
    (122, 'Ganesh', 'Pai', 'ganesh.pai@ecollege.edu', 'Accountant', NULL, 1, 52000.00),
    (123, 'Rohan', 'Kulkarni', 'rohan.kulkarni@ecollege.edu', 'Teaching Associate', NULL, 2, 20000.00),
    (124, 'Chitra', 'Menon', 'chitra.menon@ecollege.edu', 'Assistant Professor', NULL, 2, 68000.00),
    (125, 'Bhavna', 'Rao', 'bhavna.rao@ecollege.edu', 'Assistant Professor', NULL, 3, 47000.00),
    (126, 'Chetan', 'Deshpande', 'chetan.deshpande@ecollege.edu', 'Workshop Assistant', NULL, 4, 44000.00),
    (127, 'Divya', 'Shelar', 'divya.shelar@ecollege.edu', 'Junior Accountant', NULL, 1, 51000.00),
    (128, 'Eshan', 'Naidu', 'eshan.naidu@ecollege.edu', 'Assistant Professor', NULL, 2, 66000.00),
    (129, 'Farah', 'Ansari', 'farah.ansari@ecollege.edu', 'Department Secretary', NULL, 3, 36000.00),
    (130, 'Gaurav', 'Kulkarni', 'gaurav.kulkarni@ecollege.edu', 'Workshop Instructor', NULL, 4, 39000.00),
    (131, 'Harsh', 'Patil', 'harsh.patil@ecollege.edu', 'Assistant Professor', NULL, 2, 67000.00),
    (132, 'Isha', 'Shinde', 'isha.shinde@ecollege.edu', 'Lab Assistant', NULL, 3, 46000.00),
    (133, 'Jatin', 'Gowda', 'jatin.gowda@ecollege.edu', 'Teaching Associate', NULL, 4, 20000.00),
    (134, 'Kiran', 'Kulkarni', 'kiran.kulkarni.cs@ecollege.edu', 'Assistant Professor', NULL, 2, 65500.00),
    (135, 'Leena', 'Kulkarni', 'leena.kulkarni@ecollege.edu', 'Senior Accountant', NULL, 1, 50500.00),
    (136, 'Manav', 'Mehta', 'manav.mehta@ecollege.edu', 'Assistant Professor', NULL, 2, 67500.00),
    (137, 'Neha', 'Nair', 'neha.nair.ee@ecollege.edu', 'Professor', NULL, 3, 80000.00),
    (138, 'Omkar', 'Joshi', 'omkar.joshi@ecollege.edu', 'Professor', NULL, 4, 79500.00),
    (139, 'Pooja', 'Patel', 'pooja.patel@ecollege.edu', 'Teaching Associate', NULL, 2, 20000.00),
    (140, 'Rohit', 'Rao', 'rohit.rao@ecollege.edu', 'Assistant Professor', NULL, 2, 69000.00),
    (141, 'Sanjay', 'Singh', 'sanjay.singh@ecollege.edu', 'Lab Technician', NULL, 3, 42000.00),
    (142, 'Tanvi', 'Trivedi', 'tanvi.trivedi@ecollege.edu', 'Lab Technician', NULL, 4, 42000.00),
    (143, 'Uday', 'Upadhyay', 'uday.upadhyay@ecollege.edu', 'Workshop Assistant', NULL, 4, 44000.00),
    (144, 'Varun', 'Verma', 'varun.verma@ecollege.edu', 'Assistant Professor', NULL, 2, 68000.00),
    (145, 'Wamiqa', 'Wadhwa', 'wamiqa.wadhwa@ecollege.edu', 'Accountant', NULL, 1, 51000.00),
    (146, 'Yusuf', 'Yadav', 'yusuf.yadav@ecollege.edu', 'Assistant Professor', NULL, 2, 67000.00),
    (147, 'Zara', 'Zai', 'zara.zai@ecollege.edu', 'Department Coordinator', NULL, 3, 56000.00),
    (148, 'Aditi', 'Anand', 'aditi.anand@ecollege.edu', 'Workshop Instructor', NULL, 4, 59000.00),
    (149, 'Bharat', 'Bose', 'bharat.bose@ecollege.edu', 'Teaching Associate', NULL, 2, 20000.00),
    (150, 'Chirag', 'Chandra', 'chirag.chandra@ecollege.edu', 'Assistant Professor', NULL, 2, 69000.00),
    (151, 'Deepa', 'Dixit', 'deepa.dixit@ecollege.edu', 'Assistant Professor', NULL, 2, 66000.00),
    (152, 'Esha', 'Ekta', 'esha.ekta@ecollege.edu', 'Lab Assistant', NULL, 3, 47000.00),
    (153, 'Faisal', 'Farooq', 'faisal.farooq@ecollege.edu', 'Teaching Associate', NULL, 4, 20000.00),
    (154, 'Gita', 'Goswami', 'gita.goswami@ecollege.edu', 'Assistant Professor', NULL, 2, 68000.00),
    (155, 'Hari', 'Hussain', 'hari.hussain@ecollege.edu', 'Accountant', NULL, 1, 51000.00),
    (156, 'Indu', 'Irfan', 'indu.irfan@ecollege.edu', 'Assistant Professor', NULL, 2, 67000.00),
    (157, 'Jaya', 'Joshi', 'jaya.joshi@ecollege.edu', 'Department Secretary', NULL, 3, 36000.00),
    (158, 'Kavya', 'Kohli', 'kavya.kohli@ecollege.edu', 'Workshop Instructor', NULL, 4, 59000.00),
    (159, 'Lalit', 'Lodha', 'lalit.lodha@ecollege.edu', 'Teaching Associate', NULL, 2, 20000.00),
    (160, 'Meera', 'Malik', 'meera.malik@ecollege.edu', 'Assistant Professor', NULL, 2, 69000.00)
ON DUPLICATE KEY UPDATE
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    email = VALUES(email),
    title = VALUES(title),
    photograph_path = VALUES(photograph_path),
    department_id = VALUES(department_id),
    monthly_salary = VALUES(monthly_salary);

-- Pay schedule: all 60 employees are expected to be paid in both November and December 2025
INSERT INTO employee_pay_schedule (employee_id, pay_year, pay_month)
VALUES
    -- November 2025
    (101, 2025, 11), (102, 2025, 11), (103, 2025, 11), (104, 2025, 11), (105, 2025, 11),
    (106, 2025, 11), (107, 2025, 11), (108, 2025, 11), (109, 2025, 11), (110, 2025, 11),
    (111, 2025, 11), (112, 2025, 11), (113, 2025, 11), (114, 2025, 11), (115, 2025, 11),
    (116, 2025, 11), (117, 2025, 11), (118, 2025, 11), (119, 2025, 11), (120, 2025, 11),
    (121, 2025, 11), (122, 2025, 11), (123, 2025, 11), (124, 2025, 11), (125, 2025, 11),
    (126, 2025, 11), (127, 2025, 11), (128, 2025, 11), (129, 2025, 11), (130, 2025, 11),
    (131, 2025, 11), (132, 2025, 11), (133, 2025, 11), (134, 2025, 11), (135, 2025, 11),
    (136, 2025, 11), (137, 2025, 11), (138, 2025, 11), (139, 2025, 11), (140, 2025, 11),
    (141, 2025, 11), (142, 2025, 11), (143, 2025, 11), (144, 2025, 11), (145, 2025, 11),
    (146, 2025, 11), (147, 2025, 11), (148, 2025, 11), (149, 2025, 11), (150, 2025, 11),
    (151, 2025, 11), (152, 2025, 11), (153, 2025, 11), (154, 2025, 11), (155, 2025, 11),
    (156, 2025, 11), (157, 2025, 11), (158, 2025, 11), (159, 2025, 11), (160, 2025, 11),
    -- December 2025
    (101, 2025, 12), (102, 2025, 12), (103, 2025, 12), (104, 2025, 12), (105, 2025, 12),
    (106, 2025, 12), (107, 2025, 12), (108, 2025, 12), (109, 2025, 12), (110, 2025, 12),
    (111, 2025, 12), (112, 2025, 12), (113, 2025, 12), (114, 2025, 12), (115, 2025, 12),
    (116, 2025, 12), (117, 2025, 12), (118, 2025, 12), (119, 2025, 12), (120, 2025, 12),
    (121, 2025, 12), (122, 2025, 12), (123, 2025, 12), (124, 2025, 12), (125, 2025, 12),
    (126, 2025, 12), (127, 2025, 12), (128, 2025, 12), (129, 2025, 12), (130, 2025, 12),
    (131, 2025, 12), (132, 2025, 12), (133, 2025, 12), (134, 2025, 12), (135, 2025, 12),
    (136, 2025, 12), (137, 2025, 12), (138, 2025, 12), (139, 2025, 12), (140, 2025, 12),
    (141, 2025, 12), (142, 2025, 12), (143, 2025, 12), (144, 2025, 12), (145, 2025, 12),
    (146, 2025, 12), (147, 2025, 12), (148, 2025, 12), (149, 2025, 12), (150, 2025, 12),
    (151, 2025, 12), (152, 2025, 12), (153, 2025, 12), (154, 2025, 12), (155, 2025, 12),
    (156, 2025, 12), (157, 2025, 12), (158, 2025, 12), (159, 2025, 12), (160, 2025, 12)
ON DUPLICATE KEY UPDATE employee_id = employee_id;


-- User accounts for email/password login (password = "password")
INSERT INTO user_accounts (id, email, password, roles)
VALUES
    (1, 'accounts', '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi5CRQ8b7e7E8pQn.Xqo0Uob/6J2eGa', 'ACCOUNTS')
ON DUPLICATE KEY UPDATE id = id;
