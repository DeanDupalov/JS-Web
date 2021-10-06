function getArticleGenerator(articles) {

    function displayArticle() {
        if(articles.length > 0){
            const articleElement = document.createElement('article');
            const contentBox = document.getElementById('content');
            contentBox.appendChild(articleElement)
            articleElement.textContent = articles.shift();
            console.log(articles.length)
        }
    }

    return displayArticle;
}
