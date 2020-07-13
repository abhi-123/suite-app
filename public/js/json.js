const inputEle = document.getElementById("idInputBox");
const outputEle = document.getElementById("idOutputBox");
const verticalBar = document.getElementById("vertical-bar");
const selectSpace = document.getElementById("IdSpaces");
const propEle = document.getElementById("multi-input");
const selectDataType = document.getElementById("id-data-type-filter");

let filterArr = [],dataTypeArr=[],spaces=4;

const filterInputObj = function(obj){
    let res=JSON.parse(JSON.stringify(obj));
    Object.keys(obj).forEach(key=>{
        if(filterArr.length && !filterArr.includes(key))delete res[key];
        else if(dataTypeArr.length && !dataTypeArr.includes(typeof res[key]))delete res[key];
    })
    return res;
}

const setFilterProp = function(){
    let propStr = propEle.value;
    if(propStr.trim().length>0)
        filterArr = propStr.trim().split(",");
    else filterArr = [];

    if(selectSpace.selectedIndex)
        spaces = parseInt(selectSpace.options[selectSpace.selectedIndex].value);
    else spaces = 4;

    let dataTypes = document.getElementsByName("dataType");
    dataTypeArr=[];
    dataTypes.forEach(type=>{
        if(type.checked)dataTypeArr.push(type.value);
    })
}

const fnPrettify = function() {
    setFilterProp();
    try {
        let inputJson = JSON.parse(inputEle.value);
        inputJson = filterInputObj(inputJson);
        outputEle.innerHTML = `${JSON.stringify(inputJson, undefined, spaces)}`;
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