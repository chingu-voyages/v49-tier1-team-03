// this is default version
// var colorPicker = new iro.ColorPicker(".picker");

// and this is version where we can play with our wheel and add whatever property we want
var colorPicker = new iro.ColorPicker(".picker", {
  // Set the size of the color picker
  width: 320,
  // Set the initial color to pure red
  color: "#f719ff",
  id: "default",
});

// Get user selection by referencing the id selector "hexInput"
var hexInput = document.getElementById("hexInput");

// Initialise user_hex variable
let user_hex = 0;

// When there is a color change ie user selects a color on the wheel, update the input field with the selected color.
// https://iro.js.org/guide.html#color-picker-events
colorPicker.on(["color:init", "color:change"], function (color) {
  // Using the selected color: https://iro.js.org/guide.html#selected-color-api
  hexInput.value = color.hexString; // the input field is updated with the color's hex string.
  console.log(color.hexString); // Debugging - prints selected value in console
  console.log(hexInput.value); // Debugging - prints selected value in console
  user_hex = color.hexString;
  console.log(user_hex); // Debugging - prints user's choice
});

//When the user types something in the input field and hit enter -> The "change" event is triggered - the color wheel will be updated with user's color
hexInput.addEventListener("change", function () {
  colorPicker.color.hexString = this.value;
});

// Get user color harmony selection
let color_harmony = document.getElementBy;

// Get suggestion from groq ai and add to color array.

/*
Dynamic Colour Palette
 1st box is always the user selection
*/
const colorList = document.getElementById("colorPalette");

// https://iro.js.org/guide.html#color-picker-events
// When there is a change on the colour wheel, html element is updated and displays colors from color array
colorPicker.on(["mount", "color:change"], function () {
  colorPalette.innerHTML = "";
  colorPicker.colors.forEach((color) => {
    const hexString = color.hexString;
    colorPalette.innerHTML += `
      <li>
        <div class="swatch" style="background: ${hexString}">${hexString}</div>
      </li>
    `;
  });
});
