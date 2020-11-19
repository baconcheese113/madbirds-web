import * as React from 'react'
import { gql, useQuery } from '@apollo/client';
import { CircularProgress, makeStyles, Paper } from '@material-ui/core'
import { Layout } from '../common'
import ObjectControls from './ObjectControls';
import SceneObject from './SceneObject';
import SceneViewer from './SceneViewer';

const useClasses = makeStyles({
  container: {
    maxWidth: '100%',
    width: '800px',
  },
  controls: {
    marginTop: 16
  }
})

export default function SceneEditor() {
  const classes = useClasses();
  const { data, loading, error } = useQuery(gql`
    query getSceneEditor {
      scene( where: { id: 0 }) {
        id
      }
    }
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
      <ObjectControls classes={{ root: classes.controls }} />
    </Layout>
  )
}