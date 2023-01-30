addEventListener("load", (event) => {});

const input = document.getElementById("searchInput");
input.addEventListener('change', inputChanged);

 let data;
 let filteredData;

onload=(event)=>{
    
    fetch('./db/database.json')
    .then((response) => response.json())
    .then((json) => {
        data=json;
        console.log(json);
        dbLoaded()}
    );
}

function dbLoaded() {
   // let mainList = document.getElementById("myList");
    console.log(data.listino);




    let mainList = document.getElementById("listContainer");

    // create main parent list
    // TODO check filtering trigger

    // filtering, 

    for (let i=0; i<data.listino.length; i++) {

        // create category
        let cat = document.createElement("div");
        cat.classList.add("accordion");
        cat.innerText = data.listino[i].category;

        // create accordion panel
        let panel = document.createElement("div");
        panel.classList.add("panel");

        mainList.appendChild(cat);
        cat.after(panel);

        // create elements inside panel
        for (let z=0; z<data.listino[i].elements.length; z++) {
            let el = document.createElement("div");
            el.classList.add("accEl");
            el.innerText = data.listino[i].elements[z].name;
            panel.appendChild(el);

            // nested accordion case
                // check ingredients variants
            
            let ingredientFound = 0; // todo returns 1 at first ingredient found, so no scelta tonic and shit

            for (let k=0; k<data.listino[i].elements[z].ingredients.length; k++) {

                for (let w=0; w<data.inventario.length; w++) {

                    // if found variants

                    if (data.listino[i].elements[z].ingredients[k] == data.inventario[w].type) {
                        ingredientFound = 1;
                        console.log(data.listino[i].elements[z].ingredients[k]);
                        el.classList.add("nestedAcc");

                        let subPanel = document.createElement("div");
                            subPanel.classList.add("subPanel");
                            el.after(subPanel);
                        
                        for (let u=0; u<data.inventario[w].brands.length; u++) {

                            
                            let subEl = document.createElement("div");
                            subEl.classList.add("accEl");
                            subEl.innerText = data.inventario[w].brands[u].name;
                            subPanel.appendChild(subEl);
                
                        }
                    }

                }

                
            }
            
           // if (data.listino[i].elements[z].)

        }
        




        
        // add filtering
    }











    

    // accordion listeners
    // TODO unico FOR x listeners concat(arrays) nel caso active and active2 are same modifying class
    // create methods for closeAll (when close parent accordion, set all children with subPanel class to display: none)
    // close all subPanels when parent is clicked? MUST MANAGE ELEMENT position on page

    var acc = document.getElementsByClassName("accordion");
    var subAcc = document.getElementsByClassName("nestedAcc");


    for (let i = 0; i < acc.length; i++) {
       acc[i].addEventListener("click", function() {

    this.classList.toggle("active");

    

    /* Toggle between hiding and showing the active mainPanel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }

  });
}

for (let i = 0; i < subAcc.length; i++) {
    subAcc[i].addEventListener("click", function() {

 this.classList.toggle("active2");

 

 /* Toggle between hiding and showing the active2 panel */
 var subPanel = this.nextElementSibling;
 if (subPanel.style.display === "block") {
   subPanel.style.display = "none";
 } else {
   subPanel.style.display = "block";
 }
});
}
   


}

function inputChanged(e) {

  
  console.log(e.target.value);

  let testString = "gi";
  let inputString = e.target.value;

  // filter listino
  // todo chiama filtering only if value.length > 2
  filteredListino = filterListino(inputString.toLowerCase());

  // filter inventario
 // filteredInventario = filterListino(testString)


}

function filterListino(str) {
 
  let filteredList;
  let nameFound = 0;

  for (let i=0; i<data.listino.length; i++) {
    for (let z=0; z<data.listino[i].elements.length; z++) {


      // filter by name or ingredients (checking ingredients is not empty)
      if (data.listino[i].elements[z].ingredients.length > 0) {

        for (let w=0; w<data.listino[i].elements[z].ingredients.length; w++) {
    
            if (data.listino[i].elements[z].name.includes(str) || data.listino[i].elements[z].ingredients[w].includes(str)) {
               console.log(data.listino[i].elements[z]);
              /* let obj = { listino: []}
               filteredList.push() */
               // create emptyobj ONCE (function CREATECATEGORY in filteredData, resetting it in onChanges) and push this item in the right place
              
               break;
            }
          }
      } else {
        if (data.listino[i].elements[z].name.includes(str)) {

          console.log(data.listino[i].elements[z]);
               
               break;
        }
      }
     
    }

  }
}

// todo load list by requestanimationframe (and load one by one)
// todo recreate sameStructure (showing categories open accordion) or just results with category ref



