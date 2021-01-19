// GOAL: Geneerate random color

export interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

export class Rgb {
  red: number;
  green: number;
  blue: number;

  constructor(rgbColor: RgbColor) {
    this.red = rgbColor.red;
    this.green = rgbColor.green;
    this.blue = rgbColor.blue;
  }

  get_red(): number {
    return this.red;
  }

  set_red(newValue: number) {
    this.red = newValue;
  }

  get_green(): number {
    return this.green;
  }

  set_green(newValue: number) {
    this.green = newValue;
  }

  get_blue(): number {
    return this.blue;
  }

  set_blue(newValue: number) {
    this.blue = newValue;
  }

  is_valid(): boolean {
    return (this.get_red() >= 0 && this.get_red() <= 255) &&
      (this.get_green() >= 0 && this.get_green() <= 255) &&
      (this.get_blue() >= 0 && this.get_blue() <= 255);
  }

  show(): void {
    console.log(
      `rgb(${this.get_red()},${this.get_green()},${this.get_blue()})`,
    );
  }
}

// * USAGE
// const rgbColor = {
//   red: 1,
//   green: 2,
//   blue: 3,
// };

// const rgb = new Rgb(rgbColor);
// rgb.show();
