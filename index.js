const colorButtons = document.querySelectorAll('.color-button');
const sizeButtons = document.querySelectorAll('.size-button'); // Added dot (.) to select size-button class
let bandColor = 'button-purple';
let bandSize = 'S';

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove border from all color buttons
        colorButtons.forEach(b => {
            b.classList.remove('border-2');
        });

        // Set the selected color
        bandColor = button.id;

        // Add the border to the selected color button
        button.classList.add('border-2');
    });
});

sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove the border from all size buttons
        sizeButtons.forEach(b => {
            b.classList.remove('border-gray-50');
        });

        // Set the selected size
        bandSize = button.id;

        // Add the border to the selected size button
        button.classList.add('border-[#6576FF]');
    });
});
