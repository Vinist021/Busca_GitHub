var usersHistory = [];

function search() {
    var username = document.getElementById('inputUsername').value;
    var url = `https://api.github.com/users/${username}`;

    insertUser(url);
}

function insertUser(url) {
    $.getJSON(url, (user) => {
        showUserData(user);
        showHeaderUser();
        showHeaderHistory();
        if(isNew(user))
        {
            save(user);
            showNewUserHistory(user);
        }
        
        clearError();

    }).fail( () => {
        showUserData({});
        showError('Usuário não encontrado!');
        clearHeaderUser();
    });
}

function showUserData(user) {
    document.getElementById('name').innerHTML = user.name || '';
    document.getElementById('html_url').innerHTML = user.html_url ? `
    <a href="${user.html_url} "target="_blank" rel="noopener noreferrer">${user.html_url}</a>`: '';
    document.getElementById('company').innerHTML = user.company || '';
    document.getElementById('avatar_url').innerHTML = user.avatar_url ? `
    <img src="${user.avatar_url}" alt="avatar" width="220" height="220" class="shadow rounded">` : '';
}

function isNew(user) {
    return usersHistory.filter( (u) => u.login === user.login).length == 0;
}

function save(user) {
    usersHistory.push(user);
}

function showNewUserHistory(user) {
    document.getElementById('history').innerHTML += `
        <div class="col">
            <img id="avatar_url" src="${user.avatar_url}" alt="avatar" width="110" height="110" class="shadow rounded">
        </div>
        ` 
}

function showError(msg) {
    document.getElementById('error').innerHTML = `<div class="alert alert-danger mt-2" role="alert">${msg}!</div>`;
   
}

function clearError() {
    document.getElementById('error').innerHTML = '';
}

function showHeaderUser() {
    document.getElementById('headerUser').innerHTML = 'Dados do Usuário:'
}

function clearHeaderUser() {
    document.getElementById('headerUser').innerHTML = '';
}

function showHeaderHistory() {
    document.getElementById('headerHistory').innerHTML = 'Dados Pesquisados:'
}