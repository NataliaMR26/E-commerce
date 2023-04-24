const  formatNumber= new Intl.NumberFormat('es-CO',{style:'currency',minimumFractionDigits:0, currency: 'COP'})
const getShopping=()=>{
    const shoppingHtml = document.getElementById("shooping")
    const products = JSON.parse(localStorage.getItem('shopping')) || []
    shoppingHtml.innerHTML=''
    let total=0;
    const buttonProcess= document.getElementById('processButton')
    if(products.length ===0) buttonProcess.disabled= true
    products.forEach(item=>{
        total=total+(Number(item.desc.replace(/[$.]/g,''))*item.cant);
        const subTotal= Number(item.desc.replace(/[$.]/g,''))*item.cant
        shoppingHtml.innerHTML+=`
            <div class="row gap-3 mt-5 pt-3">
                <div class="col-md-1">
                    <img  class="shopping-img" src="${item.image}" alt="product" />
                </div>
                <div class="col-md-2">
                    <p class="fw-semibold">${item.name}</p>
                    <p class="m-0"><span class="fw-semibold">Sold By: </span>${item.soldBy}</p>
                    <p class="m-0"><span class="fw-semibold"> Quantity </span>${item.weight}</p>
                </div>
                <div class="col-md-2">
                    <p>Price</p>
                    <p class="fw-semibold m-0">${item.desc}<del>  ${item.price}</del></p>
                    <p class="m-0 title-car">You Save: ${item.save}</p>
                </div>
                <div class="col-md-2">
                    <p>Qty</p>
                    <div class="btn-group d-flex" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn p-0" onclick="subtractProduct('cant${item.id}',${item.id})">
                            <b class="btn-qty">-</b>
                        </button>
                        <button type="button" class="btn" id="cant${item.id}">${item.cant}</button>
                        <button type="button" class="btn" onclick="addProduct('cant${item.id}',${item.id})">
                            <b class="btn-qty">+</b>
                        </button>
                    </div>
                </div>
                <div class="col-md-2">
                    <p>Total</p>
                    <p class="fw-semibold">${formatNumber.format(subTotal)}</p>
                </div>
                <div class="col-md-2">
                    <p>Action</p>
                    <button type="button" class="btn remove p-0" onclick="deleteItemcart(${item.id})"><p class="m-0">Remove</p></button>
                </div>
            </div>
        `
    })
    const subtotal =document.getElementById('subtotal')
    subtotal.innerText=  formatNumber.format(total)
    const totalHtml =document.getElementById('total')
    totalHtml.innerText= formatNumber.format(total+6900)
} 

getShopping()


const addProduct = (element,id)=>{
    const maxValue= 50
    const elementHtml= document.getElementById(element)
    const value= Number(elementHtml.textContent)
    let newValue= value+1
    if(newValue> maxValue){
        newValue=maxValue
    }
    elementHtml.innerText= newValue;
    getTotal(id,newValue)
}

const subtractProduct = (element,id)=>{
    const minValue= 1
    const elementHtml= document.getElementById(element)
    const value= Number(elementHtml.textContent)
    let newValue= value-1
    if(newValue< minValue){
        newValue=minValue
    }
    elementHtml.innerText= newValue;
    getTotal(id,newValue)
}

const getTotal = (id,newValue) =>{
    const products= JSON.parse(localStorage.getItem('shopping')) || []
    const product = products.find(item => item.id === id)
    product.cant= newValue;
    const indexProduct = products.findIndex(el=> el.id===id
        )
    if(indexProduct>-1){
        products.splice(indexProduct,1,product)
    }
    localStorage.setItem('shopping',JSON.stringify(products))
    getShopping()
}
