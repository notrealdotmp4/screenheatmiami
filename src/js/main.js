document.addEventListener("DOMContentLoaded", () => {
  // ---- Archive search ----
  const input = document.getElementById("archive-search");
  if (input) {
    const cards = Array.from(document.querySelectorAll("#archive .ep-card"));
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      cards.forEach((c) => {
        const text = c.dataset.search || c.textContent.toLowerCase();
        c.style.display = text.includes(q) ? "" : "none";
      });
    });
  }

  // ---- Episode modal (progressive enhancement) ----
  const triggers = document.querySelectorAll("a.ep-card, a.hero-card");
  if (!triggers.length) return;

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML =
    '<div class="modal-backdrop" data-close></div>' +
    '<div class="modal-panel" role="dialog" aria-modal="true" aria-label="Episode">' +
      '<button class="modal-close" aria-label="Close" data-close>&times;</button>' +
      '<div class="modal-scroll"></div>' +
    "</div>";
  document.body.appendChild(modal);
  const scroll = modal.querySelector(".modal-scroll");
  let isOpen = false;

  function show(url, push) {
    fetch(url)
      .then((r) => r.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const article = doc.querySelector("article");
        if (!article) { window.location.href = url; return; }
        scroll.innerHTML = article.innerHTML;
        modal.classList.add("open");
        document.body.classList.add("modal-lock");
        modal.scrollTop = 0;
        isOpen = true;
        modal.querySelector(".modal-close").focus();
        if (push) history.pushState({ modal: url }, "", url);
      })
      .catch(() => { window.location.href = url; });
  }

  function hide(fromPop) {
    if (!isOpen) return;
    modal.classList.remove("open");
    document.body.classList.remove("modal-lock");
    scroll.innerHTML = "";
    isOpen = false;
    if (!fromPop && history.state && history.state.modal) history.back();
  }

  triggers.forEach((a) => {
    a.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      show(a.getAttribute("href"), true);
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) hide(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hide(false);
  });
  window.addEventListener("popstate", () => { if (isOpen) hide(true); });
});
