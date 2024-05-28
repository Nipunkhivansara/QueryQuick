-- Categories Table
CREATE TABLE Categories (
    Category_ID INT NOT NULL,
    Category_Name VARCHAR NOT NULL,
    PRIMARY KEY (Category_ID)
);

-- Customers Table
CREATE TABLE Customers (
    Customer_ID INT NOT NULL,
    First_Name VARCHAR NOT NULL,
    Last_Name VARCHAR NOT NULL,
    Email VARCHAR NOT NULL,
    Address TEXT,
    Phone VARCHAR,
    PRIMARY KEY (Customer_ID)
);

-- OrderDetails Table
CREATE TABLE OrderDetails (
    OrderDetail_ID INT NOT NULL,
    Order_ID INT,
    Product_ID INT,
    Quantity INT,
    PRIMARY KEY (OrderDetail_ID)
);

-- Orders Table
CREATE TABLE Orders (
    Order_ID INT NOT NULL,
    Customer_ID INT,
    Order_Date DATETIME NOT NULL,
    Status VARCHAR NOT NULL,
    Total_Amount DECIMAL NOT NULL,
    User_ID INT,
    PRIMARY KEY (Order_ID)
);

-- Payment_Methods Table
CREATE TABLE Payment_Methods (
    Payment_ID INT NOT NULL,
    Card_Number VARCHAR NOT NULL,
    Card_Type VARCHAR NOT NULL,
    Expiry_Date DATE NOT NULL,
    User_ID INT,
    PRIMARY KEY (Payment_ID)
);

-- Products Table
CREATE TABLE Products (
    Product_ID INT NOT NULL,
    Name VARCHAR NOT NULL,
    Description TEXT,
    Price DECIMAL NOT NULL,
    Category_ID INT,
    Supplier_ID INT,
    PRIMARY KEY (Product_ID)
);

-- Reviews Table
CREATE TABLE Reviews (
    Review_ID INT NOT NULL,
    Product_ID INT,
    Rating INT,
    Comment TEXT,
    Review_Date DATETIME NOT NULL,
    User_ID INT,
    PRIMARY KEY (Review_ID)
);

-- Shipping_Details Table
CREATE TABLE Shipping_Details (
    Shipping_ID INT NOT NULL,
    Order_ID INT,
    Shipping_Address TEXT NOT NULL,
    Shipping_Method VARCHAR NOT NULL,
    Shipping_Cost DECIMAL NOT NULL,
    PRIMARY KEY (Shipping_ID)
);

-- Suppliers Table
CREATE TABLE Suppliers (
    Supplier_ID INT NOT NULL,
    Supplier_Name VARCHAR NOT NULL,
    Contact_Info TEXT,
    PRIMARY KEY (Supplier_ID)
);

-- Users Table
CREATE TABLE Users (
    User_ID INT NOT NULL,
    Name VARCHAR NOT NULL,
    Email VARCHAR NOT NULL,
    Password VARCHAR NOT NULL,
    Address TEXT,
    Phone_Number VARCHAR,
    PRIMARY KEY (User_ID)
);
