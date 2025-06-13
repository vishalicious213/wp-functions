const main = document.getElementById("main")
const url = "https://public-api.wordpress.com/wp/v2/sites/neophyte.home.blog/posts"
const posts = getPosts()

async function getPosts() {
    const response = await fetch(url)
    
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json()
    return data
}

posts
.then(data => {
    console.log(data)
})
.catch(err => {
    console.error(`Could not get posts: ${err}`)
})