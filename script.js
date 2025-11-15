  const container=document.querySelector('#container')
    const btn=document.querySelector('#add_btn');
    const data=document.querySelector('#data');
    const required=document.querySelector('#required')

    let num=1;

    // Load tasks from localStorage on page reload
window.addEventListener("load", () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task));
});

    btn.addEventListener("click",()=>{
       const taskText = data.value.trim();

    if (taskText === "") {
        required.classList.remove("hidden");  
        return; 
    }
    else{
          required.classList.add("hidden");
    }
    
    addTask(taskText)
         
// input khali
// Save task to localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.push(taskText);
localStorage.setItem("tasks", JSON.stringify(tasks));

data.value = '';

    })

 function addTask(task){
        const card=document.createElement("div");
         card.className="w-full p-4 bg-white border-l-4 border-yellow-500 rounded-xl shadow-md flex items-center justify-between transition duration-300 ease-in-out hover:shadow-xl hover:border-yellow-600 hover:-translate-y-0.5 gap-2";

         const contain=document.createElement("span");
         contain.classList="text-lg font-medium text-gray-800 break-words flex-1 mr-4 "
         contain.textContent=`${task}`

         const count=document.createElement('h1');
         count.className="text-xl"
         count.textContent=`(${num++})`;
        

         const button=document.createElement("button");
         button.className="flex-shrink-0 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg transition duration-150 ease-in-out  hover:bg-red-600  active:scale-90"
         button.textContent="Delete"

         const input = document.createElement("input");
input.className = "w-6 h-6"; 
input.type = "checkbox";  


card.appendChild(count)
card.appendChild(contain)
card.appendChild(input)
card.appendChild(button)
container.appendChild(card)

input.addEventListener("change", () => {
    // Assuming 'input' is the checkbox element
    if (input.checked) {
        card.classList.add('opacity-60');
    } else {
       
        card.classList.remove('opacity-60');
    }
    remain_task();
});

//  Dalete Card
button.addEventListener("click",()=>{
    card.remove(); 

     // Remove from localStorage also
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
})
}

const completed_task=document.querySelector('.completion_percentage')

function remain_task(){
     
}