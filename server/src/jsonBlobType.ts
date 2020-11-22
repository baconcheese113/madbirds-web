type baseTransformType = {
  x: number,
  y: number,
  rotation: number,
}

export type jsonBlobType = {
  levelNumber: number,
  crates: [baseTransformType],
  explosiveCrates: [
    baseTransformType & {
      explosionRadius: number,
      explosionForce: number,
      hitSensitivity: number,
      chainReactionRadius: number,
      onlyPlayerCanTrigger: number,
    },
  ],
  enemies: [baseTransformType],
  platforms: [
    baseTransformType & {
      useRotator: boolean,
      degsPerSec: number,
      useBouncer: boolean,
      bounceMultiplier: number,
      onlyBounceFront: boolean,
    },
  ],
}
