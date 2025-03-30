function goBack() {
    if (document.referrer) {
        history.back();
    } else {
        window.location.href = "/index.html";
        window.close();
    }
}

function openMenu() {
    let menu = document.getElementById('menu');
    menu.style.display = "flex";
}

function closeMenu() {
    let menu = document.getElementById('menu');
    menu.style.display = "none";
}