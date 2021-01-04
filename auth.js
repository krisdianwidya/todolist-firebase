// signup
const btnSignup = document.querySelector('#btn-signup');

btnSignup.addEventListener('click', () => {
    const email = document.querySelector('#email-signup').value;
    const password = document.querySelector('#password-signup').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            $('#modal-signup').modal('hide');
        })
        .catch(error => {
            document.querySelector('.error').innerHTML = error.message;
        });
});
// end signup

auth.onAuthStateChanged(user => {
    console.log(user);
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();
});
// end logout

// login
const btnLogin = document.querySelector('#btn-login');

btnLogin.addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            $('#modal-login').modal('hide');
        })
        .catch(error => {
            document.querySelector('.error').innerHTML = error.message;
        });
});
// end login