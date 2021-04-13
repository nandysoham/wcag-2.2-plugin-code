function getWH(element) {
  var h = parseInt($(this).parent().css('min-height'), 10)    //S parsing the height 10 --. numeral sysytem --> decimal
    || parseInt($(this).parent().css('height'), 10);
  var w = parseInt($(this).parent().css('min-width'), 10)
    || parseInt($(this).parent().css('width'), 10);
  return h, w, $(this)    //S returning height, width, element 
}
function imgCoordinates() {
  var top = []
  var left = []
  var bottom = []
  var right = []
  $(document).ready(function () {
    $('img').each(function () {           //S <arr_name>.forEach(()=>{})
      top.push($(this).offset().top)   //S pushing the offset - top values to an array
      right.push($(this).offset().right)
      left.push($(this).offset().left)
      bottom.push($(this).offset().bottom)
    })
  })
  return top, left, bottom, right
}
function getCoordinates(ele) {
  // $(document).ready(function(){     //S waiting for the document to load then only trying the js(anyway commented out)  
  var top = ele.offset().top
  var right = ele.offset().right
  var left = ele.offset().left
  var bottom = ele.offset().bottom
  return top, left, bottom, right
}
function comparePositions(t1, l1, b1, r1, t2, l2, b2, r2) {
  if (t1 < t2 && l1 < l2 && r1 < r2 && b1 < b2) {
    return true
  } else {
    return false
  }

}
function luminance(r, g, b) {

  //S .map() --> to return an array whose each element has gone through the function 
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;       //S  mathematical formula for calulating luminescense
}
function contrast(rgb1, rgb2) {
  var lum1 = luminance(parseInt(rgb1[0]), parseInt(rgb1[1]), parseInt(rgb1[2]));
  var lum2 = luminance(parseInt(rgb2[0]), parseInt(rgb2[1]), parseInt(rgb2[2]));
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05)
    / (darkest + 0.05);
}
console.log('contrast: ', contrast([255, 255, 255], [255, 255, 255])) // 1.074 for yellow
// contrast([255, 255, 255], [0, 0, 255]); // 8.592 for blue


  // written by soham
  function navbarsearch() {

    var navbarelement = document.getElementsByTagName("nav")
    if (navbarelement != undefined){
      // console.log("Navbar ----------------------------")
      console.log(navbarelement[0])
      var navbar_class = $('nav').children();
      console.log(navbar_class)
      $.each(navbar_class,function(index,value){
        console.log(index + value);
      })

    }
    else {
      var navclass = document.getElementsByClassName("navbar")
      if ( navclass != undefined){
        console.log("Navbar ----------------------------")
        console.log(navclass[0])
      }
      else{
        console.log("Navbar not present by  name");
      }
    }
  }


function main() {

  // console.log("this is the call to navbar");
  navbarsearch();
  var top, left, bottom, right = imgCoordinates()
  // Pointer Target Spacing
  var target_buttons = document.getElementsByTagName('button')
  for (var t = 0; t < target_buttons.length; t++) {
    if (target_buttons[t].style.minWidth != null && target_buttons[t]) {

    }
  }
  function getBackgroundFocus() {

  }




  $(function () {

    $('button').each(function () {

      //S This splits the css `backgroundcolor : rgb(120,120,120)'
      //S .split(")") --> `backgroundcolor : rgb(120,120,120` , `)`
      //S  .split(")")[0] --> `backgroundcolor : rgb(120,120,120`
      //S  .split(")") -->  `backgroundcolor : rgb(`  ,  `120,120,120`
      //S   .split[1] --> `120,120,120`
      //S   .split(",")   --> [ 120 ,120 ,120]


      var background = $(this).css('backgroundColor').split(")")[0].split("(")[1].split(",")
      // console.log('background: ',background, ': ', typeof(background))
      var backgroundFocus = $(this).focus().css('backgroundColor').split(")")[0].split("(")[1].split(",")
      var buttonContrast = contrast(background, backgroundFocus)
      console.log('contrast: ', buttonContrast)
      if (buttonContrast >= 3) {
        console.log('Focus Contrast Satisifies (WCAG 2.2)')
      } else {
        var borderFocus = $(this).focus().css("borderWidth")              //S TAj=kes the borderwidth
        if (borderFocus.includes("px")) {
          borderFocus = parseInt(borderFocus.split("px")[0])              //S   gets the pixel values(value before the word px)
          console.log('borderFocus: ', borderFocus)
        } else if (borderFocus.includes("rem")) {                           //S  --> the sam eis done to find the existence of other parmeters
          borderFocus = parseInt(borderFocus.split("rem")[0])
          borderFocus = parseFloat((borderFocus * 2.0) / 0.13)
          console.log('borderFocus: ', borderFocus)
        } else if (borderFocus.includes("em")) {
          borderFocus = parseInt(borderFocus.split("em")[0])
          borderFocus = parseFloat(borderFocus / 0.0625)
          console.log('borderFocus: ', borderFocus)
        } else if (borderFocus.includes("vh")) {
          borderFocus = parseInt(borderFocus.split("vh")[0])
          borderFocus = parseFloat(borderFocus / 0.13157894736842105)
          console.log('borderFocus: ', borderFocus)
        } else if (borderFocus.includes("vm")) {
          borderFocus = parseInt(borderFocus.split("vm")[0])
          borderFocus = parseFloat(borderFocus / 0.06510416666666667)
          console.log('borderFocus: ', borderFocus)
        }
        if (borderFocus >= 2) {
          console.log($(this).html);// added by sn
          console.log('Guideline 2.4.7 Focus Visible Success Criteria Satisfied!')
        } else {
          console.log('Violation - Guideline 2.4.7 Focus Visible. If the focus indication area is adjacent to a color with which it does not have a 3:1 contrast ratio difference, the thickness of the focus indicator is at least 2 CSS pixel')
        }
      }
      var height = $(this).css("height")
      var heightFocus = $(this).focus().css("height")
      var width = $(this).css("width")
      var widthFocus = $(this).focus().css("width")
      var area = 0
      var focusArea = -1
      var perimeter = 0
      if (height.includes("px") && heightFocus.includes("px") && width.includes("px") && widthFocus.includes("px")) {
        area = parseInt(height.split("px")[0]) * parseInt(width.split("px")[0])                     //S finding the focus area ,are, perimeter
        focusArea = parseInt(heightFocus.split("px")[0]) * parseInt(widthFocus.split("px")[0])
        perimeter = 2 * (parseInt(height.split("px")[0]) + parseInt(width.split("px")[0]))

      }
      if (buttonContrast >= 3) {
        console.log('Focus Contrast Satisifies (WCAG 2.2)')
      } else {                                                       //S if not found carry on the alternatives
        var borderFocus = $(this).focus().css("borderWidth")
        if (borderFocus.includes("px")) {
          borderFocus = parseInt(borderFocus.split("px")[0])
          console.log('borderFocus: ', borderFocus)
        } else if (borderFocus.includes("rem")) {
          borderFocus = parseInt(borderFocus.split("rem")[0])
          borderFocus = parseFloat((borderFocus * 2.0) / 0.13)
          console.log('borderFocus: ', borderFocus)
        } else if (borderFocus.includes("em")) {
          borderFocus = parseInt(borderFocus.split("em")[0])
          borderFocus = parseFloat(borderFocus / 0.0625)
          console.log('borderFocus: ', borderFocus)
        } else if (borderFocus.includes("vh")) {
          borderFocus = parseInt(borderFocus.split("vh")[0])
          borderFocus = parseFloat(borderFocus / 0.13157894736842105)
          console.log('borderFocus: ', borderFocus)
        } else if (borderFocus.includes("vm")) {
          borderFocus = parseInt(borderFocus.split("vm")[0])
          borderFocus = parseFloat(borderFocus / 0.06510416666666667)
          console.log('borderFocus: ', borderFocus)
        }
        if (borderFocus >= 2) {
          console.log('Guideline 2.4.7 Focus Visible Success Criteria Satisfied!')
        } else {
          console.log('Violation - Guideline 2.4.7 Focus Visible. If the focus indication area is adjacent to a color with which it does not have a 3:1 contrast ratio difference, the thickness of the focus indicator is at least 2 CSS pixel')
        }
      }


      var h, w, ele = getWH($(this))        //S function() defined on the top--> to get the height, width and the element back
      if (h >= 44 && w >= 44) {
        for (var k = 0; k < top.length; k++) {
          var t1, l1, b1, r1 = getCoordinates($(this))
          console.log($(this).html);   // added by sn
          if (comparePositions(t1, l1, b1, r1, top[i], left[i], bottom[i], right[i])) {
            console.log('button: Violation, button show lie along the boundaries of the image')
          } else {
            console.log('button: Pointer target spacing exists')
          }
        }
      }
      else if (h == 0 || w == 0) {
        console.log($(this).html);
        console.log('button: Violation')      //S --> button has bo dimensions
      }
      else {
        var depth = 3
        var violation = true
        while (depth--) {
          console.log('inside button while loop')
          h, w, ele = getWH(ele)
          if (h >= 44 && w >= 44) {
            if (top.length > 0) {
              for (var k = 0; k < top.length; k++) {
                var t1, l1, b1, r1 = getCoordinates($(ele))
                console.log($(this).html);
                if (comparePositions(t1, l1, b1, r1, top[i], left[i], bottom[i], right[i])) {
                  console.log('button: Violation, anchor should lie along the boundaries of the image')
                } else {
                  violation = false
                  console.log('button: Pointer target spacing exists')
                  break
                }
              }
            } else {
              violation = false
              console.log($(this).html);
              console.log('button: Pointer target spacing exists')
            }
            break
          }
          else if (h == 0 || w == 0) {
            console.log($(this).html);  //by soham
            console.log('button: Violation')
            break
          }
          else {
            continue
          }
        }
        if (violation == true) {
          console.log('button: Violation')
        }
      }
    });
  });


  //S the above function is being called
  $(function () {
    $('a').each(function () {
      var h, w, ele = getWH($(this))
      if (h >= 44 && w >= 44) {
        for (var k = 0; k < top.length; k++) {
          var t1, l1, b1, r1 = getCoordinates($(this))
          console.log($(this).html());  //by soham
          if (comparePositions(t1, l1, b1, r1, top[i], left[i], bottom[i], right[i])) {
            console.log('button: Violation, button show lie along the boundaries of the image')
          } else {
            console.log('button: Pointer target spacing exists')
          }
        }
      }
      else if (h == 0 || w == 0) {
        console.log($(this).html);  //by soham
        console.log('button: Violation')
      }
      else {
        var depth = 3
        var violation = true
        while (depth--) {
          console.log('inside button while loop')
          h, w, ele = getWH(ele)
          if (h >= 44 && w >= 44) {
            if (top.length > 0) {
              for (var k = 0; k < top.length; k++) {
                var t1, l1, b1, r1 = getCoordinates($(ele))
                console.log($(this).html);  //by soham
                if (comparePositions(t1, l1, b1, r1, top[i], left[i], bottom[i], right[i])) {
                  console.log('button: Violation, anchor should lie along the boundaries of the image')
                } else {
                  violation = false
                  console.log('button: Pointer target spacing exists')
                  break
                }
              }
            } else {
              violation = false
              console.log($(this).html);  //by soham
              console.log('button: Pointer target spacing exists')
            }
            break
          }
          else if (h == 0 || w == 0) {
            console.log($(this).html);  //by soham
            console.log('button: Violation')
            break
          }
          else {
            continue
          }
        }
        if (violation == true) {
          console.log('button: Violation')
        }
      }
    });
  });

  var script_content = document.getElementsByTagName('script')          //S finds the script tag
  var input_elements = document.getElementsByTagName('input')           //S finds the input tags

  console.log(input_elements.length >= 0 && script_content.length >= 0)
  if (input_elements.length >= 0 && script_content.length >= 0) {         // checking whether the scripts and inputs are well filled
    var RedundantContentAvailability = false
    for (var i = 0; i < script_content.length; i++) {
      for (var j = 0; j < input_elements.length; j++) {
        var str1 = input_elements[j].name                 //S choosing the names and ids of the input elemnts in the form
        var str2 = input_elements[j].id
        var st1 = "document.getElementById('" + str1 + "').innerHTML"       //S puttng the queries as a string
        var st2 = "document.getElementById('" + str1 + "').innerText"
        var st3 = "document.getElementsByName('" + str2 + "').innerHTML"
        var st4 = "document.getElementsByName('" + str2 + "').innerText"
        // var st5 = `$('#`+ str1 + `').text(`
        if (script_content[i].innerHTML.includes(st1) ||                     //S --> will check if st1, st2,st3.st4 are substrings of the string returned by getELmentById
          script_content[i].innerHTML.includes(st2) ||
          script_content[i].innerHTML.includes(st3) ||
          script_content[i].innerHTML.includes(st4)) {
          RedundantContentAvailability = true
          break
        }
      }
    }


    //S --> To say 1 or more redundant fields exist in the forms



    // if(RedundantContentAvailability == false){
    //   console.log('------------------------------------------')
    //   console.log('3.3.8 Redundant Entry violation')
    //   console.log('Atleast one input automatic filling does not exist')
    //   console.log('------------------------------------------')

    // }
  }
  // Success Criterion 3.3.7 Accessible Authentication (Level A): 
  //       For each step in an authentication process that relies on a cognitive function test,
  //       at least one other authentication method is available that does not rely on a cognitive function test, 
  //       or a mechanism is available to assist the user in completing the cognitive function test.
  //  Examples of mechanisms include: 
  //  1) support for password entry by password managers to address the memorization cognitive function test, and
  //  2) copy and paste to help address transcription cognitive function test.





  //S AUTOCOMPLETE FEATURE LOADEING-->
  var input_elements = document.getElementsByTagName('input')     //S Multiple elements would be present
  // console.log(input_elements[2]);

  for (var i = 0; i < input_elements.length; i++) {
    if (input_elements[i].type != "submit" && input_elements[i].type != "password" && input_elements[i].type != "file") {     //S if not password and not file
      if (input_elements[i].name != input_elements[i].id) {
        console.log('------------------------------------------')
        console.log('Guideline 3.3.7 Accessible Authentication violation')
        console.log('Input tag`s name and id should be same!')
        console.log(input_elements[i])  //by soham
        console.log('------------------------------------------')

      }
      else {
        if (input_elements[i].type == "text" && input_elements[i].name == "email") {
          console.log('------------------------------------------')
          console.log('Guideline 3.3.7 Accessible Authentication violation')
          console.log('Input tag should be of email type found text type!')
          console.log("for " + input_elements[i]);  //by soham
          console.log('------------------------------------------')

        }
        if (input_elements[i].type == "email") {
          if (input_elements[i].autocomplete != "email") {              // jquery to check autocomplete faetire of input element
            console.log('------------------------------------------')
            console.log('Guideline 3.3.7 Accessible Authentication violation')
            console.log('Input tag should have autocomplete feature enabled!')
            console.log("for " + input_elements[i]);  //by soham
            console.log('------------------------------------------')
          }
        }
        if (input_elements[i].type == "date") {
          if (input_elements[i].autocomplete == undefined) {              // Jquery provides an inbuilt autocomplete feature
            console.log('------------------------------------------')
            console.log('Guideline 3.3.7 Accessible Authentication violation')
            console.log('Input tag should have autocomplete feature enabled!')
            console.log("for " + input_elements[i]);  //by soham
            console.log('------------------------------------------')
          }
          else {
            if (input_elements[i].autocomplete == "") {

            }
          }
        }

      }
    }
  }





  //s same part --> continuatin of automated.js -->


  var a_elements = document.getElementsByTagName("a")
  for(var i=0;i<a_elements.length;i++){
    if(a_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(a_elements[i])
      console.log('------------------------------------------')
      console.log("a element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var abbr_elements = document.getElementsByTagName("abbr")
  for(var i=0;i<abbr_elements.length;i++){
    if(abbr_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(abbr_elements[i])
      console.log('------------------------------------------')
      console.log("abbr element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var address_elements = document.getElementsByTagName("address")
  for(var i=0;i<address_elements.length;i++){
    if(address_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(address_elements[i])
      console.log('------------------------------------------')
      console.log("address element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var area_elements = document.getElementsByTagName("area")
  for(var i=0;i<area_elements.length;i++){
    if(area_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(area_elements[i])
      console.log('------------------------------------------')
      console.log("area element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var article_elements = document.getElementsByTagName("article")
  for(var i=0;i<article_elements.length;i++){
    if(article_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(article_elements[i])
      console.log('------------------------------------------')
      console.log("article element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var aside_elements = document.getElementsByTagName("aside")
  for(var i=0;i<aside_elements.length;i++){
    if(aside_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(aside_elements[i])
      console.log('------------------------------------------')
      console.log("aside element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var audio_elements = document.getElementsByTagName("audio")
  for(var i=0;i<audio_elements.length;i++){
    if(audio_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(audio_elements[i])
      console.log('------------------------------------------')
      console.log("audio element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var base_elements = document.getElementsByTagName("base")
  for(var i=0;i<base_elements.length;i++){
    if(base_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(base_elements[i])
      console.log('------------------------------------------')
      console.log("base element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var bdi_elements = document.getElementsByTagName("bdi")
  for(var i=0;i<bdi_elements.length;i++){
    if(bdi_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(bdi_elements[i])
      console.log('------------------------------------------')
      console.log("bdi element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var bdo_elements = document.getElementsByTagName("bdo")
  for(var i=0;i<bdo_elements.length;i++){
    if(bdo_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(bdo_elements[i])
      console.log('------------------------------------------')
      console.log("bdo element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var blockquote_elements = document.getElementsByTagName("blockquote")
  for(var i=0;i<blockquote_elements.length;i++){
    if(blockquote_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(blockquote_elements[i])
      console.log('------------------------------------------')
      console.log("blockquote element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var button_elements = document.getElementsByTagName("button")
  for(var i=0;i<button_elements.length;i++){
    if(button_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(button_elements[i])
      console.log('------------------------------------------')
      console.log("button element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var canvas_elements = document.getElementsByTagName("canvas")
  for(var i=0;i<canvas_elements.length;i++){
    if(canvas_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(canvas_elements[i])
      console.log('------------------------------------------')
      console.log("canvas element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var body_elements = document.getElementsByTagName("body")
  for(var i=0;i<body_elements.length;i++){
    if(body_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(body_elements[i])
      console.log('------------------------------------------')
      console.log("body element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var caption_elements = document.getElementsByTagName("caption")
  for(var i=0;i<caption_elements.length;i++){
    if(caption_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(caption_elements[i])
      console.log('------------------------------------------')
      console.log("caption element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var cite_elements = document.getElementsByTagName("cite")
  for(var i=0;i<cite_elements.length;i++){
    if(cite_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(cite_elements[i])
      console.log('------------------------------------------')
      console.log("cite element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var code_elements = document.getElementsByTagName("code")
  for(var i=0;i<code_elements.length;i++){
    if(code_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(code_elements[i])
      console.log('------------------------------------------')
      console.log("code element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var col_elements = document.getElementsByTagName("col")
  for(var i=0;i<col_elements.length;i++){
    if(col_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(col_elements[i])
      console.log('------------------------------------------')
      console.log("col element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var colgroup_elements = document.getElementsByTagName("colgroup")
  for(var i=0;i<colgroup_elements.length;i++){
    if(colgroup_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(colgroup_elements[i])
      console.log('------------------------------------------')
      console.log("colgroup element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var data_elements = document.getElementsByTagName("data")
  for(var i=0;i<data_elements.length;i++){
    if(data_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(data_elements[i])
      console.log('------------------------------------------')
      console.log("data element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var datalist_elements = document.getElementsByTagName("datalist")
  for(var i=0;i<datalist_elements.length;i++){
    if(datalist_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(datalist_elements[i])
      console.log('------------------------------------------')
      console.log("datalist element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var dd_elements = document.getElementsByTagName("dd")
  for(var i=0;i<dd_elements.length;i++){
    if(dd_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(dd_elements[i])
      console.log('------------------------------------------')
      console.log("dd element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var del_elements = document.getElementsByTagName("del")
  for(var i=0;i<del_elements.length;i++){
    if(del_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(del_elements[i])
      console.log('------------------------------------------')
      console.log("del element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var details_elements = document.getElementsByTagName("details")
  for(var i=0;i<details_elements.length;i++){
    if(details_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(details_elements[i])
      console.log('------------------------------------------')
      console.log("details element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var dfn_elements = document.getElementsByTagName("dfn")
  for(var i=0;i<dfn_elements.length;i++){
    if(dfn_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(dfn_elements[i])
      console.log('------------------------------------------')
      console.log("dfn element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var dialog_elements = document.getElementsByTagName("dialog")
  for(var i=0;i<dialog_elements.length;i++){
    if(dialog_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(dialog_elements[i])
      console.log('------------------------------------------')
      console.log("dialog element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var div_elements = document.getElementsByTagName("div")
  for(var i=0;i<div_elements.length;i++){
    if(div_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(div_elements[i])
      console.log('------------------------------------------')
      console.log("div element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var dl_elements = document.getElementsByTagName("dl")
  for(var i=0;i<dl_elements.length;i++){
    if(dl_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(dl_elements[i])
      console.log('------------------------------------------')
      console.log("dl element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var dt_elements = document.getElementsByTagName("dt")
  for(var i=0;i<dt_elements.length;i++){
    if(dt_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(dt_elements[i])
      console.log('------------------------------------------')
      console.log("dt element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var em_elements = document.getElementsByTagName("em")
  for(var i=0;i<em_elements.length;i++){
    if(em_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(em_elements[i])
      console.log('------------------------------------------')
      console.log("em element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var embed_elements = document.getElementsByTagName("embed")
  for(var i=0;i<embed_elements.length;i++){
    if(embed_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(embed_elements[i])
      console.log('------------------------------------------')
      console.log("embed element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var fieldset_elements = document.getElementsByTagName("fieldset")
  for(var i=0;i<fieldset_elements.length;i++){
    if(fieldset_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(fieldset_elements[i])
      console.log('------------------------------------------')
      console.log("fieldset element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var figcaption_elements = document.getElementsByTagName("figcaption")
  for(var i=0;i<figcaption_elements.length;i++){
    if(figcaption_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(figcaption_elements[i])
      console.log('------------------------------------------')
      console.log("figcaption element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var figure_elements = document.getElementsByTagName("figure")
  for(var i=0;i<figure_elements.length;i++){
    if(figure_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(figure_elements[i])
      console.log('------------------------------------------')
      console.log("figure element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var footer_elements = document.getElementsByTagName("footer")
  for(var i=0;i<footer_elements.length;i++){
    if(footer_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(footer_elements[i])
      console.log('------------------------------------------')
      console.log("footer element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var form_elements = document.getElementsByTagName("form")
  for(var i=0;i<form_elements.length;i++){
    if(form_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(form_elements[i])
      console.log('------------------------------------------')
      console.log("form element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var h1_elements = document.getElementsByTagName("h1")
  for(var i=0;i<h1_elements.length;i++){
    if(h1_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(h1_elements[i])
      console.log('------------------------------------------')
      console.log("h1 element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var h2_elements = document.getElementsByTagName("h2")
  for(var i=0;i<h2_elements.length;i++){
    if(h2_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(h2_elements[i])
      console.log('------------------------------------------')
      console.log("h2 element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var h3_elements = document.getElementsByTagName("h3")
  for(var i=0;i<h3_elements.length;i++){
    if(h3_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(h3_elements[i])
      console.log('------------------------------------------')
      console.log("h3 element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var h4_elements = document.getElementsByTagName("h4")
  for(var i=0;i<h4_elements.length;i++){
    if(h4_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(h4_elements[i])
      console.log('------------------------------------------')
      console.log("h4 element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var h5_elements = document.getElementsByTagName("h5")
  for(var i=0;i<h5_elements.length;i++){
    if(h5_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(h5_elements[i])
      console.log('------------------------------------------')
      console.log("h5 element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var h6_elements = document.getElementsByTagName("h6")
  for(var i=0;i<h6_elements.length;i++){
    if(h6_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(h6_elements[i])
      console.log('------------------------------------------')
      console.log("h6 element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var head_elements = document.getElementsByTagName("head")
  for(var i=0;i<head_elements.length;i++){
    if(head_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(head_elements[i])
      console.log('------------------------------------------')
      console.log("head element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var header_elements = document.getElementsByTagName("header")
  for(var i=0;i<header_elements.length;i++){
    if(header_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(header_elements[i])
      console.log('------------------------------------------')
      console.log("header element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var hr_elements = document.getElementsByTagName("hr")
  for(var i=0;i<hr_elements.length;i++){
    if(hr_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(hr_elements[i])
      console.log('------------------------------------------')
      console.log("hr element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var html_elements = document.getElementsByTagName("html")
  for(var i=0;i<html_elements.length;i++){
    if(html_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(html_elements[i])
      console.log('------------------------------------------')
      console.log("html element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var i_elements = document.getElementsByTagName("i")
  for(var i=0;i<i_elements.length;i++){
    if(i_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(i_elements[i])
      console.log('------------------------------------------')
      console.log("i element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var iframe_elements = document.getElementsByTagName("iframe")
  for(var i=0;i<iframe_elements.length;i++){
    if(iframe_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(iframe_elements[i])
      console.log('------------------------------------------')
      console.log("iframe element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var img_elements = document.getElementsByTagName("img")
  for(var i=0;i<img_elements.length;i++){
    if(img_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(img_elements[i])
      console.log('------------------------------------------')
      console.log("img element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var input_elements = document.getElementsByTagName("input")
  for(var i=0;i<input_elements.length;i++){
    if(input_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(input_elements[i])
      console.log('------------------------------------------')
      console.log("input element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var ins_elements = document.getElementsByTagName("ins")
  for(var i=0;i<ins_elements.length;i++){
    if(ins_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(ins_elements[i])
      console.log('------------------------------------------')
      console.log("ins element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var kbd_elements = document.getElementsByTagName("kbd")
  for(var i=0;i<kbd_elements.length;i++){
    if(kbd_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(kbd_elements[i])
      console.log('------------------------------------------')
      console.log("kbd element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var label_elements = document.getElementsByTagName("label")
  for(var i=0;i<label_elements.length;i++){
    if(label_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(label_elements[i])
      console.log('------------------------------------------')
      console.log("label element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var legend_elements = document.getElementsByTagName("legend")
  for(var i=0;i<legend_elements.length;i++){
    if(legend_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(legend_elements[i])
      console.log('------------------------------------------')
      console.log("legend element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var li_elements = document.getElementsByTagName("li")
  for(var i=0;i<li_elements.length;i++){
    if(li_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(li_elements[i])
      console.log('------------------------------------------')
      console.log("li element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var link_elements = document.getElementsByTagName("link")
  for(var i=0;i<link_elements.length;i++){
    if(link_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(link_elements[i])
      console.log('------------------------------------------')
      console.log("link element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var main_elements = document.getElementsByTagName("main")
  for(var i=0;i<main_elements.length;i++){
    if(main_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(main_elements[i])
      console.log('------------------------------------------')
      console.log("main element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var map_elements = document.getElementsByTagName("map")
  for(var i=0;i<map_elements.length;i++){
    if(map_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(map_elements[i])
      console.log('------------------------------------------')
      console.log("map element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var mark_elements = document.getElementsByTagName("mark")
  for(var i=0;i<mark_elements.length;i++){
    if(mark_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(mark_elements[i])
      console.log('------------------------------------------')
      console.log("mark element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var meta_elements = document.getElementsByTagName("meta")
  for(var i=0;i<meta_elements.length;i++){
    if(meta_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(meta_elements[i])
      console.log('------------------------------------------')
      console.log("meta element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var meter_elements = document.getElementsByTagName("meter")
  for(var i=0;i<meter_elements.length;i++){
    if(meter_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(meter_elements[i])
      console.log('------------------------------------------')
      console.log("meter element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var nav_elements = document.getElementsByTagName("nav")
  for(var i=0;i<nav_elements.length;i++){
    if(nav_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(nav_elements[i])
      console.log('------------------------------------------')
      console.log("nav element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var noscript_elements = document.getElementsByTagName("noscript")
  for(var i=0;i<noscript_elements.length;i++){
    if(noscript_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(noscript_elements[i])
      console.log('------------------------------------------')
      console.log("noscript element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var object_elements = document.getElementsByTagName("object")
  for(var i=0;i<object_elements.length;i++){
    if(object_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(object_elements[i])
      console.log('------------------------------------------')
      console.log("object element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var ol_elements = document.getElementsByTagName("ol")
  for(var i=0;i<ol_elements.length;i++){
    if(ol_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(ol_elements[i])
      console.log('------------------------------------------')
      console.log("ol element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var optgroup_elements = document.getElementsByTagName("optgroup")
  for(var i=0;i<optgroup_elements.length;i++){
    if(optgroup_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(optgroup_elements[i])
      console.log('------------------------------------------')
      console.log("optgroup element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var option_elements = document.getElementsByTagName("option")
  for(var i=0;i<option_elements.length;i++){
    if(option_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(option_elements[i])
      console.log('------------------------------------------')
      console.log("option element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var output_elements = document.getElementsByTagName("output")
  for(var i=0;i<output_elements.length;i++){
    if(output_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(output_elements[i])
      console.log('------------------------------------------')
      console.log("output element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var p_elements = document.getElementsByTagName("p")
  for(var i=0;i<p_elements.length;i++){
    if(p_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(p_elements[i])
      console.log('------------------------------------------')
      console.log("p element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var param_elements = document.getElementsByTagName("param")
  for(var i=0;i<param_elements.length;i++){
    if(param_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(param_elements[i])
      console.log('------------------------------------------')
      console.log("param element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var picture_elements = document.getElementsByTagName("picture")
  for(var i=0;i<picture_elements.length;i++){
    if(picture_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(picture_elements[i])
      console.log('------------------------------------------')
      console.log("picture element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var pre_elements = document.getElementsByTagName("pre")
  for(var i=0;i<pre_elements.length;i++){
    if(pre_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(pre_elements[i])
      console.log('------------------------------------------')
      console.log("pre element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var progress_elements = document.getElementsByTagName("progress")
  for(var i=0;i<progress_elements.length;i++){
    if(progress_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(progress_elements[i])
      console.log('------------------------------------------')
      console.log("progress element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var q_elements = document.getElementsByTagName("q")
  for(var i=0;i<q_elements.length;i++){
    if(q_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(q_elements[i])
      console.log('------------------------------------------')
      console.log("q element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var rp_elements = document.getElementsByTagName("rp")
  for(var i=0;i<rp_elements.length;i++){
    if(rp_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(rp_elements[i])
      console.log('------------------------------------------')
      console.log("rp element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var rt_elements = document.getElementsByTagName("rt")
  for(var i=0;i<rt_elements.length;i++){
    if(rt_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(rt_elements[i])
      console.log('------------------------------------------')
      console.log("rt element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var ruby_elements = document.getElementsByTagName("ruby")
  for(var i=0;i<ruby_elements.length;i++){
    if(ruby_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(ruby_elements[i])
      console.log('------------------------------------------')
      console.log("ruby element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var s_elements = document.getElementsByTagName("s")
  for(var i=0;i<s_elements.length;i++){
    if(s_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(s_elements[i])
      console.log('------------------------------------------')
      console.log("s element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var samp_elements = document.getElementsByTagName("samp")
  for(var i=0;i<samp_elements.length;i++){
    if(samp_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(samp_elements[i])
      console.log('------------------------------------------')
      console.log("samp element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var section_elements = document.getElementsByTagName("section")
  for(var i=0;i<section_elements.length;i++){
    if(section_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(section_elements[i])
      console.log('------------------------------------------')
      console.log("section element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var select_elements = document.getElementsByTagName("select")
  for(var i=0;i<select_elements.length;i++){
    if(select_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(select_elements[i])
      console.log('------------------------------------------')
      console.log("select element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var small_elements = document.getElementsByTagName("small")
  for(var i=0;i<small_elements.length;i++){
    if(small_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(small_elements[i])
      console.log('------------------------------------------')
      console.log("small element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var source_elements = document.getElementsByTagName("source")
  for(var i=0;i<source_elements.length;i++){
    if(source_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(source_elements[i])
      console.log('------------------------------------------')
      console.log("source element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var span_elements = document.getElementsByTagName("span")
  for(var i=0;i<span_elements.length;i++){
    if(span_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(span_elements[i])
      console.log('------------------------------------------')
      console.log("span element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var strong_elements = document.getElementsByTagName("strong")
  for(var i=0;i<strong_elements.length;i++){
    if(strong_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(strong_elements[i])
      console.log('------------------------------------------')
      console.log("strong element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var sub_elements = document.getElementsByTagName("sub")
  for(var i=0;i<sub_elements.length;i++){
    if(sub_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(sub_elements[i])
      console.log('------------------------------------------')
      console.log("sub element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var summary_elements = document.getElementsByTagName("summary")
  for(var i=0;i<summary_elements.length;i++){
    if(summary_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(summary_elements[i])
      console.log('------------------------------------------')
      console.log("summary element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var sup_elements = document.getElementsByTagName("sup")
  for(var i=0;i<sup_elements.length;i++){
    if(sup_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(sup_elements[i])
      console.log('------------------------------------------')
      console.log("sup element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var svg_elements = document.getElementsByTagName("svg")
  for(var i=0;i<svg_elements.length;i++){
    if(svg_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(svg_elements[i])
      console.log('------------------------------------------')
      console.log("svg element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var table_elements = document.getElementsByTagName("table")
  for(var i=0;i<table_elements.length;i++){
    if(table_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(table_elements[i])
      console.log('------------------------------------------')
      console.log("table element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var tbody_elements = document.getElementsByTagName("tbody")
  for(var i=0;i<tbody_elements.length;i++){
    if(tbody_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(tbody_elements[i])
      console.log('------------------------------------------')
      console.log("tbody element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var td_elements = document.getElementsByTagName("td")
  for(var i=0;i<td_elements.length;i++){
    if(td_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(td_elements[i])
      console.log('------------------------------------------')
      console.log("td element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var template_elements = document.getElementsByTagName("template")
  for(var i=0;i<template_elements.length;i++){
    if(template_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(template_elements[i])
      console.log('------------------------------------------')
      console.log("template element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var textarea_elements = document.getElementsByTagName("textarea")
  for(var i=0;i<textarea_elements.length;i++){
    if(textarea_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(textarea_elements[i])
      console.log('------------------------------------------')
      console.log("textarea element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var tfoot_elements = document.getElementsByTagName("tfoot")
  for(var i=0;i<tfoot_elements.length;i++){
    if(tfoot_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(tfoot_elements[i])
      console.log('------------------------------------------')
      console.log("tfoot element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var th_elements = document.getElementsByTagName("th")
  for(var i=0;i<th_elements.length;i++){
    if(th_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(th_elements[i])
      console.log('------------------------------------------')
      console.log("th element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var thead_elements = document.getElementsByTagName("thead")
  for(var i=0;i<thead_elements.length;i++){
    if(thead_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(thead_elements[i])
      console.log('------------------------------------------')
      console.log("thead element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var time_elements = document.getElementsByTagName("time")
  for(var i=0;i<time_elements.length;i++){
    if(time_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(time_elements[i])
      console.log('------------------------------------------')
      console.log("time element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var title_elements = document.getElementsByTagName("title")
  for(var i=0;i<title_elements.length;i++){
    if(title_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(title_elements[i])
      console.log('------------------------------------------')
      console.log("title element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var tr_elements = document.getElementsByTagName("tr")
  for(var i=0;i<tr_elements.length;i++){
    if(tr_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(tr_elements[i])
      console.log('------------------------------------------')
      console.log("tr element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var track_elements = document.getElementsByTagName("track")
  for(var i=0;i<track_elements.length;i++){
    if(track_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(track_elements[i])
      console.log('------------------------------------------')
      console.log("track element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var u_elements = document.getElementsByTagName("u")
  for(var i=0;i<u_elements.length;i++){
    if(u_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(u_elements[i])
      console.log('------------------------------------------')
      console.log("u element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var ul_elements = document.getElementsByTagName("ul")
  for(var i=0;i<ul_elements.length;i++){
    if(ul_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(ul_elements[i])
      console.log('------------------------------------------')
      console.log("ul element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var var_elements = document.getElementsByTagName("var")
  for(var i=0;i<var_elements.length;i++){
    if(var_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(var_elements[i])
      console.log('------------------------------------------')
      console.log("var element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var video_elements = document.getElementsByTagName("video")
  for(var i=0;i<video_elements.length;i++){
    if(video_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(video_elements[i])
      console.log('------------------------------------------')
      console.log("video element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
  var wbr_elements = document.getElementsByTagName("wbr")
  for(var i=0;i<wbr_elements.length;i++){
    if(wbr_elements[i].draggable == "true"){
      console.log('------------------------------------------')
      console.log('Guideline 2.5.7 Dragging violation')
      console.log("INNERHTML")
      console.log(wbr_elements[i])
      console.log('------------------------------------------')
      console.log("wbr element should have single pointer mode of operation!")
      console.log('------------------------------------------')
    }
  }
  
}

main()