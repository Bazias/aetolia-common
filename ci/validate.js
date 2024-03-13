#!/usr/bin/env node

// @TODO: validate defences too

const fs = require("fs");
const yaml = require("js-yaml");

let afflictions;
let cures;

try {
  afflictions = yaml.load(fs.readFileSync("afflictions.yaml", "utf8"));
  cures = yaml.load(fs.readFileSync("cures.yaml", "utf8"));
} catch (e) {
  console.log(e);
}

const validateCureOrder = (entry) => {
  const affs = entry.order || [];
  for (aff of affs) {
    if (afflictions.list.indexOf(aff) < 0) {
      throw new Error("Unknown affliction: " + aff);
    }
  }
};

const queues = ["pill", "pipe", "elixir", "pipe"];

for (queue of queues) {
  for (const [cure, entries] of Object.entries(cures[queue])) {
    if (!entries) continue;
    for (entry of entries) {
      validateCureOrder(entry);
    }
  }
}
