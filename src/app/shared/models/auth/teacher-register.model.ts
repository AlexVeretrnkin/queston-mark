import { UserModel } from './userModel';

export class TeacherRegisterModel {
  public user: UserModel;

  constructor(user: UserModel) {
    this.user = new UserModel(user);
  }
}
