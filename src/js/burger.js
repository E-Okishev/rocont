export function initBurgerMenu() {
  const hamb = document.querySelector("#hamb");
  const popup = document.querySelector("#popup");
  const originalMenu = document.querySelector("#menu");
  const body = document.body;

  hamb.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.toggle("open");
    hamb.classList.toggle("active");
    body.classList.toggle("noscroll");
    renderCustomMenu();
  });

  function renderCustomMenu() {
    popup.innerHTML = "";

    const newMenu = document.createElement("ul");
    newMenu.classList.add("header__menu", "header__menu--mobile");

    originalMenu.querySelectorAll("li").forEach((item) => {
      const newItem = document.createElement("li");
      newItem.classList.add("header__menu-item", "header__menu-item--mobile");

      const link = item.querySelector("a");
      const newLink = document.createElement("a");

      newLink.href = link.href;
      newLink.textContent = link.textContent;
      newLink.classList.add("header__menu-link", "header__menu-link--mobile");

      newLink.addEventListener("click", closeMenu);

      newItem.appendChild(newLink);
      newMenu.appendChild(newItem);
    });

    popup.appendChild(newMenu);
  }

  function closeMenu() {
    popup.classList.remove("open");
    hamb.classList.remove("active");
    body.classList.remove("noscroll");
  }
}
