import { Person } from '../model/Person'
import { RegisterResult } from '../model/RegisterResult'

const MIN_AGE = 18
const MAX_AGE = 120

export class Registry {
  private readonly registeredIds = new Set<number>()

  registerVoter(person: Person | null): RegisterResult {
    if (person === null) {
      return RegisterResult.INVALID
    }
    if (person.id <= 0) {
      return RegisterResult.INVALID
    }
    if (!person.alive) {
      return RegisterResult.DEAD
    }
    if (person.age < 0 || person.age > MAX_AGE) {
      return RegisterResult.INVALID_AGE
    }
    if (person.age < MIN_AGE) {
      return RegisterResult.UNDERAGE
    }
    if (this.registeredIds.has(person.id)) {
      return RegisterResult.DUPLICATED
    }
    this.registeredIds.add(person.id)
    return RegisterResult.VALID
  }
}
