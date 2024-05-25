// this is default version
var colorPicker = new iro.ColorPicker(".picker");

// and this is version where we can play with our wheel and add whatever property we want
// var colorPicker = new iro.ColorPicker(".picker", {
//     // Set the size of the color picker
//     width: 320,
//     // Set the initial color to pure red
//     color: "#f00"
//   });

// Get user selection by referencing the id selector "hexInput"
var hexInput = document.getElementById("hexInput");

// When there is a color change ie user selects a color on the wheel, update the input field with the selected color.
// https://iro.js.org/guide.html#color-picker-events
colorPicker.on(["color:init", "color:change"], function (color) {
  // Using the selected color: https://iro.js.org/guide.html#selected-color-api
  hexInput.value = color.hexString; // the input field is updated with the color's hex string.
  console.log(color.hexString); // Debugging - prints selected value in console
  console.log(hexInput.value); // Debugging - prints selected value in console
});

//When the user types something in the input field and hit enter -> The "change" event is triggered - the color wheel will be updated with user's color
hexInput.addEventListener("change", function () {
  colorPicker.color.hexString = this.value;
});
