# GitHub Avatar Downloader

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`.

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js <owner> <repository name>`

**KNOWN BUG:**  Will throw an error if ./avatars/ does not exist.

**KNOWN BUG:**  Does not distinguish file-type of target avatar.  As a result, if the written file is not formatted as a jpeg, it will not open.

## Thanks:

Justin Richardsson and Emily McMinn for inhuman patience and generosity.