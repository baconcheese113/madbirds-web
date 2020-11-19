import { gql } from '@apollo/client';
import * as React from 'react'
import SceneObject from './SceneObject'
import { sceneViewer_scene } from './__generated__/sceneViewer_scene';

type Props = {
  scene: sceneViewer_scene
}
export default function SceneViewer(props: Props) {
  const { scene } = props;

  return (
    <svg width="800" height="400">
      <circle cx="20" cy="300" r="16" />
      <SceneObject crate={scene.crates[0]} isSelected />
    </svg>
  )
}

SceneViewer.fragments = {
  scene: gql`
    fragment sceneViewer_scene on Scene {
      __typename
      crates {
        id
        ...sceneObject_crate
      }
    }
    ${SceneObject.fragments.crate}
  `
}