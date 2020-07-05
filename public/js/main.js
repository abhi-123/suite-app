let inputEle = document.getElementById("idInputBox");
let outputEle = document.getElementById("idOutputBox");
const fnPrettify = function() {
    try {
        let inputJson = JSON.parse(inputEle.value);
        outputEle.innerHTML = `<pre>${JSON.stringify(inputJson, undefined, 4)}</pre>`;
    } catch (e) {
        outputEle.innerHTML = "Invalid json";
    }
}