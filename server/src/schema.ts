import { nexusPrisma } from 'nexus-plugin-prisma'
import { makeSchema, mutationType, objectType, queryType, stringArg } from '@nexus/schema'
import { join } from 'path'
import { Context } from './context'


const schema = makeSchema({
  types: [
    queryType({
      definition(t) {
        t.crud.scene()
        t.crud.scenes({ pagination: true })
        t.crud.crate()
      }
    }),
    mutationType({
      definition(t) {
        t.crud.updateOneCrate()
        t.field('uploadJsonScene', {
          type: "Boolean",
          args: {
            json: stringArg({
              description: "JSON string with the entire scene to upload",
              required: true
            })
          },
          async resolve(root, args, { prisma }: Context) {
            const json = JSON.parse(args.json);
            for (const [idx, crate] of Object.entries(json.crates)) {
              const newCrate = { x: crate.position.x * 50, y: crate.position.y * 50, rotation: crate.rotation, Scene: { connect: { id: 1 } } }
              const upsert = await prisma.crate.upsert({ create: newCrate, update: newCrate, where: { id: Number.parseInt(idx) + 1 } })
            }
            return true
          }
        })
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
