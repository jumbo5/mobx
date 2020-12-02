import { ISettings } from './types'
export const SETTINGS_LS_KEY = 'settings'

export const DefaultSettings: ISettings = {
  cellSide: 56,
  colors: {
    disabled: {
      text: '#fff',
      background: '#bdbdbd',
    },
    hover: {
      text: '#000',
      background: '#cfd8dc',
    },
    focus: {
      text: '#000',
      background: '#b0bec5',
    },
    highlighted: {
      text: '#fff',
      background: '#808e95',
    },
  },
  showTimer: true,
  showLeftNumber: true,
  difficulty: 'easy',
}

export const numbersKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

export const enabledKeys = [...numbersKeys, 'Backspace']
