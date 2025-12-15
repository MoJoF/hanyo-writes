const url = new URL(window.location.href)
const link = url.searchParams.get("link")

const parentCategoryRender = data => {

}

const childCategoryRender = data => {

}


document.addEventListener('DOMContentLoaded', function () {
    const url = atob("aHR0cHM6Ly9oYW55by13cml0ZXMub215cmF1Y3kud29ya2Vycy5kZXYv")

    fetch(url, {
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