const urlAddress = atob("aHR0cHM6Ly9oYW55by13cml0ZXMub215cmF1Y3kud29ya2Vycy5kZXYv")

const url = new URL(window.location.href)
const link = url.searchParams.get("link")

const postsRender = posts => {
    const container = document.querySelector('main')

    if (posts.length === 0) {
        container.textContent = "Здесь пока ничего нет"
        return
    }

    posts.forEach(postObj => {
        const postCont = document.createElement('div')
        postCont.className = "post"

        const postHeader = document.createElement('a')
        postHeader.href = `/post?id=${postObj.post_id}`
        postHeader.textContent = postObj.post_title

        postCont.appendChild(postHeader)
        container.appendChild(postCont)
    });
}

const parentCategoryRender = data => {

}

const childCategoryRender = category => {
    const container = document.querySelector('main')

    const categoryBlock = document.createElement("div")
    categoryBlock.className = "category-block"
    
    const categoryHeader = document.createElement("h2")
    categoryHeader.className = "category-title"
    categoryHeader.textContent = category.category_title

    const categoryDescription = document.createElement("p")
    categoryDescription.className = "category-description"
    categoryDescription.textContent = category.category_description

    categoryBlock.appendChild(categoryHeader)

    container.appendChild(categoryBlock)

    fetch(urlAddress, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ "action": "get_posts_by_category", category })
            .then(resp => resp.json())
            .then(d => {
                if (d.status === "OK") {
                    postsRender(d.posts)
                }
            })
    })
}


document.addEventListener('DOMContentLoaded', function () {
    fetch(urlAddress, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ action: "get_category_by_link", link })
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            if (data.type === "parent") {
                document.title = data.parent.category_title
                parentCategoryRender(data)
            } else if (data.type === "child") {
                document.title = data.category.category_title
                childCategoryRender(data.category)
            }
        })
})