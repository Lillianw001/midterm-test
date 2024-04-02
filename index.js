class Person {
 
    constructor(gender, name, address) {
      this.Gender = gender;
      this.Name = name;
      this.Address = address;
    }
}

  var userType ;
  var globalData;

// Function to fetch and display JSON data based on user type
function fetchData(data) {

    const jsonFile =`${data}.json`;
   
    fetch(jsonFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch ', data);
            }
            return response.json();
        })
        .then(data => {
           globalData = data;
           displayData(data);
        })
        .catch(error => {
            console.error(`Error fetching: `, error);
        });    
}


function displayData(data){

        const studentTableBody = document.querySelector('#addressList');
        studentTableBody.innerHTML = ''; 

       
        const tableHeader = document.createElement('thead');
        tableHeader.innerHTML = `
            <tr>
                <th>Gender</th>
                <th>Name</th>
                <th>Address</th>
            </tr>
        `;
        studentTableBody.appendChild(tableHeader);

       
        
        const tableBody = document.createElement('tbody');
        data.forEach(person => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${person.Gender}</td>
                <td>${person.Name}</td>
                <td>${person.Address}</td>
            `;
            tableBody.appendChild(row);
        });

       
        studentTableBody.appendChild(tableBody);    
}


const userTypeSelect = document.getElementById('userTypeSelect');
userTypeSelect.addEventListener('change', function() {
   if(this.value){
        if(userTypeSelect.value !="null" && userTypeSelect.value != null ){
          userType = userTypeSelect.value;
          console.log("userType" + userType);
          fetchData(userType);

        } else {
            alert('Pls select user type below');
        }  
   }
    
});


// Function to create and add user input elements
function createUserInputs() {
    
    const genderInput = document.createElement('select');
    genderInput.id = 'genderInput';

    const maleOption = document.createElement('option');
    maleOption.value = 'Male';
    maleOption.textContent = 'Male';
    genderInput.appendChild(maleOption);

    const femaleOption = document.createElement('option');
    femaleOption.value = 'Female';
    femaleOption.textContent = 'Female';
    genderInput.appendChild(femaleOption); 

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'nameInput';
    nameInput.placeholder = 'Please enter the name';

    const addressInput = document.createElement('input');
    addressInput.type = 'text';
    addressInput.id = 'addressInput';
    addressInput.placeholder = 'Please enter the address' ;  

    const submitButton = document.createElement('button');
    submitButton.type = 'button'; 
    submitButton.id = 'submitButton';
    submitButton.textContent = 'Submit';

    const resetButton = document.createElement('button');
    resetButton.type = 'button'; 
    resetButton.id = 'resetButton';
    resetButton.textContent = 'reset';
    resetButton.addEventListener('click', () => {
        
        genderInput.value = '';
        nameInput.value = '';
        addressInput.value = '';
    });


    // const addButton = document.createElement('button');
    // addButton.type = 'button'; // Ensure the button type is 'button' to prevent form submission
    // addButton.id = 'addButton';
    // addButton.textContent = 'Add User';
    const addUserButton = document.createElement('button');
    addUserButton.type = 'button';
    addUserButton.id = 'addUserButton';
    addUserButton.textContent = 'Add User';
    addUserButton.addEventListener('click', () => {
        
        addUserContainer.style.display = 'block';
    });
    
    const addUserContainer = document.querySelector('.addUser');
    addUserContainer.innerHTML = ''; 

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('inputContainer');
    inputContainer.appendChild(genderInput);
    inputContainer.appendChild(nameInput);
    inputContainer.appendChild(addressInput);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');
    buttonContainer.appendChild(submitButton);
    buttonContainer.appendChild(resetButton);

    
    addUserContainer.appendChild(inputContainer);
    addUserContainer.appendChild(buttonContainer);
    
   
    document.body.insertBefore(addUserButton, addUserContainer);

    addUserContainer.style.display = 'none';
}
// Call the function to create and add user input elements
createUserInputs();


function saveUserData(postData) {
    fetch('/saveUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save user');
        } else {
            console.log('User has been saved successfully');
            fetchData(userType);
        
        }
        
    })
    .catch(error => {
        console.error('Error saving user:', error);
    });
}
    
  


const submitButton = document.getElementById('submitButton');


submitButton.addEventListener('click', () => {
    const gender = document.getElementById('genderInput').value;
    const name = document.getElementById('nameInput').value;
    const address = document.getElementById('addressInput').value;
    const type = userTypeSelect.value;
    // alert("the type is "+ type);

    const userData = {
        Gender: gender,
        Name: name,
        Address: address
    };

    const postData = {
        newUser: userData,
        type: type
    };

    document.getElementById('genderInput').value = '';
    document.getElementById('nameInput').value = '';
    document.getElementById('addressInput').value = '';
    
   saveUserData(postData);
});

    


const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input',searchElements );
    
// Function to search for elements
function searchElements() {
    console.log(globalData.length);
 
    const keyword = searchInput.value.trim().toLowerCase();
   
    // const allElements = document.querySelectorAll('.element');
    const searchResults = new Array();

    
    globalData.forEach((element) => {

        
        if ( element.Name.toLowerCase().includes(keyword)) {
            searchResults.push(element);
        }
    });

    
    displayData(searchResults);
}

