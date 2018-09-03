# GitHub Avatar Downloader

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`.

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js jquery jquery`


## Scratch

Keys provided by the GitHub API:
- id (unique identifier)
- login (username to use for file output)
- avatar_url (location of avatar image for download)