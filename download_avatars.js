const request = require("request");
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
    console.log(i.avatar_url);
  }

}

getRepoContributors("jquery", "jquery", processResponse);