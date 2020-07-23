document.getElementById("regex-string-input").addEventListener("keyup", function(e) {

    let str = document.getElementById("regex-string-input").value;
    let isValidRegex = true;

    try {
        const regExpression = new RegExp(document.getElementById("regex-exp-input").value, "gi");
        str = str.replace(new RegExp(regExpression), (match) => `<mark>${match}</mark>`);
        document.getElementById("regex-results").innerHTML = str;
    } catch (e) {
        isValidRegex = false; 
    }

    if (!isValidRegex) {
        document.getElementById("regex-exp-input").classList.add("error-box");
    } else {
        document.getElementById("regex-exp-input").classList.remove("error-box");
    }

});