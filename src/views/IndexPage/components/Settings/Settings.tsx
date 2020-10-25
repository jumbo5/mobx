import React, { useState } from 'react'
import { SettingOutlined } from '@ant-design/icons'
import { Button, Drawer, Slider } from 'antd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { settingsState } from '../../control'

export interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = observer(() => {
  const { cellSide } = settingsState
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

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
