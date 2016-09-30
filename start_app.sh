#!/bin/bash

# Invoke the Forever module (to START our Node.js server).
./node_modules/forever/bin/forever \
start \
-al logs/forever.log \
-ao logs/out.log \
-ae logs/err.log \
app.js