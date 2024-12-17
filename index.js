const productImage = document.getElementById('productImage')
const quantityDis = document.getElementById('quantity-dis')
const checkOutCount= document.getElementById('checkOutCount')

// Buttons 
const colorButtons = document.querySelectorAll('.color-button');
const sizeButtons = document.querySelectorAll('.size-button');
const btnDecrease = document.getElementById('quantity-decrease')
const btnIncrease = document.getElementById('quantity-increase')
const addToCartBtn = document.getElementById('addToCard')


const imgPurple = './assets/images/lg-a 3.jpg'
const imgTeal = './assets/images/cyan.jpg'
const imgBlue = './assets/images/lg-a 3 (1).jpg'
const imgBlack = './assets/images/black.jpg'

let bandColor = 'button-teal';
let productSize = 'S'
let productPrice = 0
let currentQuantity = 1;
let totalPrice = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

window.addEventListener('load', () => {
    checkOutCount.innerText=cart?.length
});

const colorToImageMap = {
    'button-purple': imgPurple,
    'button-teal': imgTeal,
    'button-blue': imgBlue,
    'button-black': imgBlack
};

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

    console.log(cart.length);
 
    const productData = {
        productName: 'Classy Modern Smart Watch',
        bandColor: bandColor,
        productSize: productSize,
        quantity: currentQuantity,
    };

    
    const existingProductIndex = cart.findIndex(item =>
     
        item.productName === productData.productName &&
        item.bandColor === productData.bandColor &&
        item.productSize === productData.productSize &&
        item.quantity === productData.quantity
    );

    if (existingProductIndex === -1) {
      
        cart.push(productData);
        // console.log('Product added to cart:', productData);
    } else {
        // console.log('Product already exists in cart with the same properties:', productData);
    }

    // Store updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    checkOutCount.innerText=cart?.length

    // console.log('Updated Cart:', cart);
});
