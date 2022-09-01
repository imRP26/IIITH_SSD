CREATE DEFINER=`root`@`localhost` PROCEDURE `customer_names_in_city`(city varchar(30))
BEGIN
	select CUST_NAME from customer where WORKING_AREA = city;
END