

// controls should be of atleast 44 by 44 pixel dimensions.
// If not then they should be enclosed inside a 44 by 44 boundary

setTimeout(() => {
  PointerTargetSpacing()
}, 400);

function PointerTargetSpacing() {
  var allTags = document.querySelectorAll("*")
  for(var k=0;k<allTags;k++){
    if(allTags[k].clientHeight < 44 || allTags[k].clientWidth < 44){
      console.log("Violation 2.5.8! Need the target size of atleast 44 pixels")
    }
  }

}

