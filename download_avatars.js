const request = require("request");
const fs = require("fs");
const secrets = require("./secrets");

console.log("Welcome to the GitHub Avatar Downloader!\n");

function getRepoContributors(repoOwner, repoName, callback) {
  if (!repoOwner || !repoName) {
    return console.log(`\nExpected arguments: <Name of Repository Owner> <Name of Repository>\nPlease try again.\n`);
  }

  // Inserts user input into the API.
  // For reliable use, add your own token to ./secrets.js {GITHUB_TOKEN: "token <string>"}
  const options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": secrets.GITHUB_TOKEN
    }
  };

  request(options, function (err, result, body) {
    const downloadedInfo = JSON.parse(body);
    callback(err, downloadedInfo);
  });
}

// Iterates through the downloaded JSON and writes avatars to ./avatars/ as <username>.jpg
// ### KNOWN BUG: Will throw an error if ./avatars/ does not exist.
// ### KNOWN BUG: Does not distinguish file-type of target avatar.  As a result, if the written file is not formatted as a jpeg, it will not open.
function processResponse(err, result) {
  console.log("Errors:", err);
  console.log("Results:\n\n")
  for (const i of result) {
    downloadImageByURL(i.avatar_url, "./avatars/" + i.login + ".jpg");
  }

}

// Takes URL provided by parsed JSON via API and pipes it to the write stream.
const downloadImageByURL = function (url, destinationPath) {
  request
    .get(url)
    .on("response", function (response) {
      console.log (`Downloading file: ${url} ...`);
    })
    .pipe(fs.createWriteStream(destinationPath))

}

// Takes user input: <Repository Owner> <Repository Name>
const owner = process.argv[2];
const name = process.argv[3];

// Executes code from user input.
getRepoContributors(owner, name, processResponse);
