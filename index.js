const main = document.getElementById("main")
const baseUrl = "https://public-api.wordpress.com/wp/v2/sites/neophyte.home.blog"
const posts = getPosts()

async function getPosts() {
    const response = await fetch(`${baseUrl}/posts`)
    
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