import { computed, observable } from 'mobx'
import { Model, model, modelAction, prop } from 'mobx-keystone'

@model('todo')
export class Todo extends Model({
  text: prop<string>(),
  done: prop(false),
}) {
  @modelAction
  setDone(done: boolean) {
    this.done = done
  }
  @modelAction
  setText(text: string) {
    this.text = text
  }
  @computed
  get asString() {
    return `${!this.done ? 'TODO' : 'DONE'} ${this.text}`
  }
}

@model('todos')
export class Todos extends Model({
  list: prop<Todo[]>(),
}) {
  @modelAction
  pushTodo(text: string) {
    this.list.push(new Todo({ text }))
  }
}
