$(document).ready(function(){
    // checking the doctype
    if(document.doctype == undefined){
        console.log("WCAG 2.0: 4.1.1  "+"HTML ERROR --> No doctype is provided");
    }

    // checking the title
    if(document.title == undefined){
        console.log("WCAG 2.0: 2.4.2 " + "HTML ERROR --> No doctype is provided");
    }
})