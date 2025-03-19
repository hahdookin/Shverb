#!/bin/bash

set -e

npm run build

sed -i 's|/assets|./assets|g' ./dist/index.html

neocities delete shverb/

cp -r ./dist/* ~/Desktop/neocities/site/shverb/

neocities push ~/Desktop/neocities/site/.