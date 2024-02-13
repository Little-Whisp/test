// Function to handle image upload
function handleImageUpload(event) {
    console.log('Image upload event triggered.');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        console.log('Image loaded.');
        const img = document.getElementById('uploaded-image');
        img.src = e.target.result;

        // Save the uploaded image URL to local storage
        localStorage.setItem('uploaded-image-url', img.src);
        console.log('Image URL saved to local storage:', img.src);
    };

    reader.readAsDataURL(file);
}

// Function to handle background color change
function handleColorChange(event) {
    const color = event.target.value;
    document.body.style.backgroundColor = color;
    localStorage.setItem('background-color', color); // Save the selected color to local storage
    
    // Determine the brightness of the selected color
    const brightness = calculateBrightness(color);

    // Adjust the color of all text elements based on the brightness
    const textColor = brightness > 128 ? '#000' : '#fff'; // Choose black text for light backgrounds and white text for dark backgrounds
    const textElements = document.querySelectorAll('body *');
    textElements.forEach(element => {
        element.style.color = textColor;
    });

    // Update the RGB text with the selected color
    const rgbText = document.getElementById('rgb-text');
    rgbText.textContent = `RGB: ${color}`;
}

// Function to calculate brightness of a color
function calculateBrightness(color) {
    // Convert color to RGB
    let r, g, b;
    if (color.startsWith('#')) {
        r = parseInt(color.substr(1, 2), 16);
        g = parseInt(color.substr(3, 2), 16);
        b = parseInt(color.substr(5, 2), 16);
    } else if (color.startsWith('rgb(')) {
        const matches = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (matches) {
            r = parseInt(matches[1]);
            g = parseInt(matches[2]);
            b = parseInt(matches[3]);
        }
    }

    // Calculate brightness using the W3C algorithm
    return (r * 299 + g * 587 + b * 114) / 1000;
}

// Check if there's a previously selected background color in local storage
const savedColor = localStorage.getItem('background-color');
if (savedColor) {
    // If a color is found, set it as the background color
    document.body.style.backgroundColor = savedColor;
    document.getElementById('color-picker').value = savedColor; // Update the color picker value
    
    // Adjust the color of all text elements based on the brightness of the saved color
    const brightness = calculateBrightness(savedColor);
    const textColor = brightness > 128 ? '#000' : '#fff'; // Choose black text for light backgrounds and white text for dark backgrounds
    const textElements = document.querySelectorAll('body *');
    textElements.forEach(element => {
        element.style.color = textColor;
    });

    // Update the RGB text with the saved color
    const rgbText = document.getElementById('rgb-text');
    rgbText.textContent = `RGB: ${savedColor}`;
}

// Add event listeners
document.getElementById('image-input').addEventListener('change', handleImageUpload);
document.getElementById('color-picker').addEventListener('change', handleColorChange);
