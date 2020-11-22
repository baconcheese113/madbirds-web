import { gql } from '@apollo/client'
import * as React from 'react'
import { objectSizes } from '../../helpers/constants'
import { useSelectedObject } from '../../hooks/SelectedObjectContext'
import { enemy_enemy } from './__generated__/enemy_enemy'

type Props = {
  enemy: enemy_enemy,
}
export default function Enemy(props: Props) {
  const { enemy } = props
  const { id, x, y } = enemy

  const { selectedObject, setSelectedObject } = useSelectedObject()
  const isSelected = selectedObject?.type === 'enemy' && selectedObject?.id === id

  return (
    <circle
      cx={x + objectSizes.enemy.width / 2}
      cy={objectSizes.scene.height - y - objectSizes.enemy.height / 2}
      fill="#9d873f"
      r={objectSizes.enemy.width / 2}
      style={isSelected ? { strokeWidth: 0.5, stroke: 'rgb(200,200,200)' } : undefined}
      onClick={() => setSelectedObject({ id, type: 'enemy' })}
    />
  )
}

Enemy.fragments = {
  enemy: gql`
    fragment enemy_enemy on Enemy {
      __typename
      id
      x
      y
    }
  `,
}

Enemy.defaultProps = {
  isSelected: false,
}
