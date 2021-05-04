

// Help Options should reside on the same place in all the pages of a website 

setTimeout(() => {
    FindableHelp()
}, 3000);

function FindableHelp() {
    // find, contact, reach, help, email, phone, chat, bot 
    var helpOptions = ["find","contact", "reach", "help", "phone", "chat", "bot"]
    var anchorTags = document.querySelectorAll('a')
    var anchorLinks = []
    var anchorTop = []
    var anchorRight = []
    var anchorBottom = []
    var anchorLeft = []
    console.log("total elements: ",anchorTags.length)
    $(document).ready(function(){    
        $('a').each(function(){
        var rect = this.getBoundingClientRect();
        var anchorText = this.innerHTML.split(" ")
        var includeHref = false
        for(var a=0;a<anchorText.length;a++){
            for(var b=0;b<helpOptions.length;b++){
                if(anchorText[a].includes(helpOptions[b])){
                    includeHref = true
                }
            }
        }
        if(includeHref){
            anchorLinks.push(this.href)
            anchorTop.push(rect.top)
            anchorRight.push(rect.right)
            anchorBottom.push(rect.bottom)
            anchorLeft.push(rect.left)    
        }
        console.log(anchorLinks)
        for(var a=0;a<anchorLinks.length;a++){ 
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  var resp = this.responseText
                  if(resp == "false"){

                  } else{
                      var respJSON = JSON.parse(resp)
                      if( parseInt(respJSON["left"]) != parseInt(anchorLeft[a]) ||
                          parseInt(respJSON["right"]) != parseInt(anchorRight[a]) || 
                          parseInt(respJSON["top"]) != parseInt(anchorTop[a]) || 
                          parseInt(respJSON["bottom"]) != parseInt(anchorBottom[a]))
                      {
                            console.log("Violation 3.2.6! Help option not consistent in position")
                      }
                  }

                }
              };
            xhttp.open("POST", "http://localhost:2345/respond", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("url="+anchorLinks[a]);
        }
    }) 
})
    }
   

