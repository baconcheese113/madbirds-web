import { gql, useMutation, useQuery } from '@apollo/client'
import { Button, CircularProgress, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import { useSelectedObject } from '../../hooks/SelectedObjectContext'
import { Layout } from '../common'
import { createOneSceneMutation } from './mutations/createOneScene.mutation'
import SceneViewer from './SceneViewer'
import { sceneSwitcherQuery } from './__generated__/sceneSwitcherQuery'

const useClasses = makeStyles({
  gallery: {
    '& > div:not(:first-child)': {
      marginLeft: 24,
    },
  },
  selected: {
    border: '3px solid #888',
  },
})

type Props = {
  onSceneSwitch: (id: number) => any,
  currentScene: number,
}
export default function SceneSwitcher(props: Props) {
  const { onSceneSwitch, currentScene } = props
  const classes = useClasses()
  const { setSelectedObject } = useSelectedObject()
  const [createScene] = useMutation(createOneSceneMutation)
  const { data, loading, error, refetch } = useQuery<sceneSwitcherQuery>(gql`
    query sceneSwitcherQuery {
      scenes {
        id
        ...sceneViewer_scene
      }
    }
    ${SceneViewer.fragments.scene}
  `)

  const handleSceneSwitch = React.useCallback(
    (sceneId: number) => {
      if (sceneId === currentScene) return
      setSelectedObject()
      onSceneSwitch(sceneId)
    },
    [currentScene, onSceneSwitch, setSelectedObject],
  )

  if (loading) return <CircularProgress />
  if (error) return <p>ERROR</p>
  if (!data) return <p>No scenes yet</p>

  return (
    <Paper>
      <Layout>
        <p>All Scenes</p>
        <Button
          onClick={async () => {
            await createScene({ variables: { data: {} } })
            refetch()
          }}
        >
          Add Scene
        </Button>
      </Layout>
      <Layout classes={{ root: classes.gallery }}>
        {data.scenes.map(scene => (
          <div
            key={scene.id}
            className={currentScene === scene.id ? classes.selected : ''}
            onClick={() => handleSceneSwitch(scene.id)}
          >
            <SceneViewer mini scene={scene} />
          </div>
        ))}
      </Layout>
    </Paper>
  )
}
