const request = require("request");
const fs = require("fs");
const secrets = require("./secrets");

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, callback) {
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

function processResponse(err, result) {
  console.log("Errors:", err);
  console.log("Results:\n\n")
  for (const i of result) {
    // console.log("username: " + i.login + "; avatar URL: " + i.avatar_url);
    downloadImageByURL(i.avatar_url, "./avatars/" + i.login + ".jpg");
  }

}

const downloadImageByURL = function (url, destinationPath) {
  request
    .get(url)
    // .on("error", function (err) {
    //   console.log(err);
    //   throw err;
    // })
    .on("response", function (response) {
      console.log (`Downloading file: ${url} ...`);
    })
    .pipe(fs.createWriteStream(destinationPath)) //&& console.log(`Saved to ${destinationPath}`));

}

getRepoContributors("jquery", "jquery", processResponse);

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");