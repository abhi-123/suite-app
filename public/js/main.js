const inputEle = document.getElementById("idInputBox");
const outputEle = document.getElementById("idOutputBox");
const verticalBar = document.getElementById("vertical-bar");
const selectSpace = document.getElementById("IdSpaces");
let filterArr = [],dataTypeArr=[],spaces=4;

const fnReplacer = function(key, value) {
    if(key=="")return value;

    let returnValue=value;
    if(filterArr.length && !filterArr.includes(key))returnValue=undefined;
    if(dataTypeArr.length && dataTypeArr.includes(typeof value))returnValue=undefined;
    
    return returnValue;
}

selectSpace.onchange = function (e) {
    spaces = this.options[this.selectedIndex].value;
    spaces = parseInt(spaces);
}

const fnPrettify = function() {
    try {
        let inputJson = JSON.parse(inputEle.value);
        outputEle.innerHTML = `${JSON.stringify(inputJson, fnReplacer, spaces)}`;
        addLines(outputEle.innerHTML);

    } catch (e) {
        outputEle.innerHTML = "Invalid json";
    }
}

outputEle.onscroll = function (e) {
    verticalBar.scrollTop = this.scrollTop;
};

function addLines(e) {

    let lines = e.split("\n");
    for (var i = 0; i < lines.length; i++) {
        lines[i] = "";
        for(var j = 0; j < 6 - `${i+1}`.length; j++) {
            lines[i] += `&nbsp;`;
        }
        lines[i] +=  (i + 1);
    }
    document.getElementById("vertical-bar").innerHTML = lines.join("\n");
}