// this is default version
// var colorPicker = new iro.ColorPicker(".picker");

// and this is version where we can play with our wheel and add whatever property we want
var colorPicker = new iro.ColorPicker(".picker", {
  // Set the size of the color picker
  width: 320,
  // Set the initial color to pure red
  color: "#f719ff",
  id: "default",
  layout: [
    {
      component: iro.ui.Wheel,
      options: {
        handleSvg: "#pickerHandle", //This uses custom svg file
        // handleRadius: 6, // This uses inbuilt iros library handle
        // activeHandleRadius: 12, // This uses inbuilt iros library handle
      },
    },
    {
      component: iro.ui.Slider,
      options: {
        handleSvg: "#sliderHandle",
        sliderType: "saturation",
        borderWidth: 1.3,
        borderColor: "#e4e4e4",
        margin: 52,
      },
    },
  ],
});

// Get user selection by referencing the id selector "hexInput"
var hexInput = document.getElementById("hexInput");

// When there is a color change ie user selects a color on the wheel, update the input field with the selected color.
// https://iro.js.org/guide.html#color-picker-events
colorPicker.on(["color:init", "color:change"], function (color) {
  // Using the selected color: https://iro.js.org/guide.html#selected-color-api
  hexInput.value = colorPicker.colors[0].hexString; // the input field is updated with the base color selected - stored in index 0 of colors array
  // console.log("color.hexString", color.hexString); // Debugging - prints selected value in console
  // console.log("hexInput.value", hexInput.value); // Debugging - prints selected value in console
});

//When the user types something in the input field and hit enter -> The "change" event is triggered - the color wheel will be updated with user's color
hexInput.addEventListener("change", function () {
  colorPicker.color.hexString = this.value;
});

// Initialise variables
let userHexCode = 0;
let colorHarmony = 0;

// Get user color combination
let combinations = document.getElementById("combinations");

// Get color suggestions when user clicks on "create combination" button
let createButton = document.getElementById("createButton");
// console.log("createButton", createButton);

createButton.addEventListener("click", getColorHarmony);

// createButton.addEventListener("click", createColorPalette);

// Dynamic Colour Palette implementation - with hexcode displayed on swatches and works closely with groq ai integration
const colorPalette = document.getElementById("colorPalette");

// https://iro.js.org/guide.html#color-picker-events
// When colors are added to colors array from color suggestion, html element is updated and displays colors from color array
// colorPicker.on(["color:init"], createColorPalette);

function createColorPalette(suggestionArray) {
  // Set color palette title
  let primaryHex = colorPicker.colors[0].hexString;
  colorPaletteTitle.innerHTML = `Results for <strong>${primaryHex}</strong>`;
  // Reset color palette
  colorPalette.innerHTML = "";

  // Print primary color
  colorPalette.innerHTML += `
        <li>
          <div class="swatch" style="background: ${primaryHex}">${primaryHex}</div>
        </li>
      `;

  // Print color suggestion
  suggestionArray.forEach((suggestion) => {
    console.log("suggestionArray", suggestionArray);
    // console.log("suggestion", suggestion);
    const hexString = suggestion;
    // console.log("hexString", hexString);
    colorPalette.innerHTML += `
        <li>
          <div class="swatch" style="background: ${hexString}">${hexString}</div>
        </li>
      `;
  });
}

function getColorHarmony() {
  // If there are colors in the color array, reset the array to only store the first color aka the active color. This is so that when it comes to creating dynamic color palette, we're not including the previous color suggestion if the webpages hasn't been refreshed yet.
  if (colorPicker.colors.length != 0) {
    colorPicker.colors = [colorPicker.colors[0]];
  }

  // console.log("colorPicker.colors.length", colorPicker.colors.length); //debugging. prints current color array length

  // Get user color harmony selection
  if (combinations.value != "Choose your combination") {
    colorHarmony = combinations.value;
    // console.log("colorHarmony", colorHarmony);

    userHexCode = hexInput.value;
    // console.log("userHexCode", userHexCode);

    // Get suggestion from groq ai
    groqSuggestions(userHexCode, colorHarmony);
  }
}

// groq Ai suggestion
async function groqSuggestions(userHexCode, colorHarmony) {
  // console.log("groq userHexCode", userHexCode);
  // console.log("groq colorHarmony", colorHarmony);
  let systemPrompt =
    "You are an expert on color harmony.  Do not include base color as part of the suggestion. Do not give any explanation. Use space to separate suggestions";
  let userPrompt = `Color harmony is ${colorHarmony}. Base color is ${userHexCode}. Do not include base color in suggestion too. Hex Code only.`;
  // console.log("userPrompt", userPrompt);

  const url = "https://api.groq.com/openai/v1/chat/completions";

  const apiKey = `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`;

  try {
    // Make a POST request to the GroqAI API to get chat completions
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.6,
        model: "llama3-70b-8192",
        max_tokens: 30,
      }),
    });

    //Log response in json format
    const groqData = await response.json();
    // console.log("groqData", groqData);

    const colorSuggestion = await groqData.choices[0].message.content;
    // console.log("colorSuggestion", colorSuggestion);
    // console.log(typeof colorSuggestion);

    // Split colorSuggestion into an array
    let suggestionArray = colorSuggestion.split(" ");

    console.log("suggestionArray", suggestionArray);

    // Display color palette
    createColorPalette(suggestionArray);
  } catch (error) {
    let errorText = "Error: Groq AI API connection request failed. Try again.";
    console.error(errorText, error);
    alert(errorText); // pop up alert for user
  }

  // // Add to color array
  // for (let suggestion of suggestionArray) {
  //   // console.log("suggestion", suggestion);
  //   let hex = suggestion;
  //   colorPicker.addColor(hex);
  //   // console.log("colors array", colorPicker.colors);
  // }
}
