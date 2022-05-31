var issueContainerEl= document.querySelector("#issues-container");








var getRepoIssues =function(repo) {
    console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

fetch(apiUrl).then(function(response) {
    //request succesful
    if (response.ok){
        response.json().then(function(data){
            displayIssues(data);
        });
    }
    else {
        alert("there was a problem with your request");
 }
});
}
//new function
var displayIssues = function(issues){
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
      }


    issueContainerEl.appendChild(issueEl);

    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //appen to container 
        issueEl.appendChild(titleEl)

        //create a type element
        var typeEl= document.createElement("span");

        //check if issue is an actual issue or pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
          } else {
            typeEl.textContent = "(Issue)";
          }

          //append to container
          issueEl.appendChild(typeEl);



        
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
      }
}

getRepoIssues("facebook/react");