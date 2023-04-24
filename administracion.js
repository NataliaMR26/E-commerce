const URLProducts = 'http://localhost:3000/products/'
const getProducts= async ()=>{
    const responseGetProducts = await fetch(URLProducts);
    const dataProducts = await responseGetProducts.json();
    const productList= document.getElementById('productsList')
    productList.innerHTML=''; 
    dataProducts.forEach(function(el) {
        productList.innerHTML+= `
            <li class="list-group-item mt-4" id="productsList">
                <div class="row border-bottom  justify-content-center">
                    <div class="col-2 align-items-center d-flex">
                        <img class="w-100" src="${el.image}" alt="pdt-1" style="max-width: 120px;">
                    </div>
                    <div class="col-3 d-flex flex-column justify-content-center">
                        <p class="title-add-product">${el.name}</p>
                        <p class="price-add-product">${el.desc}</p>
                    </div>
                    <div class="col-2 d-flex">
                        <div class="hstack">
                        <button class="btn btn-dark btn sm float-end" id=${el.id} type="button">Borrar</button>
                        </div>
                    </div>
                </div>
            </li>
        `
    })

}
getProducts()

//Capturar Datos del formulario

const CapDatos = () => {
    const image = document.getElementById('inputUrl').value
    const name = document.getElementById('inputNombre').value
    const price = document.getElementById('inputPrice').value
    const desc = document.getElementById('inputDescount').value
    const save = document.getElementById('inputSave').value
    const category = document.getElementById('inputCategory').value
    const weight = document.getElementById('inputWeight').value
    const soldBy = document.getElementById('inputSoldBy').value
    
    const producto = {image, name, price, desc, save, category,weight,soldBy}
    return producto;
}
// crear producto
const createProduct= async(e)=>{
    e.preventDefault();
    const objeto = CapDatos()
    
    await fetch(URLProducts, {
        method:'POST',
        body: JSON.stringify(objeto),
        headers: {
            "content-Type": "application/json; charset=utf-8"
        }
    })
    alert("producto guardado")
    getProducts()
}
const form= document.getElementById('form')
form.addEventListener('submit', createProduct)

// eliminar
const ul = document.querySelector('.list-group')
ul.addEventListener('click', async(e) => {
    const BtnEliminar = e.target.classList.contains ('btn-dark')
    if (BtnEliminar === true){
        const id= e.target.id;
        await fetch(URLProducts + id, {
            method: 'DELETE'
        })
        alert("producto eliminado")
        getProducts()
    }
})


//actualizar producto

const btnModificar = document.getElementById ('btnModificar')

btnModificar.addEventListener('click', async (e) => {
    e.preventDefault();
    const objeto = CapDatos()
    const newObject= {}
    for(const property in objeto) { 
        if(objeto[property] !== '') {
            newObject[`${property}`]=objeto[property];
        }
    }

    const id =  document.getElementById ('inputId').value;
    await fetch(URLProducts + id, {
        method:'PATCH',
        body: JSON.stringify(newObject),
        headers: {
            "content-Type": "application/json; charset=utf-8"
        }
    })
    alert("Producto modificado")
    getProducts()
})

//lista de compras usuarios
const btnShop = document.getElementById ('btnShop')

btnShop.addEventListener('click', async () => {
    const responseGetShopping = await fetch('http://localhost:3000/shopping');
    const dataShop = await responseGetShopping.json();

    //obtiene elemento Html
    const productList= document.getElementById('productsList') 

    //renderiza produts
    productList.innerHTML=''; 
    dataShop.forEach(function(sp, indexS) {
        sp.products.map((el,index)=>{
            if(index==0){
                productList.innerHTML+= `<li><b>Compra #${indexS+1}</b></li>`
            }
            productList.innerHTML+= `
            <li class="list-group-item  d-flex justify-content-center align-items-center border-0" id="productsList">
                <div class="row add-car-product border-bottom ">
                    <div class="col-3 align-items-center d-flex">
                        <img class="w-100" src="${el.image}" alt="pdt-1" style="max-width: 120px;">
                    </div>
                    <div class="col-9">
                        <p class="title-add-product">${el.name}</p>
                        <p class="price-add-product">${el.desc}</p>
                    </div>
                </div>
            </li>
            `  
        })
    })
})