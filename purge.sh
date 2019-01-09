#! /usr/bin/env bash

#curl 'https://purge.jsdelivr.net/gh/brokkrr/brokkrr-events/build.js'

curl -X POST \
  http://purge.jsdelivr.net/ \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"path": [
		"/gh/brokkrr/brokkrr-events/build.js"
	]
}'
