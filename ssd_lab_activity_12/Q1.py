#!/opt/homebrew/bin/python3

import datetime

wholeFile = []
singleMatrix = []

# Reading data from the input file and storing it as per convinience
with open('mat.txt', 'r') as fread:
    while True:
        line = fread.readline()
        if not line:
            break
        matrixRow = line.split()
        if not matrixRow:
            if not singleMatrix:
                continue
            wholeFile.append(singleMatrix)
            singleMatrix = []
        else:
            singleMatrix.append(matrixRow)

numMatrixRows = len(wholeFile[0]) # 42
numMatrixColumns = len(wholeFile[0][0]) # 26
halfNumRows = numMatrixRows // 2

medianTimestamps = []
for i in wholeFile:
    medianTimestamps.append(i[halfNumRows][0])

leftFoot = []
rightFoot = []

for i, matrix in enumerate(wholeFile):
    if i == 0:
        continue
    for j in range(numMatrixRows):
        for k in range(numMatrixColumns):
            if matrix[j][k] != '0' and k != 0:
                if k > 15:
                    rightFoot.append([i, matrix[j][0], j, k])
                else:
                    leftFoot.append([i, matrix[j][0], j, k])

# Calculating the Stride Length
leftInitialTimestampIndex = 0
leftXInitial = leftFoot[0][2]
leftYInitial = leftFoot[0][3]
leftFinalTimestampIndex = 0
leftXFinal = 0
leftYFinal = 0
for i, subList in enumerate(leftFoot):
    if i == 0:
        continue
    if leftFoot[i][0] - leftFoot[i - 1][0] > 1:
        leftFinalTimestampIndex = subList[0]
        leftXFinal = subList[2]
        leftYFinal = subList[3]
        break 

strideLength = abs(int(leftXFinal) - int(leftXInitial))
print ("Stride Length =", strideLength, "cells.")

# Computing the Velocity
t1 = float(medianTimestamps[leftFinalTimestampIndex].split(':')[-1])
t2 = float(medianTimestamps[leftInitialTimestampIndex].split(':')[-1])
timeDifference = t1 - t2
velocity = strideLength / timeDifference
print ("Velocity =", velocity, "cells per second.")

# Computing the Cadence
cadence = 3 * 60 / timeDifference
print ("Cadence =", cadence, "steps per minute.")
