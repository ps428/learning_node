--State(StateID, StateName)
CREATE TABLE State(
  StateID INT,
  StateName varchar(50),
  PRIMARY KEY(StateID)
);

INSERT INTO
  State (StateID, StateName)
VALUES
  (1, "Delhi");

INSERT INTO
  State (StateID, StateName)
VALUES
  (2, "Haryana");

INSERT INTO
  State (StateID, StateName)
VALUES
  (3, "Rajasthan");

INSERT INTO
  State (StateID, StateName)
VALUES
  (4, "Madhya Pradesh");

INSERT INTO
  State (StateID, StateName)
VALUES
  (5, "Maharastra");

INSERT INTO
  State (StateID, StateName)
VALUES
  (6, "Uttar Pradesh");

--City(CityID, CityName, StateID)
CREATE TABLE City(
  CityID INT,
  CityName varchar(50),
  StateID INT,
  PRIMARY KEY(CityID),
  FOREIGN KEY(StateID) REFERENCES State(StateID)
);

INSERT INTO
  City (CityID, CityName, StateID)
VALUES
  (1, "Delhi", 1);

INSERT INTO
  City (CityID, CityName, StateID)
VALUES
  (2, "Jaipur", 3);

INSERT INTO
  City (CityID, CityName, StateID)
VALUES
  (3, "Jodhpur", 3);

INSERT INTO
  City (CityID, CityName, StateID)
VALUES
  (4, "Udaipur", 3);

INSERT INTO
  City (CityID, CityName, StateID)
VALUES
  (5, "Gurgaon", 2);

INSERT INTO
  City (CityID, CityName, StateID)
VALUES
  (6, "Indore", 4);

INSERT INTO
  City (CityID, CityName, StateID)
VALUES
  (7, "Mumbai", 5);

INSERT INTO
  City (CityID, CityName, StateID)
VALUES
  (8, "Noida", 6);

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

INSERT INTO
  Customers(
    CustomerID,
    Name,
    Email,
    MobileNo,
    CityID,
    Pincode
  )
VALUES
  (
    1,
    "Person 1",
    "email1@test.com",
    "1234567890",
    1,
    110001
  );

INSERT INTO
  Customers(
    CustomerID,
    Name,
    Email,
    MobileNo,
    CityID,
    Pincode
  )
VALUES
  (
    2,
    "Person 2",
    "email2@test.com",
    "1234567891",
    2,
    320001
  );

INSERT INTO
  Customers(
    CustomerID,
    Name,
    Email,
    MobileNo,
    CityID,
    Pincode
  )
VALUES
  (
    3,
    "Person 3",
    "email3@test.com",
    "1234567892",
    2,
    320010
  );

INSERT INTO
  Customers(
    CustomerID,
    Name,
    Email,
    MobileNo,
    CityID,
    Pincode
  )
VALUES
  (
    4,
    "Person 4 RAM",
    "email4@test.com",
    "1234567893",
    3,
    342002
  );

INSERT INTO
  Customers(
    CustomerID,
    Name,
    Email,
    MobileNo,
    CityID,
    Pincode
  )
VALUES
  (
    5,
    "Person 5 Ram",
    "email5@test.com",
    "1234567894",
    3,
    342006
  );

INSERT INTO
  Customers(
    CustomerID,
    Name,
    Email,
    MobileNo,
    CityID,
    Pincode
  )
VALUES
  (
    6,
    "Person 6",
    "email6@test.com",
    "1234567895",
    3,
    342001
  );

--Categories (CategoryID, Name)
CREATE TABLE Categories(
  CategoryID INT,
  Name varchar(50),
  PRIMARY KEY(CategoryID)
);

INSERT INTO
  Categories(CategoryID, Name)
VALUES
  (1, "Category 1");

INSERT INTO
  Categories(CategoryID, Name)
VALUES
  (2, "Category 2");

INSERT INTO
  Categories(CategoryID, Name)
VALUES
  (3, "Category 3");

--Products (ProductID, CategoryID, Name, Rate)
CREATE TABLE Products(
  ProductID int,
  CategoryID int,
  Name varchar(100),
  Rate DOUBLE,
  PRIMARY KEY(ProductID),
  FOREIGN KEY(CategoryID) REFERENCES Categories(CategoryID)
);

INSERT INTO
  Products(ProductID, CategoryID, Name, Rate)
VALUES
  (1, 1, "Product 1-1", 1.0);

INSERT INTO
  Products(ProductID, CategoryID, Name, Rate)
VALUES
  (2, 1, "Product 2-1", 2.0);

INSERT INTO
  Products(ProductID, CategoryID, Name, Rate)
VALUES
  (3, 2, "Product 3-2", 3.0);

INSERT INTO
  Products(ProductID, CategoryID, Name, Rate)
VALUES
  (4, 3, "Product 4-3", 4.0);

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

INSERT INTO
  Orders(
    OrderID,
    OrderNumber,
    OrderDate,
    CustomerID,
    TotalAmount,
    OrderStatus
  )
VALUES
  (1, "#1", "2022-06-17", 1, 12.00, "returned");

INSERT INTO
  Orders(
    OrderID,
    OrderNumber,
    OrderDate,
    CustomerID,
    TotalAmount,
    OrderStatus
  )
VALUES
  (2, "#2", "2022-06-12", 1, 15.00, "returned");

INSERT INTO
  Orders(
    OrderID,
    OrderNumber,
    OrderDate,
    CustomerID,
    TotalAmount,
    OrderStatus
  )
VALUES
  (3, "#3", "2022-06-11", 2, 11.00, "returned");

INSERT INTO
  Orders(
    OrderID,
    OrderNumber,
    OrderDate,
    CustomerID,
    TotalAmount,
    OrderStatus
  )
VALUES
  (4, "#4", "2022-06-11", 3, 32.00, "delivered");

INSERT INTO
  Orders(
    OrderID,
    OrderNumber,
    OrderDate,
    CustomerID,
    TotalAmount,
    OrderStatus
  )
VALUES
  (5, "#5", "2022-03-17", 3, 22.00, "delivered");

INSERT INTO
  Orders(
    OrderID,
    OrderNumber,
    OrderDate,
    CustomerID,
    TotalAmount,
    OrderStatus
  )
VALUES
  (6, "#6", "2022-02-17", 2, 62.00, "delivered");

INSERT INTO
  Orders(
    OrderID,
    OrderNumber,
    OrderDate,
    CustomerID,
    TotalAmount,
    OrderStatus
  )
VALUES
  (7, "#7", "2022-01-17", 3, 32.00, "delivered");

INSERT INTO
  Orders(
    OrderID,
    OrderNumber,
    OrderDate,
    CustomerID,
    TotalAmount,
    OrderStatus
  )
VALUES
  (8, "#8", "2022-05-17", 1, 22.00, "delivered");

INSERT INTO
  Orders(
    OrderID,
    OrderNumber,
    OrderDate,
    CustomerID,
    TotalAmount,
    OrderStatus
  )
VALUES
  (9, "#9", "2022-03-17", 2, 32.00, "delivered");

--OrderProductList(OrderID, ProductID, Qty, Amount) -- Normalised values here to remove duplicacy
CREATE TABLE OrderProductList(
  OrderID int,
  ProductID int,
  Qty int,
  Amount DOUBLE,
  PRIMARY KEY(OrderID, ProductID)
);

INSERT INTO
  OrderProductList(OrderID, ProductID, Qty, Amount)
VALUES
  (1, 1, 12, 12.0);

INSERT INTO
  OrderProductList(OrderID, ProductID, Qty, Amount)
VALUES
  (2, 1, 13, 18.0);

INSERT INTO
  OrderProductList(OrderID, ProductID, Qty, Amount)
VALUES
  (2, 2, 14, 32.0);

INSERT INTO
  OrderProductList(OrderID, ProductID, Qty, Amount)
VALUES
  (1, 3, 16, 132.0);

INSERT INTO
  OrderProductList(OrderID, ProductID, Qty, Amount)
VALUES
  (3, 2, 42, 122.0);

-- DONE
--1. Write a query to get the name & mobile number of customers with the count of their order count.
SELECT
  Customers.Name,
  Customers.MobileNo,
  count(Orders.CustomerID)
FROM
  Customers
  LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
GROUP BY
  Customers.CustomerID;

--DONE
--2. Write a query to update the Pincode to '342001' (in customers table) for the customers whose City is 'Jodhpur' AND customer Name contain "Ram"
UPDATE
  Customers
  INNER JOIN City ON Customers.CityID = City.CityID
SET
  Pincode = "342002"
WHERE
  City.CityName = "Jodhpur"
  AND Customers.Name LIKE "%RAM%";

-- DONE
--3. Write a query to get the list of customers from Jodhpur & Jaipur location and have returned a product (OrderStatus="returned")
SELECT
  *
FROM
  Customers
  INNER JOIN City ON Customers.CityID = City.CityID
  INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID
WHERE
  Orders.OrderStatus = "returned"
  AND City.CityName in ("Jodhpur", "Jaipur");

--DONE
--4. Write a query to get the list of customers, who never made any orders. 
SELECT
  Customers.*
FROM
  Customers
  LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
WHERE
  Orders.CustomerID IS NULL;

--5.Write a query to find out product name which was sold maximmum (Qty).
--Write a query to find out most frequently ordered product Name (Frequency).
-- Always try to apply left join
-- Most frequent
SELECT
  *
FROM
  (
    SELECT
      Name,
      a.productCounts,
      RANK () OVER (
        ORDER BY
          a.productCounts DESC
      ) AS Rank_no
    FROM
      (
        SELECT
          OrderProductList.ProductID,
          count(OrderProductList.ProductID) as productCounts
        FROM
          OrderProductList
        GROUP BY
          OrderProductList.ProductID
      ) a
      inner join Products on Products.ProductID = a.ProductID
  ) b
WHERE
  Rank_no = 1;

-- most sold: max(quantity)
SELECT
  *
FROM
  (
    SELECT
      a.ProdutName,
      a.productSales,
      RANK () OVER (
        ORDER BY
          a.productSales DESC
      ) AS Rank_no
    FROM
      (
        SELECT
          Products.Name as ProdutName,
          sum(OrderProductList.Qty) as productSales
        FROM
          OrderProductList
          LEFT JOIN Products ON OrderProductList.ProductID = Products.ProductID
        GROUP BY
          OrderProductList.ProductID
        ORDER BY
          productSales DESC
      ) a
  ) b
WHERE
  Rank_no = 1;

-- most amount sold: max(amount)
SELECT
  *
FROM
  (
    SELECT
      a.ProdutName,
      a.productSalesAmount,
      RANK () OVER (
        ORDER BY
          a.productSalesAmount DESC
      ) AS Rank_no
    FROM
      (
        SELECT
          Products.Name as ProdutName,
          sum(OrderProductList.Amount) as productSalesAmount
        FROM
          OrderProductList
          LEFT JOIN Products ON OrderProductList.ProductID = Products.ProductID
        GROUP BY
          OrderProductList.ProductID
        ORDER BY
          productSalesAmount DESC
      ) a
  ) b
WHERE
  Rank_no = 1;

--Done
--6. Write a query to get the list of product, which are never ordered
SELECT
  *
FROM
  Products
  LEFT JOIN OrderProductList ON Products.ProductID = OrderProductList.ProductID
WHERE
  OrderProductList.ProductID IS NULL;

--DONE
--7. Write a query to get the product name, Number of times that product is ordered. 
SELECT
  Products.Name,
  count(OrderProductList.ProductID)
FROM
  Products
  LEFT JOIN OrderProductList ON Products.ProductID = OrderProductList.ProductID
GROUP BY
  Products.ProductID;

-- DONE
--8.Write a query to get Order Number, Order Date,Category Name,Product Name,Qty, Rate, Amount & Tax(18%) for an order id “1”.
SELECT
  Orders.OrderNumber,
  Orders.OrderDate,
  Categories.Name,
  Products.Name,
  OrderProductList.Qty,
  OrderProductList.Amount,
  ROUND(OrderProductList.Amount *.18, 3) as Tax
FROM
  Orders
  INNER JOIN OrderProductList ON Orders.OrderID = OrderProductList.OrderID
  INNER JOIN Products ON OrderProductList.ProductID = Products.ProductID
  INNER JOIN Categories ON Products.CategoryID = Categories.CategoryID;

--9 Get all the categories ordered by a customer from state Rajasthan
SELECT
  DISTINCT Categories.Name
FROM
  Customers
  INNER JOIN City ON Customers.CityID = City.CityID
  INNER JOIN State ON City.StateID = State.StateID
  AND State.StateName = 'Rajasthan'
  INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID
  INNER JOIN OrderProductList ON Orders.OrderID = OrderProductList.OrderID
  INNER JOIN Products ON OrderProductList.ProductID = Products.ProductID
  INNER JOIN Categories ON Products.CategoryID = Categories.CategoryID;

-----------------------------------
--PROBLEM 2
-- Flag = 1 => Log in
-- Flag = 0 => Log out
CREATE TABLE Session(
  Name VARCHAR(60),
  PCName VARCHAR(30),
  Time TIMESTAMP,
  Flag INT
);

INSERT INTO
  Session
VALUES
  ('X', 'PC1', '2022-03-06 09:30:00', 1);

INSERT INTO
  Session
VALUES
  ('Y', 'PC2', '2022-03-06 09:45:00', 1);

INSERT INTO
  Session
VALUES
  ('X', 'PC1', '2022-03-06 10:30:00', 0);

INSERT INTO
  Session
VALUES
  ('X', 'PC1', '2022-03-06 11:10:00', 1);

INSERT INTO
  Session
VALUES
  ('Y', 'PC2', '2022-03-06 13:30:00', 0);

INSERT INTO
  Session
VALUES
  ('Y', 'PC2', '2022-03-06 14:30:00', 1);

INSERT INTO
  Session
VALUES
  ('X', 'PC1', '2022-03-06 15:10:00', 0);

SELECT
  sum(a.TimeD),
  Name
FROM
  (
    SELECT
      if(a.Flag = 0, -1, 1) * a.Time as TimeD,
      a.Name
    FROM
      Session a
  ) b
WHERE
  a.name = 'X';

SELECT
  DATEADD(
    ms,
    SUM(DATEDIFF(ms, '00:00:00.000', Time)),
    '00:00:00.000'
  ) as time
FROM
  Session;

SELECT
  DATEADD(
    ms,
    SUM(
      DATEDIFF(ms, '00:00:00.000', convert(datetime, Time))
    ),
    '00:00:00.000'
  ) as time
FROM
  Session;

SELECT
  TIMEDIFF(b.Time, a.Time),
  b.Name,
  b.Time as LogInTime,
  a.Name,
  a.Time as LogOutTime
from
  Session a,
  Session b,
  Session c
WHERE
  a.Name = b.Name
  AND a.Name = c.Name
  AND a.FLAG = 1
  AND b.Flag = 0
  AND c.Flag = 1
  AND a.Time < b.Time
  AND c.Time > b.Time;

SELECT
  TIMEDIFF(b.Time, a.Time),
  b.Name,
  b.Time as LogInTime,
  a.Name,
  a.Time as LogOutTime
from
  Session a,
  Session b
WHERE
  a.Name = b.Name
  AND a.FLAG = 1
  AND b.Flag = 0
  AND a.Time < b.Time;

CREATE TABLE Session2(
  Name VARCHAR(60),
  PCName VARCHAR(30),
  LogInTime TIMESTAMP,
  LogOutTime TIMESTAMP
);

INSERT INTO
  Session2
VALUES
  (
    'X',
    'PC1',
    '2022-03-06 09:30:00',
    '2022-03-06 10:30:00'
  );

INSERT INTO
  Session2
VALUES
  (
    'Y',
    'PC2',
    '2022-03-06 09:45:00',
    '2022-03-06 13:30:00'
  );

INSERT INTO
  Session2
VALUES
  (
    'X',
    'PC1',
    '2022-03-06 11:10:00',
    '2022-03-06 15:10:00'
  );

INSERT INTO
  Session2 (Name, PCName, LogInTime)
VALUES
  ('Y', 'PC2', '2022-03-06 14:30:00');

SELECT
FROM
  (
    SELECT
      TIMEDIFF(
        if(a.LogOutTime IS NULL, NOW(), a.LogOutTime),
        a.LogInTime
      ) as SessionTime,
      Name,
      NOW() as CurremtTime
    FROM
      Session2 a
  ) b
WHERE
  Name = 'X';

SELECT
  b.Name,
  a.Name
from
  Session2 a,
  Session2 b
WHERE
  a.Name = b.Name;

CREATE TABLE Fried (
  id INT,
  content varchar(300),
  previous_id INT,
  next_id INT
);

INSERT INTO
  Fried
VALUES
  (1, "Preheat an oven to 220 degrees C.", NULL, 2);

INSERT INTO
  Fried
VALUES
  (2, "Peel four potatoes.", 1, 4);

INSERT INTO
  Fried
VALUES
  (3, "Toss sliced potatoes with oil.	", 4, 6);

INSERT INTO
  Fried
VALUES
  (4, "Cut potatoes into slices.	", 2, 3);

INSERT INTO
  Fried
VALUES
  (
    5,
    "Season the hot slices with salt and pepper.	",
    6,
    NULL
  );

INSERT INTO
  Fried
VALUES
  (
    6,
    "Bake in the preheated oven for 20 minutes.	",
    3,
    5
  );

SELECT
  a.id,
  a.content,
  "=>",
  b.id,
  b.content
FROM
  Fried a,
  Fried b
WHERE
  a.next_id = b.id;


SELECT
  TIMEDIFF(if(b.Time IS NULL, NOW(), b.Time), a.Time) as Duration,
  b.Name as LogInName,
  b.Time as LogInTime,
  a.Name LogOutName,
  a.Time as LogOutTime
from
  Session a,
  Session b
WHERE
  a.Name = b.Name
  AND a.FLAG = 1
  AND b.Flag = 0
  AND a.Time < if(b.Time IS NULL, NOW(), b.Time);

SELECT
  TIMEDIFF(if(b.Time IS NULL, NOW(), b.Time), a.Time),
  b.Name,
  b.Time as LogInTime,
  a.Name,
  a.Time as LogOutTime
from
  Session a,
  Session b,
  Session c
WHERE
  a.Name = b.Name
  AND a.Name = c.Name
  AND a.FLAG = 1
  AND b.Flag = 0
  AND c.Flag = 1
  AND a.Time < b.Time
  AND a.Time > c.Time;

  select c.*,"=>",NextRow.* from  Fried  as c
     left join Fried NextRow on  c.next_id = NextRow.id
    order by if(isnull(c.previous_id),0,c.previous_id);
  
    
       
WITH cte AS (
  SELECT
    Name, 
    Flag
    WHERE Flag=0
  UNION
  SELECT 
    a.Name, 
)  

SELECT TIME(Duration), LogInName, LogInTime, LogOutName, LogOutTime FROM(
  SELECT
   SUM(TIMEDIFF(if(b.Time IS NULL, NOW(), b.Time), a.Time)) OVER(PARTITION BY a.Name) as Duration,
    b.Name as LogInName,
    b.Time as LogInTime,
    a.Name LogOutName,
    a.Time as LogOutTime
  from
    Session a,
    Session b
  WHERE
    a.Name = b.Name
    AND a.FLAG = 1
    AND b.Flag = 0
    AND a.Time < if(b.Time IS NULL, NOW(), b.Time))c;

  -- recursive queries
  -- write a query to get 3^x 
  WITH RECURSIVE x2 (result) AS (
    SELECT 1
    UNION ALL
    SELECT result+2 FROM x2 WHERE result <10)
SELECT * FROM x2;

-- use parittion to add the of durations of differnt users

  WITH RECURSIVE rec(Duration, OldTime, OldFlag, NewTime, NewFlag, Name) AS (
    SELECT 0, Time, -1, Time, Flag, Name FROM Session WHERE Name='X' AND Time = '2022-03-06 09:30:00' 
    UNION ALL
    SELECT Duration + if(Flag=1, TIMEDIFF(NewTime,OldTime),0), NewTime, NewFlag, Session.Time, Session.Flag, rec.Name FROM rec, Session
  )
  SELECT * from rec;

--able to get duration values
SELECT TIME(Duration), LogInName, LogInTime, LogOutName, LogOutTime FROM(
  SELECT
   SUM(TIMEDIFF(if(b.Time IS NULL, NOW(), b.Time), a.Time)) OVER(PARTITION BY a.Name) as Duration,
    b.Name as LogInName,
    b.Time as LogInTime,
    a.Name LogOutName,
    a.Time as LogOutTime
  from
    Session a,
    Session b
  WHERE
    a.Name = b.Name
    AND a.FLAG = 1
    AND b.Flag = 0
    AND a.Time < if(b.Time IS NULL, NOW(), b.Time))c;
