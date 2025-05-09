// variables
const displayGrid = document.getElementById("displayGrid");
const displayText = document.getElementById("displayText");
const displaySection = document.getElementById("displaySection");
const modal = document.getElementById('modal');
const randomFactText = document.getElementById("randomFact")
// on page load


fetchAllGroups()

modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal()
      }
    });

function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function fetchRandomFact() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    fetch("https://dogapi.dog/api/v2/facts")
    .then((Res)=>Res.json())
    .then((data)=> {
        console.log(data)
        randomFactText.innerHTML = 
        `
       ${data.data[0].attributes.body}
       
        `
    })
    .catch((error)=> {
        randomFactText.innerHTML = 
        `
        <h1 class="text-red-800">Error Fetching ${error}</h1>
        `
    })
    
   
    
    

}

function fetchAllGroups() {

    fetch("https://dogapi.dog/api/v2/groups")
    .then((response)=>response.json())
    .then((data)=>
        displayGroups(data.data)
    )
    .catch((error)=> {
        displayError(error)
    })

}


function displayGroups(data) {
    displayGrid.innerHTML = ""
    // relative flex p-8 bg-white rounded-xl h-[200px] cursor-pointer
    data.map((group) => {
        displayGrid.innerHTML += 
        `   
            
            <button  class="relative flex p-8 bg-white rounded-xl h-[200px] cursor-pointer"
                onclick='fetchGroup(${JSON.stringify(group.relationships.breeds.data)},"${group.attributes.name}")'>
                        <h1 class="text-blue-800 text-xl font-bold ">${group.attributes.name}</h1>
                        <img src="assets/dog_gray_watermark.png" alt="dog watermark" 
                            class="absolute bottom-0 right-0">
            </button>
            
        `
        
    })
}

function showDetails(dog) {
    
    displaySection.innerHTML = 
    `
    <div class="flex flex-col bg-white rounded-lg shadow-md">
                
                    <div class="bg-blue-600 p-5 rounded-t-lg text-white text-2xl font-bold">
                        <h1>${dog.name}</h1>
                    </div>
                    <div class="bg-white rounded-b-lg p-5">
                        <span>${dog.description}</span>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-4 p-5 gap-4">
                        <div class="bg-blue-600/10 rounded-lg p-4 flex flex-col gap-3 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(37,99,235,0.15)]">
                            <h1 class="text-blue-600 font-semibold uppercase">Life Expectancy</h1>
                            <span class="font-semibold">max. ${dog.life.max} years / min. ${dog.life.min} years</span>
                        </div>

                        <div class="bg-blue-600/10 rounded-lg p-4 flex flex-col gap-3 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(37,99,235,0.15)]">
                            <h1 class="text-blue-600 font-semibold uppercase">Male weight</h1>
                            <span class="font-semibold">max. ${dog.male_weight.max} / min. ${dog.male_weight.min}</span>
                        </div>

                        <div class="bg-blue-600/10 rounded-lg p-4 flex flex-col gap-3 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(37,99,235,0.15)]">
                            <h1 class="text-blue-600 font-semibold uppercase">Hypoallergenic</h1>
                            <span class="font-semibold">${dog.hypoallergenic ? "yes" : "no"}</span>
                        </div>

                        <div class="bg-blue-600/10 rounded-lg p-4 flex flex-col gap-3 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(37,99,235,0.15)]">
                            <h1 class="text-blue-600 font-semibold uppercase">Female weight</h1>
                            <span class="font-semibold">max. ${dog.female_weight.max} / min. ${dog.female_weight.min} </span>
                        </div>
                        
                    </div>
               
                

     </div>
  
    `
}

function displayDogs(data) {
        
        displayGrid.innerHTML += 
        `
            <button class="relative flex p-8 bg-white  rounded-xl h-[200px] cursor-pointer" 
                onclick='showDetails(${JSON.stringify(data)})'>
                        <h1 class="text-blue-800 text-xl font-bold ">${data.name}</h1>
                        <img src="assets/dog_gray_watermark.png" alt="dog watermark" 
                            class="absolute bottom-0 right-0">
            </button>
            
        `
        
   
}

function fetchGroup(data,group_name) {
    displayGrid.innerHTML = ""
    displayText.innerHTML = `
    <h1 class="text-blue-600 text-2xl font-bold" id="displayText">
    Selected group <span class="text-black">${group_name} </span>: </h1>`
    
 data.map((breed)=> {
    fetch(`https://dogapi.dog/api/v2/breeds/${breed.id}`)
    .then((response)=> response.json())
    .then((data)=> {
        displayDogs(data.data.attributes)
    })
    .catch((error)=> {
        displayError(error)
    })
 })
}

function displayError(error) {
    displaySection.innerHTML = `
    <span class='text-red-800'>Error Fetching the data! Try Again!</span>
    ${error}
    `
}

