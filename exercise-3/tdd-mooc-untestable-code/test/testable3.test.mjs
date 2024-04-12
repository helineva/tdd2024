import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv } from "../src/testable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {
  const input = "Loid,Forger,,Male\nAnya,Forger,6,Female\nYor,Forger,27,Female";
  
  test("parses first names correctly", () => {
    expect(parsePeopleCsv(input).map(person => person.firstName)).to.deep.equal(["Loid","Anya","Yor"]);
  });

  test("parses last names correctly", () => {
    expect(parsePeopleCsv(input).map(person => person.lastName)).to.deep.equal(["Forger","Forger","Forger"]);
  });

  test("parses ages correctly", () => {
    expect(parsePeopleCsv(input).map(person => person.age)).to.deep.equal([undefined,6,27]);
  });

  test("parses gender correctly", () => {
    expect(parsePeopleCsv(input).map(person => person.gender)).to.deep.equal(["m","f","f"]);
  });
});
