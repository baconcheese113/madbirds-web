import { gql, useMutation, useQuery } from '@apollo/client'
import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { Layout } from '../common'
import { updateOneExplosiveCrateMutation } from './mutations/updateOneExplosiveCrate.mutation'
import { updateOneExplosiveCrateVariables } from './mutations/__generated__/updateOneExplosiveCrate'
import ObjectStatsField from './ObjectStatsField'
import { ExplosiveCrateStatsQuery } from './__generated__/ExplosiveCrateStatsQuery'

type Props = {
  id: number,
}

export default function ExplosiveCrateStats(props: Props) {
  const { id } = props
  const { data, loading, error } = useQuery<ExplosiveCrateStatsQuery>(
    gql`
      query ExplosiveCrateStatsQuery($id: Int) {
        explosiveCrate(where: { id: $id }) {
          id
          x
          y
          rotation
          explosionRadius
          explosionForce
          hitSensitivity
          chainReactionRadius
          onlyPlayerCanTrigger
        }
      }
    `,
    { variables: { id } },
  )
  const [updateExplosiveCrate] = useMutation(updateOneExplosiveCrateMutation)

  const handleChange = React.useCallback(
    async (key: string, value: any) => {
      // Mutate to change key
      const variables: updateOneExplosiveCrateVariables = {
        data: {},
        where: { id },
      }
      if (key === 'onlyPlayerCanTrigger') variables.data[key] = value
      // else variables.data[key] = { set: Number.parseFloat(value) }
      await updateExplosiveCrate({ variables })
    },
    [id, updateExplosiveCrate],
  )

  if (loading) return <CircularProgress />
  if (error) return <p>ERROR</p>
  if (!data?.explosiveCrate) return <p>No scenes yet</p>

  return (
    <Layout column>
      <ObjectStatsField label="X" value={data.explosiveCrate.x} onChange={v => handleChange('x', v)} />
      <ObjectStatsField label="Y" value={data.explosiveCrate.y} onChange={v => handleChange('y', v)} />
      <ObjectStatsField
        label="Rotation"
        value={data.explosiveCrate.rotation}
        onChange={v => handleChange('rotation', v)}
      />
      <ObjectStatsField
        label="Explosion Radius"
        value={data.explosiveCrate.explosionRadius}
        onChange={v => handleChange('explosionRadius', v)}
      />
      <ObjectStatsField
        label="Explosion Force"
        value={data.explosiveCrate.explosionForce}
        onChange={v => handleChange('explosionForce', v)}
      />
      <ObjectStatsField
        label="Hit Sensitivity"
        value={data.explosiveCrate.hitSensitivity}
        onChange={v => handleChange('hitSensitivity', v)}
      />
      <ObjectStatsField
        label="Chain Reaction Radius"
        value={data.explosiveCrate.chainReactionRadius}
        onChange={v => handleChange('chainReactionRadius', v)}
      />
      <ObjectStatsField
        label="Only Player Can Trigger"
        value={`${data.explosiveCrate.onlyPlayerCanTrigger}`}
        onChange={v => handleChange('onlyPlayerCanTrigger', v)}
      />
    </Layout>
  )
}
