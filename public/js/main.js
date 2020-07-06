let inputEle = document.getElementById("idInputBox");
let outputEle = document.getElementById("idOutputBox");
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
    } catch (e) {
        outputEle.innerHTML = "Invalid json";
    }
}

document.getElementById("idInputBox").onkeyup = function(e) {
    var evt = e ? e : event;
    if ((evt.keyCode && evt.keyCode != 13) || evt.which != 13)
        return;
    var elm = evt.target ? evt.target : evt.srcElement;
    var lines = elm.value.split("\n");
    for (var i = 0; i < lines.length; i++)
        lines[i] = lines[i].replace(/(\d+\.\s|^)/, (i + 1) + ". ");
    elm.value = lines.join("\n");
}