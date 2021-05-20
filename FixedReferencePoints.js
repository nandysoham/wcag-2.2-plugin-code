// this will generally have no error while testing in webpages --> so check before the if else condition

// Table of contents for epub

setTimeout(() => {
    FixedReferencePoints()
}, 400);


  
  function cleanStringify(object) {
    if (object && typeof object === 'object') {
        object = copyWithoutCircularReferences([object], object);
    }
    return JSON.stringify(object);

    function copyWithoutCircularReferences(references, object) {
        var cleanObject = {};
        Object.keys(object).forEach(function(key) {
            var value = object[key];
            if (value && typeof value === 'object') {
                if (references.indexOf(value) < 0) {
                    references.push(value);
                    cleanObject[key] = copyWithoutCircularReferences(references, value);
                    references.pop();
                } else {
                    cleanObject[key] = '###_Circular_###';
                }
            } else if (typeof value !== 'function') {
                cleanObject[key] = value;
            }
        });
        return cleanObject;
    }
}

function FixedReferencePoints() {
    var warnings = [];
    $(document).ready(function(){    
        $('li').each(function(){
            try {
                var arr = $(this).children("a")
                // console.log("the points are-->");
                for(var c=0;c<arr.length;c++){
                    // console.log(arr[c]);
                    
                    
                    if(arr[c].href == ""){
                        // console.log("Violation 2.4.13! reference locaters should be paginated")
                        var fixedcodes = [];
                        var str = $(this).prop("outerHTML").toString()
                        var codearr = str.split("href")
                        var idx1 = codearr[1].indexOf("\"")
                        var firstpart = codearr[1].slice(idx1+1)
                        var idx2 = firstpart.indexOf("\"")
                        var secondpart = firstpart.slice(idx2+1)
                        var fix1 = codearr[0] + " href =\" https://some_url.com\" " + secondpart;


                        fixedcodes.push(fix1);
                        warnings.push({
                            rule: 'WCAG 2.4.13',
                            warning : 'reference locaters should be paginated',
                            code : str,
                            fix : fixedcodes
                        })
                        
                        
                        
                    }
                }    
            } catch (error) {
                console.log(error)            
            }
        })
        setTimeout(()=>{
            // console.log("here am i");
            var fixedref = cleanStringify(warnings) 
            // console.log("fixedref warnings");
            // console.log(fixedref);
            localStorage.setItem("fixedref",fixedref);

        },400)
        
    })
 
}

