CREATE DEFINER=`root`@`localhost` PROCEDURE `sum_opening_receiving_amounts`()
BEGIN
	select CUST_NAME, GRADE from customer where (OPENING_AMT + RECEIVE_AMT) > 10000;
END