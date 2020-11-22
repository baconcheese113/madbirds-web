import * as React from 'react'
import { gql, useQuery } from '@apollo/client'
import { CircularProgress, makeStyles, Paper } from '@material-ui/core'
import { Layout } from '../common'
import SceneObjectControls from './SceneObjectControls'
import SceneViewer from './SceneViewer'

const useClasses = makeStyles({
  container: {
    maxWidth: '100%',
    width: '800px',
  },
  controls: {
    marginTop: 16,
  },
})

export default function SceneEditor() {
  const classes = useClasses()
  const { data, loading, error } = useQuery(gql`
    query sceneEditorQuery {
      scene(where: { id: 1 }) {
        id
        ...sceneViewer_scene
        crates {
          id
          ...sceneObjectControls_crate
        }
      }
    }
    ${SceneViewer.fragments.scene}
    ${SceneObjectControls.fragments.crate}
  `)

  if (loading) return <CircularProgress />
  if (error) return <p>ERROR</p>
  if (!data) return <p>Not Found</p>

  const { scene } = data

  return (
    <Layout column>
      <Paper>
        <Layout flex>
          <SceneViewer scene={scene} />
        </Layout>
      </Paper>
      <SceneObjectControls classes={{ root: classes.controls }} crate={scene.crates[0]} />
    </Layout>
  )
}
