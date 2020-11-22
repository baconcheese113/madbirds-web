import { gql } from '@apollo/client'
import * as React from 'react'
import { objectSizes } from '../../helpers/constants'
import { useSelectedObject } from '../../hooks/SelectedObjectContext'
import { explosiveCrate_explosiveCrate } from './__generated__/explosiveCrate_explosiveCrate'

type Props = {
  explosiveCrate: explosiveCrate_explosiveCrate,
}
export default function ExplosiveCrate(props: Props) {
  const { explosiveCrate } = props
  const { id, x, y } = explosiveCrate

  const { selectedObject, setSelectedObject } = useSelectedObject()
  const isSelected = selectedObject?.type === 'explosiveCrate' && selectedObject?.id === id

  return (
    <rect
      fill="#773552"
      height={objectSizes.explosiveCrate.height}
      style={isSelected ? { strokeWidth: 0.5, stroke: 'rgb(200,200,200)' } : undefined}
      width={objectSizes.explosiveCrate.width}
      x={x}
      y={objectSizes.scene.height - y - objectSizes.explosiveCrate.height}
      onClick={() => setSelectedObject({ id, type: 'explosiveCrate' })}
    />
  )
}

ExplosiveCrate.fragments = {
  explosiveCrate: gql`
    fragment explosiveCrate_explosiveCrate on ExplosiveCrate {
      __typename
      id
      x
      y
    }
  `,
}

ExplosiveCrate.defaultProps = {
  isSelected: false,
}
