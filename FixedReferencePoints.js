

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
                    
                    
                    console.log(warnings);
                    if(arr[c].href == ""){
                        // console.log("Violation 2.4.13! reference locaters should be paginated")
                        warnings.push({
                            rule: 'WCAG 2.4.13',
                            warning : 'reference locaters should be paginated',
                            code : arr[c],
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

