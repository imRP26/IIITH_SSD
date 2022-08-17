<h3>
This file contains descriptions of the logic used in solving questions 1 and 2 in SSD Lab Activity 2, dated 11th August, 2022.
</h3>



<h5>
For Question 1 :-
</h5>
  
Initially, the number of lines contained in the input file is checked. The input file is given as a command-line argument to the script (i.e., accessed by the script through <strong>$1</strong>).<br>
Now, the modulus of number of lines in the file with 2 is determined.<br>
If odd number of lines is detected, then the line having line number <strong>ceil(numLines / 2)</strong> is printed out.<br>
Else if even number of lines is detected, then the line having line number <strong>floor(numLines / 2)</strong> is printed out.<br>
<strong>tail -n +N</strong> -> This displays the <strong>last (n / 2)</strong> lines of the intput file.<br>
<strong>tail -n +N | ... | head -n 1</strong> -> This displays the <strong>1st line of the last (n / 2)</strong> lines of the input file.<br> 
Here, line numbers start with 1 in each input file.<br>
The input files against which <strong>q1.sh</strong> has been tested are :- <strong>fileOdd.txt</strong> and <strong>fileEven.txt.</strong><br>
In order to test for edge cases, <strong>q1.sh</strong> has also been tested with 2 other files, <strong>file0.txt</strong> and <strong>file1.txt</strong>, containing 0 and 1 line espectively.<br>
Method of executing this script -> <strong>./q1.sh filepath</strong>


<h5>
For Question 2 :- 
</h5>
  
<strong>cat /etc/shells</strong> -> This lists out all the shells available in the system.<br>
<strong>cat /etc/shells | grep -w 'usr'</strong> -> This lists out all those shells that belong to <strong>usr</strong>, or that have the substring <strong>/usr/</strong> in them.<br>
<strong>cat /etc/shells | grep -w 'usr' | awk -F'/' '{print $NF}'</strong> -> Here, <strong>awk</strong> splits a string considering <strong>/</strong> as the delimiter and <strong>$NF</strong> basically prints out the last component of the above split.
Method of executing this script -> <strong>./q2.sh</strong>
