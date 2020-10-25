import { computed } from 'mobx'
import { _async, _await, Model, model, modelAction, prop } from 'mobx-keystone'

import { DefaultSettings, SETTINGS_LS_KEY } from '../constants'
import { colorFieldsType, colorKeysType, colorsType, ISettings } from '../types'

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
}) {
  @computed
  get settings() {
    return JSON.stringify({ cellSide: this.cellSide, colors: this.colors })
  }

  @modelAction
  updateCellSide(cellSide: number) {
    this.cellSide = cellSide

    localStorage.setItem(SETTINGS_LS_KEY, this.settings)
  }

  @modelAction
  updateColors(colors: colorsType) {
    this.colors = colors

    localStorage.setItem(SETTINGS_LS_KEY, this.settings)
  }

  @modelAction
  updateColor(key: colorKeysType, field: colorFieldsType, color: string) {
    this.colors[key][field] = color

    localStorage.setItem(SETTINGS_LS_KEY, this.settings)
  }
}

export const settingsState = new SettingsState(getInitialSettings())
