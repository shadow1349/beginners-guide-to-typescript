export interface IPerson {
  name: string;
  age: number;
}

export class Person implements IPerson {
  name: string;
  age: number;

  private weightInLB: number;

  constructor(name: string, age: number, weight?: number) {
    this.name = name;
    this.age = age;

    if (weight) {
      this.weightInLB = weight;
    }
  }

  set weight(weight: number) {
    this.weightInLB = weight;
  }

  get weight() {
    return this.weightInLB;
  }

  convertWeightToKG() {
    if (this.weight) {
      return Math.round(this.weight * 2.2);
    }

    return null;
  }
}
