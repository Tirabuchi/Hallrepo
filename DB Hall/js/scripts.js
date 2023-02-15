//TODO: check scroll distances cuz them doest seem right
// add maxheight a contenitore accordion max in modo che non si sposti se chiudi un accordion alla fine
// scrollable stays on top

// if has class active and its boundingrect ha pixel esterni (its part in page is less than his height), set its pos to fixed, add top margin (its height) to firstChild
// add scroll listeners when adding active class and remove same way

// todo aggiorna db e pensabbene come mettere pricing con tutti gli esempi (drinks, shot, tequilaPompelmo, drinkdellestate, birre)


addEventListener("load", (event) => {});

const input = document.getElementById("searchInput");
input.addEventListener('change', inputChanged);

 let baseData = [];
 let filteredData = [];

 let isSearch = false;

onload=(event)=>{
    
    fetch('./db/database.json')
    .then((response) => response.json())
    .then((json) => {
        baseData=json;
        console.log(json);
        dbLoaded(json);
        loadObservers();
      }
    );
}


//TODO if not 1st loading, set first accordion to open
function dbLoaded(data) {
   // let mainList = document.getElementById("myList");
    console.log(data.listino);
     // reset list first
    resetList();

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
                // check ingredients variants, initiate subPanel here
            
            let ingredientsFound = false; // todo al momento se trova piu' ingredienti secondari compatibili crea due subPanel, sposta creaz subpanel sopra
            let subPanel = document.createElement("div");
                            subPanel.classList.add("subPanel");

            for (let k=0; k<data.listino[i].elements[z].ingredients.length; k++) {

                for (let w=0; w<data.inventario.length; w++) {

                    // if found variants

                    if (data.listino[i].elements[z].ingredients[k] == data.inventario[w].type) {
                        ingredientFound = 1;
                        console.log(data.listino[i].elements[z].ingredients[k]);
                        el.classList.add("nestedAcc");

                        // if first ingredients package create panel, eitherwise add to it
                        // todo with a counter of foundIngredientsPackage I can add multiple visualization classes from here

                            if (ingredientsFound==false) {
                              el.after(subPanel);
                            }

                            ingredientsFound = true;
                            
                        
                        for (let u=0; u<data.inventario[w].brands.length; u++) {

                            
                            let subEl = document.createElement("div");
                            subEl.classList.add("accEl");
                            subEl.classList.add("accSubEl");
                            subEl.innerText = data.inventario[w].brands[u].name;
                            subPanel.appendChild(subEl);
                
                        }
                    }

                }

                
            }
            
           // if (data.listino[i].elements[z].)

        }
        
    }

  addAccListeners();
   
}

function inputChanged(e) {

  
  console.log("inputChanged fired: " + e.target.value);

  let testString = "gi";
  let inputString = e.target.value;

  // filter listino
  if (inputString=="") {
    dbLoaded(baseData);
  } else {
  // todo chiama filtering only if value.length > 2
  filteredListino = filterListino(inputString.toLowerCase(), baseData);
  }
  
  

  // filter inventario
 // filteredInventario = filterListino(testString)


}

// todo how se uno cerca la bottiglia/inventario? es. Jack. Pensaci dopo imho

function filterListino(str, data) {
 
  filteredData = [];
  let nameFound = 0;

  for (let i=0; i<data.listino.length; i++) {
    for (let z=0; z<data.listino[i].elements.length; z++) {


      // filter by name or ingredients (checking ingredients is not empty)
      if (data.listino[i].elements[z].ingredients.length > 0) {

        for (let w=0; w<data.listino[i].elements[z].ingredients.length; w++) {
    
            if (data.listino[i].elements[z].name.includes(str) || data.listino[i].elements[z].ingredients[w].includes(str)) {
               console.log(data.listino[i].elements[z]);
            //   console.log(filteredData);
            
               // creation conditions (check if parent exists, eitherwise create)
               if (filteredData.length == 0) {

                // if first cat
                let obj = 
                {
                  "category": data.listino[i].category,
                  "elements": [  
                    {
                 "name": data.listino[i].elements[z].name,
                 "ingredients": data.listino[i].elements[z].ingredients,
                 "details": data.listino[i].elements[z].details,
                 "icon": data.listino[i].elements[z].icon,
                 "isRestricted": data.listino[i].elements[z].isRestricted
                  }          ] 
                }
                console.log(obj);

                filteredData.push(obj);
           //     console.log(filteredData);
               } else {
              // if cat is found push item
                for (let h=0; h<=filteredData.length-1; h++) {

                  if (filteredData[h].category == data.listino[i].category) {
  
                    let obj = {
                      "name": data.listino[i].elements[z].name,
                      "ingredients": data.listino[i].elements[z].ingredients,
                      "details": data.listino[i].elements[z].details,
                      "icon": data.listino[i].elements[z].icon,
                      "isRestricted": data.listino[i].elements[z].isRestricted
                     }
     
                     filteredData[h].elements.push(obj);
                   //  console.log(filteredData);
  
                 } else if (h==filteredData.length-1) {
                // if last iteration and cat hasnt been found
                let obj = 
                {
                  "category": data.listino[i].category,
                  "elements": [  
                    {
                 "name": data.listino[i].elements[z].name,
                 "ingredients": data.listino[i].elements[z].ingredients,
                 "details": data.listino[i].elements[z].details,
                 "icon": data.listino[i].elements[z].icon,
                 "isRestricted": data.listino[i].elements[z].isRestricted
                  }          ] 
                }

                filteredData.push(obj);
             //   console.log(filteredData);
  
                 }
  
                 }

               }
              
               break;
            }
          }
      } else {
        if (data.listino[i].elements[z].name.includes(str)) {

          // same as over
     // creation conditions (check if parent exists, eitherwise create)
     if (filteredData.length == 0) {

      // if first cat
      let obj = 
      {
        "category": data.listino[i].category,
        "elements": [  
          {
       "name": data.listino[i].elements[z].name,
       "ingredients": data.listino[i].elements[z].ingredients,
       "details": data.listino[i].elements[z].details,
       "icon": data.listino[i].elements[z].icon,
       "isRestricted": data.listino[i].elements[z].isRestricted
        }          ] 
      }
      console.log(obj);

      filteredData.push(obj);
   //   console.log(filteredData);
     } else {
    // if cat is found push item
      for (let h=0; h<=filteredData.length-1; h++) {

        if (filteredData[h].category == data.listino[i].category) {

          let obj = {
            "name": data.listino[i].elements[z].name,
            "ingredients": data.listino[i].elements[z].ingredients,
            "details": data.listino[i].elements[z].details,
            "icon": data.listino[i].elements[z].icon,
            "isRestricted": data.listino[i].elements[z].isRestricted
           }

           filteredData[h].elements.push(obj);
           console.log(filteredData);

       } else if (h==filteredData.length-1) {
      // if last iteration and cat hasnt been found
      let obj = 
      {
        "category": data.listino[i].category,
        "elements": [  
          {
       "name": data.listino[i].elements[z].name,
       "ingredients": data.listino[i].elements[z].ingredients,
       "details": data.listino[i].elements[z].details,
       "icon": data.listino[i].elements[z].icon,
       "isRestricted": data.listino[i].elements[z].isRestricted
        }          ] 
      }

      filteredData.push(obj);
    //  console.log(filteredData);

       }

       }

     }
               
               break;
        }
      }
     
    }

  }

  
// obj listino QoL (mine) fix
filteredData = { "listino": filteredData, "inventario": data.inventario };

console.log(filteredData);
  dbLoaded(filteredData);
}

// todo load list by requestanimationframe (and load one by one)
// todo recreate sameStructure (showing categories open accordion) or just results with category ref

function resetList() {

  let mainList = document.getElementById("listContainer");

  var child = mainList.lastElementChild; 
        while (child) {
            mainList.removeChild(child);
            child = mainList.lastElementChild;
        }

}

function addAccListeners() {

      // accordion listeners
    // TODO unico FOR x listeners concat(arrays) nel caso active and active2 are same modifying class
    // create methods for closeAll (when close parent accordion, set all children with subPanel class to display: none)
    // close all subPanels when parent is clicked? MUST MANAGE ELEMENT position on page
    // scrolling evs

    var acc = document.getElementsByClassName("accordion");
    var subAcc = document.getElementsByClassName("nestedAcc");


    for (let i = 0; i < acc.length; i++) {
       acc[i].addEventListener("click", function() {

    this.classList.toggle("active");

    

    /* Toggle between hiding and showing the active mainPanel */
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      // calc actual maxHeight of panel
     // let parent = this.parentElement;
    //  parent.style.maxHeight = parseInt(parent.style.maxHeight) + panel.scrollHeight + "px";
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

    // accordion header position observer
    let observerAcc = new IntersectionObserver(entries => {

    /*  let obsOptions = {
        root: null,
        threshold: [0,1]
      } */
      if (entries[0].boundingClientRect.y <= 0)
      {
         // fix header position and add margin to compensate its space
         entries[0].target.classList.add('fixedAcc');
         panel.style.marginTop = entries[0].boundingClientRect.height + "px";
    
    } 
    }
    //, obsOptions
    );
    let panelObsOptions = {
      root: null,
      threshold: [0,0.1,0.2,0.8,0.9,1]
    }
    let observerPanel = new IntersectionObserver(entries => {
      console.log('panel details:');
      console.log(entries[0].target);
      console.log(entries[0]);

      // if panel has space from top
      if (entries[0].boundingClientRect.y > 0) {
        
        entries[0].target.previousSibling.classList.remove('fixedAcc');
        panel.style.marginTop = 0;

        // or if scrolled completely, close it
      }  else if (entries[0].boundingClientRect.bottom < entries[0].target.previousSibling.getBoundingClientRect().height) {


        // chiudi tutto duro maronn bruteforce
        // todo check animazioni
       entries[0].target.previousSibling.classList.remove('fixedAcc');
       entries[0].target.previousSibling.classList.remove('active');
       panel.style.marginTop = 0;
       observerAcc.unobserve(entries[0].target.previousSibling);
       observerPanel.unobserve(panel);
       panel.style.maxHeight = null;

      } 

    }, panelObsOptions)

    // if panel was active, close all active subpanels
    if (!this.classList.contains('active')) {

      // close scroll listeners
       this.classList.remove('fixedAcc');
       panel.style.marginTop = 0;
       observerAcc.unobserve(this);
       observerPanel.unobserve(panel);
       // actually closing panels
      for (const child of panel.children) {
        if (child.classList.contains('active2')) {
          child.classList.remove('active2');
          var subPanelToClose = child.nextElementSibling;
          subPanelToClose.style.maxHeight = null;
        }      }    
    } else {
      // todo eitherwise manage scrolling top shit
      observerAcc.observe(this);
      observerPanel.observe(panel);
    }

  });
}

for (let i = 0; i < subAcc.length; i++) {
    subAcc[i].addEventListener("click", function() {

 this.classList.toggle("active2");

 

 /* Toggle between hiding and showing the active2 panel */
 var subPanel = this.nextElementSibling;
 if (subPanel.style.maxHeight) {
   subPanel.style.maxHeight = null;
 } else {
  // calc actual maxHeight of panel
   var parent = subPanel.parentElement;
   parent.style.maxHeight = parseInt(parent.style.maxHeight) + subPanel.scrollHeight + "px";
   subPanel.style.maxHeight = subPanel.scrollHeight + "px";
 }
});
}

}

function loadObservers() {

 

}


