const productImage = document.getElementById('productImage');
const quantityDis = document.getElementById('quantity-dis');
const checkOutCount = document.getElementById('checkOutCount');
const tbody = document.getElementById("cart-body");
const modal = document.getElementById('modalContainer');
const totalContainer = document.getElementById('total-container')


// Buttons 

const colorButtons = document.querySelectorAll('.color-button');
const sizeButtons = document.querySelectorAll('.size-button');
const btnDecrease = document.getElementById('quantity-decrease')
const btnIncrease = document.getElementById('quantity-increase')
const addToCartBtn = document.getElementById('addToCard')
const checkOutBtn = document.getElementById('checkOut')


const imgPurple = './assets/images/lg-a-3-1.jpg'
const imgTeal = './assets/images/cyan.jpg'
const imgBlue = './assets/images/lg-a-3.jpg'
const imgBlack = './assets/images/black.jpg'

let bandColor = 'button-teal';
let productSize = 'S'
let productPrice = 69;
let currentQuantity = 1;
let totalPrice = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

let totalCartProduct = 0;

window.addEventListener('load', () => {
    checkOutCount.innerText = cart?.length
    if (cart.length > 0) {
        checkOutBtn.classList.remove('hidden')
    }
});


const colorToImageMap = {
    'button-purple': imgPurple,
    'button-teal': imgTeal,
    'button-blue': imgBlue,
    'button-black': imgBlack
};

// console.log(colorToImageMap[]);

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove border from all color buttons
        colorButtons.forEach(b => b.classList.remove('border-2'));

        // Set the selected color and image
        bandColor = button.id;
        productImage.src = colorToImageMap[button.id] || productImage.src;

        // Add the border to the selected color button
        button.classList.add('border-2');
    });
});


sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove the border from all size buttons
        sizeButtons.forEach(b => {
            b.classList.remove('border-[#6576FF]');
        });

        // Set the selected border

        button.classList.add('border-[#6576FF]');

        productSize = button.id.split('-')[0]
        productPrice = parseFloat(button.id.split('-')[1]).toFixed(2);

        console.log(productPrice, productSize)
    });
});


btnIncrease.addEventListener('click', () => {
    currentQuantity = currentQuantity + 1
    quantityDis.innerText = currentQuantity
})

btnDecrease.addEventListener('click', () => {
    if (currentQuantity > 1) {
        currentQuantity = currentQuantity - 1
        quantityDis.innerText = currentQuantity
    }
})



addToCartBtn.addEventListener('click', () => {

    const productData = {
        productName: 'Classy Modern Smart Watch',
        bandColor: bandColor,
        productSize: productSize,
        quantity: currentQuantity,
        price: productPrice,
    };

    const existingProductIndex = cart.findIndex(item =>

        item.productName === productData.productName &&
        item.bandColor === productData.bandColor &&
        item.productSize === productData.productSize &&
        item.quantity === productData.quantity &&
        item.price === productData.price
    );

    if (existingProductIndex === -1) {
        cart.push(productData)
    } else {
        // console.log('already exists ', productData);
    }


    localStorage.setItem('cart', JSON.stringify(cart));
    checkOutCount.innerText = cart?.length

    if (cart.length > 0) {
        checkOutBtn.classList.remove('hidden')
    }

    // console.log('update:', cart);
});



const reRender = () => {

    tbody.innerHTML = '';

    cart.forEach(item => {

        totalCartProduct = totalCartProduct + parseInt(item.quantity)
        totalPrice = totalPrice + parseInt(item.price)
        console.log(totalCartProduct, totalPrice);

        const row = document.createElement('tr');
        row.className = "p-1 pb-4 grid grid-cols-12 gap-2 w-full text-[#364A63] text-[14px]";


        row.innerHTML = `
            <th class="col-span-4 text-start flex gap-2">
             <span class="w-9  h-9  ">
             <img class="w-full  " src=${colorToImageMap[item.bandColor]} alt="">
             </span>
            Classy Modern Smart Watch
            </th>
            <th class="col-span-2 uppercase">${item.bandColor}</th>
            <th class="col-span-2 font-bold">${item.productSize}</th>
            <th class="col-span-2 font-bold">${item.quantity}</th>
            <th class="col-span-2 text-end font-bold">${item.price}</th>
        `;


        tbody.appendChild(row);

        totalContainer.innerHTML = `
        <h1 class="col-span-8 font-bold text-lg">Total:</h1>
        <span class="col-span-2 text-center">${totalCartProduct}</span>
        <span class="col-span-2  text-end">${totalPrice}</span>
       `
        cart = JSON.parse(localStorage.getItem('cart')) || []

    });
}
// reRender()


checkOutBtn.addEventListener('click', () => {
    modal.classList.remove('hidden')
    modal.classList.add('flex')

    reRender()

})

modal.addEventListener('click', (event) => {
    if (event.target !== event.currentTarget) {
        return;
    }
    modal.classList.remove('flex')
    modal.classList.add('hidden')
})