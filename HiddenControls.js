// The controls should be either visible or persistent onhover 

setTimeout(() => {
    HiddenControls()
}, 400);

function HiddenControls() { 
    var warnings = [];
    var allTags = document.querySelectorAll("*")
    for(var k=0;k<allTags.length;k++)
    {   
       
        var element = allTags[k]
        var rect = $(element).position();
        var rectOnChange

        // to test
        // warnings.push({
        //     rule: 'WCAG 3.2.7',
        //     warning : 'Hidden Element on focus should be persistent',
        //     code : $(element).prop("innerHTML")
        // });
        if(element.hidden == true || element.style.visibility == "hidden" || element.style.display == "none"){
            rectOnChange = $(element).focus().position();
            if(parseInt(rect.top) != parseInt(rectOnChange.top) || parseInt(rectOnChange.left) != parseInt(rectOnChange.left)){
                console.log('Violation 3.2.7! Hidden Element on focus should be persistent')
                warnings.push({
                    rule: 'WCAG 3.2.7',
                    warning : 'Hidden Element on focus should be persistent',
                    code : $(element).prop("innerHTML")
                });
            }
            rectOnChange = $(element).hover().position();
            if(parseInt(rect.top) != parseInt(rectOnChange.top) || parseInt(rect.left) != parseInt(rectOnChange.left)){
                console.log('Violation 3.2.7! Hidden Element on hover should be persistent')
                warnings.push({
                    rule: 'WCAG 3.2.7',
                    warning : 'Hidden Element on hover should be persistent',
                    code : $(element).prop("innerHTML")
                });
            }
            rectOnChange = $(element).mouseover().position();
            if(parseInt(rect.top) != parseInt(rectOnChange.top) || parseInt(rect.left) != parseInt(rectOnChange.left)){
                console.log('Violation 3.2.7! Hidden Element on mouseover should be persistent')
                warnings.push({
                    rule: 'WCAG 3.2.7',
                    warning : 'Hidden Element on mouseover should be persistent',
                    code : $(element).prop("innerHTML")
                });
            }
            rectOnChange = $(element).mouseup().position();
            if(parseInt(rect.top) != parseInt(rectOnChange.top) || parseInt(rect.left) != parseInt(rectOnChange.left)){
                console.log('Violation 3.2.7! Hidden Element on mouseup should be persistent')
                warnings.push({
                    rule: 'WCAG 3.2.7',
                    warning : 'Hidden Element on mouseup should be persistent',
                    code : $(element).prop("innerHTML")
                });
            }
            rectOnChange = $(element).mousemove().position();
            if(parseInt(rect.top) != parseInt(rectOnChange.top) || parseInt(rect.left) != parseInt(rectOnChange.left)){
                console.log('Violation 3.2.7! Hidden Element on mousemove should be persistent')
                warnings.push({
                    rule: 'WCAG 3.2.7',
                    warning : 'Hidden Element on mousemove should be persistent',
                    code : $(element).prop("innerHTML")
                });
            }
            rectOnChange = $(element).mouseenter().position();
            if(parseInt(rect.top) != parseInt(rectOnChange.top) || parseInt(rect.left) != parseInt(rectOnChange.left)){
                console.log('Violation 3.2.7! Hidden Element on mouseenter should be persistent')
                warnings.push({
                    rule: 'WCAG 3.2.7',
                    warning : 'Hidden Element on mouseenter should be persistent',
                    code : $(element).prop("innerHTML")
                });
            }
       }
    }
    
    var hiddencontrols = JSON.stringify(warnings);
    localStorage.setItem("hiddencontrols" , hiddencontrols)

}