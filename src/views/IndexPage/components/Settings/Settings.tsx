import React, { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { SettingOutlined } from '@ant-design/icons'
import { Button, Drawer, Popover, Slider } from 'antd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { colorKeys, settingsState } from '../../control'

export interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = observer(() => {
  const { cellSide } = settingsState
  const [isDrawerVisible, setIsDrawerVisible] = useState(true)

  const onToggleDrawer = () => setIsDrawerVisible((isVisible) => !isVisible)

  return (
    <Container>
      <Button
        type="primary"
        shape="circle"
        icon={<SettingOutlined />}
        onClick={onToggleDrawer}
      />

      <Drawer
        title="Settings"
        placement="right"
        closable
        onClose={onToggleDrawer}
        visible={isDrawerVisible}
      >
        <Setting>
          <p>Размер ячеек</p>
          <Slider
            min={48}
            max={96}
            value={cellSide}
            step={2}
            onChange={(num: number) => settingsState.updateCellSide(num)}
          />
        </Setting>

        <Setting>
          <p>Цвета</p>
          <ColorsWrapper>
            {colorKeys.map((key) => (
              <Popover
                key={key}
                placement="left"
                content={
                  <>
                    <p>Фон</p>
                    <HexColorPicker
                      color={settingsState.colors[key].background}
                      onChange={(color) => {
                        settingsState.updateColor(key, 'background', color)
                      }}
                    />
                    <br />
                    <p>Текст</p>
                    <HexColorPicker
                      color={settingsState.colors[key].text}
                      onChange={(color) => {
                        settingsState.updateColor(key, 'text', color)
                      }}
                    />
                  </>
                }
              >
                <Button>{key}</Button>
              </Popover>
            ))}
          </ColorsWrapper>
        </Setting>
      </Drawer>
    </Container>
  )
})

const Container = styled.div``

const Setting = styled.div`
  & + & {
    margin-top: 20px;
  }
`

const ColorsWrapper = styled.div`
  display: grid;
  gap: 0 4px;
`
