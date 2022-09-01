use company;

select count(pno) as numProjects from works_on where essn in 
(select mgr_ssn from department where dnumber in
(select dnum from project where pname = 'ProductY'));
