#!/bin/bash
for i in {1..100}
do
    echo $((1 + $RANDOM % 9999))
done