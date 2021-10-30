function loadRepos() {
    let username = document.querySelector('#username').value;
    let ulRepos = document.querySelector('#repos');



    fetch(`https://api.github.com/users/${username}/repos`)
		.then((response) => {
			if(response.ok === false){
				throw Error(`${response.status} ${response.statusText}`)
			}
			return response.json()
		})
		.then(handleResponse)
		.catch((error) =>  console.log(error))

		function handleResponse(data) {
			ulRepos.innerHTML = '';
			for(let repo of data) {

				let liElement = document.createElement('li');
				let anchorTag = document.createElement('a');
				anchorTag.textContent = repo.full_name;
				anchorTag.href = repo.html_url;

				liElement.appendChild(anchorTag);
				ulRepos.appendChild(liElement);
			}
		}
}