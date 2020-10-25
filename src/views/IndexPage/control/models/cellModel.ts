import { observable } from 'mobx'
import { _async, _await, Model, model, modelAction, prop } from 'mobx-keystone'

import { sudokuState } from './sudokuModel'

@model('cell')
export class Cell extends Model({
  number: prop<number>(),
  disabled: prop<boolean>(),
  highlighted: prop<boolean>(false),
}) {
  @observable isSelected = false

  @modelAction
  onSelect() {
    this.isSelected = true
  }

  @modelAction
  onBlur() {
    this.isSelected = false
  }

  @modelAction
  onUpdateNumber(key: string) {
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
      this.number = parseInt(key as string, 10)
    }

    if (this.number === sudokuState.selectedNumber && key !== 'Backspace') {
      this.highlighted = true
    }

    if (key === 'Backspace') {
      this.number = 0
      this.highlighted = false
    }

    if (this.highlighted && this.number !== sudokuState.selectedNumber) {
      this.highlighted = false
    }

    this.onBlur()
  }
}
