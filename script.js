
function search() {
    var username = document.getElementById('inputUsername').value;
    var url = `https://api.github.com/users/${username}`;

    insertUser(url);
}

function insertUser(url) {
    $.getJSON(url, (user) => {
        showUserData(user);
        clearError();

    }).fail( () => {
        showUserData({});
        showError('Usuário não encontrado!');
    });
}

function showUserData(user) {
    document.getElementById('name').innerHTML = user.name || '';
    document.getElementById('html_url').innerHTML = user.html_url || '';
    document.getElementById('company').innerHTML = user.company || '';
    document.getElementById('avatar_url').innerHTML = user.avatar_url ? 
                                                    `<img src="${user.avatar_url}" alt="avatar" width="220" height="220" class="shadow rounded">`
                                                    :
                                                    "";
}

function showError(msg) {
    document.getElementById('error').innerHTML = `<div class="alert alert-danger mt-2" role="alert">${msg}!</div>`;
   
}

function clearError() {
    document.getElementById('error').innerHTML = '';
}