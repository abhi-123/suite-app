
document.getElementById("regex-validate").addEventListener("click", function() {

    const reg = new RegExp(document.getElementById("regex-exp-input").value);

    const str = document.getElementById("regex-string-input").value;
    let results = reg.test(str);

    if (reg === "" || str === "") {
        results = false;
    }

    document.getElementById("valid-text").classList.remove("display-none");
    document.getElementById("regex-output-boolean").innerHTML = results;
});