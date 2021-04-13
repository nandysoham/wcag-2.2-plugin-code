$(function(){
    // checking the doctype
    if(document.doctype == undefined){
        console.log("WCAG 2.0: 4.1.1  "+"HTML ERROR --> No doctype is provided");
    }

    // checking the title
    if(document.title == undefined){
        console.log("WCAG 2.0: 2.4.2 " + "HTML ERROR --> No doctype is provided");
    }


    // checking lang of the html page
    const langcheck = $('html').attr('lang');
    // console.log(langcheck);
    if(langcheck == undefined){
        console.log("WCAG 2.0: 3.1.1  Langauge value missing");
    }


    // checking document encoding
    const metacharset = $('meta').attr('charset');
    console.log(metacharset);
    if(metacharset == undefined ){
        console.log("WCAG error  - Document encoding is missing");
    }


    //user scalability error
    const userscalable = $('meta').attr('user-scalable');
    if(userscalable == undefined || userscalable=="no"){
        console.log("WCAG Error  - document needs to be user scalable");
    }


    //INSIDE THE BODY OJ THE HTML
    const h1length= $('hi').length;
    if(h1length>1){
        console.log("WCAG eroor --Page has Multi <h1> tag.")
    }


    // checking imgage alt and source
})