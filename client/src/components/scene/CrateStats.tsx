import { gql, useMutation, useQuery } from '@apollo/client'
import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { Layout } from '../common'
import { updateOneCrateMutation } from './mutations/updateOneCrate.mutation'
import { updateOneCrateVariables } from './mutations/__generated__/updateOneCrate'
import ObjectStatsField from './ObjectStatsField'
import { CrateStatsQuery } from './__generated__/CrateStatsQuery'

type Props = {
  id: number,
}

export default function CrateStats(props: Props) {
  const { id } = props
  const { data, loading, error } = useQuery<CrateStatsQuery>(
    gql`
      query CrateStatsQuery($id: Int) {
        crate(where: { id: $id }) {
          id
          x
          y
          rotation
        }
      }
    `,
    { variables: { id }, fetchPolicy: 'network-only' },
  )
  const [updateCrate] = useMutation(updateOneCrateMutation)

  const handleChange = React.useCallback(
    async (key: string, value: string) => {
      // Mutate to change key
      const variables: updateOneCrateVariables = {
        data: {
          [key]: { set: Number.parseFloat(value) },
        },
        where: { id },
      }
      await updateCrate({ variables })
    },
    [id, updateCrate],
  )

  if (loading) return <CircularProgress />
  if (error) return <p>ERROR</p>
  if (!data?.crate) return <p>No scenes yet</p>

  return (
    <Layout column>
      <ObjectStatsField label="X" value={data.crate.x} onChange={v => handleChange('x', v)} />
      <ObjectStatsField label="Y" value={data.crate.y} onChange={v => handleChange('y', v)} />
      <ObjectStatsField label="Rotation" value={data.crate.rotation} onChange={v => handleChange('rotation', v)} />
    </Layout>
  )
}
