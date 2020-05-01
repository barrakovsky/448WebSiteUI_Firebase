var db = firebase.firestore();

var list_div = document.querySelector("#list_div");

var make_set = new Set();
var type_set = new Set();
var color_set = new Set();
var year_set = new Set();


var make_list = document.querySelector("#make_list");
var type_list = document.querySelector("#type_list");
var color_list = document.querySelector("#color_list");
var year_list = document.querySelector("#year_list");



 db.collection("Cars").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
        
        console.log("inside the set query"); 
            
        if(!make_set.has(doc.data().make)){
            make_set.add(doc.data().make);
            console.log("inside the set make query if"); 
            make_list.innerHTML += "<div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input makeSearch' id=" + doc.data().make + " onclick='myFunction()' value='"+doc.data().make +"'><label class='custom-control-label' for=" +doc.data().make+ ">" + doc.data().make+"</label></div>";
           }
            
        if(!type_set.has(doc.data().type)){
            type_set.add(doc.data().type);
            console.log("inside the set type query if"); 
            type_list.innerHTML += "<div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input typeSearch' id=" + doc.data().type + " onclick='myFunction()'  value='"+ doc.data().type+"'><label class='custom-control-label' for=" +doc.data().type+ ">" + doc.data().type+"</label></div>";
           }
            
           
        if(!color_set.has(doc.data().exteriorColor)){
            color_set.add(doc.data().exteriorColor);
            console.log("inside the set type query if"); 
            color_list.innerHTML += "<div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input colorSearch' id=" + doc.data().exteriorColor + "  onclick='myFunction()' value='"+doc.data().exteriorColor+"'><label class='custom-control-label' for=" +doc.data().exteriorColor+ ">" + doc.data().exteriorColor+"</label></div>";
           }
            
        if(!year_set.has(doc.data().year)){
            year_set.add(doc.data().year);
            console.log("inside the set type query if"); 
            year_list.innerHTML += "<div class='custom-control custom-checkbox'><input type='checkbox' class='custom-control-input yearSearch' id=" + doc.data().year + " onclick='myFunction()'  value='"+doc.data().year+"'><label class='custom-control-label' for=" +doc.data().year+ ">" + doc.data().year+"</label></div>";
           }
            
        
            
        
    });
});



//query the full collection of Cars and set the elements in the DOM
db.collection("Cars").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        
    console.log("inside the cars query"); 
      list_div.innerHTML += "<div class='card m-4 mx-auto' style='width: 18rem;'><div class='card-body><p class='card-text'>" + doc.data().make + "</p><p>" +  doc.data().type + "</p><p>" + doc.data().model +"</p><p>" + doc.data().year +"</p><p>" +doc.data().price +"</p><p>"+ doc.data().exteriorColor +"</p></div></div>";
  
    });
});


function writeToFirestore(data) {
  var collection = firebase.firestore().collection('Cars');
  return collection.add(data);
};

function myFunction(){
   
    console.log("inside myFunction");
    var makeSearch = document.getElementsByClassName("makeSearch"); //gets all the values of the make checkboxes
    
    var makeArray = new Array();
    for(i=0; i < makeSearch.length; i++){
        if(makeSearch[i].checked == true){
            console.log(makeSearch[i].value);
            makeArray[makeArray.length] = makeSearch[i].value; //add each value that is checked to the future query array
        }
    }
    
    console.log(makeArray);
    
    var typeSearch = document.getElementsByClassName("typeSearch"); //gets all the values of the type checkboxes
    
    let typeArray = new Array(); //type query array
    for(i=0; i < typeSearch.length; i++){
        if(typeSearch[i].checked == true){
            console.log(typeSearch[i].value);
            typeArray[typeArray.length] = typeSearch[i].value; //add each value that is checked to the future query array
        }
    }
    
    console.log(typeArray);
    
    var yearSearch = document.getElementsByClassName("yearSearch"); //gets all the values of the type checkboxes
    
    var yearArray = new Array(); //year query array
    for(i=0; i < yearSearch.length; i++){
        if(yearSearch[i].checked == true){
            console.log(yearSearch[i].value);
            yearArray[yearArray.length] = yearSearch[i].value; //add each value that is checked to the future query array
        }
    }
    
    console.log(yearArray);
    
    var colorSearch = document.getElementsByClassName("colorSearch"); //gets all the values of the type checkboxes
    
    var colorArray = new Array(0); //year query array
    for(i=0; i < colorSearch.length; i++){
        if(colorSearch[i].checked == true){
            console.log(colorSearch[i].value);
            colorArray[colorArray.length] = colorSearch[i].value; //add each value that is checked to the future query array
        }
    }
    
    console.log(colorArray);
    
    var queryAllArray = new Set();
    

    if(makeArray.length == 0 && typeArray.length == 0 && colorArray.length == 0 && yearArray.length ==0){
        
        db.collection("Cars").onSnapshot((querySnapshot) => {
            list_div.innerHTML = ""; 
            querySnapshot.forEach((doc) => {                
                console.log("inside the cars query"); 
                  list_div.innerHTML += "<div class='card m-4 mx-auto' style='width: 18rem;'><div class='card-body><p class='card-text'>" + doc.data().make + "</p><p>" +  doc.data().type + "</p><p>" + doc.data().model +"</p><p>" + doc.data().year +"</p><p>" +doc.data().price +"</p><p>"+ doc.data().exteriorColor +"</p></div></div>";

                });
            });
        
    }else{
        list_div.innerHTML = "";
        
        
        if(makeArray.length != 0){//make array is not empty
             db.collection("Cars").where("make", "in", makeArray).onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    
                    var did = doc.id;
                    console.log(doc.id);
                    if(!queryAllArray.has(doc.id)){
                        queryAllArray.add(doc.id);
                        console.log(queryAllArray);
                        
                        list_div.innerHTML += "<div class='card m-4 mx-auto' style='width: 18rem;'><div class='card-body><p class='card-text'>" + doc.data().make + "</p><p>" +  doc.data().type + "</p><p>" + doc.data().model +"</p><p>" + doc.data().year +"</p><p>" +doc.data().price +"</p><p>"+ doc.data().exteriorColor +"</p></div></div>";
                    }
                   
                });
            });
        }
        
        console.log(queryAllArray);
        
        if(typeArray.length != 0){//make array is not empty
             db.collection("Cars").where("type", "in", typeArray).onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    
                   if(!queryAllArray.has(doc.id)){
                       queryAllArray.add(doc.id);
                       console.log(queryAllArray);
                       
                       list_div.innerHTML += "<div class='card m-4 mx-auto' style='width: 18rem;'><div class='card-body><p class='card-text'>" + doc.data().make + "</p><p>" +  doc.data().type + "</p><p>" + doc.data().model +"</p><p>" + doc.data().year +"</p><p>" +doc.data().price +"</p><p>"+ doc.data().exteriorColor +"</p></div></div>";
                    }
                   
                });
            });
        }
        
        console.log(queryAllArray);
        
        
        if(yearArray.length != 0){//make array is not empty
             db.collection("Cars").where("year", "in", yearArray).onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    
                    if(!queryAllArray.has(doc.id)){
                        queryAllArray.add(doc.id);
                        console.log(queryAllArray);
                        
                        list_div.innerHTML += "<div class='card m-4 mx-auto' style='width: 18rem;'><div class='card-body><p class='card-text'>" + doc.data().make + "</p><p>" +  doc.data().type + "</p><p>" + doc.data().model +"</p><p>" + doc.data().year +"</p><p>" +doc.data().price +"</p><p>"+ doc.data().exteriorColor +"</p></div></div>";
                    }
                   
                    
                });
            });
        }
        
        console.log(queryAllArray);
        
       
        
        if(colorArray.length != 0){//make array is not empty
             db.collection("Cars").where("exteriorColor", "in", colorArray).onSnapshot(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    
                   if(!queryAllArray.has(doc.id)){
                       
                       queryAllArray.add(doc.id);
                       console.log(queryAllArray);
                       
                       list_div.innerHTML += "<div class='card m-4 mx-auto' style='width: 18rem;'><div class='card-body><p class='card-text'>" + doc.data().make + "</p><p>" +  doc.data().type + "</p><p>" + doc.data().model +"</p><p>" + doc.data().year +"</p><p>" +doc.data().price +"</p><p>"+ doc.data().exteriorColor +"</p></div></div>";
                    }
                   
                    
                });
            });
        }
        
        
        
    
    }
    
    
    
    
    
    makeArray.length = 0;
    typeArray.length = 0;
    yearArray.length = 0;
    colorArray.length = 0;
    queryAllArray.length = 0;
    
    

}

