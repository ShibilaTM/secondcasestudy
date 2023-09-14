function change() {
    // Define checkedCount outside the event handler
    let checkedCount = 0;

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let output = JSON.parse(this.responseText);
            let tbody = document.getElementById("tbody");
            tbody.innerHTML = '';

            const checkboxes = [];

            // Object to store the state of each checkbox
            const checkboxState = {};

            for (let i = 0; i < output.length; i++) {
                let row = document.createElement("tr");
                let cell1 = document.createElement("td");
                cell1.textContent = output[i].id;
                let cell2 = document.createElement("td");
                cell2.textContent = output[i].title;
                let cell3 = document.createElement("td");

                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";

                checkbox.checked = output[i].completed;

                if (output[i].completed) {
                    checkbox.disabled = true;
                }

                if (output[i].completed) {
                    checkbox.classList.add("checked-checkbox");
                }

                cell3.appendChild(checkbox);
                row.appendChild(cell1);
                row.appendChild(cell2);
                row.appendChild(cell3);

                checkboxes.push(new Promise((resolve) => {
                    checkbox.addEventListener("change", function() {
                        const currentState = this.checked;
                        const taskId = output[i].id;

                        checkboxState[taskId] = currentState;
                        const checkedCheckboxes = Object.values(checkboxState).filter(Boolean).length;

                        if (checkedCheckboxes === 5) {
                            alert("Congrats. 5 Tasks have been Successfully Completed");
                        }

                        resolve();
                    });
                }));

                tbody.appendChild(row);
            }
        }
    };

    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    xhttp.send();
}



