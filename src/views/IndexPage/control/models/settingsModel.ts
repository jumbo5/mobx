import { computed } from 'mobx'
import { _async, _await, Model, model, modelAction, prop } from 'mobx-keystone'

import { DefaultSetting, SETTINGS_LS_KEY } from '../constants'
import { ISettings } from '../types'

export const getInitialSettings = () => {
  const stringifiedSettings =
    typeof window !== 'undefined' ? localStorage.getItem(SETTINGS_LS_KEY) : null

  return stringifiedSettings
    ? (JSON.parse(stringifiedSettings) as ISettings)
    : { cellSide: DefaultSetting.defaultCellSide }
}

@model('sudoku')
export class SettingsState extends Model({
  cellSide: prop<number>(),
}) {
  @computed
  get settings() {
    return JSON.stringify({ cellSide: this.cellSide })
  }

  @modelAction
  updateCellSide(cellSide: number) {
    this.cellSide = cellSide

    localStorage.setItem(SETTINGS_LS_KEY, this.settings)
  }
}

export const settingsState = new SettingsState(getInitialSettings())
