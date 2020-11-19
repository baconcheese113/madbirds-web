import { gql } from '@apollo/client';
import * as React from 'react'
import SceneObject from './SceneObject'

type Props = {
  scene: any
}
export default function SceneViewer(props: Props) {
  const { scene } = props;

  return (
    <svg width="800" height="400">
      <circle cx="20" cy="300" r="16" />
      <SceneObject isSelected />
    </svg>
  )
}

export const sceneViewer = gql`
  fragment sceneViewer on Scene {
    __typename
    crates {
      id
    }
  }
`