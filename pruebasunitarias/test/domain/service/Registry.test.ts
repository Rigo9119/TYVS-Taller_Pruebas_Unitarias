import { describe, it, expect, beforeEach } from "vitest";
import { Registry } from "../../../src/domain/service/Registry";
import { Person } from "../../../src/domain/model/Person";
import { Gender } from "../../../src/domain/model/Gender";
import { RegisterResult } from "../../../src/domain/model/RegisterResult";

describe("Registry", () => {
  let registry: Registry;

  beforeEach(() => {
    registry = new Registry();
  });

  it("should register a valid person", () => {
    const person = new Person("Ana", 1, 30, Gender.FEMALE, true);
    const result = registry.registerVoter(person);

    expect(result).toBe(RegisterResult.VALID);
  });

  it("should return INVALID when person is null", () => {
    const person = null;
    const result = registry.registerVoter(person);

    expect(result).toBe(RegisterResult.INVALID);
  });

  it("should return INVALID when id is zero", () => {
    const person = new Person("Luis", 0, 25, Gender.MALE, true);
    const result = registry.registerVoter(person);

    expect(result).toBe(RegisterResult.INVALID);
  });

  it("should return INVALID when id is negative", () => {
    const person = new Person("Laura", -5, 25, Gender.FEMALE, true);
    const result = registry.registerVoter(person);

    expect(result).toBe(RegisterResult.INVALID);
  });

  it("should return DEAD when person is not alive", () => {
    const person = new Person("Carlos", 2, 40, Gender.MALE, false);
    const result = registry.registerVoter(person);

    expect(result).toBe(RegisterResult.DEAD);
  });

  it("should return INVALID_AGE when age is negative", () => {
    const person = new Person("Juan", 101, -1, Gender.MALE, true);
    const result = registry.registerVoter(person);

    expect(result).toBe(RegisterResult.INVALID_AGE);
  });

  it("should return INVALID_AGE when age is over 120", () => {
    const person = new Person("Elvira", 102, 121, Gender.FEMALE, true);
    const result = registry.registerVoter(person);

    expect(result).toBe(RegisterResult.INVALID_AGE);
  });

  it("should return UNDERAGE when age is 17", () => {
    const person = new Person("Sofia", 103, 17, Gender.FEMALE, true);
    const result = registry.registerVoter(person);

    expect(result).toBe(RegisterResult.UNDERAGE);
  });

  it("should return VALID when age is exactly 18", () => {
    const person = new Person("Pedro", 104, 18, Gender.MALE, true);
    const result = registry.registerVoter(person);

    expect(result).toBe(RegisterResult.VALID);
  });

  it("should return VALID when age is exactly 120", () => {
    const person = new Person("Rosa", 105, 120, Gender.FEMALE, true);
    const result = registry.registerVoter(person);

    expect(result).toBe(RegisterResult.VALID);
  });

  it("should return DUPLICATED when same id is registered twice", () => {
    // Arrange
    const first = new Person("Carlos", 200, 30, Gender.MALE, true);
    const second = new Person("Carla", 200, 25, Gender.FEMALE, true);

    registry.registerVoter(first);
    const result = registry.registerVoter(second);

    expect(result).toBe(RegisterResult.DUPLICATED);
  });
});
