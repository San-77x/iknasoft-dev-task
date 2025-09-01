import { faker } from "@faker-js/faker";

export interface DealData {
  id: number;
  dealName: string;
  stage: string;
  owner: string;
  dealValue: number;
  date: Date;
  closeProbability: number;
}

const stages = [
  "lead",
  "qualified",
  "proposal",
  "negotiation",
  "closed-won",
  "closed-lost",
];

export function generateDemoData(count: number = 50): DealData[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    dealName: faker.company.name() + " " + faker.commerce.productName(),
    stage: faker.helpers.arrayElement(stages),
    owner: faker.person.fullName(),
    dealValue: faker.number.int({ min: 10000, max: 1000000 }),
    date: faker.date.between({ from: "2024-01-01", to: "2024-12-31" }),
    closeProbability: faker.number.int({ min: 10, max: 100 }),
  }));
}
