// const { readyException } = require("jquery");

setTimeout(() => {
    var dragging = localStorage.getItem("draggable");
    console.log(dragging);
// var focusappmin = localStorage.getItem("")
// var fixedRef = localStorage.getItem("fixedref");
// console.log(fixedRef);

// console.log("The dragging in index.js");
// var dragging = {"name": 'soham', "age":20}
// // console.log(dragging);

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
    }
};

try{
    xhttp.open("POST", "https://localhost:5000/push_data", true);
    xhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded")
    xhttp.send('data='+dragging);

}catch(error){
    console.log(error);
}


    
}, 5000);

