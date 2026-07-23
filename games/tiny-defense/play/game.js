(function () {
  "use strict";

  var queryParameters = new URLSearchParams(window.location.search);
  var requestedLocale = queryParameters.get("lang");
  var locale = requestedLocale === "en" || requestedLocale === "ja" || requestedLocale === "ko"
    ? requestedLocale
    : "ko";
  var LOCALES = {
    ko: {
      htmlLocale: "ko_KR",
      title: "도끼질 챌린지 · Tiny Defense | OneStep Studio",
      description: "한 번의 실수로 끝나는 Tiny Defense 도끼질 점수 어택. 나무 최고 기록에 도전하고 결과를 공유하세요.",
      ogTitle: "Tiny Defense 도끼질 챌린지 | 최고 기록에 도전",
      ogDescription: "황금 존을 놓치는 순간 끝! 연속 도끼질로 나무 최고 기록에 도전하세요.",
      pageUrl: "https://onestep-studio.github.io/games/tiny-defense/",
      backUrl: "/games/tiny-defense/",
      shareUrl: "https://onestep-studio.github.io/games/tiny-defense/#axe-challenge",
      cardUrl: "onestep-studio.github.io/games/tiny-defense",
      canvasLabel: "Tiny Defense 도끼질 챌린지. 게임 시작을 누른 뒤, 황금 존에 마커가 들어왔을 때 화면이나 도끼질 버튼을 누르세요.",
      hudLabel: "현재 기록",
      woodLabel: "나무",
      startKicker: "준비되면",
      startLabel: "게임 시작",
      readyMessage: "게임 시작을 눌러주세요",
      readyStatus: "게임 시작을 누르면 마커가 움직입니다.",
      startStatus: "도전이 시작됐습니다. 최고 기록 {best}개.",
      chopKicker: "황금 존에 맞춰",
      chopLabel: "도끼질!",
      hintHtml: "명중 +1 · 중앙 PERFECT +2 · 성공할수록 빨라집니다.<br>한 번 빗나가면 끝 · <kbd>스페이스</kbd> / 화면 탭",
      resultEyebrow: "AXE CHALLENGE · RESULT",
      newRecord: "신기록!",
      resultScoreLabel: "이번 기록",
      scorePrefix: "나무 ",
      scoreSuffix: "개",
      bestLabel: "최고",
      retry: "다시 하기",
      share: "공유하기",
      store: "원스토어에서 플레이",
      initialMessage: "황금 존을 노려라",
      hitMessage: "명중!",
      perfectMessage: "PERFECT!",
      missMessage: "빗나감!",
      restartStatus: "새 도전이 시작됐습니다. 최고 기록 {best}개.",
      hitStatus: "{judgement} 나무 {score}개, 최고 {best}개.",
      hitJudgement: "명중.",
      perfectJudgement: "퍼펙트.",
      gameOverStatus: "게임 오버. 최종 기록 나무 {score}개, 최고 {best}개.",
      tiers: [
        { title: "도끼 새싹", copy: "첫 도끼는 과감했습니다. 황금 존에 시선을 고정해보세요." },
        { title: "숲길 견습생", copy: "감각을 깨우는 중입니다. 다음 다섯 개를 이어보세요." },
        { title: "리듬 나무꾼", copy: "손끝에 리듬이 붙었습니다. 속도가 올라가도 흔들리지 마세요." },
        { title: "노련한 벌목꾼", copy: "짧아진 황금 존도 읽어내는 노련함이 보입니다." },
        { title: "황금손 벌목장인", copy: "황금 타이밍을 다룹니다. 이제부터는 기록 싸움입니다." },
        { title: "숲의 개척자", copy: "도끼 한 자루로 새로운 숲길을 열고 있습니다." },
        { title: "숲의 수호자", copy: "속도보다 먼저 움직입니다. 전설이 가까워졌어요." },
        { title: "전설의 벌목꾼", copy: "숲 전체가 당신의 도끼 소리를 기억합니다." },
        { title: "황금 숲의 영웅", copy: "황금 존이 오히려 당신을 따라오는 듯합니다." },
        { title: "도끼질의 달인", copy: "흔들림 없는 연속 기록. 달인의 경지입니다." },
        { title: "숲이 기억한 이름", copy: "숲이 당신의 이름을 새겼습니다. 기록을 공유해보세요." },
        { title: "세계수의 챔피언", copy: "세계수 앞에서도 멈추지 않는 챔피언입니다." },
        { title: "Tiny Defense의 전설", copy: "누구도 쉽게 닿지 못할 전설적인 기록입니다." }
      ],
      timingGold: "GOLDEN ZONE",
      timingScore: "SCORE",
      cardEyebrow: "AXE CHALLENGE · FINAL SCORE",
      cardWood: "나무",
      cardScore: "{score}개",
      cardBest: "최고 기록  {best}",
      cardCta: "당신은 몇 개까지 이어갈 수 있나요?",
      shareTitle: "Tiny Defense 도끼질 챌린지",
      shareText: "Tiny Defense 도끼질 챌린지에서 나무 {score}개 기록! 당신은 몇 개까지 이어갈 수 있나요?",
      savePng: "이미지 보기",
      saveHint: "아래 결과 이미지를 길게 눌러 저장하거나 공유하세요.",
      sharePreparing: "카드 준비 중…",
      shareRebuild: "카드 다시 만들기",
      shareRebuilding: "결과 카드를 다시 만들고 있어요.",
      fallbackSaved: "공유가 막혀 결과 이미지를 열었어요. 길게 눌러 저장하거나 공유하세요.",
      fallbackNoCopy: "공유가 막혀 결과 이미지를 열었어요. 길게 눌러 저장하거나 공유하세요.",
      shareCancelled: "공유를 취소했어요.",
      pngError: "PNG 카드 생성 실패"
    },
    en: {
      htmlLocale: "en_US",
      title: "Axe Challenge · Tiny Defense | OneStep Studio",
      description: "One miss ends the run in Tiny Defense's Axe Challenge. Chase a new high score and share the result.",
      ogTitle: "Tiny Defense Axe Challenge | Beat Your Best",
      ogDescription: "Miss the gold zone and it's over. Chain together clean chops and set a new high score.",
      pageUrl: "https://onestep-studio.github.io/en/games/tiny-defense/",
      backUrl: "/en/games/tiny-defense/",
      shareUrl: "https://onestep-studio.github.io/en/games/tiny-defense/#axe-challenge",
      cardUrl: "onestep-studio.github.io/en/games/tiny-defense",
      canvasLabel: "Tiny Defense Axe Challenge. Press Start Game, then tap the screen or press the Chop button when the marker enters the gold zone.",
      hudLabel: "Current score",
      woodLabel: "WOOD",
      startKicker: "WHEN YOU'RE READY",
      startLabel: "START GAME",
      readyMessage: "PRESS START GAME",
      readyStatus: "Press Start Game to set the marker in motion.",
      startStatus: "Challenge started. Best: {best} wood.",
      chopKicker: "TIME THE GOLD ZONE",
      chopLabel: "CHOP!",
      hintHtml: "HIT +1 · CENTER PERFECT +2 · FASTER WITH EVERY HIT<br>ONE MISS ENDS THE RUN · <kbd>SPACE</kbd> / TAP",
      resultEyebrow: "AXE CHALLENGE · RESULT",
      newRecord: "NEW BEST!",
      resultScoreLabel: "THIS RUN",
      scorePrefix: "",
      scoreSuffix: " WOOD",
      bestLabel: "BEST",
      retry: "Try Again",
      share: "Share",
      store: "Play on ONE store",
      initialMessage: "Aim for the gold zone",
      hitMessage: "HIT!",
      perfectMessage: "PERFECT!",
      missMessage: "MISS!",
      restartStatus: "New challenge started. Best: {best} wood.",
      hitStatus: "{judgement} {score} wood, best {best}.",
      hitJudgement: "Hit.",
      perfectJudgement: "Perfect.",
      gameOverStatus: "Game over. Final score: {score} wood. Best: {best}.",
      tiers: [
        { title: "Axe Rookie", copy: "A bold first swing. Keep your eyes fixed on the gold zone." },
        { title: "Forest Apprentice", copy: "Your instincts are waking up. Chain together the next five." },
        { title: "Rhythm Lumberjack", copy: "You've found the rhythm. Stay steady as the pace climbs." },
        { title: "Seasoned Lumberjack", copy: "You can read the shrinking gold zone like a veteran." },
        { title: "Golden-Handed Master", copy: "You command the golden timing. Now the record chase begins." },
        { title: "Forest Pioneer", copy: "You're carving a new trail through the forest, one swing at a time." },
        { title: "Guardian of the Grove", copy: "You're moving ahead of the marker. Legend is getting close." },
        { title: "Legendary Lumberjack", copy: "The whole forest remembers the sound of your axe." },
        { title: "Hero of the Golden Grove", copy: "It feels as though the gold zone is following you now." },
        { title: "Master of the Axe", copy: "An unbroken streak with no hesitation. True mastery." },
        { title: "The Name the Forest Remembers", copy: "The forest has carved your name into legend. Share the record." },
        { title: "World Tree Champion", copy: "Not even the World Tree can stop this champion." },
        { title: "Tiny Defense Legend", copy: "A legendary score that few challengers will ever reach." }
      ],
      timingGold: "GOLD ZONE",
      timingScore: "SCORE",
      cardEyebrow: "AXE CHALLENGE · FINAL SCORE",
      cardWood: "WOOD",
      cardScore: "{score}",
      cardBest: "BEST  {best}",
      cardCta: "How long can you keep the streak alive?",
      shareTitle: "Tiny Defense Axe Challenge",
      shareText: "I scored {score} wood in the Tiny Defense Axe Challenge. How long can you keep the streak alive?",
      savePng: "View Image",
      saveHint: "Long-press the result image below to save or share it.",
      sharePreparing: "Preparing card…",
      shareRebuild: "Rebuild card",
      shareRebuilding: "Rebuilding your result card.",
      fallbackSaved: "Sharing was blocked, so the result image is open. Long-press it to save or share.",
      fallbackNoCopy: "Sharing was blocked, so the result image is open. Long-press it to save or share.",
      shareCancelled: "Sharing canceled.",
      pngError: "Could not generate the PNG card"
    },
    ja: {
      htmlLocale: "ja_JP",
      title: "木こりチャレンジ · Tiny Defense | OneStep Studio",
      description: "一度でも外せば即終了の『Tiny Defense』木こりスコアアタック。丸太のベストスコアに挑戦し、結果をシェアしよう。",
      ogTitle: "Tiny Defense 木こりチャレンジ | ベストスコアに挑戦",
      ogDescription: "ゴールドゾーンを外した瞬間ゲームオーバー！連続で斧を振り、丸太のベストスコアに挑戦しよう。",
      pageUrl: "https://onestep-studio.github.io/ja/games/tiny-defense/",
      backUrl: "/ja/games/tiny-defense/",
      shareUrl: "https://onestep-studio.github.io/ja/games/tiny-defense/#axe-challenge",
      cardUrl: "onestep-studio.github.io/ja/games/tiny-defense",
      canvasLabel: "Tiny Defense 木こりチャレンジ。「ゲーム開始」を押したあと、マーカーがゴールドゾーンに入っている間に、画面または「斧を振る」ボタンを押してください。",
      hudLabel: "現在のスコア",
      woodLabel: "丸太",
      startKicker: "準備ができたら",
      startLabel: "ゲーム開始",
      readyMessage: "ゲーム開始を押してください",
      readyStatus: "「ゲーム開始」を押すとマーカーが動きます。",
      startStatus: "チャレンジ開始。ベストスコアは{best}本です。",
      chopKicker: "ゴールドゾーンに合わせて",
      chopLabel: "斧を振る！",
      hintHtml: "命中 +1 · 中央 PERFECT +2 · 成功するほど速くなります。<br>一度でも外せば終了 · <kbd>スペース</kbd> / 画面をタップ",
      resultEyebrow: "AXE CHALLENGE · RESULT",
      newRecord: "新記録！",
      resultScoreLabel: "今回のスコア",
      scorePrefix: "丸太 ",
      scoreSuffix: "本",
      bestLabel: "ベスト",
      retry: "もう一度",
      share: "シェアする",
      store: "ONE storeでプレイ",
      initialMessage: "ゴールドゾーンを狙え",
      hitMessage: "命中！",
      perfectMessage: "PERFECT!",
      missMessage: "ミス！",
      restartStatus: "新しいチャレンジが始まりました。ベストスコアは{best}本です。",
      hitStatus: "{judgement} 丸太{score}本、ベスト{best}本。",
      hitJudgement: "命中。",
      perfectJudgement: "パーフェクト。",
      gameOverStatus: "ゲームオーバー。最終スコアは丸太{score}本、ベスト{best}本です。",
      tiers: [
        { title: "斧のルーキー", copy: "大胆な最初の一振り。ゴールドゾーンに狙いを定めましょう。" },
        { title: "森の見習い", copy: "感覚が目覚めてきました。次の5本をつなげましょう。" },
        { title: "リズム木こり", copy: "指先がリズムを捉えました。速くなっても焦らずに。" },
        { title: "熟練の木こり", copy: "狭くなるゴールドゾーンも、しっかり見切れています。" },
        { title: "黄金の伐採名人", copy: "黄金のタイミングを操る名人。ここからは記録勝負です。" },
        { title: "森の開拓者", copy: "斧一本で、新しい森の道を切り開いています。" },
        { title: "森の守護者", copy: "マーカーより先に動けています。伝説はもうすぐです。" },
        { title: "伝説の木こり", copy: "森じゅうが、あなたの斧の音を覚えています。" },
        { title: "黄金の森の英雄", copy: "ゴールドゾーンのほうが、あなたを追っているようです。" },
        { title: "斧の達人", copy: "迷いのない連続記録。まさに達人の境地です。" },
        { title: "森に刻まれた名", copy: "森にその名が刻まれました。この記録をシェアしましょう。" },
        { title: "世界樹の王者", copy: "世界樹を前にしても止まらない、真の王者です。" },
        { title: "Tiny Defenseの伝説", copy: "誰もが簡単には届かない、伝説級の記録です。" }
      ],
      timingGold: "GOLDEN ZONE",
      timingScore: "SCORE",
      cardEyebrow: "AXE CHALLENGE · FINAL SCORE",
      cardWood: "丸太",
      cardScore: "{score}",
      cardBest: "ベストスコア  {best}本",
      cardCta: "あなたは何本までつなげられますか？",
      shareTitle: "Tiny Defense 木こりチャレンジ",
      shareText: "Tiny Defense 木こりチャレンジで丸太{score}本を記録！あなたは何本までつなげられますか？",
      savePng: "画像を表示",
      saveHint: "下のリザルト画像を長押しして保存または共有してください。",
      sharePreparing: "リザルトカードを準備中…",
      shareRebuild: "カードを再作成",
      shareRebuilding: "リザルトカードを再作成しています。",
      fallbackSaved: "共有がブロックされたため、リザルト画像を表示しました。長押しして保存または共有してください。",
      fallbackNoCopy: "共有がブロックされたため、リザルト画像を表示しました。長押しして保存または共有してください。",
      shareCancelled: "シェアをキャンセルしました。",
      pngError: "PNGカードの生成に失敗しました"
    }
  };
  var copy = LOCALES[locale];
  var FONT_STACK = locale === "ja"
    ? 'Inter, "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif'
    : "Inter, Pretendard, Arial, sans-serif";

  var LW = 720;
  var LH = 960;
  var BEST_KEY = "td_demo_best";
  var SHARE_URL = copy.shareUrl;
  var STORE_URL = "https://m.onestore.co.kr/v2/ko-kr/app/0001007324";
  var BASE_SPEED = 0.78;
  var SPEED_STEP = 0.065;
  var MAX_SPEED = 2.45;
  var BASE_ZONE_HW = 0.135;
  var ZONE_STEP = 0.0035;
  var MIN_ZONE_HW = 0.045;
  var HIT_EDGE_GRACE = 4 / 496;
  var CHOP_DUR = 0.38;
  var TREE_X = 415;
  var TREE_BASE_Y = 700;
  var PAWN_X = 292;
  var PAWN_BASE_Y = 747;
  var CHOP_AUDIO_URL = "./assets/sfx-chop.wav?v=score-attack-9";
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
  var resultTierEl = document.getElementById("resultTier");
  var resultCopyEl = document.getElementById("resultCopy");
  var newRecordEl = document.getElementById("newRecord");
  var retryBtn = document.getElementById("retryBtn");
  var shareBtn = document.getElementById("shareBtn");
  var savePngBtn = document.getElementById("savePngBtn");
  var savePanel = document.getElementById("savePanel");
  var savePanelHint = document.getElementById("savePanelHint");
  var savePreview = document.getElementById("savePreview");
  var toast = document.getElementById("toast");
  var chopSfx = document.getElementById("chopSfx");

  applyLocalization();

  if (queryParameters.has("embed")) {
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
  var hitCount = 0;
  var best = readBest();
  var marker = 0.025;
  var dir = 1;
  var speed = BASE_SPEED;
  var zoneC = 0.54;
  var zoneHW = BASE_ZONE_HW;
  var started = false;
  var running = false;
  var resultVisible = false;
  var inputLock = 0;
  var chopT = 0;
  var missFlashT = 0;
  var hitGlowT = 0;
  var shakeT = 0;
  var resultDelay = 0;
  var message = copy.readyMessage;
  var messageT = Number.POSITIVE_INFINITY;
  var messagePerfect = false;
  var particles = [];
  var floats = [];
  var shareBlob = null;
  var shareCardPromise = null;
  var shareScore = 0;
  var shareBest = 0;
  var shareGeneration = 0;
  var savePreviewUrl = "";
  var toastTimer = 0;
  var lastFrame = 0;
  var suppressPointerClick = false;
  var renderingActive = true;
  var chopSoundPlays = 0;
  var chopSoundMode = "loading";
  var chopSoundError = "";
  var AudioContextClass = window.AudioContext || window.webkitAudioContext;
  var chopAudioContext = null;
  var chopAudioBuffer = null;
  var chopAudioLoadPromise = null;

  function formatText(template, values) {
    return template.replace(/\{([a-z]+)\}/gi, function (match, key) {
      return Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match;
    });
  }

  function setShareButton(label, showIcon) {
    shareBtn.textContent = "";
    if (showIcon) {
      var icon = document.createElement("span");
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "↗";
      shareBtn.appendChild(icon);
      shareBtn.appendChild(document.createTextNode(" "));
    }
    shareBtn.appendChild(document.createTextNode(label));
  }

  function setMetaContent(selector, value) {
    var element = document.querySelector(selector);
    if (element) element.setAttribute("content", value);
  }

  function applyLocalization() {
    document.documentElement.lang = locale;
    document.body.dataset.locale = locale;
    document.title = copy.title;
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", copy.pageUrl);
    setMetaContent('meta[name="description"]', copy.description);
    setMetaContent('meta[property="og:locale"]', copy.htmlLocale);
    setMetaContent('meta[property="og:title"]', copy.ogTitle);
    setMetaContent('meta[property="og:description"]', copy.ogDescription);
    setMetaContent('meta[property="og:url"]', copy.pageUrl);

    document.getElementById("backLink").setAttribute("href", copy.backUrl);
    canvas.setAttribute("aria-label", copy.canvasLabel);
    document.getElementById("scoreHud").setAttribute("aria-label", copy.hudLabel);
    document.getElementById("woodLabel").textContent = copy.woodLabel;
    document.getElementById("chopKicker").textContent = copy.startKicker;
    document.getElementById("chopLabel").textContent = copy.startLabel;
    document.getElementById("gameHint").innerHTML = copy.hintHtml;
    document.getElementById("resultEyebrow").textContent = copy.resultEyebrow;
    document.getElementById("newRecordLabel").textContent = copy.newRecord;
    document.getElementById("resultScoreLabel").textContent = copy.resultScoreLabel;
    document.getElementById("resultScorePrefix").textContent = copy.scorePrefix;
    document.getElementById("resultScoreSuffix").textContent = copy.scoreSuffix;
    document.getElementById("resultBestLabel").textContent = copy.bestLabel;
    retryBtn.textContent = copy.retry;
    setShareButton(copy.share, true);
    savePngBtn.textContent = copy.savePng;
    savePanelHint.textContent = copy.saveHint;
    savePreview.setAttribute("alt", copy.ogDescription);
    document.getElementById("storeButtonLabel").textContent = copy.store;
    resultTierEl.textContent = copy.tiers[0].title;
    resultCopyEl.textContent = copy.tiers[0].copy;
  }

  function setChopButtonMode() {
    document.getElementById("chopKicker").textContent = started ? copy.chopKicker : copy.startKicker;
    document.getElementById("chopLabel").textContent = started ? copy.chopLabel : copy.startLabel;
    chopBtn.dataset.mode = started ? "chop" : "start";
  }

  function startGame() {
    if (started || resultVisible) return;
    started = true;
    running = true;
    inputLock = 0;
    lastFrame = 0;
    message = copy.initialMessage;
    messageT = 1.05;
    messagePerfect = false;
    document.body.dataset.gameState = "running";
    setChopButtonMode();
    gameStatus.textContent = formatText(copy.startStatus, { best: best });
    ensureChopAudio();
  }

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
    speed = currentSpeed(hitCount);
    zoneHW = currentZoneHW(hitCount);
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
    hitCount = 0;
    marker = 0.025;
    dir = 1;
    started = true;
    running = true;
    resultVisible = false;
    inputLock = 0.16;
    chopT = 0;
    missFlashT = 0;
    hitGlowT = 0;
    shakeT = 0;
    resultDelay = 0;
    message = copy.initialMessage;
    messageT = 1.05;
    messagePerfect = false;
    particles.length = 0;
    floats.length = 0;
    shareBlob = null;
    shareCardPromise = null;
    shareGeneration += 1;
    newRecordEl.hidden = true;
    savePngBtn.hidden = true;
    hideSavePanel();
    document.body.dataset.shareState = "idle";
    resultOverlay.dataset.shareBytes = "0";
    document.body.dataset.gameState = "running";
    setChopButtonMode();
    updateDifficulty();
    rollZone();
    setHud();
    gameStatus.textContent = formatText(copy.restartStatus, { best: best });
  }

  function replayAnimation(element, className) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
  }

  function rememberChopSoundError(error) {
    chopSoundError = error && error.name
      ? error.name + (error.message ? ": " + error.message : "")
      : String(error || "unknown audio error");
    chopSoundMode = "error";
  }

  function decodeChopAudio(context, encodedAudio) {
    return new Promise(function (resolve, reject) {
      var settled = false;
      function finish(buffer) {
        if (settled) return;
        settled = true;
        resolve(buffer);
      }
      function fail(error) {
        if (settled) return;
        settled = true;
        reject(error);
      }
      try {
        var decoding = context.decodeAudioData(encodedAudio.slice(0), finish, fail);
        if (decoding && typeof decoding.then === "function") decoding.then(finish, fail);
      } catch (error) {
        fail(error);
      }
    });
  }

  function ensureChopAudio() {
    if (!AudioContextClass) {
      if (chopSoundMode === "loading") chopSoundMode = "media-ready";
      return null;
    }
    if (chopAudioContext && chopAudioContext.state === "closed") {
      chopAudioContext = null;
      chopAudioBuffer = null;
      chopAudioLoadPromise = null;
    }
    if (!chopAudioContext) {
      try {
        chopAudioContext = new AudioContextClass();
      } catch (error) {
        rememberChopSoundError(error);
        return null;
      }
    }
    if (!chopAudioLoadPromise && window.fetch) {
      chopAudioLoadPromise = window.fetch(CHOP_AUDIO_URL, { cache: "force-cache" })
        .then(function (response) {
          if (!response.ok) throw new Error("chop audio HTTP " + response.status);
          return response.arrayBuffer();
        })
        .then(function (encodedAudio) {
          return decodeChopAudio(chopAudioContext, encodedAudio);
        })
        .then(function (buffer) {
          chopAudioBuffer = buffer;
          chopSoundMode = "ready";
          chopSoundError = "";
          return buffer;
        })
        .catch(function (error) {
          rememberChopSoundError(error);
          return null;
        });
    }
    return chopAudioContext;
  }

  function unlockChopAudio() {
    var context = ensureChopAudio();
    if (!context || context.state === "running" || context.state === "closed") return;
    try {
      var silentSource = context.createBufferSource();
      silentSource.buffer = context.createBuffer(1, 1, context.sampleRate);
      silentSource.connect(context.destination);
      silentSource.start(0);
      silentSource.onended = function () { silentSource.disconnect(); };
    } catch (error) {
      rememberChopSoundError(error);
    }
    try {
      var resumed = context.resume();
      if (resumed && typeof resumed.catch === "function") {
        resumed.catch(rememberChopSoundError);
      }
    } catch (error) {
      rememberChopSoundError(error);
    }
  }

  function playDecodedChop(context) {
    if (!context || !chopAudioBuffer || context.state !== "running") return false;
    try {
      var source = context.createBufferSource();
      var gain = context.createGain();
      source.buffer = chopAudioBuffer;
      source.playbackRate.value = 0.94 + Math.random() * 0.12;
      gain.gain.value = 0.9;
      source.connect(gain);
      gain.connect(context.destination);
      source.onended = function () {
        source.disconnect();
        gain.disconnect();
      };
      source.start(0);
      chopSoundPlays += 1;
      chopSoundMode = "webaudio";
      chopSoundError = "";
      return true;
    } catch (error) {
      rememberChopSoundError(error);
      return false;
    }
  }

  function playMediaChop() {
    if (!chopSfx) return;
    chopSfx.pause();
    try { chopSfx.currentTime = 0; } catch (error) { /* metadata may still be loading */ }
    chopSfx.volume = 0.9;
    chopSfx.muted = false;
    chopSfx.playbackRate = 1;
    var settled = false;
    function cleanup() {
      chopSfx.removeEventListener("playing", confirmPlayback);
      chopSfx.removeEventListener("error", rejectPlayback);
    }
    function confirmPlayback() {
      if (settled) return;
      settled = true;
      cleanup();
      chopSoundPlays += 1;
      chopSoundMode = "media";
      chopSoundError = "";
    }
    function rejectPlayback(error) {
      if (settled) return;
      settled = true;
      cleanup();
      if (chopSfx.error) {
        rememberChopSoundError({
          name: "MediaError " + chopSfx.error.code,
          message: chopSfx.error.message || "HTML audio playback failed"
        });
      } else {
        rememberChopSoundError(error);
      }
    }
    chopSfx.addEventListener("playing", confirmPlayback);
    chopSfx.addEventListener("error", rejectPlayback);
    try {
      var started = chopSfx.play();
      if (started && typeof started.then === "function") {
        started.then(confirmPlayback).catch(rejectPlayback);
      }
    } catch (error) {
      rejectPlayback(error);
    }
  }

  function playChopSfx() {
    var context = ensureChopAudio();
    if (playDecodedChop(context)) return;
    playMediaChop();
    unlockChopAudio();
  }

  function chop() {
    if (!running || resultVisible || inputLock > 0 || chopT > 0) return;

    var distance = Math.abs(marker - zoneC);
    chopT = CHOP_DUR;
    inputLock = CHOP_DUR * 0.9;
    playChopSfx();

    if (distance <= zoneHW + HIT_EDGE_GRACE) {
      var perfect = distance <= zoneHW * 0.3;
      var gainedWood = perfect ? 2 : 1;
      score += gainedWood;
      hitCount += 1;
      hitGlowT = perfect ? 0.48 : 0.34;
      message = perfect ? copy.perfectMessage : copy.hitMessage;
      messageT = perfect ? 0.64 : 0.46;
      messagePerfect = perfect;
      if (perfect && !reducedMotion) shakeT = 0.13;
      spawnWoodChips(perfect);
      floats.push({
        x: TREE_X - 29,
        y: TREE_BASE_Y - 179,
        life: 0.92,
        maxLife: 0.92,
        perfect: perfect,
        amount: gainedWood
      });
      replayAnimation(woodBadge, "score-pop");
      updateDifficulty();
      rollZone();
      setHud();
      gameStatus.textContent = formatText(copy.hitStatus, {
        judgement: perfect ? copy.perfectJudgement : copy.hitJudgement,
        score: score,
        best: best
      });
      return;
    }

    gameOver();
  }

  function gameOver() {
    running = false;
    document.body.dataset.gameState = "ended";
    missFlashT = 0.42;
    resultDelay = 0.34;
    message = copy.missMessage;
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
    gameStatus.textContent = formatText(copy.gameOverStatus, { score: score, best: best });
  }

  function tierForScore(value) {
    var index = Math.min(copy.tiers.length - 1, Math.floor(Math.max(0, value) / 5));
    return {
      index: index,
      title: copy.tiers[index].title,
      copy: copy.tiers[index].copy
    };
  }

  function populateResult(isRecord) {
    var tier = tierForScore(score);
    resultScoreEl.textContent = String(score);
    resultBestEl.textContent = String(best);
    resultTierEl.textContent = tier.title;
    resultCopyEl.textContent = tier.copy;
    resultOverlay.dataset.tierIndex = String(tier.index);
    resultOverlay.dataset.tierTitle = tier.title;
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
        x: TREE_X - 52 + Math.random() * 25,
        y: TREE_BASE_Y - 129 + Math.random() * 24,
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
    ctx.ellipse(378, 706, 175, 29, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    drawSheet(sheets.tree, 0, TREE_X, TREE_BASE_Y, 270);

    if (chopT > 0) {
      var chopProgress = Math.max(0, Math.min(0.999, 1 - chopT / CHOP_DUR));
      drawSheet(sheets.chop, Math.floor(chopProgress * sheets.chop.frames), PAWN_X, PAWN_BASE_Y, 230);
    } else {
      drawSheet(sheets.idle, Math.floor(time * 5.5), PAWN_X, PAWN_BASE_Y, 230);
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
    ctx.font = "900 16px " + FONT_STACK;
    ctx.textAlign = "left";
    ctx.letterSpacing = "1px";
    ctx.fillText(copy.timingGold, trackX, 782);
    ctx.textAlign = "right";
    ctx.fillStyle = "#a97713";
    ctx.fillText(copy.timingScore + "  " + score, trackX + trackW, 782);

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
      var amountText = "+" + (item.amount || 1);
      var alpha = Math.min(1, item.life * 2.4);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.textAlign = "center";
      ctx.font = "950 " + (item.perfect ? 46 : 40) + "px " + FONT_STACK;
      ctx.lineWidth = 7;
      ctx.strokeStyle = "rgba(249,246,236,.88)";
      ctx.strokeText(amountText, item.x, item.y);
      ctx.fillStyle = item.perfect ? "#b47708" : "#2f624d";
      ctx.fillText(amountText, item.x, item.y);
      ctx.restore();
    }
  }

  function drawMessage() {
    if (messageT <= 0 || !message) return;
    ctx.save();
    ctx.globalAlpha = Math.min(1, messageT * 3.2);
    ctx.textAlign = "center";
    ctx.font = "950 " + (messagePerfect ? 47 : 40) + "px " + FONT_STACK;
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
      var tier = tierForScore(value);
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
      cardCtx.font = "900 25px " + FONT_STACK;
      cardCtx.textAlign = "left";
      cardCtx.fillText("ONESTEP", 270, 132);
      cardCtx.fillStyle = "#fffaf0";
      cardCtx.font = "950 55px " + FONT_STACK;
      cardCtx.fillText("TINY DEFENSE", 270, 198);

      cardCtx.fillStyle = "rgba(255,255,255,.12)";
      roundedPath(cardCtx, 90, 300, 900, 610, 34);
      cardCtx.fill();
      cardCtx.strokeStyle = "rgba(229,184,62,.32)";
      cardCtx.lineWidth = 2;
      cardCtx.stroke();

      cardCtx.fillStyle = "#e5b83e";
      cardCtx.font = "900 29px " + FONT_STACK;
      cardCtx.textAlign = "center";
      cardCtx.fillText(copy.cardEyebrow, 540, 390);

      if (shareWood.naturalWidth) {
        cardCtx.imageSmoothingEnabled = false;
        cardCtx.drawImage(shareWood, 270, 468, 112, 70);
      }
      cardCtx.fillStyle = "#fffdf5";
      cardCtx.font = "950 72px " + FONT_STACK;
      cardCtx.textAlign = "left";
      cardCtx.fillText(copy.cardWood, 405, 530);

      var scoreFont = value >= 1000 ? 172 : value >= 100 ? 200 : 222;
      cardCtx.fillStyle = "#f7dc82";
      cardCtx.font = "950 " + scoreFont + "px " + FONT_STACK;
      cardCtx.textAlign = "center";
      cardCtx.fillText(formatText(copy.cardScore, { score: value }), 540, 750);

      cardCtx.fillStyle = "rgba(255,255,255,.72)";
      cardCtx.font = "800 42px " + FONT_STACK;
      cardCtx.fillText(formatText(copy.cardBest, { best: bestValue }), 540, 838);

      cardCtx.fillStyle = "#e5b83e";
      cardCtx.font = "950 34px " + FONT_STACK;
      cardCtx.fillText(tier.title, 540, 888);

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
      cardCtx.font = "900 33px " + FONT_STACK;
      cardCtx.textAlign = "center";
      cardCtx.fillText(copy.cardCta, 540, 1132);
      cardCtx.fillStyle = "rgba(255,255,255,.64)";
      cardCtx.font = "700 24px " + FONT_STACK;
      cardCtx.fillText(copy.cardUrl, 540, 1194);
      cardCtx.fillStyle = "#e5b83e";
      cardCtx.font = "900 22px " + FONT_STACK;
      cardCtx.fillText("PLAY · RISK · REPEAT", 540, 1250);

      return new Promise(function (resolve, reject) {
        card.toBlob(function (blob) {
          if (blob) resolve(blob);
          else reject(new Error(copy.pngError));
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
    setShareButton(copy.sharePreparing, false);
    document.body.dataset.shareState = "generating";
    shareCardPromise = createShareCard(cardScore, cardBest)
      .then(function (blob) {
        if (generation !== shareGeneration) return null;
        shareBlob = blob;
        shareBtn.disabled = false;
        setShareButton(copy.share, true);
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
        setShareButton(copy.shareRebuild, false);
        document.body.dataset.shareState = "error";
        return null;
      });
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

  function hideSavePanel() {
    savePanel.hidden = true;
    savePreview.removeAttribute("src");
    if (savePreviewUrl) {
      URL.revokeObjectURL(savePreviewUrl);
      savePreviewUrl = "";
    }
  }

  function showSavePanel(blob) {
    if (savePreviewUrl) URL.revokeObjectURL(savePreviewUrl);
    savePreviewUrl = URL.createObjectURL(blob);
    savePreview.src = savePreviewUrl;
    savePanel.hidden = false;
    savePngBtn.hidden = false;
    document.body.dataset.shareState = "fallback";
    window.setTimeout(function () {
      savePanel.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
    }, 40);
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
    showSavePanel(blob);
    downloadPng(blob, shareScore);
    copyText(SHARE_URL).then(function (copied) {
      showToast(copied
        ? copy.fallbackSaved
        : copy.fallbackNoCopy);
    });
  }

  function createSharePayload(files, options) {
    var settings = options || {};
    var shareText = formatText(copy.shareText, { score: shareScore, best: shareBest });
    var payload = {};

    if (settings.includeTitle) payload.title = copy.shareTitle;
    if (settings.includeText) payload.text = settings.includeLink ? shareText + "\n" + SHARE_URL : shareText;
    if (settings.includeUrl) payload.url = SHARE_URL;

    payload.files = files;
    return payload;
  }

  function isMetaInAppBrowser() {
    return /FBAN|FBAV|FB_IAB|Instagram|Threads|Barcelona/i.test(navigator.userAgent || "");
  }

  function canSharePayload(payload) {
    if (!navigator.share) return false;
    if (!navigator.canShare) return true;

    try {
      return navigator.canShare(payload);
    } catch (error) {
      return false;
    }
  }

  function sharePayloadVariants(files) {
    var isMeta = isMetaInAppBrowser();
    var variants = [
      createSharePayload(files, { includeTitle: true, includeText: true, includeLink: !isMeta }),
      createSharePayload(files, { includeText: true, includeLink: false }),
      createSharePayload(files, {})
    ];

    return variants.filter(canSharePayload);
  }

  function saveCurrentPng() {
    if (!shareBlob) {
      prepareShareCard();
      showToast(copy.shareRebuilding);
      return;
    }

    showSavePanel(shareBlob);
    downloadPng(shareBlob, shareScore);
    copyText(SHARE_URL).then(function (copied) {
      showToast(copied ? copy.fallbackSaved : copy.fallbackNoCopy);
    });
  }

  function shareResult() {
    if (!shareBlob) {
      prepareShareCard();
      showToast(copy.shareRebuilding);
      return;
    }

    var file = new File([shareBlob], "tiny-defense-axe-" + shareScore + ".png", { type: "image/png" });
    var files = [file];
    var variants = sharePayloadVariants(files);
    var filePayload = variants[0];

    if (filePayload) {
      navigator.share(filePayload).then(function () {
        document.body.dataset.shareState = "shared";
      }).catch(function (error) {
        if (error && error.name === "AbortError") {
          document.body.dataset.shareState = "cancelled";
          showToast(copy.shareCancelled);
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

  function activateGameInput() {
    if (!started) startGame();
    else chop();
  }

  function handleChopPointerDown(event) {
    if (event.isPrimary === false) return;
    if (event.button !== undefined && event.button !== 0) return;
    suppressPointerClick = true;
    activateGameInput();
  }

  function handleChopClick(event) {
    event.preventDefault();
    if (suppressPointerClick) {
      suppressPointerClick = false;
      return;
    }
    activateGameInput();
  }

  function handleCanvasPointerDown(event) {
    if (event.isPrimary === false) return;
    if (event.button !== undefined && event.button !== 0) return;
    if (!started) return;
    event.preventDefault();
    chop();
  }

  chopBtn.addEventListener("pointerdown", handleChopPointerDown);
  chopBtn.addEventListener("pointerup", function () {
    window.setTimeout(function () { suppressPointerClick = false; }, 0);
  });
  chopBtn.addEventListener("pointercancel", function () { suppressPointerClick = false; });
  chopBtn.addEventListener("click", handleChopClick);
  chopBtn.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.code !== "Space" && event.key !== " ") return;
    event.preventDefault();
    if (event.repeat) return;
    activateGameInput();
  });
  canvas.addEventListener("pointerdown", handleCanvasPointerDown);
  window.addEventListener(window.PointerEvent ? "pointerdown" : "touchstart", unlockChopAudio, { capture: true, passive: true });
  window.addEventListener("keydown", unlockChopAudio, true);
  retryBtn.addEventListener("click", restart);
  shareBtn.addEventListener("click", shareResult);
  savePngBtn.addEventListener("click", saveCurrentPng);
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
      activateGameInput();
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
      var currentTier = tierForScore(score);
      return Object.freeze({
        locale: locale,
        started: started,
        score: score,
        hitCount: hitCount,
        best: best,
        tierIndex: currentTier.index,
        tierTitle: currentTier.title,
        marker: marker,
        zoneCenter: zoneC,
        zoneHalfWidth: zoneHW,
        hitEdgeGrace: HIT_EDGE_GRACE,
        speed: speed,
        minZoneHalfWidth: MIN_ZONE_HW,
        running: running,
        resultVisible: resultVisible,
        inputLocked: inputLock > 0 || chopT > 0,
        shareState: document.body.dataset.shareState || "idle",
        chopSoundPlays: chopSoundPlays,
        chopSoundReadyState: chopSfx ? chopSfx.readyState : 0,
        chopSoundPaused: chopSfx ? chopSfx.paused : true,
        chopSoundSource: chopSfx ? chopSfx.currentSrc : "",
        chopSoundMode: chopSoundMode,
        chopSoundError: chopSoundError,
        chopAudioContextState: chopAudioContext ? chopAudioContext.state : "unavailable",
        chopAudioBufferDuration: chopAudioBuffer ? chopAudioBuffer.duration : 0,
        shareUrl: SHARE_URL,
        storeUrl: STORE_URL
      });
    }
  });

  bestTotalEl.textContent = String(best);
  setChopButtonMode();
  setHud();
  updateDifficulty();
  rollZone();
  resize();
  document.body.dataset.gameState = "ready";
  document.body.dataset.shareState = "idle";
  gameStatus.textContent = copy.readyStatus;
  ensureChopAudio();
  loadSheets(function () {
    resize();
    window.requestAnimationFrame(frame);
  });
}());
