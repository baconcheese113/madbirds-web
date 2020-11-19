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
    <svg width="500" height="400">
      <circle cx="40" cy="200" r="12" />
      <rect x="0" y="368" width="500" height="32" fill="brown" />
      {scene.crates.map((crate, idx) => <SceneObject crate={crate} isSelected={idx === 0} />)}
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