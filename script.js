const charactersContainer = document.getElementById('characters');
const paginationContainer = document.getElementById('pagination');
const searchInput = document.getElementById('searchInput');
let currentPage = 1;

function getCharacters(page, name) {
    let url = `https://rickandmortyapi.com/api/character?page=${page}`;
    if (name) {
        url += `&name=${name}`;
    }
    fetch(url)
    .then(response => response.json())
    .then(data => {
        charactersContainer.innerHTML = '';
        data.results.forEach(character => {
            const card = `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${character.image}" class="card-img-top" alt="${character.name}">
                        <div class="card-body">
                            <h5 class="card-title">${character.name}</h5>
                            <p class="card-text">${character.species}</p>
                        </div>
                    </div>
                </div>
            `;
            charactersContainer.innerHTML += card;
        });
        renderPagination(data.info.pages);
    })
    .catch(error => console.log(error));
}

function renderPagination(totalPages) {
    paginationContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => {
            currentPage = i;
            getCharacters(currentPage, searchInput.value);
            updatePaginationUI();
        });
        paginationContainer.appendChild(button);
    }
    updatePaginationUI();
}

function updatePaginationUI() {
    const buttons = paginationContainer.querySelectorAll('button');
    buttons.forEach(button => {
        if (parseInt(button.innerText) === currentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

searchInput.addEventListener('input', () => {
    getCharacters(1, searchInput.value);
});

document.addEventListener('DOMContentLoaded', () => {
    getCharacters(currentPage);
});
