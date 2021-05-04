// The controls should be either visible or persistent onhover 

setTimeout(() => {
    HiddenControls()
}, 400);

function HiddenControls() { 
    var allTags = document.querySelectorAll("*")
    for(var k=0;k<allTags.length;k++)
    {
        var element = allTags[k]
        var rect = $(element).position();
        var rectOnChange
        if(element.hidden == true || element.style.visibility == "hidden" || element.style.display == "none"){
            rectOnChange = $(element).focus().position();
            if(parseInt(rect.top) != parseInt(rectOnChange.top) || parseInt(rectOnChange.left) != parseInt(rectOnChange.left)){
                console.log('Violation 3.2.7! Hidden Element on focus should be persistent')
            }
            rectOnChange = $(element).hover().position();
            if(parseInt(rect.top) != parseInt(rectOnChange.top) || parseInt(rect.left) != parseInt(rectOnChange.left)){
                console.log('Violation 3.2.7! Hidden Element on hover should be persistent')
            }
            rectOnChange = $(element).mouseover().position();
            if(parseInt(rect.top) != parseInt(rectOnChange.top) || parseInt(rect.left) != parseInt(rectOnChange.left)){
                console.log('Violation 3.2.7! Hidden Element on mouseover should be persistent')
            }
            rectOnChange = $(element).mouseup().position();
            if(parseInt(rect.top) != parseInt(rectOnChange.top) || parseInt(rect.left) != parseInt(rectOnChange.left)){
                console.log('Violation 3.2.7! Hidden Element on mouseup should be persistent')
            }
            rectOnChange = $(element).mousemove().position();
            if(parseInt(rect.top) != parseInt(rectOnChange.top) || parseInt(rect.left) != parseInt(rectOnChange.left)){
                console.log('Violation 3.2.7! Hidden Element on mousemove should be persistent')
            }
            rectOnChange = $(element).mouseenter().position();
            if(parseInt(rect.top) != parseInt(rectOnChange.top) || parseInt(rect.left) != parseInt(rectOnChange.left)){
                console.log('Violation 3.2.7! Hidden Element on mouseenter should be persistent')
            }
       }
    }

}