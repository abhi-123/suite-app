document.getElementById("regex-string-input").addEventListener("keyup", function(e) {

    const reg = new RegExp(document.getElementById("regex-exp-input").value, 'g');
    let str = document.getElementById("regex-string-input").textContent;
    // const term; // search query we want to highlight in results 
    // const results; // search results

    str = str.replace(new RegExp(document.getElementById("regex-exp-input").value, "gi"), (match) => `<mark>${match}</mark>`);
    console.log(str);

    document.getElementById("regex-string-input").innerHTML = str;
    // console.log(str);
    // var isValid = true;
    // try {
    //     console.log('in try')
    //     new RegExp('abc ([a-z]+) (([a-z]+))');
    // } catch (e) {
    //     console.log(e)
    //     isValid = false;
    // }
    // let text;
    // let results = reg.test(str);

    // if (reg === "" || str === "") {
    //     results = false;
    // }

    // let regResults;
    // let obj = [];
    // while( (regResults = reg.exec(str)) !== null ) {        
    //     let index = regResults.index;
    //     let text = regResults[0];

    //     let capturedGroups 
    //             = regResults.slice(1, regResults.length)
    //                             .map((arr) => {
    //                                 return arr;
    //                             });
    //     obj.push({
    //         index,
    //         text,
    //         capturedGroups
    //     });                        
    // }

    // let initialIndex = 0;
    // let div = "";

    // //Displaying Matched Text and Captured Groups
    // for(let i = 0;i< obj.length; i++) {

    //     div = document.createElement("div");
    //     div.innerHTML = `<div><b>Matched Text :</b> ${obj[i].text}</div>`
    //     for(let j=0;j<obj[i].capturedGroups.length;j++) {
    //         let tempDiv = document.createElement("div");
    //         tempDiv.innerHTML = `<div><b>Captured Group ${j+1}:</b>  ${obj[i].capturedGroups[j]}</div>`;
    //         div.appendChild(tempDiv);
    //     }
    //     document.getElementById("regex-results").innerHTML = div.innerHTML;
    // }
});