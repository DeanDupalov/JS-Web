function attachEvents() {
    const postSelectElement = document.getElementById('posts');
    const loadBtn = document.getElementById('btnLoadPosts');
    loadBtn.addEventListener('click', loadPostHandler);

    const viewPostBtn = document.getElementById('btnViewPost');
    viewPostBtn.addEventListener('click', viewPostHandler)

    let postTitle = document.getElementById('post-title')
    let listComments = document.getElementById('post-comments');


    async function loadPostHandler() {
        const response = await fetch('http://localhost:3030/jsonstore/blog/posts');
        const posts = await response.json();
        console.log(posts);
        Object.entries(posts)
            .forEach((el) => {
                let optionElement = document.createElement('option');
                optionElement.value = el[1].id;
                optionElement.textContent = el[1].title.toUpperCase();
                postSelectElement.appendChild(optionElement);
            })
    }

    async function viewPostHandler() {
        const postId = postSelectElement.value;
        console.log(postId)

        const [post, allComments] = await Promise.all([
            fetch(`http://localhost:3030/jsonstore/blog/posts/${postId}`)
                .then((response) => response.json()),
            fetch(`http://localhost:3030/jsonstore/blog/comments`)
                .then((response) => response.json()),
        ]);


        const currentPostComments = Object.entries(allComments).filter((el) => el[1].postId === postId);

        postTitle.textContent = post.title;

        const postPara = document.getElementById('post-body');
        postPara.textContent = post.body;

        listComments.innerHTML = '';
        currentPostComments.forEach((post) => {
            let commentLi = document.createElement('li');
            commentLi.id = post[1].id;
            commentLi.textContent = post[1].text;
            listComments.appendChild(commentLi);
        })

    }

}

attachEvents();