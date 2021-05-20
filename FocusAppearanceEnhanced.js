/*
This part needs to be checked on some other websites for better clarity

js for ads messup the whole process
*/

// Help Options should reside on the same place in all the pages of a website 

setTimeout(() => {
    FocusAppearanceEnhanced()
}, 400);

function FocusAppearanceEnhanced() {
    var warnings = [];
    $(document).ready(function(){

        $('*').each(function(){
            var htmlelement = $(this).prop("outerHTML")


            // console.log(htmlelement);
            var outW1 = $(this).css("outlineWidth")
            outW1 = parseInt(outW1.toString().split("px")[0])
            var outW2 = $(this).focus().css("outlineWidth")
            outW2 = parseInt(outW1.toString().split("px")[0])
            
            var clientPerimeter = 2 * 2 * (this.clientHeight + this.clientWidth)
            var offsetPerimeter = 2 * (this.offsetWidth + this.offsetHeight)
            offsetPerimeter = offsetPerimeter*outW2
            
            // console.log("perimeter: ",clientPerimeter)

            // console.log($(this).css("outlineWidth"),$(this).focus().css("outlineWidth"))
            var color1 = $(this).focus().css("outline-color")
            var color2 = $(this).css("outline-color")
            var color3 = $(this).css("backgroundColor")
            color1 = color1.toString().split(")")[0].split("(")[1].split(",")
            color2 = color2.toString().split(")")[0].split("(")[1].split(",")
            color3 = color3.toString().split(")")[0].split("(")[1].split(",")
            var contrast1 = contrast(color1,color2)
            var contrast2 = contrast(color1,color3)
            var contrastGained = contrast1 
            if(contrastGained < contrast2){
                contrastGained = contrast2
            }
            // console.log('contrastGained: ',contrastGained)

            console.log("this is the html element for focus enhanced");
            // console.log(htmlelement);

            var str = htmlelement.toString()
            if(str.includes("style")){
                var styleidx = str.indexOf("style");
                // console.log("the index is "+styleidx);
                var stylefirst = str.slice(styleidx);

                var stylesecond = str.slice(stylefirst + 5);
                var idx1 = stylesecond.indexOf("\"")
                var firstpart = stylesecond.slice(idx1+1)
                var idx2 = firstpart.indexOf("\"")
                var secondpart = firstpart.slice(idx2+1)
                var fix1 = stylefirst + " style = \" {please_change_the_style_for_contrast_to_pass}\" " + secondpart;
                // console.log(fix1)
            }
            else{
                var index = str.indexOf('>');
                var elementarr = [str.slice(0, index), str.slice(index + 1)];
                var fix1 = elementarr[0] + " style = \" {please_change_the_style_for_contrast_to_pass}\" " +">"+ elementarr[1]
                // console.log("fix at else case " + fix1);
            }

            if(contrastGained < 4.5){
                // console.log("Violation 2.4.12! Need contrast ratio of atleast 4.5:1 between colors in focused and unfocused states")
                warnings.push({
                    rule: 'WCAG 2.4.12',
                    warning : 'Need contrast ratio of atleast 4.5:1 between colors in focused and unfocused states',
                    code : htmlelement
                });
            } 
            if(offsetPerimeter < clientPerimeter){
                // console.log("Violation 2.4.12! The focus indication area should be greater than or equal to a 2 CSS pixel solid border around the control.")                    
                warnings.push({
                    rule: 'WCAG 2.4.12',
                    warning : 'The focus indication area should be greater than or equal to a 2 CSS pixel solid border around the control.',
                    code : htmlelement.toString(),
                    fix : fix1
                });
            } 
            
        })
        var focusenh = JSON.stringify(warnings);
        localStorage.setItem("focusenh", focusenh);
    })
 
    
}

function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }
  function contrast(rgb1, rgb2) {
    var lum1 = luminance(parseInt(rgb1[0]), parseInt(rgb1[1]), parseInt(rgb1[2]));
    var lum2 = luminance(parseInt(rgb2[0]), parseInt(rgb2[1]), parseInt(rgb2[2]));
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05)
         / (darkest + 0.05);
  }

