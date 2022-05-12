interface Todo {
  _id?: Object,
  user_id?: Object;
  title: string;
  content: string;
  status: boolean;
}

type Todos = Todo[]

export type { Todo, Todos }
