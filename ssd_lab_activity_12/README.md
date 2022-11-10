***

**Details of lab activity 12**

****NOTE:****
<br>
For both Q1 and Q2, I've specified the shebang line in my Python scripts as **#!/opt/homebrew/bin/python3**, which is actually the location where my Python3 is located.

***

***Q1***
<br>
The given file (containing all the matrices) is read into a 3-Dimensional list called wholeFile. For each individual matrix, the median timestamp is stored in another list called medianTimestamps, and the median is calculated as the timestamp associated with the half of the number of rows of each individual matrix.
<br>
Now, it was noted that the left foot columns were **8**, **9** and **10** and for the right foot, the columns were **16**, **17**, **18** and **19**. So whenever a non-0 value is noted in any of these columns, the corresponding indices were noted in either of the lists, leftFoot or rightFoot.
<br>
For calculating the stride length, the positions of when the left foot initially touches the mat - those have been taken into consideration. First instance would be when there's an initial contact and the next instance would be when while the right foot is still in partial contact with the mat and the left foot just starts having contact. The corresponding row indices and timestamps are then noted and the values of Stride Length, Velocity and Cadence are found out.
<br>
***Stride Length = final_left_foot_row_index - initial_left_foot_row_index***, wherein the final and initial values of left foot row index are calculated as per the above description.
<br>
***Velocity = stride_length / timestamp_difference***
<br>
***Cadence = 3 * 60 / timestamp_difference***
<br>
Execution -> **./Q1.py**
<br>

***


***Q2***
<br>
3 random matrices are taken from **mat.txt** and put into 3 different files - **mat1.txt**, **mat2.txt** and **mat3.txt**. The values are read from these 3 files and the nconcatenated together into a single 2D list, having dimensions 126 * 26. And then the exact same method is applied as above, with the exception of how the stride length is calculated. The stride length is just taken to be the difference in the row index value between the first position of the left foot and the last position. Again, this has been done since the matrices have been taken randomly. Otherwise, the whole procedure remains exactly the same as mentioned above for Q1.
<br>
Execution -> **./Q2.py**

***
