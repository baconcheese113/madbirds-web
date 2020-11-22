import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import { IconButton } from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { useMutation } from '@apollo/client'
import { Layout } from '../common'
import { updateOneCrateMutation } from './mutations/updateOneCrate.mutation'

const MOVE_SIZE = 10

type Props = {
  id: string,
  classes: { root: string },
}
export default function SceneObjectControls(props: Props) {
  const { id, classes } = props
  const [updateCrate] = useMutation(updateOneCrateMutation)

  const handleMove = React.useCallback(
    async (movement: { x?: number, y?: number }) => {
      const variables = {
        data: {
          x: movement.x ? { increment: movement.x } : undefined,
          y: movement.y ? { increment: movement.y } : undefined,
        },
        where: { id },
      }
      await updateCrate({ variables })
      console.log(`Moved x:${movement.x} and y: ${movement.y}`)
    },
    [id, updateCrate],
  )

  return (
    <Paper classes={{ root: classes.root }}>
      <Layout>
        <Layout center column>
          <IconButton onClick={() => handleMove({ x: -MOVE_SIZE })}>
            <ArrowBackIcon />
          </IconButton>
        </Layout>

        <Layout column>
          <IconButton onClick={() => handleMove({ y: MOVE_SIZE })}>
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton onClick={() => handleMove({ y: -MOVE_SIZE })}>
            <ArrowDownwardIcon />
          </IconButton>
        </Layout>

        <Layout center column>
          <IconButton onClick={() => handleMove({ x: MOVE_SIZE })}>
            <ArrowForwardIcon />
          </IconButton>
        </Layout>
      </Layout>
    </Paper>
  )
}
