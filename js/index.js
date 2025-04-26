const loader = document.getElementById("loader")
const animalContainer = document.getElementById("animals");
const categoryContainer = document.getElementById("categories");
const modalContainer = document.getElementById("modal-container");
const adoptPetsContainer = document.getElementById("adopt-container")
const likeAnimals = document.getElementById("like-animal")

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
}

const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
}

const removeClass = () => {
    const buttons = document.getElementsByClassName("category-bttn")
    for(let btn of buttons){
        btn.classList.remove("active");
    }
};

const loadCategoriesPets = (category) => {

    animalContainer.innerHTML = "";
    loader.innerHTML = `
    <span class="loading loading-bars loading-md"></span
    ` 
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
        removeClass();
        const activeButton = document.getElementById(`btn-${category}`);
        activeButton.classList.add("active")
        setTimeout (function () {
            loader.innerHTML = ""
            displayPets(data.data);
        }, 2000);
    })
}

const sortPrice = () => {
    animalContainer.innerHTML = "";
    loader.innerHTML = `
    <span class="loading loading-bars loading-md"></span
    ` 
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
        setTimeout (function () {
            loader.innerHTML = "";
          (data.pets).sort((a, b) => b.price - a.price);
          displayPets(data.pets);
        }, 2000);
    })
} 

const loadDetails = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.petData))
}

const likePets = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayLikePets(data.petData))
}

const adoptPets = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayAdoptPets(data.petData))
}

const displayAdoptPets = (adoptPet) => {
    let countTime = document.getElementById("count")
      let countdown = 3;
        const countdownInterval = setInterval(() => {
            countTime.innerText = countdown
            if (countdown > 0) {    
               countdown--;
            } 
            else {
                clearInterval(countdownInterval);
                countdown = 3
                countTime.innerText = countdown
                document.getElementById("timer-colse").click()
            }
        }, 1000);
    adoptCustom.showModal();
}

const displayLikePets = (likeAnimal) => {
    likeAnimals.innerHTML += `
    <div> 
        <img src=${likeAnimal.image} alt=""> 
    </div>
    `
} 

const displayDetails = (animal) => {

    modalContainer.innerHTML = `
                <dialog id="customModal" class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                      <div>
                          <img class="h-[200px] w-full object-cover" src= ${animal.image} />
                      </div>
                      <div class="card">
           <div>
           <h3 class="text-xl font-bold">${animal.pet_name}</h3>  
           <div class="flex gap-5">
              <div class="flex gap-1 items-center">
               <i class="fa-brands fa-bandcamp"></i>
               ${
                animal.breed? `<P class="text-xs text-para">Breed : ${animal.breed}</p>` : `<P class="text-xs text-para">Breed : Not Available</p>`
               }
              </div>
              <div class="flex gap-1 items-center">
               <i class="fa-regular fa-calendar"></i>
               ${
                animal.date_of_birth? `<P class="text-xs text-para">Birth : ${animal.date_of_birth}</p>` : `<P class="text-xs text-para">Birth : Not Available</p>`
               }  
              </div>
           </div>
           </div>
           <div class="flex gap-5">
                <div class="flex gap-1 items-center">
                <i class="fa-solid fa-mercury"></i>
                ${
                animal.gender? `<P class="text-xs text-para">Gender : ${animal.gender}</p>` : `<P class="text-xs text-para">Gender : Not Available</p>`
               }
               </div>
               <div class="flex gap-1 items-center">
               <i class="fa-solid fa-dollar-sign"></i>
               ${
                animal.price? `<P class="text-xs text-para">Price : ${animal.price}$</p>` : `<P class="text-xs text-para">Price : Not Available</p>`
               }
               </div>
           </div>
           <div class="flex gap-1 items-center">
               <i class="fa-solid fa-mercury"></i>
               ${
                animal.vaccinated_status? `<P class="text-xs text-para">Vaccinated status : ${animal.vaccinated_status}</p>` : "Vaccinated status : Not Available"
               }
           </div>
           <div class="mt-2">
               <h3 class="font-bold">Details Information</h3>
               ${
                animal.
                pet_details? `<P class="text-xs text-para"> ${animal.pet_details}</p>` : "Not Available"
               }
           </div>
                      <div class="modal-action">
                        <form method="dialog">
                           <div class="flex justify-center text-center">
                                <button class="btn text-center w-full">Cancel</button>
                          </div>
                        </form>
                      </div>
                    </div>
                </dialog>
    `

    customModal.showModal();
}

const displayCategories = (categories) => {

    categories.forEach((item) => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
        <button id="btn-${item.category}" onclick = "loadCategoriesPets('${item.category}')" class="btn border-2 items-center category-bttn">
            <div class="flex gap-2 items-center px-5">
                <div>
                    <img class="h-8 w-8 items-center object-cover" src="${item.category_icon}" alt="">
                </div> 
                <div>
                    <span class="font-extrabold">${item.category}</span>
                </div>
            </div>
        </button>
        `
        categoryContainer.append(buttonContainer);
    });   
}

const displayPets = (animals) => {
    animalContainer.innerHTML = "";
    if(animals.length == 0){
        animalContainer.classList.remove("grid");
        animalContainer.innerHTML = `
        <div class="min-h-screen flex flex-col gap-5 justify-center items-center">
          <div>
             <img src="images/error.webp" alt="">
          </div>
          <h3 class="text-xl font-bold">No Information Available</h3>
          <p class="mx-auto w-10/12">Currently, no birds are available. Please check back later for updates on available birds or explore other categories.</p>
        </div>
        `;
        return;
    }
    else{
        animalContainer.classList.add("grid");
    }

    animals.forEach( (animal) => {
        const card = document.createElement("div");
        card.classList = "card p-3 border-2"
        card.innerHTML = `
        <figure class="h-[200px]">
        <img class="h-full w-full object-cover" src= ${animal.image} />
        </figure>
        <div class="card">
           <div>
           <h3 class="text-xl font-bold">${animal.pet_name}</h3>  
           </div>
           <div class="flex gap-1 items-center">
               <i class="fa-brands fa-bandcamp"></i>
               ${
                animal.breed? `<P class="text-para">Breed : ${animal.breed}</p>` : "Breed : Not Available"
               }
           </div>
           <div class="flex gap-1 items-center">
               <i class="fa-regular fa-calendar"></i>
               ${
                animal.date_of_birth? `<P class="text-para">Birth : ${animal.date_of_birth}</p>` : "Birth : Not Available"
               }
               
           </div>
           <div class="flex gap-1 items-center">
               <i class="fa-solid fa-mercury"></i>
               ${
                animal.gender? `<P class="text-para">Gender : ${animal.gender}</p>` : "Gender : Not Available"
               }
           </div>
           <div class="flex gap-1 items-center">
               <i class="fa-solid fa-dollar-sign"></i>
               ${
                animal.price? `<P class="text-para">Price : ${animal.price}$</p>` : "Price : Not Available"
               }
           </div>
           <div class="mt-5 space-y-1 md:flex gap-2 md:justify-between">
               <div>
                   <button onclick = "likePets('${animal.petId}')" class="btn border-2 border-gray-400"><i class="fa-regular fa-thumbs-up"></i></button>             
               </div> 
               <div>
                   <button onclick = "adoptPets('${animal.petId}')" class="btn text-bttn border-2 border-gray-400">Adopt</button>               
               </div>
               <div> 
                   <button onclick = "loadDetails('${animal.petId}')" class="btn text-bttn border-2 border-gray-400">Details</button>              
               </div>             
           </div>
        </div>
    `
    animalContainer.append(card);
    });
}

loadCategories();
loadPets();