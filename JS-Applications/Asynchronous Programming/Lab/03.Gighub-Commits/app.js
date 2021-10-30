function loadCommits() {
    // Try it with Fetch API
    let username = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;
    let ulCommits = document.getElementById('commits')



    console.log(username, repo)

    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
        .then((response) => {
            if(response.ok=== false){
                throw Error(`Error: ${response.status} (Not Found)`)
            }
            return response.json()
        })
        .then(responseHandler)
        .catch((error) => console.log(error))

        function responseHandler(data) {
            console.log(data)
            data.forEach((repo) => {
                let liElement = document.createElement('li');
                liElement.textContent = `${repo.commit.author.name}: ${repo.commit.message}`
                ulCommits.appendChild(liElement);
            })
        }
}