#!/usr/bin/env node

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

const consumables = ["pill", "pipe", "elixir"];
const appliables = ["poultice"];

const validateAffsInSet = (affs) => {
  if (affs.length < 1) return;
  for (aff of affs) {
    if (afflictions.list.indexOf(aff) < 0) {
      throw new Error("Uknown affliction: " + aff);
    }
  }
};

const validateConsumables = () => {
  for (queue of consumables) {
    for (const [cure, affs] of Object.entries(cures[queue])) {
      validateAffsInSet(affs || []);
    }
  }
};

const validateAppliables = () => {
  for (queue of appliables) {
    for (const [cure, locations] of Object.entries(cures[queue])) {
      for (const [location, affs] of Object.entries(locations)) {
        validateAffsInSet(affs || []);
      }
    }
  }
};

validateConsumables();
validateAppliables();
