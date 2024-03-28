class Person {
 
    constructor(gender, name, address) {
      this.Gender = gender;
      this.Name = name;
      this.Address = address;
    }
  }

// Function to fetch and display JSON data based on user type
function fetchAndDisplayData(userType) {
    const jsonFile = userType === 'student' ? 'student.json' : 'teacher.json';
    fetch(jsonFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${jsonFile}`);
            }
            return response.json();
        })
        .then(data => {
            // 获取表格主体元素
            const studentTableBody = document.querySelector('#addressList');
            studentTableBody.innerHTML = ''; // 清空之前的内容

            // 创建表格头部
            const tableHeader = document.createElement('thead');
            tableHeader.innerHTML = `
                <tr>
                    <th>Gender</th>
                    <th>Name</th>
                    <th>Address</th>
                </tr>
            `;
            studentTableBody.appendChild(tableHeader);

            // 创建表格内容
            
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

            // 添加表格内容到表格主体元素
            studentTableBody.appendChild(tableBody);
        })
        .catch(error => {
            console.error(`Error fetching ${jsonFile}:`, error);
        });
}

// 监听选择框改变事件
const userTypeSelect = document.getElementById('userTypeSelect');
userTypeSelect.addEventListener('change', function() {
    const selectedOption = this.value;
    fetchAndDisplayData(selectedOption);
});

// 初始加载默认选项
fetchAndDisplayData(userTypeSelect.value);



// Function to create and add user input elements
function createUserInputs() {
    // 创建性别、姓名和地址输入元素
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
    submitButton.type = 'button'; // Ensure the button type is 'button' to prevent form submission
    submitButton.id = 'submitButton';
    submitButton.textContent = 'Submit';

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button'; // Ensure the button type is 'button' to prevent form submission
    cancelButton.id = 'cancelButton';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        // 清空输入框内容
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
        // 将 addusercontainer 的 display 设置为 block
        addUserContainer.style.display = 'block';
    });
    
    const addUserContainer = document.querySelector('.addUser');
    addUserContainer.innerHTML = ''; // Clear any existing content

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('inputContainer');
    inputContainer.appendChild(genderInput);
    inputContainer.appendChild(nameInput);
    inputContainer.appendChild(addressInput);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');
    buttonContainer.appendChild(submitButton);
    buttonContainer.appendChild(cancelButton);

    // 将输入框容器和按钮容器添加到 addUserContainer 中
    addUserContainer.appendChild(inputContainer);
    addUserContainer.appendChild(buttonContainer);
    
    // 在 addUserContainer 前面添加 addUserButton
    document.body.insertBefore(addUserButton, addUserContainer);

    addUserContainer.style.display = 'none';
}
// Call the function to create and add user input elements
createUserInputs();

fetch('/student.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch student data');
        }
        return response.json();
    })
    .then(data => {
        // 处理从服务器获取的数据
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching student data:', error);
    });

    function saveUserData(postData) {
        fetch('/saveUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData) // 直接发送postData对象到服务器
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to save user');
            }
            console.log('User has been saved successfully');
            // 在这里处理保存用户成功后的逻辑，例如刷新页面或更新用户列表等
        })
        .catch(error => {
            console.error('Error saving user:', error);
        });
    }
    
    // 以下是一个示例，当用户点击保存按钮时调用该函数，并将用户输入的数据作为参数传递进去
    // Attach event listener to the "Add User" button
    // 省略了创建输入元素的代码

// 获取提交按钮
const submitButton = document.getElementById('submitButton');

// 绑定提交按钮的点击事件
submitButton.addEventListener('click', () => {
    const gender = document.getElementById('genderInput').value;
    const name = document.getElementById('nameInput').value;
    const address = document.getElementById('addressInput').value;
    const type = document.getElementById('userTypeSelection').value;

    const userData = {
        Gender: gender,
        Name: name,
        Address: address
    };

    const postData = {
        newUser: userData,
        type: type
    };

    // 调用保存用户数据的函数
    saveUserData(postData);
});

    
