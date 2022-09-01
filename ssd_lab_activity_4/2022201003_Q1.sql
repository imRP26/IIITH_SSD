CREATE DEFINER=`root`@`localhost` PROCEDURE `AddTwoNumbers`(
in num1 int, in num2 int, out result int
)
BEGIN
	set result = num1 + num2;
END