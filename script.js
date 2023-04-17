let users = []

async function getData(userCount = 30) {

    await axios.get(`https://randomuser.me/api/?results=${userCount}`)
        .then((response) => {
            users = response.data.results
            console.log(users)
        })

    render(users)
}

const count = document.querySelector('.count')
const countVal = count.input
const countButton = count.button

count.addEventListener('submit', event => {
    event.preventDefault()

    getData(countVal.value)
})

 

function render(list) {
    const blocks = document.querySelector('.blocks')
    const userCount = document.querySelector('.user-count')
    const usersAges = document.querySelector('.users-age')

    blocks.innerHTML = ''

    userCount.textContent = list.length

    usersAges.textContent = calculateAgesSum(list)

    const fragment = document.createDocumentFragment()
    for (let user of list) {
        const block = document.createElement('div')
        // block.classList.add('block')
        // block.classList.add('shadow')
        // block.classList.add('rounded')
        // block.classList.add('text-center')
        block.className = 'block shadow-lg rounded text-center'
        block.style.background = '--color-black';
        block.style.color = '#bbbcbf';

        const html = `<img class="rounded user-img" src="${user.picture.large}" alt="">
                <p class="user-name fs-4">${user.name.title + ' ' + user.name.first + ' ' + user.name.last}</p>
                <p class="user-email">
                    <i class="bi bi-envelope-fill"></i>
                    <span>${user.email}</span>
                </p>
                <p class="user-age">
                    <span>Age: </span>
                    <span>${user.dob.age}</span>
                </p>`
                block.innerHTML = html;

                block.dataset.bsToggle = "modal";
                block.dataset.bsTarget = "#exampleModal";
            
                block.addEventListener("click", () => {
                  const divModal = document.querySelector(".modal-body");
                  const divModalTitle = document.querySelector("#exampleModalLabel");
                 
                  divModalTitle.innerHTML = `
                  <p>${user.name.title} ${user.name.first} ${user.name.last} (${user.gender})</p>
                 <span> ${user.dob.age} years old </span>
                  `

                  divModal.innerHTML = `      
                    <h5> Address </h5>
                  <p>City: ${user.location.city}</p>
                  <p>Country: ${user.location.country}</p>
                  <p>State: ${user.location.state}</p>
                  <p>Street: ${user.location.street.name} house ${user.location.street.number}</p>
                 
                  <h5> Contact </h5>
                  <p>Phone: ${user.phone}</p>
                  <p>e-mail: ${user.email}</p>
                  `
                });
            

                fragment.appendChild(block);
              }
            
              blocks.appendChild(fragment);
            }
            

const dropdown = document.querySelector('.dropdown-menu')

dropdown.addEventListener('click', (e) => {

    const child = [...dropdown.children];
    child.forEach(el => {
        el.firstChild.classList.remove('active');
    });

    e.target.classList.add('active');
    const gender = e.target.dataset.type;

    const dropdownTitle = document.getElementById('navbarDropdown');

    (gender !== 'all') ?
        dropdownTitle.textContent = gender :
        dropdownTitle.textContent = 'Filter';

    filter(gender);

})

function filter(gender) {
    const filterUser = users.filter(user => {
        return user.gender == gender || gender === 'all';
    })

    render(filterUser);
}

const form = document.forms.search;

form.onsubmit = (e) => {
    e.preventDefault();
    find(form.input.value.trim());
}

function find(email) {
    const user = users.find(user => {
        return user.email === email;
    }) || users;

    user.length ?
        alert('Такого пользователя нет!') :
        render([user]);
}

function calculateAgesSum(users) {
    return users.reduce((acc, current) => {
        return acc + current.dob.age
    }, 0)
}


window.onload = () => {
    setTimeout(getData, 500)
}