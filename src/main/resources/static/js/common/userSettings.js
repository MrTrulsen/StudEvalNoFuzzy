
//Finds the old and the new passwords
function getPasswords() {
    var oldPassword = document.getElementById("oldPasswordInput").value;
    var newPassword = document.getElementById("newPasswordInput").value;

    changePassword(oldPassword, newPassword);
}