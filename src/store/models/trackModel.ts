import { computed, observable } from 'mobx'
import { Model, model, modelAction, prop } from 'mobx-keystone'

@model('track')
export class Track extends Model({
  $modelId: prop<string>(),
  name: prop<string>(),
  image: prop<string>(),
}) {
  // @modelAction
  // setDone(done: boolean) {
  //   this.done = done
  // }
  // @modelAction
  // setText(text: string) {
  //   this.text = text
  // }
  // @computed
  // get asString() {
  //   return `${!this.done ? 'TODO' : 'DONE'} ${this.text}`
  // }
}
