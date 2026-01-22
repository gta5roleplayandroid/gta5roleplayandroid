(function () {

  async function cekAkses() {
    const token = localStorage.getItem("tm_token");
    if (!token) return false;
    try {
      const res = await fetch("token.json?x=" + Date.now());
      const data = await res.json();
      return !!data[token];
    } catch (e) { return false; }
  }

  document.addEventListener("DOMContentLoaded", async function () {
    const ok = await cekAkses();
    if (!ok) return; // biarkan halaman token tampil
    alert("Welcome to Thinkmay Cloud!");
  });

})();
