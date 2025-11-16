 const container = document.querySelector('#container');
    const btn = document.querySelector('#add_btn');
    const data = document.querySelector('#data');
    const required = document.querySelector('#required');
    const completed_task = document.querySelector('#completion_percentage');

    let num = 1;

  
    window.addEventListener("load", () => {
      
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(taskObj => addTask(taskObj)); 
        remain_task(); 
    });

    // --- Add Task Button Listener ---
btn.addEventListener("click", () => {
        const taskText = data.value.trim();

        if (taskText === "") {
            required.classList.remove("hidden");
            return;
        } else {
            required.classList.add("hidden");
        }

       
        const newTaskObj = {
            text: taskText,
            completed: false
        };
        
    
        addTask(newTaskObj);
        
      
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(newTaskObj); 
        localStorage.setItem("tasks", JSON.stringify(tasks));

        data.value = '';
        
      
        remain_task();
    });

    // --- Function to Create and Append Task Card (अब taskObj स्वीकार करता है) ---
    function addTask(taskObj) {
        const card = document.createElement("div");
        card.className = "w-full p-4 bg-white border-l-4 border-yellow-500 rounded-xl shadow-md flex items-center justify-between transition duration-300 ease-in-out hover:shadow-xl hover:border-yellow-600 hover:-translate-y-0.5 gap-2";

        const contain = document.createElement("span");
        contain.classList = "text-lg font-medium text-gray-800 break-words flex-1 mr-4";
        contain.textContent = `${taskObj.text}`; // taskObj.text का उपयोग करें

        const count = document.createElement('h1');
        count.className = "text-xl font-bold text-gray-500";
        count.textContent = `(${num++})`;

        const button = document.createElement("button");
        button.className = "flex-shrink-0 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg transition duration-150 ease-in-out hover:bg-red-600 active:scale-90";
        button.textContent = "Delete";

        const input = document.createElement("input");
        input.className = "w-6 h-6 flex-shrink-0";
        input.type = "checkbox";

        // लोड होने पर प्रारंभिक स्थिति सेट करें (Persistence)
        if (taskObj.completed) {
            input.checked = true;
            card.classList.add('opacity-60', 'line-through'); 
        }

        card.appendChild(count);
        card.appendChild(contain);
        card.appendChild(input);
        card.appendChild(button);
        container.appendChild(card);

        // --- Checkbox Listener (Completion Persistence Fix) ---
        input.addEventListener("change", () => {
         
            if (input.checked) {
                card.classList.add('opacity-60', 'line-through');
            } else {
                card.classList.remove('opacity-60', 'line-through');
            }

            const currentTaskText = contain.textContent.trim(); 

         
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            
        
            let index = tasks.findIndex(t => t.text === currentTaskText);
          
            if (index !== -1) {
                tasks[index].completed = input.checked; 
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }

            remain_task();
        });

        // --- Delete Card Listener (Deletion Persistence Fix) ---
        button.addEventListener("click", () => {
          
            card.remove();

            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

            tasks = tasks.filter(t => t.text !== taskObj.text); 
            localStorage.setItem("tasks", JSON.stringify(tasks));
            
            remain_task();
        })
    }

    // --- Completion Tracker Function (Calculation Fixed) ---
    function remain_task() {

        const allTasks = container.querySelectorAll('.w-full');
        const total = allTasks.length; 
        
        const completedTasks = container.querySelectorAll('.opacity-60');
        const completed = completedTasks.length;

        let percentage = 0;
        if (total > 0) {
            percentage = Math.round((completed / total) * 100);
        }

       
        completed_task.textContent = `${percentage}% (${completed}/${total})`;
    }