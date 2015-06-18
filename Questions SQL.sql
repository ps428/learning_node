1. Create a database with below tables (take arbitrary column names)
      A. State(StateID, StateName)
      B. City(CityID, CityName, StateID)
      C. Customers(CustomerID, Name, Email, MobileNo, CityID, Pincode)
      D. Categories (CategoryID, Name)
      E. Products (ProductID, CategoryID, Name, Rate)
      F. Orders (OrderID, OrderNumber ,OrderDate, CustomerID, TotalAmount, OrderStatus )
      G. OrderProductList(OrderID, ProductID, Qty, Amount)
2. Solve the below statements:
  2.1. Write a query to get the name & mobile number of customers with the count of their order count.
  2.2. Write a query to update the Pincode to '342001' (in customers table) for the customers whose City is 'Jodhpur' AND customer Name contain "Ram"
  2.3. Write a query to get the list of customers from Jodhpur & Jaipur location and have returned a product (OrderStatus="returned")
  2.4. Write a query to get the list of customers, who never made any orders. 
  2.5.
    2.5.1 Write a query to find out product name which was sold maximmum (Qty).
    2.5.2 Write a query to find out most frequently ordered product Name (Frequency).
  2.6. Write a query to get the list of product, which are never ordered
  2.7. Write a query to get the product name, Number of times that product is ordered. 
  2.8.Write a query to get Order Number, Order Date,Category Name,Product Name,Qty, Rate, Amount & Tax(18%) for an order id “1”.
  2.9 Get all the categories ordered by a customer from state Rajasthan. Also get think how to get top k categories with the same constraints where k>=1.






--State(StateID, StateName)
CREATE TABLE State(
  StateID INT,
  StateName varchar(50),
  PRIMARY KEY(StateID)
);

--City(CityID, CityName, StateID)
CREATE TABLE City(
  CityID INT,
  CityName varchar(50),
  StateID INT,
  PRIMARY KEY(CityID),
  FOREIGN KEY(StateID) REFERENCES State(StateID)
);


--Customers(CustomerID, Name, Email, MobileNo, CityID, Pincode)
CREATE TABLE Customers(
  CustomerID INT,
  Name varchar(40),
  Email varchar(30),
  MobileNo varchar(20),
  CityID INT,
  Pincode INT,
  PRIMARY KEY(CustomerID),
  FOREIGN KEY(cityID) REFERENCES City(CityID)
);


--Categories (CategoryID, Name)
CREATE TABLE Categories(
  CategoryID INT,
  Name varchar(50),
  PRIMARY KEY(CategoryID)
);


--Products (ProductID, CategoryID, Name, Rate)
CREATE TABLE Products(
  ProductID int,
  CategoryID int,
  Name varchar(100),
  Rate DOUBLE,
  PRIMARY KEY(ProductID),
  FOREIGN KEY(CategoryID) REFERENCES Categories(CategoryID)
);


--Orders (OrderID, OrderNumber ,OrderDate, CustomerID, TotalAmount, OrderStatus )
CREATE TABLE Orders(
  OrderID INT,
  OrderNumber varchar(30),
  OrderDate Date,
  CustomerID INT,
  TotalAmount DOUBLE,
  OrderStatus varchar(40),
  PRIMARY KEY(OrderID),
  FOREIGN KEY(CustomerID) REFERENCES Customers(CustomerID)
);


--OrderProductList(OrderID, ProductID, Qty, Amount) -- Normalised values here to remove duplicacy
CREATE TABLE OrderProductList(
  OrderID int,
  ProductID int,
  Qty int,
  Amount DOUBLE,
  PRIMARY KEY(OrderID, ProductID)
);