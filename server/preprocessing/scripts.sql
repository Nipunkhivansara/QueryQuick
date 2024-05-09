CREATE TABLE IF NOT EXISTS vectorstore(
    id varchar(200) , 
    value varchar(1000)
);

CREATE TABLE IF NOT EXISTS vectorstoremongo(
    id varchar(200) , 
    value varchar(9999)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    UNIQUE (id, email)
);

CREATE TABLE IF NOT EXISTS notebooks (
    notebook_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS cells (
     id int primary key,
     notebook_id int,
     user_id INT,
     prompt text,
     query text,
     FOREIGN KEY (user_id) REFERENCES users(id),
     FOREIGN KEY (notebook_id) REFERENCES notebooks(notebook_id)
);