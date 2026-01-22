(function () {

  async function cekAkses() {
    const token = localStorage.getItem("tm_token");
    if (!token) return false;

    try {
      const res = await fetch("token.json?x=" + Date.now());
      const data = await res.json();

      if (data[token]) {
        const exp = new Date(data[token]);
        const now = new Date();
        if (now <= exp) return true;
      }
    } catch (e) {}
    return false;
  }

  function layarLock() {
    document.body.style.background = "#000";
    document.body.innerHTML = `
      <div style="color:#00f0ff;text-align:center;margin-top:40px;font-family:sans-serif;">
        <h3>🔒 Akses ditolak</h3>
        <p>Token tidak valid atau sudah expired</p>
        <button onclick="localStorage.removeItem('tm_token');location.reload();"
          style="padding:10px 16px;border:none;border-radius:8px;background:#00f0ff;color:#000;">
          Masukkan token lagi
        </button>
      </div>
    `;
  }

  function showPopup() {
    var popup = document.createElement("div");
    popup.innerHTML = `
      <div id="tm-popup-overlay">
        <div id="tm-popup">
          <img src="https://i.imgur.com/7tkRRcQ.jpeg" class="tm-logo">
          <div class="tm-text"><b>Aplikasi by</b><br>TikTok @gta5roleplaydihandphone</div>
          <div class="tm-text small">
            Ready Akun Steam <b>GTA 5 Original</b>, Akun Rockstar <b>Berlicense</b><br>
            Join Discord untuk info
          </div>
          <div class="tm-links">
            <a href="https://www.tiktok.com/@gta5roleplaydihandphone" target="_blank">Follow TikTok</a>
            <a href="https://discord.gg/JE9Y7W2Vuw" target="_blank">Join Discord</a>
          </div>
          <div class="tm-timer">Popup tertutup dalam <span id="tm-count">5</span> detik</div>
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    var style = document.createElement("style");
    style.innerHTML = `
      #tm-popup-overlay{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:99999;display:flex;align-items:center;justify-content:center;}
      #tm-popup{background:#0a0a0f;border:2px solid #00f0ff;border-radius:16px;padding:20px;width:85%;max-width:360px;text-align:center;color:#00f0ff;box-shadow:0 0 25px #00f0ff;}
      .tm-logo{width:90px;height:90px;border-radius:50%;border:3px solid #ff00ff;margin-bottom:12px;}
      .tm-text{font-size:14px;margin-bottom:8px;}
      .tm-text.small{font-size:12px;color:#ccc;}
      .tm-links a{display:block;margin:8px 0;padding:8px;border-radius:8px;background:linear-gradient(90deg,#00f0ff,#ff00ff);color:#000;font-weight:bold;text-decoration:none;}
      .tm-timer{margin-top:10px;font-size:12px;color:#aaa;}
    `;
    document.head.appendChild(style);

    var t = 5;
    var timer = setInterval(function () {
      t--;
      var c = document.getElementById("tm-count");
      if (c) c.innerText = t;
      if (t <= 0) {
        clearInterval(timer);
        var ov = document.getElementById("tm-popup-overlay");
        if (ov) ov.remove();
      }
    }, 1000);
  }

  document.addEventListener("DOMContentLoaded", async function () {
    const ok = await cekAkses();
    if (!ok) return layarLock();
    showPopup();
  });

})();
