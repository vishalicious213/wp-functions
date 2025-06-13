const main = document.getElementById("main")
const baseUrl = "https://public-api.wordpress.com/wp/v2/sites/neophyte.home.blog"
// const baseUrl = "https://public-api.wordpress.com/wp/v2/sites/uglybass.wordpress.com"
// const baseUrl = "https://public-api.wordpress.com/wp/v2/sites/bt4wall.wordpress.com"
// const baseUrl = "https://public-api.wordpress.com/wp/v2/sites/mortalequality.wordpress.com"
const posts = getPosts()

// get posts
async function getPosts() {
    const response = await fetch(`${baseUrl}/posts`)
    
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json()
    return data
}

// log posts to console
posts
.then(data => {
    console.log(data)
})
.catch(err => {
    console.error(`Could not get posts: ${err}`)
})