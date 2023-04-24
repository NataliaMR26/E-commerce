const getProducts=async (filter)=>{
    const productHtml = document.getElementById('products')
    const response = await fetch(`http://localhost:3000/products?${filter}`)
    const products = await response.json();
    productHtml.innerHTML=''
    products.forEach(item=>{
        productHtml.innerHTML+=`
            <div class="card col-md-4">
              <img src="${item.image}" class="card-img-top" alt="...">
              <div class="card-body">
                <p class="title">${item.name}</p>
                <p class="price">
                  <span class="green">${item.desc}</span>
                  <span><del>${item.price}</del></span>
                </p>
                <button type="button" class="btn mb-3" onClick="addFavorites(${item.id})">   
                    <span></span>
                    <div>
                        <img class="circle" src="./images/icons/favorito.svg" alt="plus">
                    </div>
                </button>
                <button type="button" class="button-add" onclick="addCart(${item.id})">
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
getProducts('')
const fiterProducts=(category)=>{
    getProducts('category='+category)
}


const addFavorites= async (id)=>{
    try{
        const data={
            productsId: id
        }
        const response = await fetch(`http://localhost:3000/favorites`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        alert("producto guardado en favoritos")  
    }catch (error) {
        alert("No se pudo guardar")
    }
}


const addCart = async(productId)=>{
    const response = await fetch(`http://localhost:3000/products/${productId}`)
    const product = await response.json();
    const prevProducts= JSON.parse(localStorage.getItem('shopping')) || []
    const indexProduct = prevProducts.findIndex(el=> el.id===productId)
    if(indexProduct>-1){
        product.cant=prevProducts[indexProduct].cant+1;
        prevProducts.splice(indexProduct,1,product)
    } else{
        product.cant=1
        prevProducts.push(product)
    }

    localStorage.setItem('shopping',JSON.stringify(prevProducts))
    alert("Agregado a carrito")
    fillCart()
}   