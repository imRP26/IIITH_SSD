use company;

select concat(fname, ' ', minit, ' ', lname) as fullName, ssn, dnumber, dname from employee, 
department,  
(select essn, sum(hours) as numHours from works_on group by essn having numHours < 40) 
as table1 
where table1.essn = employee.ssn and employee.dno = department.dnumber and 
department.mgr_ssn = employee.ssn;
