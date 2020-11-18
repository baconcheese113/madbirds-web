/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */





declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CrateWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  EnemyWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  ExplosiveCrateWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  PlatformWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  SceneWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenRootTypes {
  Crate: { // root type
    id: number; // Int!
    rotation: number; // Float!
    x: number; // Float!
    y: number; // Float!
  }
  Enemy: { // root type
    rotation: number; // Float!
    x: number; // Float!
    y: number; // Float!
  }
  ExplosiveCrate: { // root type
    chainReactionRadius: number; // Float!
    explosionForce: number; // Float!
    explosionRadius: number; // Float!
    hitSensitivity: number; // Float!
    id: number; // Int!
    onlyPlayerCanTrigger: boolean; // Boolean!
    rotation: number; // Float!
    x: number; // Float!
    y: number; // Float!
  }
  Platform: { // root type
    bounceMultiplier: number; // Float!
    degsPerSec: number; // Float!
    onlyBounceFront: boolean; // Boolean!
    rotation: number; // Float!
    useBouncer: boolean; // Boolean!
    useRotator: boolean; // Boolean!
    x: number; // Float!
    y: number; // Float!
  }
  Query: {};
  Scene: { // root type
    id: number; // Int!
    levelNumber: number; // Int!
  }
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  CrateWhereUniqueInput: NexusGenInputs['CrateWhereUniqueInput'];
  EnemyWhereUniqueInput: NexusGenInputs['EnemyWhereUniqueInput'];
  ExplosiveCrateWhereUniqueInput: NexusGenInputs['ExplosiveCrateWhereUniqueInput'];
  PlatformWhereUniqueInput: NexusGenInputs['PlatformWhereUniqueInput'];
  SceneWhereUniqueInput: NexusGenInputs['SceneWhereUniqueInput'];
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
}

export interface NexusGenFieldTypes {
  Crate: { // field return type
    id: number; // Int!
    rotation: number; // Float!
    Scene: NexusGenRootTypes['Scene'] | null; // Scene
    x: number; // Float!
    y: number; // Float!
  }
  Enemy: { // field return type
    rotation: number; // Float!
    Scene: NexusGenRootTypes['Scene'] | null; // Scene
    x: number; // Float!
    y: number; // Float!
  }
  ExplosiveCrate: { // field return type
    chainReactionRadius: number; // Float!
    explosionForce: number; // Float!
    explosionRadius: number; // Float!
    hitSensitivity: number; // Float!
    id: number; // Int!
    onlyPlayerCanTrigger: boolean; // Boolean!
    rotation: number; // Float!
    Scene: NexusGenRootTypes['Scene'] | null; // Scene
    x: number; // Float!
    y: number; // Float!
  }
  Platform: { // field return type
    bounceMultiplier: number; // Float!
    degsPerSec: number; // Float!
    onlyBounceFront: boolean; // Boolean!
    rotation: number; // Float!
    Scene: NexusGenRootTypes['Scene'] | null; // Scene
    useBouncer: boolean; // Boolean!
    useRotator: boolean; // Boolean!
    x: number; // Float!
    y: number; // Float!
  }
  Query: { // field return type
    scene: NexusGenRootTypes['Scene'] | null; // Scene
    scenes: NexusGenRootTypes['Scene'][]; // [Scene!]!
  }
  Scene: { // field return type
    crates: NexusGenRootTypes['Crate'][]; // [Crate!]!
    enemies: NexusGenRootTypes['Enemy'][]; // [Enemy!]!
    explosiveCrates: NexusGenRootTypes['ExplosiveCrate'][]; // [ExplosiveCrate!]!
    id: number; // Int!
    levelNumber: number; // Int!
    platforms: NexusGenRootTypes['Platform'][]; // [Platform!]!
  }
}

export interface NexusGenFieldTypeNames {
  Crate: { // field return type name
    id: 'Int'
    rotation: 'Float'
    Scene: 'Scene'
    x: 'Float'
    y: 'Float'
  }
  Enemy: { // field return type name
    rotation: 'Float'
    Scene: 'Scene'
    x: 'Float'
    y: 'Float'
  }
  ExplosiveCrate: { // field return type name
    chainReactionRadius: 'Float'
    explosionForce: 'Float'
    explosionRadius: 'Float'
    hitSensitivity: 'Float'
    id: 'Int'
    onlyPlayerCanTrigger: 'Boolean'
    rotation: 'Float'
    Scene: 'Scene'
    x: 'Float'
    y: 'Float'
  }
  Platform: { // field return type name
    bounceMultiplier: 'Float'
    degsPerSec: 'Float'
    onlyBounceFront: 'Boolean'
    rotation: 'Float'
    Scene: 'Scene'
    useBouncer: 'Boolean'
    useRotator: 'Boolean'
    x: 'Float'
    y: 'Float'
  }
  Query: { // field return type name
    scene: 'Scene'
    scenes: 'Scene'
  }
  Scene: { // field return type name
    crates: 'Crate'
    enemies: 'Enemy'
    explosiveCrates: 'ExplosiveCrate'
    id: 'Int'
    levelNumber: 'Int'
    platforms: 'Platform'
  }
}

export interface NexusGenArgTypes {
  Query: {
    scene: { // args
      where: NexusGenInputs['SceneWhereUniqueInput']; // SceneWhereUniqueInput!
    }
    scenes: { // args
      after?: NexusGenInputs['SceneWhereUniqueInput'] | null; // SceneWhereUniqueInput
      before?: NexusGenInputs['SceneWhereUniqueInput'] | null; // SceneWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Scene: {
    crates: { // args
      after?: NexusGenInputs['CrateWhereUniqueInput'] | null; // CrateWhereUniqueInput
      before?: NexusGenInputs['CrateWhereUniqueInput'] | null; // CrateWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    enemies: { // args
      after?: NexusGenInputs['EnemyWhereUniqueInput'] | null; // EnemyWhereUniqueInput
      before?: NexusGenInputs['EnemyWhereUniqueInput'] | null; // EnemyWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    explosiveCrates: { // args
      after?: NexusGenInputs['ExplosiveCrateWhereUniqueInput'] | null; // ExplosiveCrateWhereUniqueInput
      before?: NexusGenInputs['ExplosiveCrateWhereUniqueInput'] | null; // ExplosiveCrateWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    platforms: { // args
      after?: NexusGenInputs['PlatformWhereUniqueInput'] | null; // PlatformWhereUniqueInput
      before?: NexusGenInputs['PlatformWhereUniqueInput'] | null; // PlatformWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Crate" | "Enemy" | "ExplosiveCrate" | "Platform" | "Query" | "Scene";

export type NexusGenInputNames = "CrateWhereUniqueInput" | "EnemyWhereUniqueInput" | "ExplosiveCrateWhereUniqueInput" | "PlatformWhereUniqueInput" | "SceneWhereUniqueInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}