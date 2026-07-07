// Simple client-side search/filter for the archive grid
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("archive-search");
  if (!input) return;
  const cards = Array.from(document.querySelectorAll("#archive .ep-card"));
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    cards.forEach((c) => {
      const text = c.dataset.search || c.textContent.toLowerCase();
      c.style.display = text.includes(q) ? "" : "none";
    });
  });
});
