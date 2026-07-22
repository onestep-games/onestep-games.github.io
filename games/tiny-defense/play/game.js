(function () {
  "use strict";

  var LW = 720;
  var LH = 960;
  var BEST_KEY = "td_demo_best";
  var SHARE_URL = "https://onestep-games.github.io/games/tiny-defense/#axe-challenge";
  var STORE_URL = "https://m.onestore.co.kr/v2/ko-kr/app/0001007324";
  var BASE_SPEED = 0.78;
  var SPEED_STEP = 0.065;
  var MAX_SPEED = 2.45;
  var BASE_ZONE_HW = 0.135;
  var ZONE_STEP = 0.0035;
  var MIN_ZONE_HW = 0.045;
  var CHOP_DUR = 0.38;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  var chopBtn = document.getElementById("chopBtn");
  var woodTotalEl = document.getElementById("woodTotal");
  var bestTotalEl = document.getElementById("bestTotal");
  var woodBadge = document.getElementById("woodBadge");
  var bestBadge = document.querySelector(".best-pill");
  var gameStatus = document.getElementById("gameStatus");
  var resultOverlay = document.getElementById("resultOverlay");
  var resultScoreEl = document.getElementById("resultScore");
  var resultBestEl = document.getElementById("resultBest");
  var resultCopyEl = document.getElementById("resultCopy");
  var newRecordEl = document.getElementById("newRecord");
  var retryBtn = document.getElementById("retryBtn");
  var shareBtn = document.getElementById("shareBtn");
  var toast = document.getElementById("toast");

  if (new URLSearchParams(window.location.search).has("embed")) {
    document.body.classList.add("is-embedded");
  }

  var sheets = {
    tree: { src: "./assets/tree.png", frames: 8, fw: 192, fh: 256, img: null },
    idle: { src: "./assets/pawn-idle.png", frames: 8, fw: 192, fh: 192, img: null },
    chop: { src: "./assets/pawn-chop.png", frames: 6, fw: 192, fh: 192, img: null }
  };

  var shareIcon = new Image();
  var shareWood = new Image();
  shareIcon.src = "/assets/app-icon.webp";
  shareWood.src = "./assets/wood.png";

  var dpr = 1;
  var score = 0;
  var best = readBest();
  var marker = 0.025;
  var dir = 1;
  var speed = BASE_SPEED;
  var zoneC = 0.54;
  var zoneHW = BASE_ZONE_HW;
  var running = true;
  var resultVisible = false;
  var inputLock = 0;
  var chopT = 0;
  var missFlashT = 0;
  var hitGlowT = 0;
  var shakeT = 0;
  var resultDelay = 0;
  var message = "황금 존을 노려라";
  var messageT = 1.15;
  var messagePerfect = false;
  var particles = [];
  var floats = [];
  var shareBlob = null;
  var shareCardPromise = null;
  var shareScore = 0;
  var shareBest = 0;
  var shareGeneration = 0;
  var toastTimer = 0;
  var lastFrame = 0;
  var canvasPointer = null;
  var renderingActive = true;

  function readBest() {
    try {
      var stored = parseInt(window.localStorage.getItem(BEST_KEY) || "0", 10);
      return Number.isFinite(stored) && stored > 0 ? stored : 0;
    } catch (error) {
      return 0;
    }
  }

  function writeBest(value) {
    try {
      window.localStorage.setItem(BEST_KEY, String(value));
    } catch (error) {
      // 저장소가 차단된 환경에서도 현재 세션은 계속 플레이할 수 있다.
    }
  }

  function currentSpeed(value) {
    return Math.min(MAX_SPEED, BASE_SPEED + value * SPEED_STEP);
  }

  function currentZoneHW(value) {
    return Math.max(MIN_ZONE_HW, BASE_ZONE_HW - value * ZONE_STEP);
  }

  function updateDifficulty() {
    speed = currentSpeed(score);
    zoneHW = currentZoneHW(score);
  }

  function rollZone() {
    var margin = zoneHW + 0.055;
    var next = zoneC;
    var attempts = 0;
    do {
      next = margin + Math.random() * (1 - margin * 2);
      attempts += 1;
    } while (Math.abs(next - marker) < zoneHW * 1.65 && attempts < 12);
    zoneC = next;
  }

  function setHud() {
    woodTotalEl.textContent = String(score);
    bestTotalEl.textContent = String(best);
    canvas.dataset.score = String(score);
    canvas.dataset.best = String(best);
  }

  function restart() {
    if (resultVisible) {
      chopBtn.focus({ preventScroll: true });
      resultOverlay.setAttribute("aria-hidden", "true");
      resultOverlay.setAttribute("inert", "");
    }
    score = 0;
    marker = 0.025;
    dir = 1;
    running = true;
    resultVisible = false;
    inputLock = 0.16;
    chopT = 0;
    missFlashT = 0;
    hitGlowT = 0;
    shakeT = 0;
    resultDelay = 0;
    message = "황금 존을 노려라";
    messageT = 1.05;
    messagePerfect = false;
    particles.length = 0;
    floats.length = 0;
    canvasPointer = null;
    shareBlob = null;
    shareCardPromise = null;
    shareGeneration += 1;
    newRecordEl.hidden = true;
    document.body.dataset.shareState = "idle";
    resultOverlay.dataset.shareBytes = "0";
    updateDifficulty();
    rollZone();
    setHud();
    gameStatus.textContent = "새 도전이 시작됐습니다. 최고 기록 " + best + "개.";
  }

  function replayAnimation(element, className) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
  }

  function chop(judgement) {
    if (!running || resultVisible || inputLock > 0 || chopT > 0) return;

    var judgedMarker = judgement ? judgement.marker : marker;
    var judgedZoneCenter = judgement ? judgement.zoneCenter : zoneC;
    var judgedZoneHalfWidth = judgement ? judgement.zoneHalfWidth : zoneHW;
    var distance = Math.abs(judgedMarker - judgedZoneCenter);
    chopT = CHOP_DUR;
    inputLock = CHOP_DUR * 0.9;

    if (distance <= judgedZoneHalfWidth) {
      var perfect = distance <= judgedZoneHalfWidth * 0.3;
      score += 1;
      hitGlowT = perfect ? 0.48 : 0.34;
      message = perfect ? "PERFECT!" : "명중!";
      messageT = perfect ? 0.64 : 0.46;
      messagePerfect = perfect;
      if (perfect && !reducedMotion) shakeT = 0.13;
      spawnWoodChips(perfect);
      floats.push({ x: 374, y: 475, life: 0.92, maxLife: 0.92, perfect: perfect });
      replayAnimation(woodBadge, "score-pop");
      updateDifficulty();
      rollZone();
      setHud();
      gameStatus.textContent = (perfect ? "퍼펙트. " : "명중. ") + "나무 " + score + "개, 최고 " + best + "개.";
      return;
    }

    gameOver();
  }

  function gameOver() {
    running = false;
    canvasPointer = null;
    missFlashT = 0.42;
    resultDelay = 0.34;
    message = "빗나감!";
    messageT = 0.52;
    messagePerfect = false;
    if (!reducedMotion) shakeT = 0.18;

    best = Math.max(best, readBest());
    var isRecord = score > best;
    if (isRecord) {
      best = score;
      writeBest(best);
      replayAnimation(bestBadge, "record-pop");
    }
    setHud();
    populateResult(isRecord);
    prepareShareCard();
    gameStatus.textContent = "게임 오버. 최종 기록 나무 " + score + "개, 최고 " + best + "개.";
  }

  function resultCopy(value) {
    if (value === 0) return "첫 도끼는 과감했습니다. 다음엔 황금빛만 노려보세요.";
    if (value < 5) return "감이 오기 시작했어요. 한 번 더 리듬을 이어보세요.";
    if (value < 15) return "손끝이 숲의 박자를 탔습니다. 기록은 이제부터예요.";
    if (value < 30) return "이 정도면 노련한 벌목꾼. 어디까지 이어갈 수 있을까요?";
    return "숲이 당신의 이름을 기억합니다. 이 기록을 세상에 알려보세요.";
  }

  function populateResult(isRecord) {
    resultScoreEl.textContent = String(score);
    resultBestEl.textContent = String(best);
    resultCopyEl.textContent = resultCopy(score);
    newRecordEl.hidden = !isRecord;
    newRecordEl.classList.remove("record-arrive");
    if (isRecord) {
      void newRecordEl.offsetWidth;
      newRecordEl.classList.add("record-arrive");
    }
    shareScore = score;
    shareBest = best;
  }

  function openResult() {
    resultVisible = true;
    resultOverlay.removeAttribute("inert");
    resultOverlay.setAttribute("aria-hidden", "false");
    window.setTimeout(function () {
      retryBtn.focus({ preventScroll: true });
    }, 40);
  }

  function spawnWoodChips(perfect) {
    if (reducedMotion) return;
    var colors = ["#6e421e", "#98632d", "#c48b3b", "#e5b83e"];
    var amount = perfect ? 16 : 11;
    for (var i = 0; i < amount; i += 1) {
      var angle = -Math.PI * (0.13 + Math.random() * 0.74);
      var velocity = 105 + Math.random() * (perfect ? 155 : 105);
      particles.push({
        x: 372 + Math.random() * 25,
        y: 525 + Math.random() * 24,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: 5 + Math.random() * 9,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 11,
        life: 0.65 + Math.random() * 0.35,
        maxLife: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function updateEffects(dt) {
    if (inputLock > 0) inputLock -= dt;
    if (chopT > 0) chopT -= dt;
    if (missFlashT > 0) missFlashT -= dt;
    if (hitGlowT > 0) hitGlowT -= dt;
    if (shakeT > 0) shakeT -= dt;
    if (messageT > 0) messageT -= dt;

    for (var i = particles.length - 1; i >= 0; i -= 1) {
      var particle = particles[i];
      particle.vy += 430 * dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.rotation += particle.spin * dt;
      particle.life -= dt;
      if (particle.life <= 0) particles.splice(i, 1);
    }

    for (var j = floats.length - 1; j >= 0; j -= 1) {
      floats[j].y -= 52 * dt;
      floats[j].life -= dt;
      if (floats[j].life <= 0) floats.splice(j, 1);
    }
  }

  function resize() {
    var cssWidth = canvas.clientWidth || LW;
    var cssHeight = cssWidth * (LH / LW);
    dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    ctx.setTransform(canvas.width / LW, 0, 0, canvas.height / LH, 0, 0);
    ctx.imageSmoothingEnabled = false;
  }

  function roundedPath(target, x, y, width, height, radius) {
    var r = Math.min(radius, width / 2, height / 2);
    target.beginPath();
    target.moveTo(x + r, y);
    target.arcTo(x + width, y, x + width, y + height, r);
    target.arcTo(x + width, y + height, x, y + height, r);
    target.arcTo(x, y + height, x, y, r);
    target.arcTo(x, y, x + width, y, r);
    target.closePath();
  }

  function drawSheet(sheet, frame, centerX, baseY, width) {
    if (!sheet.img) return;
    var safeFrame = ((frame % sheet.frames) + sheet.frames) % sheet.frames;
    var height = width * (sheet.fh / sheet.fw);
    ctx.drawImage(
      sheet.img,
      safeFrame * sheet.fw,
      0,
      sheet.fw,
      sheet.fh,
      centerX - width / 2,
      baseY - height,
      width,
      height
    );
  }

  function drawCloud(x, y, scale, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(x, y, 50 * scale, 16 * scale, 0, 0, Math.PI * 2);
    ctx.ellipse(x - 27 * scale, y + 2 * scale, 28 * scale, 13 * scale, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 24 * scale, y - 8 * scale, 32 * scale, 22 * scale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawBackground() {
    var sky = ctx.createLinearGradient(0, -12, 0, 640);
    sky.addColorStop(0, "#acd9e9");
    sky.addColorStop(0.62, "#dff1dd");
    sky.addColorStop(1, "#f4e8b9");
    ctx.fillStyle = sky;
    ctx.fillRect(-14, -14, LW + 28, LH + 28);

    var sun = ctx.createRadialGradient(570, 148, 2, 570, 148, 92);
    sun.addColorStop(0, "rgba(255,244,173,.88)");
    sun.addColorStop(0.38, "rgba(255,224,126,.48)");
    sun.addColorStop(1, "rgba(255,224,126,0)");
    ctx.fillStyle = sun;
    ctx.fillRect(460, 38, 220, 220);

    drawCloud(144, 170, 0.82, 0.48);
    drawCloud(594, 272, 0.56, 0.32);

    ctx.fillStyle = "#91b7a4";
    ctx.beginPath();
    ctx.moveTo(-20, 510);
    ctx.bezierCurveTo(80, 410, 150, 442, 234, 486);
    ctx.bezierCurveTo(330, 380, 430, 420, 522, 485);
    ctx.bezierCurveTo(612, 414, 690, 431, 740, 468);
    ctx.lineTo(740, 670);
    ctx.lineTo(-20, 670);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#6f9d78";
    ctx.beginPath();
    ctx.moveTo(-20, 565);
    ctx.bezierCurveTo(92, 481, 181, 521, 273, 562);
    ctx.bezierCurveTo(379, 479, 486, 508, 574, 566);
    ctx.bezierCurveTo(646, 518, 708, 535, 740, 552);
    ctx.lineTo(740, 690);
    ctx.lineTo(-20, 690);
    ctx.closePath();
    ctx.fill();

    var ground = ctx.createLinearGradient(0, 590, 0, LH);
    ground.addColorStop(0, "#8cc55f");
    ground.addColorStop(0.42, "#77ad51");
    ground.addColorStop(1, "#5f8b45");
    ctx.fillStyle = ground;
    ctx.fillRect(-14, 592, LW + 28, LH - 578);
    ctx.fillStyle = "rgba(244,232,185,.32)";
    ctx.fillRect(-14, 592, LW + 28, 9);

    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = "#315b3d";
    ctx.lineWidth = 3;
    for (var i = 0; i < 24; i += 1) {
      var gx = (i * 97) % 740 - 10;
      var gy = 650 + ((i * 61) % 248);
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx - 5, gy - 12);
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx + 7, gy - 10);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawScene(time) {
    drawBackground();

    ctx.save();
    ctx.globalAlpha = 0.23;
    ctx.fillStyle = "#284534";
    ctx.beginPath();
    ctx.ellipse(360, 660, 175, 29, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    drawSheet(sheets.tree, 0, 345, 654, 270);

    var pawnX = 468;
    if (chopT > 0) {
      var chopProgress = Math.max(0, Math.min(0.999, 1 - chopT / CHOP_DUR));
      drawSheet(sheets.chop, Math.floor(chopProgress * sheets.chop.frames), pawnX, 668, 230);
    } else {
      drawSheet(sheets.idle, Math.floor(time * 5.5), pawnX, 668, 230);
    }

    drawParticles();
    drawTimingPanel(time);
    drawFloats();
    drawMessage();

    var vignette = ctx.createRadialGradient(LW / 2, 430, 230, LW / 2, 430, 610);
    vignette.addColorStop(0, "rgba(16,28,43,0)");
    vignette.addColorStop(0.72, "rgba(16,28,43,.02)");
    vignette.addColorStop(1, "rgba(16,28,43,.20)");
    ctx.fillStyle = vignette;
    ctx.fillRect(-14, -14, LW + 28, LH + 28);
  }

  function drawParticles() {
    for (var i = 0; i < particles.length; i += 1) {
      var particle = particles[i];
      ctx.save();
      ctx.globalAlpha = Math.min(1, particle.life * 2.4);
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.fillStyle = particle.color;
      ctx.fillRect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2);
      ctx.restore();
    }
  }

  function drawTimingPanel(time) {
    var panelX = 59;
    var panelY = 735;
    var panelW = 602;
    var panelH = 155;
    var trackX = 112;
    var trackY = 817;
    var trackW = 496;
    var trackH = 42;

    ctx.save();
    ctx.shadowColor = "rgba(15,25,42,.26)";
    ctx.shadowBlur = 22;
    ctx.shadowOffsetY = 10;
    roundedPath(ctx, panelX, panelY, panelW, panelH, 22);
    ctx.fillStyle = "rgba(249,246,236,.93)";
    ctx.fill();
    ctx.restore();

    roundedPath(ctx, panelX, panelY, panelW, panelH, 22);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(23,32,51,.18)";
    ctx.stroke();
    roundedPath(ctx, panelX + 9, panelY + 9, panelW - 18, panelH - 18, 15);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(169,119,19,.24)";
    ctx.stroke();

    ctx.fillStyle = "#5f6672";
    ctx.font = "900 16px Inter, Pretendard, sans-serif";
    ctx.textAlign = "left";
    ctx.letterSpacing = "1px";
    ctx.fillText("GOLDEN ZONE", trackX, 782);
    ctx.textAlign = "right";
    ctx.fillStyle = "#a97713";
    ctx.fillText("SCORE  " + score, trackX + trackW, 782);

    roundedPath(ctx, trackX, trackY, trackW, trackH, 12);
    ctx.fillStyle = "#dce4e5";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(23,32,51,.2)";
    ctx.stroke();

    var zoneWidth = zoneHW * 2 * trackW;
    var zoneX = trackX + zoneC * trackW - zoneWidth / 2;
    var pulse = 0.5 + Math.sin(time * 7) * 0.5;
    ctx.save();
    ctx.shadowColor = "rgba(229,184,62," + (0.4 + pulse * 0.28) + ")";
    ctx.shadowBlur = 14 + pulse * 12 + hitGlowT * 38;
    roundedPath(ctx, zoneX, trackY + 4, zoneWidth, trackH - 8, 8);
    var zoneGradient = ctx.createLinearGradient(0, trackY, 0, trackY + trackH);
    zoneGradient.addColorStop(0, "#ffe798");
    zoneGradient.addColorStop(0.52, "#e5b83e");
    zoneGradient.addColorStop(1, "#c99118");
    ctx.fillStyle = zoneGradient;
    ctx.fill();
    ctx.restore();

    var perfectWidth = Math.max(4, zoneWidth * 0.3);
    ctx.fillStyle = "rgba(255,250,214,.62)";
    ctx.fillRect(trackX + zoneC * trackW - perfectWidth / 2, trackY + 8, perfectWidth, trackH - 16);

    var markerX = trackX + marker * trackW;
    ctx.fillStyle = "#172033";
    ctx.beginPath();
    ctx.moveTo(markerX, trackY - 16);
    ctx.lineTo(markerX - 11, trackY - 3);
    ctx.lineTo(markerX + 11, trackY - 3);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(markerX - 3, trackY - 1, 6, trackH + 2);
    ctx.fillStyle = "rgba(255,255,255,.72)";
    ctx.fillRect(markerX - 1, trackY + 4, 2, trackH - 8);
  }

  function drawFloats() {
    for (var i = 0; i < floats.length; i += 1) {
      var item = floats[i];
      var alpha = Math.min(1, item.life * 2.4);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.textAlign = "center";
      ctx.font = "950 " + (item.perfect ? 46 : 40) + "px Inter, Pretendard, sans-serif";
      ctx.lineWidth = 7;
      ctx.strokeStyle = "rgba(249,246,236,.88)";
      ctx.strokeText("+1", item.x, item.y);
      ctx.fillStyle = item.perfect ? "#b47708" : "#2f624d";
      ctx.fillText("+1", item.x, item.y);
      ctx.restore();
    }
  }

  function drawMessage() {
    if (messageT <= 0 || !message) return;
    ctx.save();
    ctx.globalAlpha = Math.min(1, messageT * 3.2);
    ctx.textAlign = "center";
    ctx.font = "950 " + (messagePerfect ? 47 : 40) + "px Inter, Pretendard, sans-serif";
    ctx.lineWidth = 8;
    ctx.strokeStyle = "rgba(249,246,236,.84)";
    ctx.strokeText(message, LW / 2, 260);
    ctx.fillStyle = messagePerfect ? "#b47708" : "#172033";
    ctx.fillText(message, LW / 2, 260);
    ctx.restore();
  }

  function render(time) {
    ctx.save();
    if (shakeT > 0 && !reducedMotion) {
      var amount = 2 + shakeT * 20;
      ctx.translate((Math.random() - 0.5) * amount, (Math.random() - 0.5) * amount);
    }
    drawScene(time);
    ctx.restore();

    if (missFlashT > 0) {
      ctx.save();
      ctx.globalAlpha = Math.min(0.34, missFlashT * 0.82);
      ctx.fillStyle = "#d85a36";
      ctx.fillRect(0, 0, LW, LH);
      ctx.restore();
    }
  }

  function frame(now) {
    if (!renderingActive) {
      lastFrame = now;
      window.requestAnimationFrame(frame);
      return;
    }
    var dt = lastFrame ? Math.min(0.05, (now - lastFrame) / 1000) : 0;
    lastFrame = now;

    if (running) {
      var markerStep = Math.min(speed * dt, zoneHW * 1.8);
      marker += dir * markerStep;
      if (marker >= 1) {
        marker = 1;
        dir = -1;
      } else if (marker <= 0) {
        marker = 0;
        dir = 1;
      }
    }

    updateEffects(dt);
    if (resultDelay > 0) {
      resultDelay -= dt;
      if (resultDelay <= 0 && !resultVisible) openResult();
    }

    render(now / 1000);
    window.requestAnimationFrame(frame);
  }

  function imageReady(image) {
    if (image.complete) return Promise.resolve(image);
    return new Promise(function (resolve) {
      var finish = function () { resolve(image); };
      image.addEventListener("load", finish, { once: true });
      image.addEventListener("error", finish, { once: true });
    });
  }

  function drawRoundedImage(target, image, x, y, size, radius) {
    if (!image.naturalWidth) return;
    target.save();
    roundedPath(target, x, y, size, size, radius);
    target.clip();
    target.drawImage(image, x, y, size, size);
    target.restore();
  }

  function createShareCard(value, bestValue) {
    return Promise.all([imageReady(shareIcon), imageReady(shareWood)]).then(function () {
      var card = document.createElement("canvas");
      card.width = 1080;
      card.height = 1350;
      var cardCtx = card.getContext("2d");

      var background = cardCtx.createLinearGradient(0, 0, 0, card.height);
      background.addColorStop(0, "#20365b");
      background.addColorStop(0.52, "#17233d");
      background.addColorStop(1, "#0f1728");
      cardCtx.fillStyle = background;
      cardCtx.fillRect(0, 0, card.width, card.height);

      var glow = cardCtx.createRadialGradient(870, 120, 0, 870, 120, 440);
      glow.addColorStop(0, "rgba(229,184,62,.28)");
      glow.addColorStop(1, "rgba(229,184,62,0)");
      cardCtx.fillStyle = glow;
      cardCtx.fillRect(0, 0, card.width, 620);

      cardCtx.fillStyle = "#294a47";
      cardCtx.beginPath();
      cardCtx.moveTo(0, 1030);
      cardCtx.bezierCurveTo(170, 840, 340, 910, 530, 1005);
      cardCtx.bezierCurveTo(720, 835, 920, 905, 1080, 965);
      cardCtx.lineTo(1080, 1350);
      cardCtx.lineTo(0, 1350);
      cardCtx.closePath();
      cardCtx.fill();

      cardCtx.strokeStyle = "rgba(229,184,62,.82)";
      cardCtx.lineWidth = 4;
      roundedPath(cardCtx, 38, 38, 1004, 1274, 32);
      cardCtx.stroke();
      cardCtx.strokeStyle = "rgba(255,255,255,.12)";
      cardCtx.lineWidth = 2;
      roundedPath(cardCtx, 53, 53, 974, 1244, 24);
      cardCtx.stroke();

      drawRoundedImage(cardCtx, shareIcon, 90, 88, 148, 34);
      cardCtx.fillStyle = "#e5b83e";
      cardCtx.font = "900 25px Inter, Arial, sans-serif";
      cardCtx.textAlign = "left";
      cardCtx.fillText("ONESTEP", 270, 132);
      cardCtx.fillStyle = "#fffaf0";
      cardCtx.font = "950 55px Inter, Arial, sans-serif";
      cardCtx.fillText("TINY DEFENSE", 270, 198);

      cardCtx.fillStyle = "rgba(255,255,255,.12)";
      roundedPath(cardCtx, 90, 300, 900, 610, 34);
      cardCtx.fill();
      cardCtx.strokeStyle = "rgba(229,184,62,.32)";
      cardCtx.lineWidth = 2;
      cardCtx.stroke();

      cardCtx.fillStyle = "#e5b83e";
      cardCtx.font = "900 29px Inter, Arial, sans-serif";
      cardCtx.textAlign = "center";
      cardCtx.fillText("AXE CHALLENGE · FINAL SCORE", 540, 390);

      if (shareWood.naturalWidth) {
        cardCtx.imageSmoothingEnabled = false;
        cardCtx.drawImage(shareWood, 270, 468, 112, 70);
      }
      cardCtx.fillStyle = "#fffdf5";
      cardCtx.font = "950 72px Inter, Pretendard, sans-serif";
      cardCtx.textAlign = "left";
      cardCtx.fillText("나무", 405, 530);

      var scoreFont = value >= 1000 ? 172 : value >= 100 ? 200 : 222;
      cardCtx.fillStyle = "#f7dc82";
      cardCtx.font = "950 " + scoreFont + "px Inter, Pretendard, sans-serif";
      cardCtx.textAlign = "center";
      cardCtx.fillText(value + "개", 540, 750);

      cardCtx.fillStyle = "rgba(255,255,255,.72)";
      cardCtx.font = "800 42px Inter, Pretendard, sans-serif";
      cardCtx.fillText("최고 기록  " + bestValue, 540, 838);

      var trackX = 156;
      var trackY = 994;
      var trackW = 768;
      roundedPath(cardCtx, trackX, trackY, trackW, 42, 12);
      cardCtx.fillStyle = "rgba(255,255,255,.18)";
      cardCtx.fill();
      roundedPath(cardCtx, 418, trackY + 4, 244, 34, 9);
      cardCtx.fillStyle = "#e5b83e";
      cardCtx.shadowColor = "rgba(229,184,62,.7)";
      cardCtx.shadowBlur = 20;
      cardCtx.fill();
      cardCtx.shadowBlur = 0;
      cardCtx.fillStyle = "#fffdf5";
      cardCtx.fillRect(537, trackY - 11, 7, 64);

      cardCtx.fillStyle = "#fffaf0";
      cardCtx.font = "900 33px Inter, Pretendard, sans-serif";
      cardCtx.textAlign = "center";
      cardCtx.fillText("당신은 몇 개까지 이어갈 수 있나요?", 540, 1132);
      cardCtx.fillStyle = "rgba(255,255,255,.64)";
      cardCtx.font = "700 24px Inter, Arial, sans-serif";
      cardCtx.fillText("onestep-games.github.io/games/tiny-defense", 540, 1194);
      cardCtx.fillStyle = "#e5b83e";
      cardCtx.font = "900 22px Inter, Arial, sans-serif";
      cardCtx.fillText("PLAY · RISK · REPEAT", 540, 1250);

      return new Promise(function (resolve, reject) {
        card.toBlob(function (blob) {
          if (blob) resolve(blob);
          else reject(new Error("PNG 카드 생성 실패"));
        }, "image/png");
      });
    });
  }

  function prepareShareCard() {
    var generation = ++shareGeneration;
    var cardScore = shareScore;
    var cardBest = shareBest;
    shareBlob = null;
    shareBtn.disabled = true;
    shareBtn.innerHTML = "카드 준비 중&hellip;";
    document.body.dataset.shareState = "generating";
    shareCardPromise = createShareCard(cardScore, cardBest)
      .then(function (blob) {
        if (generation !== shareGeneration) return null;
        shareBlob = blob;
        shareBtn.disabled = false;
        shareBtn.innerHTML = '<span aria-hidden="true">&#8599;</span> 공유하기';
        document.body.dataset.shareState = "generated";
        resultOverlay.dataset.shareBytes = String(blob.size);
        window.dispatchEvent(new CustomEvent("tinydefense:sharecard", {
          detail: { score: cardScore, best: cardBest, bytes: blob.size }
        }));
        return blob;
      })
      .catch(function () {
        if (generation !== shareGeneration) return null;
        shareBtn.disabled = false;
        shareBtn.textContent = "링크 공유";
        document.body.dataset.shareState = "error";
        return null;
      });
  }

  function shareMessage(value) {
    return "Tiny Defense 도끼질 챌린지 나무 " + value + "개! 도전 →";
  }

  function downloadPng(blob, value) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "tiny-defense-axe-" + value + ".png";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }).catch(function () {
        return legacyCopy(text);
      });
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    var input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    var copied = false;
    try { copied = document.execCommand("copy"); } catch (error) { copied = false; }
    input.remove();
    return copied;
  }

  function showToast(messageText) {
    window.clearTimeout(toastTimer);
    toast.textContent = messageText;
    toast.classList.add("show");
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 3000);
  }

  function fallbackShare(blob) {
    downloadPng(blob, shareScore);
    copyText(SHARE_URL).then(function (copied) {
      document.body.dataset.shareState = "fallback";
      showToast(copied
        ? "결과 PNG를 저장하고 도전 링크를 복사했어요."
        : "결과 PNG를 저장했어요. 링크는 주소창에서 복사해 주세요.");
    });
  }

  function shareResult() {
    if (!shareBlob) {
      copyText(SHARE_URL).then(function (copied) {
        showToast(copied ? "도전 링크를 복사했어요." : "주소창에서 도전 링크를 복사해 주세요.");
      });
      return;
    }

    var file = new File([shareBlob], "tiny-defense-axe-" + shareScore + ".png", { type: "image/png" });
    var payload = {
      title: "Tiny Defense 도끼질 챌린지",
      text: shareMessage(shareScore),
      url: SHARE_URL,
      files: [file]
    };

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share(payload).then(function () {
        document.body.dataset.shareState = "shared";
      }).catch(function (error) {
        if (error && error.name === "AbortError") {
          document.body.dataset.shareState = "cancelled";
          showToast("공유를 취소했어요.");
          return;
        }
        fallbackShare(shareBlob);
      });
      return;
    }

    fallbackShare(shareBlob);
  }

  function loadSheets(done) {
    var keys = Object.keys(sheets);
    var remaining = keys.length;
    keys.forEach(function (key) {
      var sheet = sheets[key];
      var image = new Image();
      image.onload = function () {
        sheet.img = image;
        remaining -= 1;
        if (remaining === 0) done();
      };
      image.onerror = function () {
        remaining -= 1;
        if (remaining === 0) done();
      };
      image.src = sheet.src;
    });
  }

  function handleChop(event) {
    if (event) event.preventDefault();
    chop();
  }

  function beginCanvasTap(event) {
    if (event.button !== undefined && event.button !== 0) return;
    canvasPointer = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      marker: marker,
      zoneCenter: zoneC,
      zoneHalfWidth: zoneHW,
      score: score,
      eligible: running && !resultVisible && inputLock <= 0 && chopT <= 0
    };
  }

  function finishCanvasTap(event) {
    if (!canvasPointer || canvasPointer.id !== event.pointerId) return;
    var pointer = canvasPointer;
    var dx = event.clientX - pointer.x;
    var dy = event.clientY - pointer.y;
    canvasPointer = null;
    if (!pointer.eligible || pointer.score !== score || Math.hypot(dx, dy) > 12) return;
    event.preventDefault();
    chop(pointer);
  }

  function cancelCanvasTap() {
    canvasPointer = null;
  }

  chopBtn.addEventListener("click", handleChop);
  chopBtn.addEventListener("keydown", function (event) {
    if (event.repeat && (event.key === "Enter" || event.code === "Space" || event.key === " ")) {
      event.preventDefault();
    }
  });
  canvas.addEventListener("pointerdown", beginCanvasTap);
  canvas.addEventListener("pointerup", finishCanvasTap);
  canvas.addEventListener("pointercancel", cancelCanvasTap);
  retryBtn.addEventListener("click", restart);
  shareBtn.addEventListener("click", shareResult);
  window.addEventListener("resize", resize);
  window.addEventListener("storage", function (event) {
    if (event.key !== BEST_KEY) return;
    var storedBest = readBest();
    if (storedBest < best) writeBest(best);
    else best = storedBest;
    setHud();
  });
  window.addEventListener("keydown", function (event) {
    if (resultVisible && event.key === "Tab") {
      var focusable = Array.prototype.slice.call(resultOverlay.querySelectorAll("button:not(:disabled), a[href]"));
      if (focusable.length) {
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      return;
    }
    var interactiveTarget = event.target && event.target.closest
      ? event.target.closest("button, a, input, select, textarea")
      : null;
    var canvasEnter = event.key === "Enter" && event.target === canvas;
    var gameSpace = (event.code === "Space" || event.key === " ") && !interactiveTarget;
    if (!resultVisible && (canvasEnter || gameSpace)) {
      event.preventDefault();
      if (event.repeat) return;
      chop();
    }
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      renderingActive = entries.some(function (entry) { return entry.isIntersecting; });
      if (renderingActive) lastFrame = 0;
    }, { threshold: 0.01 }).observe(canvas);
  }

  Object.defineProperty(window, "__tinyDefenseDemoState", {
    configurable: false,
    enumerable: false,
    value: function () {
      return Object.freeze({
        score: score,
        best: best,
        marker: marker,
        zoneCenter: zoneC,
        zoneHalfWidth: zoneHW,
        speed: speed,
        minZoneHalfWidth: MIN_ZONE_HW,
        running: running,
        resultVisible: resultVisible,
        inputLocked: inputLock > 0 || chopT > 0,
        shareState: document.body.dataset.shareState || "idle",
        storeUrl: STORE_URL
      });
    }
  });

  bestTotalEl.textContent = String(best);
  setHud();
  updateDifficulty();
  rollZone();
  resize();
  document.body.dataset.shareState = "idle";
  loadSheets(function () {
    resize();
    window.requestAnimationFrame(frame);
  });
}());
