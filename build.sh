#!/bin/bash

# rm -rf dist


npm run build && 

scp -r dist/* root@47.107.47.84:/root/caddy/webdist/devsimon/dist

