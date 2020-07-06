let inputEle = document.getElementById("idInputBox");
let outputEle = document.getElementById("idOutputBox");
let verticalBar = document.getElementById("vertical-bar");
var filterArr = [],dataTypeArr=[];
const fnReplacer = function(key, value) {
    if(key=="")return value;

    let returnValue=value;
    if(filterArr.length && !filterArr.includes(key))returnValue=undefined;
    if(dataTypeArr.length && dataTypeArr.includes(typeof value))returnValue=undefined;
    
    return returnValue;
}

const fnPrettify = function() {
    try {
        let inputJson = JSON.parse(inputEle.value);
        outputEle.innerHTML = `${JSON.stringify(inputJson, fnReplacer, 4)}`;
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