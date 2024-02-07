export class User {
  constructor(
    public id: number,
    public fullname: string,
    public username: string,
    public type: number,
    public isActive?: boolean,
    public comment?: string
  ) { }
}
