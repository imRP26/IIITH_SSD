#!/bin/bash

cat /etc/shells | grep -w 'usr' | awk -F'/' '{print $NF}'

