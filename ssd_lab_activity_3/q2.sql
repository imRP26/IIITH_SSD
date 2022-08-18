use company;

select concat(fname, ' ', minit, ' ', lname) as fullName, ssn, dno, numSubordinates 
from employee join
(select distinct super_ssn, count(*) as numSubordinates from employee where 
super_ssn is not null group by super_ssn) as table1 
on table1.super_ssn = employee.ssn;
