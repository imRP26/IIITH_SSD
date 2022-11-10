#!/opt/homebrew/bin/python3

import datetime

wholeMatrix = []

with open('mat1.txt', 'r') as fread1:
    while True:
        line = fread1.readline()
        if not line:
            break
        matrixRow = line.split()
        wholeMatrix.append(matrixRow)

with open('mat2.txt', 'r') as fread2:
    while True:
        line = fread2.readline()
        if not line:
            break
        matrixRow = line.split()
        wholeMatrix.append(matrixRow)

with open('mat3.txt', 'r') as fread3:
    while True:
        line = fread3.readline()
        if not line:
            break
        matrixRow = line.split()
        wholeMatrix.append(matrixRow)

numMatrixRows = len(wholeMatrix) // 3 # 42
numMatrixColumns = len(wholeMatrix[0]) # 26
halfNumRows = numMatrixRows // 6

medianTimestamps = []
medianTimestamps.append(wholeMatrix[halfNumRows][0])
medianTimestamps.append(wholeMatrix[3 * halfNumRows][0])
medianTimestamps.append(wholeMatrix[5 * halfNumRows][0])

leftFoot = []
rightFoot = []

for i in range(len(wholeMatrix)):
    if i == 0:
        continue
    for j in range(numMatrixColumns):
        if wholeMatrix[i][j] != '0' and j != 0:
            if j > 15:
                rightFoot.append([wholeMatrix[i][0], i, j])
            else:
                leftFoot.append([wholeMatrix[i][0], i, j])

# Calculating the Stride Length
leftInitialTimestampIndex = 0
leftXInitial = leftFoot[0][1]
leftYInitial = leftFoot[0][2]
lenLeftFoot = len(leftFoot)
leftFinalTimestampIndex = 2
leftXFinal = leftFoot[lenLeftFoot - 1][1]
leftYFinal = leftFoot[lenLeftFoot - 1][2]

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
