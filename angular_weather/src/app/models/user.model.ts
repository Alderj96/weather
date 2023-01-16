export interface User {
  _id: string;
  username: string;
  fullname: string;
  mail: string;
  lastlogin: string;
  createdAt: string;
}

export interface CreateUserDTO extends Omit<User, 'lastlogin' | '_id' | 'createdAt'> {
  password: string;
}
