import assert from "node:assert/strict";
import test from "node:test";

import { winsData } from "../data/winsData.ts";

const expectedMonthsByTitle = new Map([
  ["ETHGlobal", "Feb"],
  ["Smart India Hackathon 2025", "Dec"],
  ["Filecoin Dev Summit Toronto 2025", "Apr"],
  ["Prakalpa 2025", "Apr"],
  ["ETHIndia 2024", "Dec"],
  ["Unfold 2024", "Dec"],
]);

test("wins data uses the expected event months", () => {
  for (const [title, expectedMonth] of expectedMonthsByTitle) {
    const win = winsData.find((entry) => entry.title === title);

    assert.ok(win, `Expected a wins entry for ${title}`);
    assert.equal(
      win.month,
      expectedMonth,
      `Expected ${title} to use ${expectedMonth}`,
    );
  }
});
