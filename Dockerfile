# syntax = docker/dockerfile:1
FROM pierrezemb/gostatic
COPY ./dist/ /srv/http/