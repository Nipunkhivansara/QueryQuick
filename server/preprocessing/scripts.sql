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
    profile VARCHAR(500) NULL,
    UNIQUE (id, email)
);

CREATE TABLE IF NOT EXISTS notebooks (
    notebook_id VARCHAR(255),
    user_id INT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, notebook_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX notebook_id ON notebooks(notebook_id);


CREATE TABLE IF NOT EXISTS cells (
    id INT AUTO_INCREMENT,
    notebook_id VARCHAR(255),
    user_id INT,
    prompt TEXT,
    query TEXT,
    cellType VARCHAR(50),
    cellValue TEXT,
    cellDatabaseType VARCHAR(50),
    cellDatabase VARCHAR(50),
    PRIMARY KEY (id, user_id, notebook_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (notebook_id) REFERENCES notebooks(notebook_id)
);