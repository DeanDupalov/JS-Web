document.createElement('button').addEventListener('click', makeRequest)

/*
 Функцуята е асинхронна async.
 Там където имаш promise трябва да сложиш await!
 */
async function makeRequest() {
    try {
        const response = await fetch('https://swapi.dev/api/planets/1/');
        if (response.ok === false) {
            throw new Error(`${response.status} ${response.statusText}`)
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('Error', error)
    }

    /*
    Повече от една заявка едновременно с Promise.all(). Подаваме му масив и ни връща масив с толкова
    Promises колкото заявки сме направили. Имаме само един await преди Promise.all()
     */

    const [v1, v2, v3] = await Promise.all([
        fetch('urlExample1'),
        fetch('urlExample2'),
        fetch('urlExample3'),
    ]);

}