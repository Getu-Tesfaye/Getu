const menuButton = document.querySelector(".menu-button");
const sidebar = document.querySelector(".sidebar");

menuButton.setAttribute("aria-expanded", "false");

menuButton.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("sidebar-open");

    document.body.classList.toggle("sidebar-visible", isOpen);

    menuButton.setAttribute("aria-expanded", string(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "close navigation menu" : "open navigation menu");
});