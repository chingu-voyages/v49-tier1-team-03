// this is default version
// var colorPicker = new iro.ColorPicker(".picker");

// and this is version where we can play with our wheel and add whatever property we want
// DEFAULT wheel
var colorPicker = new iro.ColorPicker(".picker", {
    // Set the size of the color picker
    width: 320,
    // Set the initial color to pure red
    // color: "#f719ff",
    colors: [
      "rgb(247, 25, 255)",
      "rgb(33, 255, 25)"
    ],
    id: 'default'
  });

  // TRIADIC wheel
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

// TETRADIC wheel
const colorPickerTetradic = new iro.ColorPicker(".tetradic", {
  // color picker options
  // Option guide: https://iro.js.org/guide.html#color-picker-options
  width: 320,
  // Pure red, green and blue
  colors: [
    "rgb(255, 0, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 0, 255)",
    "rgb(255, 0, 238)"
  ],
  handleRadius: 9,
  borderWidth: 1,
  borderColor: "#fff",
  id: 'tetradic'
});

// selecting the color wheels
let standard = document.querySelector(".picker");
let triadic = document.querySelector(".triadic");
let tetradic = document.querySelector(".tetradic");


// Get user selection by referencing the id selector "hexInput"
var hexInput = document.getElementById("hexInput");

const colorList = document.querySelector(".colorList");

// When there is a color change ie user selects a color on the wheel, update the input field with the selected color.
// https://iro.js.org/guide.html#color-picker-events

//COMPLEMENTARY
colorPicker.on(["color:init", "color:change"], function (defaultColor) { //(color)
  // Using the selected color: https://iro.js.org/guide.html#selected-color-api
   hexInput.value = defaultColor.hexString; // the input field is updated with the color's hex string.
  // console.log(color.hexString); // Debugging - prints selected value in console
  // console.log(hexInput.value); // Debugging - prints selected value in console

  colorList.innerHTML = '';
  colorPicker.colors.forEach(color => {
    const index = color.index;
    const hexString = color.hexString;
    colorList.innerHTML += `
      <li>
        <div class="swatch" style="background: ${ hexString }"></div>
      </li>
    `;
  });
  
});


//When the user types something in the input field and hit enter -> The "change" event is triggered - the color wheel will be updated with user's color
hexInput.addEventListener("change", function () {
  colorPicker.defaultColor.hexString = this.value;
});


// Selecting choices from the DOM
let combinations = document.querySelector("#combinations");

// Setting changes on each option, so the right wheel apears after specific option is selected
combinations.addEventListener("change", function() {

  console.log(this.value)

  if(this.value === 'Triadic') {   // Triadic

      standard.style.display = "none"
      tetradic.style.display = "none";
      triadic.style.display = "block"; 

      // TRIADIC
      colorPickerTriadic.on(["color:init", "color:change"], function (defaultColor) { //(color)
        // Using the selected color: https://iro.js.org/guide.html#selected-color-api
        hexInput.value = defaultColor.hexString; // the input field is updated with the color's hex string.
        // console.log(color.hexString); // Debugging - prints selected value in console
        // console.log(hexInput.value); // Debugging - prints selected value in console

        colorList.innerHTML = '';
        colorPickerTriadic.colors.forEach(color => {
          const index = color.index;
          const hexString = color.hexString;
          colorList.innerHTML += `
            <li>
              <div class="swatch" style="background: ${ hexString }"></div>
            </li>
          `;
        });
        
      });

  } else if (this.value === 'Tetradic') {  // Tetradic

      standard.style.display = "none";
      triadic.style.display = "none";
      tetradic.style.display = "block";

       // TETRADIC
      colorPickerTetradic.on(["color:init", "color:change"], function (defaultColor) { //(color)
        // Using the selected color: https://iro.js.org/guide.html#selected-color-api
        hexInput.value = defaultColor.hexString; // the input field is updated with the color's hex string.
        // console.log(color.hexString); // Debugging - prints selected value in console
        // console.log(hexInput.value); // Debugging - prints selected value in console
    
        colorList.innerHTML = '';
        colorPickerTetradic.colors.forEach(color => {
          const index = color.index;
          const hexString = color.hexString;
          colorList.innerHTML += `
            <li>
              <div class="swatch" style="background: ${ hexString }"></div>
            </li>
          `;
        });
        
      });

  } else if (this.value === 'Analogous') {  // Analogous

      standard.style.display = "none";
      tetradic.style.display = "none";
      triadic.style.display = "block";

  } else if (this.value === 'Monochromatic') { // Monochromatic

      standard.style.display = "block"
      triadic.style.display = "none"
      tetradic.style.display = "none" 


  } else if (this.value === 'Complementary') { // Complementary

      standard.style.display = "block"
      triadic.style.display = "none"
      tetradic.style.display = "none"

  } else {

      // box3.style.display = 'none';
      // box4.style.display = 'none';

  }
})