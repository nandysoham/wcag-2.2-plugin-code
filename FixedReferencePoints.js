

// Table of contents for epub

setTimeout(() => {
    FixedReferencePoints()
}, 400);

function FixedReferencePoints() {
    $(document).ready(function(){    
        $('li').each(function(){
            try {
                var arr = $(this).children("a")
                for(var c=0;c<arr.length;c++){
                    if(arr[c].href == ""){
                        console.log("Violation 2.4.13! reference locaters should be paginated")
                    }
                }    
            } catch (error) {
                console.log(error)            
            }
        })
    })
 
}

