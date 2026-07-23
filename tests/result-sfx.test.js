const assert = require("node:assert/strict");

const {
  resultSfxForScore,
  RESULT_SFX_TIERS,
  shareRecordLabel
} = require("../games/tiny-defense/play/result-sfx.js");

const cases = [
  [0, "disaster"],
  [4, "disaster"],
  [5, "fail"],
  [9, "fail"],
  [10, "success"],
  [14, "success"],
  [15, "greatSuccess"],
  [19, "greatSuccess"],
  [20, "legend"],
  [29, "legend"],
  [30, "legendary"],
  [99, "legendary"]
];

for (const [score, expectedKey] of cases) {
  assert.equal(resultSfxForScore(score).key, expectedKey, `score ${score}`);
}

assert.equal(RESULT_SFX_TIERS.length, 6);
assert.equal(resultSfxForScore(-10).key, "disaster");
assert.equal(resultSfxForScore(Number.NaN).key, "disaster");
assert.equal(resultSfxForScore(30).wav.includes("music-result-legendary.wav"), true);
assert.equal(resultSfxForScore(30).ogg.includes("music-result-legendary.ogg"), true);
assert.equal(shareRecordLabel("신기록!"), "✦ 신기록!");
assert.equal(shareRecordLabel("NEW BEST!"), "✦ NEW BEST!");

console.log("result-sfx tier mapping ok");
