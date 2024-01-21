class App {
    constructor() {
      this.apiUrl = 'https://65a8cad1219bfa3718679841.mockapi.io/demmo/users'; 
      this.appContainer = document.getElementById('app');
      this.grid = null;
      this.addModal = null;
      this.editModal = null;
  
      this.fetchAndPopulateData();
      this.createAddButton();
    }

    
  
    async fetchAndPopulateData() {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      this.grid = this.createGrid(data);
      this.appContainer.appendChild(this.grid);
    }
  
    createGrid(data) {
        const header=document.createElement('h1');
        header.textContent='User Details';

        header.style.width='200%';
        header.style.marginLeft='130%';
        header.style.position='center';
        header.classList.add('header-title');
        // body.appendChild(header);

        const grid = document.createElement('table');
        grid.appendChild(header);
        const headerRow = grid.insertRow();
      
        // Create header cells
        const headerCells = ['Avatar', 'ID', 'Name', 'Email',  'Action Buttons']; // Adjust headers as needed
        headerCells.forEach(header => {
          const headerCell = headerRow.insertCell();
          headerCell.classList.add( 'headerCell');
          headerCell.textContent = header;
        });
      
        // Create data rows
        data.forEach(item => {
          const row = grid.insertRow();
          row.dataset.id = item.id;
          const cells = [item.id, item.name, item.email]; // Adjust data fields as needed
          const avatarCell = row.insertCell();
          avatarCell.classList.add('image-cell'); 
          const avatar = document.createElement('img');
          avatar.src = item.avatarURL;
          avatarCell.appendChild(avatar);
      
          cells.forEach(cellData => {
            const cell = row.insertCell();
            cell.textContent = cellData;
          });

          const actionsCell = document.createElement('td');
      
          // Edit button
          const editButton = document.createElement('button');
          editButton.classList.add('btn', 'btn-sm', 'btn-primary'); // Bootstrap button styles
          const editPen = document.createElement('i');
          const editTxt = document.createElement('p');
          editTxt.textContent = 'Edit';
          editTxt.style.paddingLeft='5px';
          // editTxt.style.color = 'blue';
          // editButton.style.paddingRight='10px';
          editTxt.style.margin='0px';
          editPen.classList.add('bi', 'bi-pencil'); // Bootstrap pen icon
          // editPen.style.fontSize = '0.8rem'; // Adjust font size of the icon
          // editPen.style.marginTop = '-2px';
          // editPen.style.fontSize = '0.8rem'; // Adjust font size of the icon
          // editPen.style.marginTop = '-2px';
          editButton.append(editPen);
          editButton.append(editTxt);
          // editButton.textContent = ' Edit';
          editButton.style.display = 'flex';
          // editButton.style.hover.backgroundColor = 'blue';
          // editPen.style.color = 'blue';
          // editButton.style.borderColor = 'blue';
          editButton.addEventListener('click', () => this.handleEditClick(this.apiUrl, item.id, grid));
          // row.insertCell().appendChild(editButton);
          actionsCell.appendChild(editButton);
          
          // Delete button
          const deleteButton = document.createElement('button');
          deleteButton.classList.add('btn', 'btn-sm', 'btn-danger'); // Bootstrap button styles
          const trashCan = document.createElement('i');
          trashCan.classList.add('bi', 'bi-trash'); // Bootstrap button styles
          const deleteTxt = document.createElement('p');
          deleteTxt.textContent = 'Delete';
          deleteTxt.style.paddingLeft='5px';
          deleteTxt.style.margin='0px';
          deleteButton.append(trashCan);
          deleteButton.append(deleteTxt);
          deleteButton.style.display = 'flex';
          actionsCell.appendChild(deleteButton);
          // actionsCell.style.display='flex';
          // 
          actionsCell.classList.add('action-cell');
          // 
          actionsCell.style.justifyContent='space-between';
          actionsCell.style.paddingLeft='10%';
          actionsCell.style.paddingRight='10%';
          // deleteButton.style.paddingLeft='10px';
          // deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => this.handleDeleteClick(this.apiUrl, item.id, this.grid));
          // actionsCell.style.marginTop='10px';
          deleteButton.style.height = '30px';
          // deleteButton.style.width = '60px';
          editButton.style.height = '30px';
          editButton.style.marginTop = '7%';
          deleteButton.style.marginTop = '7%';
          // deleteTxt.style.height='30px';
          // actionsCell.style.height='70px';
          actionsCell.style.paddingBottom='40px';
          row.appendChild(actionsCell);
        });
        
        return grid;
      }
      
      
      createAddButton() {
        const addButton = document.createElement('button');

        addButton.style.display='flex';
        addButton.style.position='fixed';
        addButton.style.top='10px';
        addButton.style.right='20px';
        const plus = document.createElement('i');
        const addTxt = document.createElement('p');
        plus.classList.add('bi', 'bi-plus-square-fill'); // Bootstrap button styles
        addButton.classList.add('btn', 'btn-success'); // Bootstrap button styles
      addTxt.textContent = 'Add';
      addTxt.style.margin='0px';
      addTxt.style.paddingLeft='5px';
      addButton.style.borderRadius='10px';
      addButton.style.margin='20px';
      addButton.style.marginLeft='90%';


      addButton.appendChild(plus);
      addButton.appendChild(addTxt);
      // addButton.addEventListener('click', this.handleAddClick);
      addButton.addEventListener('click', () => {
        this.handleAddClick(this.apiUrl, this.grid);
      });
      this.appContainer.appendChild(addButton);
    }
  
    async handleAddClick(apiUrl, grid) {
        const insertModal = document.createElement('div');
        insertModal.classList.add('modal');

        

        document.body.appendChild(insertModal);
        insertModal.style.display = 'block'; // Make it visible
        insertModal.style.position = 'fixed';
        insertModal.style.height = '27rem';
        insertModal.style.width = '20rem';
        insertModal.style.top = '50%';
        insertModal.style.left = '50%';
        insertModal.style.transform = 'translate(-50%, -50%)';

        insertModal.innerHTML = `
        <form class="insert-form" id="insert-form">
            <div class="form-fields">
            <div class="avatar-container">
                <img src="" alt="Avatar" class="avatar">
            </div>
            <label for="name">Name:</label>
            <input type="text" required minlength="5" maxlength="20" id="name" name="name" value="" placeholder="Name">
            <label for="email">Email:</label>
            <input type="email" required pattern="[^\s@]+@[^\s@]+\.[^\s@]+" id="email" name="email" value="" placeholder="Email">
            <label for="url">Avatar URL:</label>
            <input type="url" id="avatarURL" name="avatarURL" value="" placeholder="URL">
            <div class="edit-button-cont">
                <button type="button" class="close-button">Close</button>
                <button type="button" class="submit-button">Insert</button>
            </div>
            </div>
        </form>
        `;

        const insertModalContent = insertModal.querySelector('.insert-form');
        const imageUrlField = insertModalContent.querySelector('input[name="avatarURL"]');
        // console.log(modalContent);
        imageUrlField.addEventListener('input', () => {
            const newImageUrl = imageUrlField.value;
            const avatarImage = insertModalContent.querySelector('.avatar');
            avatarImage.src = newImageUrl;
        });
        //valdating
        

        function validateNameSize(nameInput) {
          const nameValue = nameInput.value;
          if (nameValue.length < 5 || nameValue.length > 20) {
           alert('Name is not valid');
           return false;
            // ...
          } else {
            return true;
            // ...
          }
        }
        
        function validateEmailFormat(emailInput) {
          const emailValue = emailInput.value;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
          if (!emailRegex.test(emailValue)) {
            alert('Email is not valid');
            return false;
            // ...
          } else {
            return true;
          }
        }
        
        // function validateForm(event) {
        //   // Call individual validation functions here
        //   validateNameSize();
        //   validateEmailFormat();
        
        //   // If any validation fails, prevent form submission:
        //   if (!formIsValid) {
        //     event.preventDefault();
        //   }
        // }
        

         // Add event listener for the close button
         const closeButton = insertModal.querySelector('.close-button');
         closeButton.addEventListener('click', () => {
          insertModal.remove(); // Remove the modal from the DOM
         });
         

         async function handleAddSubmit(apiUrl, grid, handleDeleteClick, handleEditClick) {
          const nameInput = document.getElementById('name'); // Assuming name field ID is 'name'
        const emailInput = document.getElementById('email'); // Assuming email field ID is 'email'
          const statusOfVali=validateNameSize(nameInput) && validateEmailFormat(emailInput);
          if(statusOfVali){
            console.log(statusOfVali);
          

          try {

            const formData = new FormData(document.getElementById('insert-form'));
           
        
            // Get data from the form
             // Assuming form has ID "add-form"
            const data = {};
            for (const [key, value] of formData.entries()) {
              data[key] = value;
            }

            console.log(data);
            console.log(apiUrl);
        
            // Send POST request to create a new entry
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });


        
            if (response.ok) {
              const newEntryData = await response.json();
              console.log('Entry created successfully:', newEntryData);
              console.log(grid);
              // Update the table
              const row=grid.insertRow();
              row.dataset.id=newEntryData.id;
              const newRowCreated = grid.querySelector(`tr[data-id="${newEntryData.id}"]`);
              newRowCreated.classList.add('green-flash');
              window.scrollTo(0, document.body.scrollHeight);

              setTimeout(() => {
                newRowCreated.classList.remove('green-flash'); // Remove the green-flash class after a delay
              }, 4000);

              const newCells=[newEntryData.id, newEntryData.name, newEntryData.email];
              const avatarCell = row.insertCell();
              avatarCell.classList.add('image-cell'); 
              const avatar = document.createElement('img');
              avatar.src = newEntryData.avatarURL;
              avatarCell.appendChild(avatar);


              newCells.forEach(cellData => {
                const cell = row.insertCell();
                cell.textContent = cellData;
              });


              console.log("data entry complete");

              const actionsCell = document.createElement('td');

               // Edit button
          const editButton = document.createElement('button');
          editButton.classList.add('btn', 'btn-sm', 'btn-primary'); // Bootstrap button styles
          const editPen = document.createElement('i');
          const editTxt = document.createElement('p');
          editTxt.textContent = 'Edit';
          editTxt.style.paddingLeft='5px';
          editTxt.style.margin='0px';
          editButton.append(editPen);
          editButton.append(editTxt);
          // 
          actionsCell.classList.add('action-cell');
          // 
          // editButton.textContent = ' Edit';
          editButton.style.display = 'flex';
          editPen.classList.add('bi', 'bi-pencil'); 
          editButton.addEventListener('click', () => handleEditClick(apiUrl, newEntryData.id, grid));
          actionsCell.appendChild(editButton);
          
          // const editCell = document.createElement('td');
          // newRow.appendChild(editCell);
          // const editButton = document.createElement('button');
          // editButton.textContent = 'Edit';
          // editCell.appendChild(editButton);
          
          // editButton.addEventListener('click', () => {
            //   const entryId = newRow.querySelector('td:first-child').textContent; // Get ID from first cell
            //   // Open edit modal or trigger edit functionality using entryId
            // });
            
            // Delete button
            const deleteButton = document.createElement('button');
            // deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-sm', 'btn-danger'); // Bootstrap button styles
          const trashCan = document.createElement('i');
          trashCan.classList.add('bi', 'bi-trash'); // Bootstrap button styles
          const deleteTxt = document.createElement('p');
          deleteTxt.textContent = 'Delete';
          deleteTxt.style.paddingLeft='5px';
          deleteTxt.style.margin='0px';
          deleteButton.append(trashCan);
          deleteButton.append(deleteTxt);
          deleteButton.style.display = 'flex';
          // actionsCell.style.display='flex';
          actionsCell.style.justifyContent='space-between';
          actionsCell.style.paddingLeft='10%';
          actionsCell.style.paddingRight='10%';
          deleteButton.style.height = '30px';
          editButton.style.height = '30px';
          editButton.style.marginTop = '5%';
          deleteButton.style.marginTop = '5%';
          // deleteTxt.style.height='30px';
          // actionsCell.style.height='70px';
          actionsCell.style.paddingBottom='40px';
            deleteButton.addEventListener('click', () => handleDeleteClick(apiUrl, newEntryData.id, grid));
            actionsCell.appendChild(deleteButton);
              row.appendChild(actionsCell);
        

              // const deleteCell = document.createElement('td');
              // newRow.appendChild(deleteCell);

              // const deleteButton = document.createElement('button');
              // deleteButton.textContent = 'Delete';
              // deleteCell.appendChild(deleteButton);

              // // Attach click event handler (adjust for your functionality)
              // deleteButton.addEventListener('click', () => {
              //   const entryId = newRow.querySelector('td:first-child').textContent; // Get ID from first cell
              //   handleDeleteClick(apiUrl, newEntryData.id, grid); // Call your delete function
              // });



              // Add the row to the table
              // grid.appendChild(newRow);
              // grid.appendChild(this.createGridRow(newEntryData)); // Add a new row
        
              // Close the modal, reset the form, display a success message, etc.
              alert("Entry completed successfully");
              insertModal.remove();
              // newRowCreated.classList.remove('green-flash');
            } else {
              console.error('Error creating entry:', response.statusText);
              // Display an error message to the user
            }
          } catch (error) {
            console.error('Error:', error);
            // Display an error message to the user
          }
        }  
      }      


        console.log(grid);
         const submitButton = document.querySelector('.submit-button'); // Target the button
        submitButton.addEventListener('click', async () => { // Attach event listener using arrow function  
          await handleAddSubmit(apiUrl, this.grid, this.handleDeleteClick, this. handleEditClick); // Call the PUT request logic (now an arrow function)

        });
        

    }

  
    async handleEditClick(apiUrl, id, grid) {
        const rowUpdate = grid.querySelector(`tr[data-id="${id}"]`);
        rowUpdate.classList.add('blue-flash');

        // Create the model popup structure
        const modal = document.createElement('div');
        modal.classList.add('modal'); // Add a class for styling
         
      
        // Append the model to the body and center it
        document.body.appendChild(modal);
        modal.style.display = 'block'; // Make it visible
        modal.style.position = 'fixed';
        modal.style.height = '32rem';
        modal.style.width = '20rem';
        // modal.style.width = '25%';
        // modal.style.height = '45%';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
      
        // Fetch data for the selected entry
        const response = await fetch(`${apiUrl}/${id}`);
        const entryData = await response.json();
        
        
        // const avatarImage = modalContent.querySelector('.avatar');
        // const imageUrl = avatarImage.src;
        // console.log(imageUrl);
        modal.innerHTML = `
        <form class="edit-form" id="edit-form">
            <div class="form-fields">
            <div class="edit-avatar-container">
                <img src="${entryData.avatarURL}" alt="Avatar" class="edit-avatar">
            </div>
            <label for="name">ID:</label>
            <input type="text" disabled name="id" value="${entryData.id}">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" value="${entryData.name}">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="${entryData.email}">
            <label for="url">Avatar URL:</label>
            <input type="url" id="avatarURL" name="avatarURL" value="${entryData.avatarURL}">
            <div class="edit-button-cont">
                <button type="button" class="close-button">Close</button>
                <button type="button" class="submit-button">Update</button>
            </div>
            </div>
        </form>
        `;
        const modalContent = modal.querySelector('.edit-form');
        const imageUrlField = modalContent.querySelector('input[name="avatarURL"]');
        // console.log(modalContent);
        imageUrlField.addEventListener('input', () => {
            const newImageUrl = imageUrlField.value;
            const avatarImage = modalContent.querySelector('.edit-avatar');
            avatarImage.src = newImageUrl;
        });
      
        // Add event listener for the close button
        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
          modal.remove(); // Remove the modal from the DOM
        });

        //Validation
        function validateNameSize(nameInput) {
          const nameValue = nameInput.value;
          if (nameValue.length < 5 || nameValue.length > 20) {
           alert('Name is not valid');
           return false;
            // ...
          } else {
            return true;
            // ...
          }
        }
        
        function validateEmailFormat(emailInput) {
          const emailValue = emailInput.value;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
          if (!emailRegex.test(emailValue)) {
            alert('Email is not valid');
            return false;
            // ...
          } else {
            return true;
          }
        }

        async function handleEditSubmit(apiUrl, id, grid) {
          const nameInput = document.getElementById('name'); // Assuming name field ID is 'name'
        const emailInput = document.getElementById('email'); // Assuming email field ID is 'email'
          const statusOfVali=validateNameSize(nameInput) && validateEmailFormat(emailInput);
          if(statusOfVali){
            console.log(statusOfVali);
          try {
            // Get updated data from the form (assuming a form with the ID "edit-form")
            const formData = new FormData(document.getElementById('edit-form'));
            const updatedData = {};
           
        
            for (const [key, value] of formData.entries()) {
              updatedData[key] = value;
            }

            console.log(apiUrl);
        
            // Send PUT request to update the entry
            const response = await fetch(`${apiUrl}/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
            });
        
            if (response.ok) {
              const updatedEntryData = await response.json();
              console.log('Entry updated successfully');

              

              // Update the corresponding row in the table
              const rowToUpdate = grid.querySelector(`tr[data-id="${id}"]`);
              rowToUpdate.cells[0].src = updatedEntryData.avatarURL;  
              rowToUpdate.cells[1].textContent = updatedEntryData.id;  // Adjust cell index as needed
              rowToUpdate.cells[2].textContent = updatedEntryData.name;
              rowToUpdate.cells[3].textContent = updatedEntryData.email;
              alert("Updated Successfully");
              // ... Update other cells as needed ...
              
              // Optionally, update the avatar image cell
              const avatarCell = rowToUpdate.querySelector('.image-cell');
              const avatarImage = avatarCell.querySelector('img');
              avatarImage.src = updatedEntryData.avatarURL;
              // Close the modal, refresh the list, or display a success message
                setTimeout(() => {
                      rowUpdate.classList.remove('blue-flash');
                    }, 3000);
                  modal.remove(); 
                } else {
                rowUpdate.classList.remove('blue-flash');
              console.error('Error updating entry:', response.statusText);
              // Display an error message to the user
            }
          } catch (error) {
            console.error('Error updating entry:', error);
            // Display an error message to the user
          }
        }
      }

        

        // Within your JavaScript code, where you create the "Update" button:
        const submitButton = document.querySelector('.submit-button'); // Target the button
        submitButton.addEventListener('click', async () => { // Attach event listener using arrow function  
          await handleEditSubmit(apiUrl, id, grid); // Call the PUT request logic (now an arrow function)

        });
        
      }

      
      

      
      
      
  
    async handleDeleteClick(apiUrl, id, grid) {
      const deletedRow = grid.querySelector(`tr[data-id="${id}"]`);
      deletedRow.classList.add('red-flash');
      // console.log(deletedRow);
        const confirmDelete = confirm('Are you sure you want to delete this entry?');
        console.log(id);

        if (confirmDelete) {
          try {
            const response = await fetch(`${apiUrl}/${id}`, {
              method: 'DELETE'
            });
      
            if (response.ok) {
              // Successful deletion
              alert('Entry deleted successfully!');
              const rowToRemove = grid.querySelector(`tr[data-id="${id}"]`);
              console.log(grid);
              grid.deleteRow(rowToRemove.rowIndex);
            //   this.fetchAndPopulateData(); // Refresh the grid
            } else {
              // Handle deletion error
              console.error('Error deleting entry:', response.statusText);
              alert('Failed to delete entry. Please try again.');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting. Please try again.');
            deletedRow.classList.remove('red-flash');
          }
        }else{
          deletedRow.classList.remove('red-flash');
        }
      }
      
  }
  
  new App();
  