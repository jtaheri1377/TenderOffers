export class Signup {
  constructor(
    public fullname: string,
    public username: string,
    public password: string,
    public comment: string,
    public type: number,
    public id?: number
  ) { }
}

