// Success Criterion does not impact Accessible Authentication,
// for which allowing auto-filling of passwords is a sufficient technique

setTimeout(() => {
    RedundantEntry()
}, 400);

function RedundantEntry() {
    // Option to pass(auto-fill) information with a check-box 
    var inputTags = document.querySelectorAll('input')
    // console.log(inputTags)
    // console.log(inputTags.length)
    var warnings = [];
    for(var a=0;a<inputTags.length;a++){
        var htmlelement = inputTags[a].outerHTML
        // console.log(htmlelement);
        if(inputTags[a].type == "checkbox"){
            // Need to fetch html text of all checkboxes
            // can be neighbouring span,div,p,h or label
            console.log(inputTags[a].value)
            warnings.push({
                rule: 'WCAG 3.3.8',
                warning : 'Redundant entry in input box',
                code : htmlelement
            })
        } 
    }
    var redentry = JSON.stringify(warnings);
    localStorage.setItem("redundantentry", redentry);
}