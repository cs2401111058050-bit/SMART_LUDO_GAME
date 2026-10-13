// Shared helpers used by every page
const $ = id => document.getElementById(id);
const PALETTE = ["#ef4444", "#3b82f6", "#22c55e", "#facc15", "#a855f7", "#fb923c"];
const getUsers = () => JSON.parse(localStorage.getItem("ludoUsers") || "{}");
const saveUsers = u => localStorage.setItem("ludoUsers", JSON.stringify(u));
const getRooms = () => JSON.parse(localStorage.getItem("ludoRooms") || "{}");
const saveRooms = r => localStorage.setItem("ludoRooms", JSON.stringify(r));
const me = () => localStorage.getItem("ludoSession");
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function hash(text) {
  if (window.crypto && crypto.subtle) {
    const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
  }
  return btoa(unescape(encodeURIComponent(text)));
}
function say(id, text, ok) { const e = $(id); e.textContent = text; e.className = "msg " + (ok ? "ok" : "err"); }

function requireLogin() {
  if (!me() || !getUsers()[me()]) { localStorage.removeItem("ludoSession"); location.replace("login.html"); throw new Error("login required"); }
}
function navbar() {
  const u = getUsers()[me()];
  $("nav").innerHTML = `<a href="home.html">🏠 Home</a><a href="leaderboard.html">🏆 Leaderboard</a><span class="sp"></span>` +
    `<span>👤 ${esc(u.display)}</span><a href="#" id="lo">Logout</a>`;
  $("lo").onclick = e => { e.preventDefault(); localStorage.removeItem("ludoSession"); location.href = "login.html"; };
}
