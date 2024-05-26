// this is default version
// var colorPicker = new iro.ColorPicker(".picker");

// and this is version where we can play with our wheel and add whatever property we want
var colorPicker = new iro.ColorPicker(".picker", {
    // Set the size of the color picker
    width: 320,
    // Set the initial color to pure red
    color: "#f719ff",
    id: 'default'
  });

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

let box2 = document.querySelector(".box2")
let box3 = document.querySelector(".box3");
let box4 = document.querySelector(".box4");


let combination = document.querySelector("#combination");
combination.addEventListener("change", function() {
  console.log(this.value)
  if(this.value === 'Triadic') { 
    box3.style.display = 'block';
    box4.style.display = 'none';
    box2.style.backgroundColor = '#73ff19'
    if (colorPicker.id === 'default') {
      document.querySelector("#default").style.display = 'none'
      // document.querySelector("#tetradic").style.display = 'none'
      const colorPickerTriadic = new iro.ColorPicker(".triadic", {
        // color picker options
        // Option guide: https://iro.js.org/guide.html#color-picker-options
        width: 320,
        // Pure red, green and blue
        colors: [
          "rgb(255, 0, 0)",
          "rgb(0, 255, 0)",
          "rgb(0, 0, 255)",
        ],
        handleRadius: 9,
        borderWidth: 1,
        borderColor: "#fff",
        id: 'triadic'
      });
    }
    // console.log(colorPicker.id)
  } else if (this.value === 'Tetradic') {
    box3.style.display = 'block';
    box4.style.display = 'block';
    box2.style.backgroundColor = '#73ff19'
    document.querySelector("#triadic").style.display = 'none'
    const colorPickerTetradic = new iro.ColorPicker(".tetradic", {
      // color picker options
      // Option guide: https://iro.js.org/guide.html#color-picker-options
      width: 320,
      // Pure red, green and blue
      colors: [
        "rgb(255, 0, 0)",
        "rgb(0, 255, 0)",
        "rgb(0, 0, 255)",
        "rgb(0, 0, 255)",
        "rgb(255, 0, 238)"
      ],
      handleRadius: 9,
      borderWidth: 1,
      borderColor: "#fff",
      id: 'tetradic'
    });
  } else if (this.value === 'Analogous') {
    box3.style.display = 'block';
    box4.style.display = 'none';
    box2.style.backgroundColor = '#73ff19'
  } else if (this.value === 'Monochromatic') {
    box3.style.display = 'none';
    box4.style.display = 'none';
    box2.style.backgroundColor = '#DD00E5'
  } else if (this.value === 'Complementary') {
    box2.style.backgroundColor = '#73ff19'
    box3.style.display = 'none';
    box4.style.display = 'none';
  } else {
    box3.style.display = 'none';
    box4.style.display = 'none';
  }
})