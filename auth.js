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