import { nexusPrisma } from 'nexus-plugin-prisma'
import { makeSchema, objectType, queryType } from '@nexus/schema'
import { join } from 'path'


const schema = makeSchema({
  types: [
    queryType({
      definition(t) {
        t.crud.scene({})
        t.crud.scenes({})
      }
    }),
    objectType({
      name: 'Scene',
      definition(t) {
        t.model.id()
        t.model.levelNumber()
        t.model.crates()
        t.model.explosiveCrates()
        t.model.enemies()
        t.model.platforms()
      }
    }),
    objectType({
      name: 'Crate',
      definition(t) {
        t.model.id()
        t.model.x()
        t.model.y()
        t.model.rotation()
        t.model.Scene()
      }
    }),
    objectType({
      name: 'ExplosiveCrate',
      definition(t) {
        t.model.id()
        t.model.x()
        t.model.y()
        t.model.rotation()
        t.model.explosionRadius()
        t.model.explosionForce()
        t.model.hitSensitivity()
        t.model.chainReactionRadius()
        t.model.onlyPlayerCanTrigger()
        t.model.Scene()
      }
    }),
    objectType({
      name: 'Enemy',
      definition(t) {
        t.model.x()
        t.model.y()
        t.model.rotation()
        t.model.Scene()
      }
    }),
    objectType({
      name: 'Platform',
      definition(t) {
        t.model.x()
        t.model.y()
        t.model.rotation()
        t.model.useRotator()
        t.model.degsPerSec()
        t.model.useBouncer()
        t.model.bounceMultiplier()
        t.model.onlyBounceFront()
        t.model.Scene()
      }
    })
  ],
  outputs: {
    typegen: join(__dirname, '..', 'generated', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'generated', 'schema.graphql'),
  },
  plugins: [nexusPrisma({
    experimentalCRUD: true,
  })],
})

export { schema }
