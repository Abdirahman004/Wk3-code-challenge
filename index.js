
// empty array to store the shopping list items
let shoppingList = [];

// Get DOM elements
const itemInput = document.getElementById('itemInput');
const addItemButton = document.getElementById('addItemButton');
const shoppingListElement = document.getElementById('shoppingList');
const clearListButton = document.getElementById('clearListButton');

//local storage if available
window.onload = () => {
    const savedList = localStorage.getItem('shoppingList');
    if (savedList) {
        shoppingList = JSON.parse(savedList);
        renderList();
    }
};

// Adding item to the list
addItemButton.addEventListener('click', () => {
    const item = itemInput.value.trim();
    if (item) {
        shoppingList.push({ name: item, purchased: false });
        itemInput.value = '';
        renderList();
        saveList();
    }
});

// Rendering the shopping list
function renderList() {
    shoppingListElement.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = item.purchased ? 'purchased' : '';
        
        const span = document.createElement('span');
        span.textContent = item.name;
        span.contentEditable = 'true';
        span.addEventListener('blur', () => {
            shoppingList[index].name = span.textContent;
            saveList();
        });
        li.appendChild(span);

        const markButton = document.createElement('button');
        markButton.textContent = 'Mark Purchased';
        markButton.addEventListener('click', () => {
            shoppingList[index].purchased = !shoppingList[index].purchased;
            renderList();
            saveList();
        });
        li.appendChild(markButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            shoppingList.splice(index, 1);
            renderList();
            saveList();
        });
        li.appendChild(deleteButton);

        shoppingListElement.appendChild(li);
    });
}

// Clearing the entire list
clearListButton.addEventListener('click', () => {
    shoppingList = [];
    renderList();
    saveList();
});

// Saving the list to local storage
function saveList() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}
