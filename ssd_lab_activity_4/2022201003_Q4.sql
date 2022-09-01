CREATE DEFINER=`root`@`localhost` PROCEDURE `customer_details`()
BEGIN
	declare done int default false;
    declare a varchar(30);
    declare b varchar(30);
    declare c varchar(30);
    declare d int;
	declare cursor4 cursor for select CUST_NAME, WORKING_AREA, CUST_COUNTRY, GRADE from customer 
    where AGENT_CODE like "A00%";
    declare continue handler for not found set done = true;
    create table temp (CUST_NAME varchar(30), WORKING_AREA varchar(30), 
    CUST_COUNTRY varchar(30), GRADE varchar(30));
    
    open cursor4;
    
    read_loop: loop
		fetch cursor4 into a, b, c, d;
        if done then
			leave read_loop;
		end if;
        insert into temp values (a, b, c, d);
	end loop;
    select * from temp;
    drop table temp;
    close cursor4;
END