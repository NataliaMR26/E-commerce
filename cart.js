const fillCart = ()=>{
    
    const cartHtml = document.getElementById("cart-products")
    const products = JSON.parse(localStorage.getItem('shopping')) || []
    cartHtml.innerHTML=''
    const cantProduct = document.getElementById('cant-products')
    cantProduct.innerText= products.length;
    const totalCart= document.getElementById('total-cart')
    let total=0;
    products.forEach(item=>{
        total=total+(Number(item.desc.replace(/[$.]/g,''))*item.cant);
        cartHtml.innerHTML+=`
            <li  class="dropdown-item d-flex position-relative pt-3">
                <button type="button" class="btn-close close-shop" aria-label="Close" onclick="deleteItemcart(${item.id})"></button>
                <img class="product" src="${item.image}" alt="image"/>
                <div>
                <span class="truncate-text title-car">${item.name}</span>
                <p>${item.cant}x ${item.desc}</p>
                </div> 
            </li>
        `
    })
    const  formatNumber= new Intl.NumberFormat('es-CO',{style:'currency',minimumFractionDigits:0, currency: 'COP'})
    totalCart.innerText=  formatNumber.format(total)
    const totalCompra= formatNumber.format(total+6900)
    localStorage.setItem('total', JSON.stringify({Total:totalCompra,Subtotal: totalCart.innerText}))

}


const deleteItemcart=(id)=>{
    const products = JSON.parse(localStorage.getItem('shopping')) || []
    const indexProduct = products.findIndex(el=> el.id===id)
    if(indexProduct>-1){
        products.splice(indexProduct,1)
    }
    localStorage.setItem('shopping',JSON.stringify(products))
    alert("producto eliminado del carrito")
    fillCart()
    getShopping()
}

fillCart()


const sendDataBuy= async (e)=>{
    e.preventDefault();
    const name=  document.getElementById('exampleInputName').value;
    const address= document.getElementById('exampleInputAddress').value;
    const phone= document.getElementById('exampleInputPhone').value;
    const total= JSON.parse(localStorage.getItem('total'));
    const products= JSON.parse(localStorage.getItem('shopping'));
    try{
        const data={
            "user": {
                "name": name,
                "address": address,
                "phone": phone
            },
            "products": products,
            "subtotal": total.Subtotal,
            "total": total.Total
        }
        const response = await fetch(`http://localhost:3000/shopping`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        alert("Compra exitosa")  
        localStorage.clear()
        window.location.href='./index.html'
    }catch (error) {
        alert("Compra fallida")
    }
}
const sendDataButton= document.getElementById('sendData')
sendDataButton.addEventListener('click',sendDataBuy)