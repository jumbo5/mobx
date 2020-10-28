import { computed } from 'mobx'
import { _async, _await, Model, model, modelAction, prop } from 'mobx-keystone'

import { DefaultSettings, SETTINGS_LS_KEY } from '../constants'
import {
  colorFieldsType,
  colorKeysType,
  colorsType,
  difficultiesType,
  ISettings,
} from '../types'

export const getInitialSettings = () => {
  const stringifiedSettings =
    typeof window !== 'undefined' ? localStorage.getItem(SETTINGS_LS_KEY) : null

  return stringifiedSettings
    ? (JSON.parse(stringifiedSettings) as ISettings)
    : DefaultSettings
}

@model('sudoku')
export class SettingsState extends Model({
  cellSide: prop<number>(),
  colors: prop<colorsType>(),
  showTimer: prop<boolean>(),
  showLeftNumber: prop<boolean>(),
  difficulty: prop<difficultiesType>(),
}) {
  @computed
  get settings() {
    return JSON.stringify({
      cellSide: this.cellSide,
      colors: this.colors,
      showTimer: this.showTimer,
      showLeftNumber: this.showLeftNumber,
      difficulty: this.difficulty,
    })
  }

  actionWrapper(action: () => void) {
    action()
    localStorage.setItem(SETTINGS_LS_KEY, this.settings)
  }

  @modelAction
  updateCellSide(cellSide: number) {
    this.actionWrapper(() => {
      this.cellSide = cellSide
    })
  }

  @modelAction
  updateColors(colors: colorsType) {
    this.actionWrapper(() => {
      this.colors = colors
    })
  }

  @modelAction
  updateColor(key: colorKeysType, field: colorFieldsType, color: string) {
    this.actionWrapper(() => {
      this.colors[key][field] = color
    })
  }

  @modelAction
  toggleShowTimer() {
    this.actionWrapper(() => {
      this.showTimer = !this.showTimer
    })
  }

  @modelAction
  toggleShowLeftNumber() {
    this.actionWrapper(() => {
      this.showLeftNumber = !this.showLeftNumber
    })
  }

  @modelAction
  changeDifficulty(difficulty: difficultiesType) {
    this.actionWrapper(() => {
      this.difficulty = difficulty
    })
  }
}

export const settingsState = new SettingsState(getInitialSettings())
