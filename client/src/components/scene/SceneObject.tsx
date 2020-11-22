import { gql } from '@apollo/client'
import * as React from 'react'
import { sceneObject_crate } from './__generated__/sceneObject_crate'

type Props = {
  crate: sceneObject_crate,
  isSelected: boolean,
}
export default function SceneObject(props: Props) {
  const { crate, isSelected } = props
  const { x, y } = crate

  return (
    <rect
      height="25"
      style={isSelected ? { strokeWidth: 3, stroke: 'rgb(200,200,200)' } : undefined}
      width="25"
      x={x}
      y={400 - y}
    />
  )
}

SceneObject.fragments = {
  crate: gql`
    fragment sceneObject_crate on Crate {
      __typename
      id
      x
      y
    }
  `,
}

SceneObject.defaultProps = {
  isSelected: false,
}
