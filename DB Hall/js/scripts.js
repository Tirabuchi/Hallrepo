addEventListener("load", (event) => {});

 let data;

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

    for (let i=0; i<data.listino.length; i++) {
        console.log(data.listino[i]);
        // create category
        let cat = document.createElement("div");
        cat.classList.add("accordion");
        cat.innerText = data.listino[i].category;

        // create accordion panel
        let panel = document.createElement("div");
        panel.classList.add("panel");

        mainList.appendChild(cat);
        cat.after(panel);

        // create elements
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
    // TODO unico FOR x listeners concat(arrays)
    // create methods for closeAll (when close parent accordion, set all children with subPanel class to display: none)

    var acc = document.getElementsByClassName("accordion");
    var subAcc = document.getElementsByClassName("nestedAcc");


    for (let i = 0; i < acc.length; i++) {
       acc[i].addEventListener("click", function() {

    this.classList.toggle("active");

    

    /* Toggle between hiding and showing the active panel */
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



