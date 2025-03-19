#!/bin/bash

set -e

npm run build

sed -i 's|/assets|./assets|g' ./dist/index.html

neocities delete conjugate/

cp -r ./dist/* ~/Desktop/neocities/site/conjugate/

neocities push ~/Desktop/neocities/site/.