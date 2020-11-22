import * as React from 'react'
import { gql } from '@apollo/client'
import { makeStyles } from '@material-ui/core'
import { objectSizes } from '../../helpers/constants'
import Crate from './Crate'
import { sceneViewer_scene } from './__generated__/sceneViewer_scene'
import ExplosiveCrate from './ExplosiveCrate'
import Enemy from './Enemy'

const useClasses = makeStyles({
  svg: {
    flex: 1,
    backgroundColor: '#333',
    fill: '#8a9',
  },
})
type Props = {
  scene: sceneViewer_scene,
  mini?: boolean,
}
export default function SceneViewer(props: Props) {
  const { scene, mini } = props
  const classes = useClasses({ mini })
  const sceneHeight = objectSizes.scene.height
  const sceneWidth = objectSizes.scene.width

  console.log(scene)

  return (
    <svg className={classes.svg} height="100%" viewBox={`0 0 ${sceneWidth} ${sceneHeight}`} width="100%">
      <circle cx={20} cy={sceneHeight - 20} r={objectSizes.player.width / 2} />
      {scene?.crates.map((crate, idx) => (
        <Crate key={crate.id} crate={crate} isSelected={idx === 0} />
      ))}
      {scene?.explosiveCrates.map((explosiveCrate, idx) => (
        <ExplosiveCrate key={explosiveCrate.id} explosiveCrate={explosiveCrate} isSelected={idx === 0} />
      ))}
      {scene?.enemies.map((enemy, idx) => (
        <Enemy key={enemy.id} enemy={enemy} isSelected={idx === 0} />
      ))}
    </svg>
  )
}

SceneViewer.fragments = {
  scene: gql`
    fragment sceneViewer_scene on Scene {
      __typename
      crates {
        id
        ...crate_crate
      }
      explosiveCrates {
        id
        ...explosiveCrate_explosiveCrate
      }
      enemies {
        id
        ...enemy_enemy
      }
    }
    ${Crate.fragments.crate}
    ${ExplosiveCrate.fragments.explosiveCrate}
    ${Enemy.fragments.enemy}
  `,
}
