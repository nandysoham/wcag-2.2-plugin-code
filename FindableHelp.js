

// Help Options should reside on the same place in all the pages of a website 

setTimeout(() => {
    FindableHelp()
}, 400);

function FindableHelp() {
    // find, contact, reach, help, email, phone 
    var anchorTags = document.querySelectorAll('a')
    var anchorTexts = []
    var anchorLinks = []
    var anchorTop = []
    var anchorRight = []
    var anchorBottom = []
    var anchorLeft = []
    console.log("total elements: ",anchorTags.length)
    for(var d=0;d<anchorTags.length;d++){
        var element = anchorTags[d]
        var rect = element.getBoundingClientRect();
        console.table(rect.top, rect.right, rect.bottom, rect.left);
        // console.log(element.innerHTML)
        anchorTexts.push(element.innerHTML)
        anchorLinks.push(anchorTags.href)
        anchorTop.push(rect.top)
        anchorRight.push(rect.right)
        anchorBottom.push(rect.bottom)
        anchorLeft.push(rect.left)
    }
    console.log(anchorTexts)
    
}

