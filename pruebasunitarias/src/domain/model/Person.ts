import { Gender } from './Gender'

export class Person {
  constructor(
    readonly name: string,
    readonly id: number,
    readonly age: number,
    readonly gender: Gender,
    readonly alive: boolean,
  ) {}
}
