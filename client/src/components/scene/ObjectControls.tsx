import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import { Layout } from '../common'
import { IconButton, makeStyles } from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const useClasses = makeStyles({

})

type Props = {
  classes: { root: string }
}
export default function ObjectControls(props: Props) {
  const { classes } = props;

  return (
    <Paper classes={{root: classes.root }}>
      <Layout>
        <Layout column center>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        </Layout>
        <Layout column>
          <IconButton>
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton>
            <ArrowDownwardIcon />
          </IconButton>
        </Layout>
        <Layout column center>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </Layout>
      </Layout>
    </Paper>
    )
}