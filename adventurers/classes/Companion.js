export default class Companion {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.loyalty = 100;
  }
  takeLoyalty(points) {
    this.loyalty -= points;
  }
  healLoyalty() {
    this.loyalty = 100;
  }
}
