import { join } from 'path'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { intArg, makeSchema, mutationType, objectType, queryType, stringArg } from '@nexus/schema'
import { Context } from './context'
import { jsonBlobType } from './jsonBlobType'

const schema = makeSchema({
  types: [
    queryType({
      definition(t) {
        t.crud.scene()
        t.crud.scenes()
        t.crud.crate()
        t.crud.explosiveCrate()
        t.crud.enemy()
        t.crud.platform()
        t.field('downloadJsonScene', {
          type: 'String',
          args: {
            levelNumber: intArg({
              description: 'The levelNumber for the scene to download',
              required: true,
            }),
          },
          async resolve(_root, args, { prisma }: Context) {
            const { levelNumber } = args
            const allData = await prisma.scene.findOne({
              where: { levelNumber },
              include: { crates: true, explosiveCrates: true, enemies: true, platforms: true },
            })
            console.dir(allData)
            return JSON.stringify(allData)
          },
        })
      },
    }),
    mutationType({
      definition(t) {
        t.crud.createOneScene()
        t.crud.updateOneCrate()
        t.crud.updateOneExplosiveCrate()
        t.crud.updateOneEnemy()
        t.crud.updateOnePlatform()
        t.field('uploadJsonScene', {
          type: 'Boolean',
          args: {
            json: stringArg({
              description: 'JSON string with the entire scene to upload, probably from game client',
              required: true,
            }),
          },
          async resolve(_root, args, { prisma }: Context) {
            const json: jsonBlobType = JSON.parse(args.json)
            const { levelNumber } = json
            // The upload mutation totally replaces everything for this scene so all current scene objects need to be removed
            const scene = await prisma.scene.findOne({ where: { levelNumber } })
            if (scene) {
              const whereLevel = { where: { sceneId: scene.id } }
              await prisma.enemy.deleteMany(whereLevel)
              await prisma.crate.deleteMany(whereLevel)
              await prisma.explosiveCrate.deleteMany(whereLevel)
              await prisma.platform.deleteMany(whereLevel)
            }
            const enemies = { create: json.enemies }
            const crates = { create: json.crates }
            const explosiveCrates = { create: json.explosiveCrates }
            const platforms = { create: json.platforms }
            const data = { enemies, crates, explosiveCrates, platforms }
            await prisma.scene.upsert({ create: data, update: data, where: { levelNumber } })

            return true
          },
        })
      },
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
      },
    }),
    objectType({
      name: 'Crate',
      definition(t) {
        t.model.id()
        t.model.x()
        t.model.y()
        t.model.rotation()
        t.model.Scene()
      },
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
      },
    }),
    objectType({
      name: 'Enemy',
      definition(t) {
        t.model.id()
        t.model.x()
        t.model.y()
        t.model.rotation()
        t.model.Scene()
      },
    }),
    objectType({
      name: 'Platform',
      definition(t) {
        t.model.id()
        t.model.x()
        t.model.y()
        t.model.rotation()
        t.model.useRotator()
        t.model.degsPerSec()
        t.model.useBouncer()
        t.model.bounceMultiplier()
        t.model.onlyBounceFront()
        t.model.Scene()
      },
    }),
  ],
  outputs: {
    typegen: join(__dirname, '..', 'generated', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'generated', 'schema.graphql'),
  },
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],
})

export { schema }
