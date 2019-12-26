export class UserModel {
  public email: string;
  // tslint:disable-next-line:variable-name
  public first_name: string;
  // tslint:disable-next-line:variable-name
  public last_name: string;
  public password: string;

  constructor(user: UserModel) {
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.password = user.password;
  }
}
