export interface Todo {
  _id:          string;
  description:  string;
  finished:     boolean;
  createdAt:    string;
  updatedAt:    string;
  datefinished: string;
}

export interface CreateUpdateTodoDTI {
  todo: Todo
}
