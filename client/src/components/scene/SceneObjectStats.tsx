import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelectedObject } from '../../hooks/SelectedObjectContext'
import CrateStats from './CrateStats'
import EnemyStats from './EnemyStats'
import ExplosiveCrateStats from './ExplosiveCrateStats'

const useClasses = makeStyles({
  container: {
    backgroundColor: '#435a5a',
    padding: 16,
    '&>div>div:not(:first-child)': {
      marginTop: 16,
    },
  },
})
export default function SceneObjectStats() {
  const { selectedObject } = useSelectedObject()
  const classes = useClasses()
  if (!selectedObject) return null
  return (
    <div className={classes.container}>
      <p>
        Details for {selectedObject.type} {selectedObject.id}
      </p>
      {selectedObject.type === 'crate' && <CrateStats id={selectedObject.id} />}
      {selectedObject.type === 'explosiveCrate' && <ExplosiveCrateStats id={selectedObject.id} />}
      {selectedObject.type === 'enemy' && <EnemyStats id={selectedObject.id} />}
      {/* {selectedObject.type === 'platform' && <PlatformStats id={selectedObject.id} />} */}
    </div>
  )
}
