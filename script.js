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

// When there is a color change ie user selects a color on the wheel, update the input field with the selected color.
// https://iro.js.org/guide.html#color-picker-events
colorPicker.on(["color:init", "color:change"], function (color) {
  // Using the selected color: https://iro.js.org/guide.html#selected-color-api
  hexInput.value = color.hexString; // the input field is updated with the color's hex string.
  console.log("color.hexString", color.hexString); // Debugging - prints selected value in console
  console.log("hexInput.value", hexInput.value); // Debugging - prints selected value in console
});

//When the user types something in the input field and hit enter -> The "change" event is triggered - the color wheel will be updated with user's color
hexInput.addEventListener("change", function () {
  colorPicker.color.hexString = this.value;
});

// Initialise user_hex variable
let userHexCode = 0;
let colorHarmony = 0;

// since the following funciton will called twice ie get color harmony and call groq ai. Better to create a separate function.

// Get user color harmony selection
document.addEventListener("DOMContentLoaded", getColorHarmony);

combinations.addEventListener("change", getColorHarmony);

function getColorHarmony() {
  // If there are colors in the color array, reset the array to only store the first color aka the active color. This is so that when it comes to creating dynamic color palette, we're not including the previous color suggestion if the webpages hasn't been refreshed yet.
  if (colorPicker.colors.length != 0) {
    colorPicker.colors = [colorPicker.colors[0]];
  }

  console.log("colorPicker.colors.length", colorPicker.colors.length); //debugging. prints current color array length

  let combinations = document.getElementById("combinations");
  console.log("combinations", combinations);

  console.log("colorPicker.colors.length", colorPicker.colors.length);

  // Get user color harmony selection
  colorHarmony = combinations.value;
  console.log("colorHarmony", colorHarmony);

  userHexCode = hexInput.value;
  console.log("userHexCode", userHexCode);

  // Get suggestion from groq ai

  // Add color suggestion to color array
  // add a color to the color picker
  // this will add the color to the end of the colors array
  colorPicker.addColor("#ff85e0"); // colors are temporary. will be changed to groq ai suggestion
  colorPicker.addColor("#d6f6ff");

  console.log("colorPicker.colors.length", colorPicker.colors.length); //debugging. prints current color array length
}

/*
Dynamic Colour Palette
 1st box is always the user selection
*/
const colorPalette = document.getElementById("colorPalette");

// https://iro.js.org/guide.html#color-picker-events
// When there is a change on the colour wheel, html element is updated and displays colors from color array
colorPicker.on(["mount", "color:change", "color:init"], function () {
  colorPalette.innerHTML = "";
  console.log("colors array", colorPicker.colors);
  colorPicker.colors.forEach((color) => {
    const hexString = color.hexString;
    const index = color.index; //debugging
    colorPalette.innerHTML += `
      <li>
        <div class="swatch" style="background: ${hexString}">${index}: ${hexString}</div>
      </li>
    `;
  });
});
