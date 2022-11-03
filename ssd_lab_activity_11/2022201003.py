#!/opt/homebrew/bin/python3

import csv

 # 2-D list for holding all the lines of the file
fileLines = []

with open('lab_11_data.csv', 'r') as fread:
    csvFile = csv.reader(fread)
    for lines in csvFile:
        # Dropping the last 6 column values from each individual list
        tempLines = lines[: len(lines) - 6]
        fileLines.append(tempLines)

columnNames = fileLines[0]
fileLines.pop(0) # Removing the 1st list which contained only the column names
        
# %Chng -> dropping all those rows for this column whose value is >= -3.0
result = list(filter(lambda x: (float(x[6]) >= -3.0), fileLines))

# Calculating average of Open, High, Low for all the remaining rows
tempList = []
for subList in result:
    a = subList[1]
    a1 = ""
    for ch in a:
        if ch != ',':
            a1 += ch
    b = subList[2]
    b1 = ""
    for ch in b:
        if ch != ',':
            b1 += ch
    c = subList[3]
    c1 = ""
    for ch in c:
        if ch != ',':
            c1 += ch
    tempList.append([float(a1), float(b1), float(c1)])

tempList = list(map(lambda x: sum(x) / float(len(tempList)), zip(*tempList)))

fwrite = open('avg_output.txt', 'w')
for i in range(len(tempList)):
    if i != len(tempList) - 1:
        fwrite.write(str(tempList[i]) + '\n')
    else:
        fwrite.write(str(tempList[i]))
fwrite.close()    

# displaying all the stocks for a company starting with a specific letter
startingChar = input()
fw = open('stock_output.txt', 'w')
for subList in fileLines:
    if subList[0][0] != startingChar:
        continue
    for i in range(len(subList)):
        if i != len(subList) - 1:
            fw.write(subList[i] + ' ')
            print (subList[i], end=' ')
        else:
            fw.write(subList[i] + '\n')
            print (subList[i])
fw.close()
