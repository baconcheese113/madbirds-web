import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import { Layout } from '../common'
import { IconButton } from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { gql, useMutation } from '@apollo/client'
import { updateOneCrate } from './mutations/updateOneCrate.mutation'
import { sceneObjectControls_crate } from './__generated__/sceneObjectControls_crate'

const MOVE_SIZE = 10;

type Props = {
  crate: sceneObjectControls_crate,
  classes: { root: string }
}
export default function SceneObjectControls(props: Props) {
  const { crate, classes } = props;
  const { id, x, y } = crate
  const [updateCrate] = useMutation(updateOneCrate)

  const handleMove = React.useCallback(async (movement: { x?: number, y?: number }) => {
    const variables = {
      data: {
        x: movement.x ? { increment: movement.x } : undefined,
        y: movement.y ? { increment: movement.y } : undefined,
      },
      where: { id }
    }
    await updateCrate({ variables })
    console.log(`Moved x:${movement.x} and y: ${movement.y}`)
  }, [id, updateCrate])

  console.log('x: ', x, ' y: ', y)
  return (
    <Paper classes={{root: classes.root }}>
      <Layout>

        <Layout column center>
        <IconButton onClick={() => handleMove({x: -MOVE_SIZE})}>
          <ArrowBackIcon />
        </IconButton>
        </Layout>

        <Layout column>
          <IconButton onClick={() => handleMove({y: MOVE_SIZE})}>
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton onClick={() => handleMove({y: -MOVE_SIZE})}>
            <ArrowDownwardIcon />
          </IconButton>
        </Layout>
        
        <Layout column center>
          <IconButton onClick={() => handleMove({x: MOVE_SIZE})}>
            <ArrowForwardIcon />
          </IconButton>
        </Layout>

      </Layout>
    </Paper>
    )
}

SceneObjectControls.fragments = {
  crate: gql`
    fragment sceneObjectControls_crate on Crate {
      __typename
      id
      x
      y
      rotation
    }
  `
}