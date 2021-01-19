// GOAL: Geneerate random color

import { rand } from "./random.ts";
import { Rgb, RgbColor } from "./color.ts";

const rgbColor = {
  red: rand(0, 255),
  green: rand(0, 255),
  blue: rand(0, 255),
};

const rgb = new Rgb(rgbColor);
rgb.show();
