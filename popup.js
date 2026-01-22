(function () {

  /* =========================
     CEK TOKEN DARI token.json
  ========================== */

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

  /* =========================
     POPUP CYBERPUNK
  ========================== */

  function showPopup() {
    var popup = document.createElement("div");
    popup.innerHTML = `
      <div id="tm-popup-overlay">
        <div id="tm-popup">
          <div class="tm-glow"></div>

          <img src="https://i.imgur.com/7tkRRcQ.jpeg" class="tm-logo">

          <div class="tm-text">
            <b>Aplikasi by</b><br>
            TikTok @gta5roleplaydihandphone
          </div>

          <div class="tm-text small">
            Ready Akun Steam <b>GTA 5 Original</b>, Akun Rockstar <b>Berlicense</b> Atau Berlangganan <b>Cloud Thinkmay</b><br>
            Silakan Join Discord untuk info & order<br><br>
          </div>

          <div class="tm-links">
            <a href="https://www.tiktok.com/@gta5roleplaydihandphone" target="_blank">Follow TikTok</a>
            <a href="https://discord.gg/JE9Y7W2Vuw" target="_blank">Join Discord</a>
          </div>

          <div class="tm-timer">
            Popup akan tertutup dalam <span id="tm-count">5</span> detik
          </div>

          <div class="tm-source">
            Sumber halaman : www.thinkmay.net
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    var style = document.createElement("style");
    style.innerHTML = `
      #tm-popup-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.85);
        z-index: 99999;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      #tm-popup {
        position: relative;
        background: #0a0a0f;
        border: 2px solid #00f0ff;
        border-radius: 16px;
        padding: 22px;
        width: 85%;
        max-width: 360px;
        text-align: center;
        color: #00f0ff;
        box-shadow: 0 0 25px #00f0ff;
      }
      .tm-logo { width:90px;height:90px;border-radius:50%;border:3px solid #ff00ff;margin-bottom:12px; }
      .tm-text{font-size:14px;margin-bottom:8px;}
      .tm-text.small{font-size:12px;color:#ccc;}
      .tm-links a{display:block;margin:8px 0;padding:8px;border-radius:8px;background:linear-gradient(90deg,#00f0ff,#ff00ff);color:#000;font-weight:bold;text-decoration:none;}
      .tm-timer{margin-top:10px;font-size:12px;color:#aaa;}
      .tm-source{margin-top:6px;font-size:10px;color:#666;}
    `;
    document.head.appendChild(style);

    var timeLeft = 5;
    var timer = setInterval(function () {
      timeLeft--;
      var c = document.getElementById("tm-count");
      if (c) c.innerText = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        var ov = document.getElementById("tm-popup-overlay");
        if (ov) ov.remove();
      }
    }, 1000);
  }

  /* =========================
     AUTO HIDE CURSOR CLOUD
  ========================== */

  function autoHideCursor() {
    var cursorHidden = false;
    function hideCursor() {
      if (!cursorHidden) {
        document.body.style.cursor = "none";
        cursorHidden = true;
      }
    }

    var checkCloud = setInterval(function () {
      var iframe = document.querySelector("iframe");
      var canvas = document.querySelector("canvas");
      var video = document.querySelector("video");
      if (iframe || canvas || video) {
        hideCursor();
        clearInterval(checkCloud);
      }
    }, 1000);
  }

  /* =========================
     INIT
  ========================== */

  document.addEventListener("DOMContentLoaded", async function () {
    const ok = await cekAkses();

    if (!ok) {
      // kunci halaman
      document.body.innerHTML = `
        <h3 style="color:red;text-align:center;margin-top:40px;">
          Akses ditolak. Token tidak valid / expired.
        </h3>
      `;
      return;
    }

    showPopup();
    autoHideCursor();
  });

})();
