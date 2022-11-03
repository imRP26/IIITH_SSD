Explanation of Work for LAB 11 on 03/11/2022 :-

Data is read from lab_11_data.csv using csv.reader(). 
Each of the lines of the file is read into a temporary list, excluding the last 
6 values. Then this temporary list is appended to a 2-D list, called fileLines.

The 1st list of the above 2-D list is popped out, since it just contains the column 
names only.
Using filter and lambda functions, all those rows from the 2D list fileLines are kept in another 2D list called result, whose % change value is >= -3.0%.

For calculating the average of Open, High and Low columns for the 2D list result,
firstly the numbers are converted from strings into numerals, excluding any commas 
that are present in the strings and those 3 numbers are stored into another 2D list 
called tempList.

Using list, map and zip functions, the average of Open, Low and High columns is calculated and written into a file called avg_output.txt.

The starting character is accepted as input and now iteration is done through the 2D list fileLines, and information about all those companies are displayed, whose starting character matches the input character above.
The above output is also written in a space-separated manner into a file called stock_output.txt.
Here, for the input character 'B', results have been written into stock_output.txt.
