const str = "Sumukh S Putahnkar";   // Example string
const reverse = str.split("")       // Split string into array of characters       
                    .reverse()      // Reverse the array of characters
                    .join("");      // converts back to string

console.log(reverse);               // Output: "raknahtuP S hkumS"

//if you want to reverse the order of words instead of characters, you can do it like this:

const rvrWords = str.split(" ")     // Split string into array of words
                    .reverse()      // Reverse the array of words
                    .join(" ");     // Join the array back into a string with spaces

console.log(rvrWords);              // Output: "Putahnkar S Sumukh"

//===========================================================================================================

const strg = "Sumukh S";            // Example string
let reversed = "";                  // variable to hold the reversed string

for (let i = strg.length - 1; i >= 0; i--) {// Loop through the string in reverse order
  reversed = reversed + strg[i];            // Append each character to the reversed string
}

console.log(reversed);           // Output: "hkumS S"