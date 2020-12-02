import { observable } from 'mobx'
import { _async, _await, Model, model, modelAction, prop } from 'mobx-keystone'

import { enabledKeys, numbersKeys } from '../constants'

@model('cell')
export class Cell extends Model({
  number: prop<number>(),
  disabled: prop<boolean>(),
  highlighted: prop<boolean>(false),
}) {
  @observable isSelected = false
  @observable notes = this.number !== 0 ? [this.number] : []

  @modelAction
  onSelect() {
    this.isSelected = true
  }

  @modelAction
  onBlur() {
    this.isSelected = false
  }

  @modelAction
  onUpdateNumber(key: string, selectedNumber: number) {
    if (!enabledKeys.includes(key)) {
      return
    }

    if (numbersKeys.includes(key)) {
      const parsedKey = parseInt(key as string, 10)

      if (this.notes.length < 4) {
        this.number = parsedKey
        this.notes.push(parsedKey)
      }
    }

    if (this.number === selectedNumber && key !== 'Backspace') {
      this.highlighted = true
    }

    if (key === 'Backspace') {
      this.number = 0
      this.notes = []
      this.highlighted = false
    }

    if (this.highlighted && this.number !== selectedNumber) {
      this.highlighted = false
    }

    this.onBlur()
  }
}
