const getFavorites=async ()=>{
    const favoriteHtml = document.getElementById('favorites')
    const response = await fetch(`http://localhost:3000/favorites?_expand=products`)
    const favorites = await response.json();
    favoriteHtml.innerHTML=''
    favorites.forEach(item=>{
        favoriteHtml.innerHTML+=`
            <div class="card col-md-3 card-favorites">
                <button class="btn btn-cancel d-flex justify-content-end" type="button" onclick="deleteFavorite(${item.id})">
                    <img class="shadow bg-body-tertiary" src="./images/icons/close.svg" alt="close" />
                </button>
                <img src="${item.products.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <p class="title">${item.products.name}</p>
                <p class="price">
                    <span class="green">${item.products.desc}</span>
                    <span><del>${item.products.price}</del></span>
                </p>
                <button type="button" class="button-add">
                    <span>
                    Add
                    </span>
                    <div>
                    <img class="circle" src="./images/icons/add.svg" alt="plus">
                    </div>
                    
                </button>
                </div>
            </div>
        `
    })
}   
getFavorites()

const deleteFavorite= async (id)=>{
    try{
        await fetch(`http://localhost:3000/favorites/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
        });
        alert("producto eliminado de favoritos") 
        getFavorites()
    }catch (error) {
        alert("No se pudo eliminar")
    }
}