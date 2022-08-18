use company;

select dname, d1.dnumber, count(*) as numLocations from department d1 
join dept_locations d2 on d1.dnumber = d2.dnumber where d1.dnumber in
(select * from 
(select dnumber from department where mgr_ssn in 
(select essn from 
(select essn, count(*) as numDependents from dependent where sex = 'F' group by essn 
having numDependents >= 2) as table1)) as table2) group by d1.dnumber;