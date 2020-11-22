import { gql, useMutation, useQuery } from '@apollo/client'
import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { Layout } from '../common'
import { updateOneEnemyMutation } from './mutations/updateOneEnemy.mutation'
import { updateOneEnemyVariables } from './mutations/__generated__/updateOneEnemy'
import ObjectStatsField from './ObjectStatsField'
import { EnemyStatsQuery } from './__generated__/EnemyStatsQuery'

type Props = {
  id: number,
}

export default function EnemyStats(props: Props) {
  const { id } = props
  const { data, loading, error } = useQuery<EnemyStatsQuery>(
    gql`
      query EnemyStatsQuery($id: Int) {
        enemy(where: { id: $id }) {
          id
          x
          y
          rotation
        }
      }
    `,
    { variables: { id } },
  )
  const [updateEnemy] = useMutation(updateOneEnemyMutation)

  const handleChange = React.useCallback(
    async (key: string, value: any) => {
      // Mutate to change key
      const variables: updateOneEnemyVariables = {
        data: {
          [key]: { set: Number.parseFloat(value) },
        },
        where: { id },
      }
      await updateEnemy({ variables })
    },
    [id, updateEnemy],
  )

  if (loading) return <CircularProgress />
  if (error) return <p>ERROR</p>
  if (!data?.enemy) return <p>No scenes yet</p>

  return (
    <Layout column>
      <ObjectStatsField label="X" value={data.enemy.x} onChange={v => handleChange('x', v)} />
      <ObjectStatsField label="Y" value={data.enemy.y} onChange={v => handleChange('y', v)} />
      <ObjectStatsField label="Rotation" value={data.enemy.rotation} onChange={v => handleChange('rotation', v)} />
    </Layout>
  )
}
