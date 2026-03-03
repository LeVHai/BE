export class User {
  constructor(user) {
    this._id = user._id;
    this.name = user.name || "";
    this.email = user.email;
    this.password = user.password;
    this.create_at = user.create_at || new Date();
    this.update_at = user.update_at || new Date();
  }
}
