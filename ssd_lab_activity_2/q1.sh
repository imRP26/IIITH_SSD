#!/bin/bash

numLines=`wc -l $1`
n=( $numLines )
n=${n[0]}
mod=$((n%2))

if [[ $mod -eq 1 ]]
then
    #echo "Odd Number of Lines."
    tail -n +$(((`cat $1 | wc -l` / 2) + 1)) $1 | head -n 1
else
    #echo "Even Number of Lines."
    tail -n +$(((`cat $1 | wc -l` / 2))) $1 | head -n 1
fi

