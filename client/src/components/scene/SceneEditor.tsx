import * as React from 'react'
import { gql, useQuery } from '@apollo/client'
import { CircularProgress, Paper } from '@material-ui/core'
import { Layout } from '../common'
import { SelectedObjectProvider } from '../../hooks/SelectedObjectContext'
import SceneViewer from './SceneViewer'
import SceneSwitcher from './SceneSwitcher'
import SceneObjectStats from './SceneObjectStats'
import { sceneEditorQuery } from './__generated__/sceneEditorQuery'

export default function SceneEditor() {
  const [currentScene, setCurrentScene] = React.useState(1)
  const { data, loading, error } = useQuery<sceneEditorQuery>(
    gql`
      query sceneEditorQuery($id: Int!) {
        scene(where: { id: $id }) {
          id
          ...sceneViewer_scene
        }
      }
      ${SceneViewer.fragments.scene}
    `,
    {
      variables: { id: currentScene },
    },
  )

  if (loading) return <CircularProgress />
  if (error) return <p>ERROR</p>
  if (!data?.scene) return <p>Not Found</p>

  return (
    <SelectedObjectProvider>
      <Layout column>
        <Paper>
          <Layout flex>
            <SceneViewer scene={data.scene} />
          </Layout>
        </Paper>
        {/* <SceneObjectControls classes={{ root: classes.controls }} id="0" /> */}
        <SceneObjectStats />
        <SceneSwitcher currentScene={currentScene} onSceneSwitch={id => setCurrentScene(id)} />
      </Layout>
    </SelectedObjectProvider>
  )
}
