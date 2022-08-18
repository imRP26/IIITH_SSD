use company;

select mgr_ssn, dnumber, numDependents from 
(select essn, count(*) as numDependents from dependent group by essn) as table3
join
(select mgr_ssn, dnumber from department where dnumber in 
(select dnumber from 
(select dnumber, count(*) as numLocations from dept_locations group by dnumber having 
numLocations >= 2) as table1)) as table2 on table3.essn = table2.mgr_ssn;