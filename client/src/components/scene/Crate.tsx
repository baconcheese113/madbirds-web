import { gql } from '@apollo/client'
import * as React from 'react'
import { objectSizes } from '../../helpers/constants'
import { useSelectedObject } from '../../hooks/SelectedObjectContext'
import { crate_crate } from './__generated__/crate_crate'

type Props = {
  crate: crate_crate,
}
export default function Crate(props: Props) {
  const { crate } = props
  const { id, x, y } = crate

  const { selectedObject, setSelectedObject } = useSelectedObject()
  const isSelected = selectedObject?.type === 'crate' && selectedObject?.id === id

  return (
    <rect
      height={objectSizes.crate.height}
      style={isSelected ? { strokeWidth: 0.5, stroke: 'rgb(200,200,200)' } : undefined}
      width={objectSizes.crate.width}
      x={x}
      y={objectSizes.scene.height - y - objectSizes.crate.height}
      onClick={() => setSelectedObject({ id, type: 'crate' })}
    />
  )
}

Crate.fragments = {
  crate: gql`
    fragment crate_crate on Crate {
      __typename
      id
      x
      y
    }
  `,
}

Crate.defaultProps = {
  isSelected: false,
}
