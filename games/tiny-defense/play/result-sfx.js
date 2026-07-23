(function (root) {
  "use strict";

  var VERSION = "result-music-4";
  var RESULT_SFX_TIERS = [
    {
      min: 0,
      key: "disaster",
      label: "대실패",
      wav: "./assets/music-result-disaster.wav?v=" + VERSION,
      ogg: "./assets/music-result-disaster.ogg?v=" + VERSION,
      volume: 0.86
    },
    {
      min: 5,
      key: "fail",
      label: "실패",
      wav: "./assets/music-result-fail.wav?v=" + VERSION,
      ogg: "./assets/music-result-fail.ogg?v=" + VERSION,
      volume: 0.86
    },
    {
      min: 10,
      key: "success",
      label: "성공",
      wav: "./assets/music-result-success.wav?v=" + VERSION,
      ogg: "./assets/music-result-success.ogg?v=" + VERSION,
      volume: 0.9
    },
    {
      min: 15,
      key: "greatSuccess",
      label: "대성공",
      wav: "./assets/music-result-great-success.wav?v=" + VERSION,
      ogg: "./assets/music-result-great-success.ogg?v=" + VERSION,
      volume: 0.92
    },
    {
      min: 20,
      key: "legend",
      label: "전설",
      wav: "./assets/music-result-legend.wav?v=" + VERSION,
      ogg: "./assets/music-result-legend.ogg?v=" + VERSION,
      volume: 0.92
    },
    {
      min: 30,
      key: "legendary",
      label: "레전드",
      wav: "./assets/music-result-legendary.wav?v=" + VERSION,
      ogg: "./assets/music-result-legendary.ogg?v=" + VERSION,
      volume: 0.94
    }
  ];

  function normalizedScore(value) {
    var number = Number(value);
    return Number.isFinite(number) ? Math.max(0, Math.floor(number)) : 0;
  }

  function resultSfxForScore(value) {
    var score = normalizedScore(value);
    for (var i = RESULT_SFX_TIERS.length - 1; i >= 0; i -= 1) {
      if (score >= RESULT_SFX_TIERS[i].min) return RESULT_SFX_TIERS[i];
    }
    return RESULT_SFX_TIERS[0];
  }

  function shareRecordLabel(label) {
    return "✦ " + String(label || "").trim();
  }

  var api = {
    RESULT_SFX_VERSION: VERSION,
    RESULT_SFX_TIERS: RESULT_SFX_TIERS,
    resultSfxForScore: resultSfxForScore,
    shareRecordLabel: shareRecordLabel
  };

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  root.TinyDefenseResultSfx = api;
}(typeof window !== "undefined" ? window : globalThis));
