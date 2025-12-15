const urlAddress = atob("aHR0cHM6Ly9oYW55by13cml0ZXMub215cmF1Y3kud29ya2Vycy5kZXYv")

const url = new URL(window.location.href)
const link = url.searchParams.get("link")

const parentCategoryRender = data => {

}

const childCategoryRender = data => {
    const container = document.querySelector('main')

    const categoryBlock = document.createElement("div")
    categoryBlock.className = "category-block"
    
    const categoryHeader = document.createElement("h2")
    categoryHeader.className = "category-title"
    categoryHeader.textContent = data.child.category_title

    const categoryDescription = document.createElement("p")
    categoryDescription.className = "category-description"
    categoryDescription.textContent = data.child.category_description

    categoryBlock.appendChild(categoryHeader)

    container.appendChild(categoryBlock)
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
                parentCategoryRender(data)
            } else if (data.type === "child") {
                childCategoryRender(data)
            }
        })
})