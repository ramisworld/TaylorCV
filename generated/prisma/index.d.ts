
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AnonymousSession
 * 
 */
export type AnonymousSession = $Result.DefaultSelection<Prisma.$AnonymousSessionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model CareerProfile
 * 
 */
export type CareerProfile = $Result.DefaultSelection<Prisma.$CareerProfilePayload>
/**
 * Model CvApplication
 * 
 */
export type CvApplication = $Result.DefaultSelection<Prisma.$CvApplicationPayload>
/**
 * Model CvDraft
 * 
 */
export type CvDraft = $Result.DefaultSelection<Prisma.$CvDraftPayload>
/**
 * Model AgentRun
 * 
 */
export type AgentRun = $Result.DefaultSelection<Prisma.$AgentRunPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more AnonymousSessions
 * const anonymousSessions = await prisma.anonymousSession.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more AnonymousSessions
   * const anonymousSessions = await prisma.anonymousSession.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.anonymousSession`: Exposes CRUD operations for the **AnonymousSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnonymousSessions
    * const anonymousSessions = await prisma.anonymousSession.findMany()
    * ```
    */
  get anonymousSession(): Prisma.AnonymousSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.careerProfile`: Exposes CRUD operations for the **CareerProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CareerProfiles
    * const careerProfiles = await prisma.careerProfile.findMany()
    * ```
    */
  get careerProfile(): Prisma.CareerProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cvApplication`: Exposes CRUD operations for the **CvApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CvApplications
    * const cvApplications = await prisma.cvApplication.findMany()
    * ```
    */
  get cvApplication(): Prisma.CvApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cvDraft`: Exposes CRUD operations for the **CvDraft** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CvDrafts
    * const cvDrafts = await prisma.cvDraft.findMany()
    * ```
    */
  get cvDraft(): Prisma.CvDraftDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agentRun`: Exposes CRUD operations for the **AgentRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentRuns
    * const agentRuns = await prisma.agentRun.findMany()
    * ```
    */
  get agentRun(): Prisma.AgentRunDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AnonymousSession: 'AnonymousSession',
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    CareerProfile: 'CareerProfile',
    CvApplication: 'CvApplication',
    CvDraft: 'CvDraft',
    AgentRun: 'AgentRun'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "anonymousSession" | "user" | "session" | "account" | "verification" | "careerProfile" | "cvApplication" | "cvDraft" | "agentRun"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AnonymousSession: {
        payload: Prisma.$AnonymousSessionPayload<ExtArgs>
        fields: Prisma.AnonymousSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnonymousSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnonymousSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>
          }
          findFirst: {
            args: Prisma.AnonymousSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnonymousSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>
          }
          findMany: {
            args: Prisma.AnonymousSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>[]
          }
          create: {
            args: Prisma.AnonymousSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>
          }
          createMany: {
            args: Prisma.AnonymousSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnonymousSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>[]
          }
          delete: {
            args: Prisma.AnonymousSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>
          }
          update: {
            args: Prisma.AnonymousSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>
          }
          deleteMany: {
            args: Prisma.AnonymousSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnonymousSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnonymousSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>[]
          }
          upsert: {
            args: Prisma.AnonymousSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>
          }
          aggregate: {
            args: Prisma.AnonymousSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnonymousSession>
          }
          groupBy: {
            args: Prisma.AnonymousSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnonymousSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnonymousSessionCountArgs<ExtArgs>
            result: $Utils.Optional<AnonymousSessionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      CareerProfile: {
        payload: Prisma.$CareerProfilePayload<ExtArgs>
        fields: Prisma.CareerProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareerProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareerProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerProfilePayload>
          }
          findFirst: {
            args: Prisma.CareerProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareerProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerProfilePayload>
          }
          findMany: {
            args: Prisma.CareerProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerProfilePayload>[]
          }
          create: {
            args: Prisma.CareerProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerProfilePayload>
          }
          createMany: {
            args: Prisma.CareerProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CareerProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerProfilePayload>[]
          }
          delete: {
            args: Prisma.CareerProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerProfilePayload>
          }
          update: {
            args: Prisma.CareerProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerProfilePayload>
          }
          deleteMany: {
            args: Prisma.CareerProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CareerProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CareerProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerProfilePayload>[]
          }
          upsert: {
            args: Prisma.CareerProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerProfilePayload>
          }
          aggregate: {
            args: Prisma.CareerProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCareerProfile>
          }
          groupBy: {
            args: Prisma.CareerProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<CareerProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareerProfileCountArgs<ExtArgs>
            result: $Utils.Optional<CareerProfileCountAggregateOutputType> | number
          }
        }
      }
      CvApplication: {
        payload: Prisma.$CvApplicationPayload<ExtArgs>
        fields: Prisma.CvApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CvApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CvApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvApplicationPayload>
          }
          findFirst: {
            args: Prisma.CvApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CvApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvApplicationPayload>
          }
          findMany: {
            args: Prisma.CvApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvApplicationPayload>[]
          }
          create: {
            args: Prisma.CvApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvApplicationPayload>
          }
          createMany: {
            args: Prisma.CvApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CvApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvApplicationPayload>[]
          }
          delete: {
            args: Prisma.CvApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvApplicationPayload>
          }
          update: {
            args: Prisma.CvApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvApplicationPayload>
          }
          deleteMany: {
            args: Prisma.CvApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CvApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CvApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvApplicationPayload>[]
          }
          upsert: {
            args: Prisma.CvApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvApplicationPayload>
          }
          aggregate: {
            args: Prisma.CvApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCvApplication>
          }
          groupBy: {
            args: Prisma.CvApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CvApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CvApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<CvApplicationCountAggregateOutputType> | number
          }
        }
      }
      CvDraft: {
        payload: Prisma.$CvDraftPayload<ExtArgs>
        fields: Prisma.CvDraftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CvDraftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvDraftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CvDraftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvDraftPayload>
          }
          findFirst: {
            args: Prisma.CvDraftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvDraftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CvDraftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvDraftPayload>
          }
          findMany: {
            args: Prisma.CvDraftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvDraftPayload>[]
          }
          create: {
            args: Prisma.CvDraftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvDraftPayload>
          }
          createMany: {
            args: Prisma.CvDraftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CvDraftCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvDraftPayload>[]
          }
          delete: {
            args: Prisma.CvDraftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvDraftPayload>
          }
          update: {
            args: Prisma.CvDraftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvDraftPayload>
          }
          deleteMany: {
            args: Prisma.CvDraftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CvDraftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CvDraftUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvDraftPayload>[]
          }
          upsert: {
            args: Prisma.CvDraftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CvDraftPayload>
          }
          aggregate: {
            args: Prisma.CvDraftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCvDraft>
          }
          groupBy: {
            args: Prisma.CvDraftGroupByArgs<ExtArgs>
            result: $Utils.Optional<CvDraftGroupByOutputType>[]
          }
          count: {
            args: Prisma.CvDraftCountArgs<ExtArgs>
            result: $Utils.Optional<CvDraftCountAggregateOutputType> | number
          }
        }
      }
      AgentRun: {
        payload: Prisma.$AgentRunPayload<ExtArgs>
        fields: Prisma.AgentRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          findFirst: {
            args: Prisma.AgentRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          findMany: {
            args: Prisma.AgentRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>[]
          }
          create: {
            args: Prisma.AgentRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          createMany: {
            args: Prisma.AgentRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>[]
          }
          delete: {
            args: Prisma.AgentRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          update: {
            args: Prisma.AgentRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          deleteMany: {
            args: Prisma.AgentRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>[]
          }
          upsert: {
            args: Prisma.AgentRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          aggregate: {
            args: Prisma.AgentRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentRun>
          }
          groupBy: {
            args: Prisma.AgentRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentRunCountArgs<ExtArgs>
            result: $Utils.Optional<AgentRunCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    anonymousSession?: AnonymousSessionOmit
    user?: UserOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
    careerProfile?: CareerProfileOmit
    cvApplication?: CvApplicationOmit
    cvDraft?: CvDraftOmit
    agentRun?: AgentRunOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    accounts: number
    applications: number
    agentRuns: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    applications?: boolean | UserCountOutputTypeCountApplicationsArgs
    agentRuns?: boolean | UserCountOutputTypeCountAgentRunsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CvApplicationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAgentRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentRunWhereInput
  }


  /**
   * Count Type CareerProfileCountOutputType
   */

  export type CareerProfileCountOutputType = {
    applications: number
  }

  export type CareerProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | CareerProfileCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * CareerProfileCountOutputType without action
   */
  export type CareerProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfileCountOutputType
     */
    select?: CareerProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CareerProfileCountOutputType without action
   */
  export type CareerProfileCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CvApplicationWhereInput
  }


  /**
   * Count Type CvApplicationCountOutputType
   */

  export type CvApplicationCountOutputType = {
    agentRuns: number
  }

  export type CvApplicationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agentRuns?: boolean | CvApplicationCountOutputTypeCountAgentRunsArgs
  }

  // Custom InputTypes
  /**
   * CvApplicationCountOutputType without action
   */
  export type CvApplicationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplicationCountOutputType
     */
    select?: CvApplicationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CvApplicationCountOutputType without action
   */
  export type CvApplicationCountOutputTypeCountAgentRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentRunWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AnonymousSession
   */

  export type AggregateAnonymousSession = {
    _count: AnonymousSessionCountAggregateOutputType | null
    _min: AnonymousSessionMinAggregateOutputType | null
    _max: AnonymousSessionMaxAggregateOutputType | null
  }

  export type AnonymousSessionMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnonymousSessionMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnonymousSessionCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AnonymousSessionMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnonymousSessionMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnonymousSessionCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AnonymousSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnonymousSession to aggregate.
     */
    where?: AnonymousSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousSessions to fetch.
     */
    orderBy?: AnonymousSessionOrderByWithRelationInput | AnonymousSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnonymousSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnonymousSessions
    **/
    _count?: true | AnonymousSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnonymousSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnonymousSessionMaxAggregateInputType
  }

  export type GetAnonymousSessionAggregateType<T extends AnonymousSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAnonymousSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnonymousSession[P]>
      : GetScalarType<T[P], AggregateAnonymousSession[P]>
  }




  export type AnonymousSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnonymousSessionWhereInput
    orderBy?: AnonymousSessionOrderByWithAggregationInput | AnonymousSessionOrderByWithAggregationInput[]
    by: AnonymousSessionScalarFieldEnum[] | AnonymousSessionScalarFieldEnum
    having?: AnonymousSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnonymousSessionCountAggregateInputType | true
    _min?: AnonymousSessionMinAggregateInputType
    _max?: AnonymousSessionMaxAggregateInputType
  }

  export type AnonymousSessionGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    _count: AnonymousSessionCountAggregateOutputType | null
    _min: AnonymousSessionMinAggregateOutputType | null
    _max: AnonymousSessionMaxAggregateOutputType | null
  }

  type GetAnonymousSessionGroupByPayload<T extends AnonymousSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnonymousSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnonymousSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnonymousSessionGroupByOutputType[P]>
            : GetScalarType<T[P], AnonymousSessionGroupByOutputType[P]>
        }
      >
    >


  export type AnonymousSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["anonymousSession"]>

  export type AnonymousSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["anonymousSession"]>

  export type AnonymousSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["anonymousSession"]>

  export type AnonymousSessionSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AnonymousSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt", ExtArgs["result"]["anonymousSession"]>

  export type $AnonymousSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnonymousSession"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["anonymousSession"]>
    composites: {}
  }

  type AnonymousSessionGetPayload<S extends boolean | null | undefined | AnonymousSessionDefaultArgs> = $Result.GetResult<Prisma.$AnonymousSessionPayload, S>

  type AnonymousSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnonymousSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnonymousSessionCountAggregateInputType | true
    }

  export interface AnonymousSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnonymousSession'], meta: { name: 'AnonymousSession' } }
    /**
     * Find zero or one AnonymousSession that matches the filter.
     * @param {AnonymousSessionFindUniqueArgs} args - Arguments to find a AnonymousSession
     * @example
     * // Get one AnonymousSession
     * const anonymousSession = await prisma.anonymousSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnonymousSessionFindUniqueArgs>(args: SelectSubset<T, AnonymousSessionFindUniqueArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnonymousSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnonymousSessionFindUniqueOrThrowArgs} args - Arguments to find a AnonymousSession
     * @example
     * // Get one AnonymousSession
     * const anonymousSession = await prisma.anonymousSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnonymousSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AnonymousSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnonymousSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionFindFirstArgs} args - Arguments to find a AnonymousSession
     * @example
     * // Get one AnonymousSession
     * const anonymousSession = await prisma.anonymousSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnonymousSessionFindFirstArgs>(args?: SelectSubset<T, AnonymousSessionFindFirstArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnonymousSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionFindFirstOrThrowArgs} args - Arguments to find a AnonymousSession
     * @example
     * // Get one AnonymousSession
     * const anonymousSession = await prisma.anonymousSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnonymousSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AnonymousSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnonymousSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnonymousSessions
     * const anonymousSessions = await prisma.anonymousSession.findMany()
     * 
     * // Get first 10 AnonymousSessions
     * const anonymousSessions = await prisma.anonymousSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const anonymousSessionWithIdOnly = await prisma.anonymousSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnonymousSessionFindManyArgs>(args?: SelectSubset<T, AnonymousSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnonymousSession.
     * @param {AnonymousSessionCreateArgs} args - Arguments to create a AnonymousSession.
     * @example
     * // Create one AnonymousSession
     * const AnonymousSession = await prisma.anonymousSession.create({
     *   data: {
     *     // ... data to create a AnonymousSession
     *   }
     * })
     * 
     */
    create<T extends AnonymousSessionCreateArgs>(args: SelectSubset<T, AnonymousSessionCreateArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnonymousSessions.
     * @param {AnonymousSessionCreateManyArgs} args - Arguments to create many AnonymousSessions.
     * @example
     * // Create many AnonymousSessions
     * const anonymousSession = await prisma.anonymousSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnonymousSessionCreateManyArgs>(args?: SelectSubset<T, AnonymousSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnonymousSessions and returns the data saved in the database.
     * @param {AnonymousSessionCreateManyAndReturnArgs} args - Arguments to create many AnonymousSessions.
     * @example
     * // Create many AnonymousSessions
     * const anonymousSession = await prisma.anonymousSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnonymousSessions and only return the `id`
     * const anonymousSessionWithIdOnly = await prisma.anonymousSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnonymousSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, AnonymousSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnonymousSession.
     * @param {AnonymousSessionDeleteArgs} args - Arguments to delete one AnonymousSession.
     * @example
     * // Delete one AnonymousSession
     * const AnonymousSession = await prisma.anonymousSession.delete({
     *   where: {
     *     // ... filter to delete one AnonymousSession
     *   }
     * })
     * 
     */
    delete<T extends AnonymousSessionDeleteArgs>(args: SelectSubset<T, AnonymousSessionDeleteArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnonymousSession.
     * @param {AnonymousSessionUpdateArgs} args - Arguments to update one AnonymousSession.
     * @example
     * // Update one AnonymousSession
     * const anonymousSession = await prisma.anonymousSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnonymousSessionUpdateArgs>(args: SelectSubset<T, AnonymousSessionUpdateArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnonymousSessions.
     * @param {AnonymousSessionDeleteManyArgs} args - Arguments to filter AnonymousSessions to delete.
     * @example
     * // Delete a few AnonymousSessions
     * const { count } = await prisma.anonymousSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnonymousSessionDeleteManyArgs>(args?: SelectSubset<T, AnonymousSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnonymousSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnonymousSessions
     * const anonymousSession = await prisma.anonymousSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnonymousSessionUpdateManyArgs>(args: SelectSubset<T, AnonymousSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnonymousSessions and returns the data updated in the database.
     * @param {AnonymousSessionUpdateManyAndReturnArgs} args - Arguments to update many AnonymousSessions.
     * @example
     * // Update many AnonymousSessions
     * const anonymousSession = await prisma.anonymousSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnonymousSessions and only return the `id`
     * const anonymousSessionWithIdOnly = await prisma.anonymousSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnonymousSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, AnonymousSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnonymousSession.
     * @param {AnonymousSessionUpsertArgs} args - Arguments to update or create a AnonymousSession.
     * @example
     * // Update or create a AnonymousSession
     * const anonymousSession = await prisma.anonymousSession.upsert({
     *   create: {
     *     // ... data to create a AnonymousSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnonymousSession we want to update
     *   }
     * })
     */
    upsert<T extends AnonymousSessionUpsertArgs>(args: SelectSubset<T, AnonymousSessionUpsertArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnonymousSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionCountArgs} args - Arguments to filter AnonymousSessions to count.
     * @example
     * // Count the number of AnonymousSessions
     * const count = await prisma.anonymousSession.count({
     *   where: {
     *     // ... the filter for the AnonymousSessions we want to count
     *   }
     * })
    **/
    count<T extends AnonymousSessionCountArgs>(
      args?: Subset<T, AnonymousSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnonymousSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnonymousSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnonymousSessionAggregateArgs>(args: Subset<T, AnonymousSessionAggregateArgs>): Prisma.PrismaPromise<GetAnonymousSessionAggregateType<T>>

    /**
     * Group by AnonymousSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnonymousSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnonymousSessionGroupByArgs['orderBy'] }
        : { orderBy?: AnonymousSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnonymousSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnonymousSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnonymousSession model
   */
  readonly fields: AnonymousSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnonymousSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnonymousSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnonymousSession model
   */
  interface AnonymousSessionFieldRefs {
    readonly id: FieldRef<"AnonymousSession", 'String'>
    readonly createdAt: FieldRef<"AnonymousSession", 'DateTime'>
    readonly updatedAt: FieldRef<"AnonymousSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnonymousSession findUnique
   */
  export type AnonymousSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousSession to fetch.
     */
    where: AnonymousSessionWhereUniqueInput
  }

  /**
   * AnonymousSession findUniqueOrThrow
   */
  export type AnonymousSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousSession to fetch.
     */
    where: AnonymousSessionWhereUniqueInput
  }

  /**
   * AnonymousSession findFirst
   */
  export type AnonymousSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousSession to fetch.
     */
    where?: AnonymousSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousSessions to fetch.
     */
    orderBy?: AnonymousSessionOrderByWithRelationInput | AnonymousSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnonymousSessions.
     */
    cursor?: AnonymousSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnonymousSessions.
     */
    distinct?: AnonymousSessionScalarFieldEnum | AnonymousSessionScalarFieldEnum[]
  }

  /**
   * AnonymousSession findFirstOrThrow
   */
  export type AnonymousSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousSession to fetch.
     */
    where?: AnonymousSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousSessions to fetch.
     */
    orderBy?: AnonymousSessionOrderByWithRelationInput | AnonymousSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnonymousSessions.
     */
    cursor?: AnonymousSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnonymousSessions.
     */
    distinct?: AnonymousSessionScalarFieldEnum | AnonymousSessionScalarFieldEnum[]
  }

  /**
   * AnonymousSession findMany
   */
  export type AnonymousSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousSessions to fetch.
     */
    where?: AnonymousSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousSessions to fetch.
     */
    orderBy?: AnonymousSessionOrderByWithRelationInput | AnonymousSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnonymousSessions.
     */
    cursor?: AnonymousSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousSessions.
     */
    skip?: number
    distinct?: AnonymousSessionScalarFieldEnum | AnonymousSessionScalarFieldEnum[]
  }

  /**
   * AnonymousSession create
   */
  export type AnonymousSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * The data needed to create a AnonymousSession.
     */
    data?: XOR<AnonymousSessionCreateInput, AnonymousSessionUncheckedCreateInput>
  }

  /**
   * AnonymousSession createMany
   */
  export type AnonymousSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnonymousSessions.
     */
    data: AnonymousSessionCreateManyInput | AnonymousSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnonymousSession createManyAndReturn
   */
  export type AnonymousSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * The data used to create many AnonymousSessions.
     */
    data: AnonymousSessionCreateManyInput | AnonymousSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnonymousSession update
   */
  export type AnonymousSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * The data needed to update a AnonymousSession.
     */
    data: XOR<AnonymousSessionUpdateInput, AnonymousSessionUncheckedUpdateInput>
    /**
     * Choose, which AnonymousSession to update.
     */
    where: AnonymousSessionWhereUniqueInput
  }

  /**
   * AnonymousSession updateMany
   */
  export type AnonymousSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnonymousSessions.
     */
    data: XOR<AnonymousSessionUpdateManyMutationInput, AnonymousSessionUncheckedUpdateManyInput>
    /**
     * Filter which AnonymousSessions to update
     */
    where?: AnonymousSessionWhereInput
    /**
     * Limit how many AnonymousSessions to update.
     */
    limit?: number
  }

  /**
   * AnonymousSession updateManyAndReturn
   */
  export type AnonymousSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * The data used to update AnonymousSessions.
     */
    data: XOR<AnonymousSessionUpdateManyMutationInput, AnonymousSessionUncheckedUpdateManyInput>
    /**
     * Filter which AnonymousSessions to update
     */
    where?: AnonymousSessionWhereInput
    /**
     * Limit how many AnonymousSessions to update.
     */
    limit?: number
  }

  /**
   * AnonymousSession upsert
   */
  export type AnonymousSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * The filter to search for the AnonymousSession to update in case it exists.
     */
    where: AnonymousSessionWhereUniqueInput
    /**
     * In case the AnonymousSession found by the `where` argument doesn't exist, create a new AnonymousSession with this data.
     */
    create: XOR<AnonymousSessionCreateInput, AnonymousSessionUncheckedCreateInput>
    /**
     * In case the AnonymousSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnonymousSessionUpdateInput, AnonymousSessionUncheckedUpdateInput>
  }

  /**
   * AnonymousSession delete
   */
  export type AnonymousSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * Filter which AnonymousSession to delete.
     */
    where: AnonymousSessionWhereUniqueInput
  }

  /**
   * AnonymousSession deleteMany
   */
  export type AnonymousSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnonymousSessions to delete
     */
    where?: AnonymousSessionWhereInput
    /**
     * Limit how many AnonymousSessions to delete.
     */
    limit?: number
  }

  /**
   * AnonymousSession without action
   */
  export type AnonymousSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    emailVerified: boolean | null
    name: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    emailVerified: boolean | null
    name: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    emailVerified: number
    name: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    name?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    name?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    name?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    emailVerified: boolean
    name: string
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    careerProfile?: boolean | User$careerProfileArgs<ExtArgs>
    applications?: boolean | User$applicationsArgs<ExtArgs>
    agentRuns?: boolean | User$agentRunsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "emailVerified" | "name" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    careerProfile?: boolean | User$careerProfileArgs<ExtArgs>
    applications?: boolean | User$applicationsArgs<ExtArgs>
    agentRuns?: boolean | User$agentRunsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      careerProfile: Prisma.$CareerProfilePayload<ExtArgs> | null
      applications: Prisma.$CvApplicationPayload<ExtArgs>[]
      agentRuns: Prisma.$AgentRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      emailVerified: boolean
      name: string
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    careerProfile<T extends User$careerProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$careerProfileArgs<ExtArgs>>): Prisma__CareerProfileClient<$Result.GetResult<Prisma.$CareerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    applications<T extends User$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, User$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    agentRuns<T extends User$agentRunsArgs<ExtArgs> = {}>(args?: Subset<T, User$agentRunsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly name: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.careerProfile
   */
  export type User$careerProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfile
     */
    select?: CareerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerProfile
     */
    omit?: CareerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerProfileInclude<ExtArgs> | null
    where?: CareerProfileWhereInput
  }

  /**
   * User.applications
   */
  export type User$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationInclude<ExtArgs> | null
    where?: CvApplicationWhereInput
    orderBy?: CvApplicationOrderByWithRelationInput | CvApplicationOrderByWithRelationInput[]
    cursor?: CvApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CvApplicationScalarFieldEnum | CvApplicationScalarFieldEnum[]
  }

  /**
   * User.agentRuns
   */
  export type User$agentRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    where?: AgentRunWhereInput
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    cursor?: AgentRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentRunScalarFieldEnum | AgentRunScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model CareerProfile
   */

  export type AggregateCareerProfile = {
    _count: CareerProfileCountAggregateOutputType | null
    _min: CareerProfileMinAggregateOutputType | null
    _max: CareerProfileMaxAggregateOutputType | null
  }

  export type CareerProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    rawCvText: string | null
    rawCvFileName: string | null
    seniority: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CareerProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    rawCvText: string | null
    rawCvFileName: string | null
    seniority: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CareerProfileCountAggregateOutputType = {
    id: number
    userId: number
    rawCvText: number
    rawCvFileName: number
    profileJson: number
    seniority: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CareerProfileMinAggregateInputType = {
    id?: true
    userId?: true
    rawCvText?: true
    rawCvFileName?: true
    seniority?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CareerProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    rawCvText?: true
    rawCvFileName?: true
    seniority?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CareerProfileCountAggregateInputType = {
    id?: true
    userId?: true
    rawCvText?: true
    rawCvFileName?: true
    profileJson?: true
    seniority?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CareerProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerProfile to aggregate.
     */
    where?: CareerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerProfiles to fetch.
     */
    orderBy?: CareerProfileOrderByWithRelationInput | CareerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CareerProfiles
    **/
    _count?: true | CareerProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareerProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareerProfileMaxAggregateInputType
  }

  export type GetCareerProfileAggregateType<T extends CareerProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateCareerProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCareerProfile[P]>
      : GetScalarType<T[P], AggregateCareerProfile[P]>
  }




  export type CareerProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerProfileWhereInput
    orderBy?: CareerProfileOrderByWithAggregationInput | CareerProfileOrderByWithAggregationInput[]
    by: CareerProfileScalarFieldEnum[] | CareerProfileScalarFieldEnum
    having?: CareerProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareerProfileCountAggregateInputType | true
    _min?: CareerProfileMinAggregateInputType
    _max?: CareerProfileMaxAggregateInputType
  }

  export type CareerProfileGroupByOutputType = {
    id: string
    userId: string
    rawCvText: string
    rawCvFileName: string | null
    profileJson: JsonValue
    seniority: string
    createdAt: Date
    updatedAt: Date
    _count: CareerProfileCountAggregateOutputType | null
    _min: CareerProfileMinAggregateOutputType | null
    _max: CareerProfileMaxAggregateOutputType | null
  }

  type GetCareerProfileGroupByPayload<T extends CareerProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareerProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareerProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareerProfileGroupByOutputType[P]>
            : GetScalarType<T[P], CareerProfileGroupByOutputType[P]>
        }
      >
    >


  export type CareerProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    rawCvText?: boolean
    rawCvFileName?: boolean
    profileJson?: boolean
    seniority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    applications?: boolean | CareerProfile$applicationsArgs<ExtArgs>
    _count?: boolean | CareerProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careerProfile"]>

  export type CareerProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    rawCvText?: boolean
    rawCvFileName?: boolean
    profileJson?: boolean
    seniority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careerProfile"]>

  export type CareerProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    rawCvText?: boolean
    rawCvFileName?: boolean
    profileJson?: boolean
    seniority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["careerProfile"]>

  export type CareerProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    rawCvText?: boolean
    rawCvFileName?: boolean
    profileJson?: boolean
    seniority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CareerProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "rawCvText" | "rawCvFileName" | "profileJson" | "seniority" | "createdAt" | "updatedAt", ExtArgs["result"]["careerProfile"]>
  export type CareerProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    applications?: boolean | CareerProfile$applicationsArgs<ExtArgs>
    _count?: boolean | CareerProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CareerProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CareerProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CareerProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CareerProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      applications: Prisma.$CvApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      rawCvText: string
      rawCvFileName: string | null
      profileJson: Prisma.JsonValue
      seniority: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["careerProfile"]>
    composites: {}
  }

  type CareerProfileGetPayload<S extends boolean | null | undefined | CareerProfileDefaultArgs> = $Result.GetResult<Prisma.$CareerProfilePayload, S>

  type CareerProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CareerProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CareerProfileCountAggregateInputType | true
    }

  export interface CareerProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CareerProfile'], meta: { name: 'CareerProfile' } }
    /**
     * Find zero or one CareerProfile that matches the filter.
     * @param {CareerProfileFindUniqueArgs} args - Arguments to find a CareerProfile
     * @example
     * // Get one CareerProfile
     * const careerProfile = await prisma.careerProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CareerProfileFindUniqueArgs>(args: SelectSubset<T, CareerProfileFindUniqueArgs<ExtArgs>>): Prisma__CareerProfileClient<$Result.GetResult<Prisma.$CareerProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CareerProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CareerProfileFindUniqueOrThrowArgs} args - Arguments to find a CareerProfile
     * @example
     * // Get one CareerProfile
     * const careerProfile = await prisma.careerProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CareerProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, CareerProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CareerProfileClient<$Result.GetResult<Prisma.$CareerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CareerProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerProfileFindFirstArgs} args - Arguments to find a CareerProfile
     * @example
     * // Get one CareerProfile
     * const careerProfile = await prisma.careerProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CareerProfileFindFirstArgs>(args?: SelectSubset<T, CareerProfileFindFirstArgs<ExtArgs>>): Prisma__CareerProfileClient<$Result.GetResult<Prisma.$CareerProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CareerProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerProfileFindFirstOrThrowArgs} args - Arguments to find a CareerProfile
     * @example
     * // Get one CareerProfile
     * const careerProfile = await prisma.careerProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CareerProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, CareerProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__CareerProfileClient<$Result.GetResult<Prisma.$CareerProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CareerProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CareerProfiles
     * const careerProfiles = await prisma.careerProfile.findMany()
     * 
     * // Get first 10 CareerProfiles
     * const careerProfiles = await prisma.careerProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const careerProfileWithIdOnly = await prisma.careerProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CareerProfileFindManyArgs>(args?: SelectSubset<T, CareerProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CareerProfile.
     * @param {CareerProfileCreateArgs} args - Arguments to create a CareerProfile.
     * @example
     * // Create one CareerProfile
     * const CareerProfile = await prisma.careerProfile.create({
     *   data: {
     *     // ... data to create a CareerProfile
     *   }
     * })
     * 
     */
    create<T extends CareerProfileCreateArgs>(args: SelectSubset<T, CareerProfileCreateArgs<ExtArgs>>): Prisma__CareerProfileClient<$Result.GetResult<Prisma.$CareerProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CareerProfiles.
     * @param {CareerProfileCreateManyArgs} args - Arguments to create many CareerProfiles.
     * @example
     * // Create many CareerProfiles
     * const careerProfile = await prisma.careerProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CareerProfileCreateManyArgs>(args?: SelectSubset<T, CareerProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CareerProfiles and returns the data saved in the database.
     * @param {CareerProfileCreateManyAndReturnArgs} args - Arguments to create many CareerProfiles.
     * @example
     * // Create many CareerProfiles
     * const careerProfile = await prisma.careerProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CareerProfiles and only return the `id`
     * const careerProfileWithIdOnly = await prisma.careerProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CareerProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, CareerProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CareerProfile.
     * @param {CareerProfileDeleteArgs} args - Arguments to delete one CareerProfile.
     * @example
     * // Delete one CareerProfile
     * const CareerProfile = await prisma.careerProfile.delete({
     *   where: {
     *     // ... filter to delete one CareerProfile
     *   }
     * })
     * 
     */
    delete<T extends CareerProfileDeleteArgs>(args: SelectSubset<T, CareerProfileDeleteArgs<ExtArgs>>): Prisma__CareerProfileClient<$Result.GetResult<Prisma.$CareerProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CareerProfile.
     * @param {CareerProfileUpdateArgs} args - Arguments to update one CareerProfile.
     * @example
     * // Update one CareerProfile
     * const careerProfile = await prisma.careerProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CareerProfileUpdateArgs>(args: SelectSubset<T, CareerProfileUpdateArgs<ExtArgs>>): Prisma__CareerProfileClient<$Result.GetResult<Prisma.$CareerProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CareerProfiles.
     * @param {CareerProfileDeleteManyArgs} args - Arguments to filter CareerProfiles to delete.
     * @example
     * // Delete a few CareerProfiles
     * const { count } = await prisma.careerProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CareerProfileDeleteManyArgs>(args?: SelectSubset<T, CareerProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareerProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CareerProfiles
     * const careerProfile = await prisma.careerProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CareerProfileUpdateManyArgs>(args: SelectSubset<T, CareerProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareerProfiles and returns the data updated in the database.
     * @param {CareerProfileUpdateManyAndReturnArgs} args - Arguments to update many CareerProfiles.
     * @example
     * // Update many CareerProfiles
     * const careerProfile = await prisma.careerProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CareerProfiles and only return the `id`
     * const careerProfileWithIdOnly = await prisma.careerProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CareerProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, CareerProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CareerProfile.
     * @param {CareerProfileUpsertArgs} args - Arguments to update or create a CareerProfile.
     * @example
     * // Update or create a CareerProfile
     * const careerProfile = await prisma.careerProfile.upsert({
     *   create: {
     *     // ... data to create a CareerProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CareerProfile we want to update
     *   }
     * })
     */
    upsert<T extends CareerProfileUpsertArgs>(args: SelectSubset<T, CareerProfileUpsertArgs<ExtArgs>>): Prisma__CareerProfileClient<$Result.GetResult<Prisma.$CareerProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CareerProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerProfileCountArgs} args - Arguments to filter CareerProfiles to count.
     * @example
     * // Count the number of CareerProfiles
     * const count = await prisma.careerProfile.count({
     *   where: {
     *     // ... the filter for the CareerProfiles we want to count
     *   }
     * })
    **/
    count<T extends CareerProfileCountArgs>(
      args?: Subset<T, CareerProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareerProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CareerProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CareerProfileAggregateArgs>(args: Subset<T, CareerProfileAggregateArgs>): Prisma.PrismaPromise<GetCareerProfileAggregateType<T>>

    /**
     * Group by CareerProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CareerProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareerProfileGroupByArgs['orderBy'] }
        : { orderBy?: CareerProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CareerProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareerProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CareerProfile model
   */
  readonly fields: CareerProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CareerProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareerProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    applications<T extends CareerProfile$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, CareerProfile$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CareerProfile model
   */
  interface CareerProfileFieldRefs {
    readonly id: FieldRef<"CareerProfile", 'String'>
    readonly userId: FieldRef<"CareerProfile", 'String'>
    readonly rawCvText: FieldRef<"CareerProfile", 'String'>
    readonly rawCvFileName: FieldRef<"CareerProfile", 'String'>
    readonly profileJson: FieldRef<"CareerProfile", 'Json'>
    readonly seniority: FieldRef<"CareerProfile", 'String'>
    readonly createdAt: FieldRef<"CareerProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"CareerProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CareerProfile findUnique
   */
  export type CareerProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfile
     */
    select?: CareerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerProfile
     */
    omit?: CareerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerProfileInclude<ExtArgs> | null
    /**
     * Filter, which CareerProfile to fetch.
     */
    where: CareerProfileWhereUniqueInput
  }

  /**
   * CareerProfile findUniqueOrThrow
   */
  export type CareerProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfile
     */
    select?: CareerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerProfile
     */
    omit?: CareerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerProfileInclude<ExtArgs> | null
    /**
     * Filter, which CareerProfile to fetch.
     */
    where: CareerProfileWhereUniqueInput
  }

  /**
   * CareerProfile findFirst
   */
  export type CareerProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfile
     */
    select?: CareerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerProfile
     */
    omit?: CareerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerProfileInclude<ExtArgs> | null
    /**
     * Filter, which CareerProfile to fetch.
     */
    where?: CareerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerProfiles to fetch.
     */
    orderBy?: CareerProfileOrderByWithRelationInput | CareerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerProfiles.
     */
    cursor?: CareerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerProfiles.
     */
    distinct?: CareerProfileScalarFieldEnum | CareerProfileScalarFieldEnum[]
  }

  /**
   * CareerProfile findFirstOrThrow
   */
  export type CareerProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfile
     */
    select?: CareerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerProfile
     */
    omit?: CareerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerProfileInclude<ExtArgs> | null
    /**
     * Filter, which CareerProfile to fetch.
     */
    where?: CareerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerProfiles to fetch.
     */
    orderBy?: CareerProfileOrderByWithRelationInput | CareerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerProfiles.
     */
    cursor?: CareerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerProfiles.
     */
    distinct?: CareerProfileScalarFieldEnum | CareerProfileScalarFieldEnum[]
  }

  /**
   * CareerProfile findMany
   */
  export type CareerProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfile
     */
    select?: CareerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerProfile
     */
    omit?: CareerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerProfileInclude<ExtArgs> | null
    /**
     * Filter, which CareerProfiles to fetch.
     */
    where?: CareerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerProfiles to fetch.
     */
    orderBy?: CareerProfileOrderByWithRelationInput | CareerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CareerProfiles.
     */
    cursor?: CareerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerProfiles.
     */
    skip?: number
    distinct?: CareerProfileScalarFieldEnum | CareerProfileScalarFieldEnum[]
  }

  /**
   * CareerProfile create
   */
  export type CareerProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfile
     */
    select?: CareerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerProfile
     */
    omit?: CareerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a CareerProfile.
     */
    data: XOR<CareerProfileCreateInput, CareerProfileUncheckedCreateInput>
  }

  /**
   * CareerProfile createMany
   */
  export type CareerProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CareerProfiles.
     */
    data: CareerProfileCreateManyInput | CareerProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CareerProfile createManyAndReturn
   */
  export type CareerProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfile
     */
    select?: CareerProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CareerProfile
     */
    omit?: CareerProfileOmit<ExtArgs> | null
    /**
     * The data used to create many CareerProfiles.
     */
    data: CareerProfileCreateManyInput | CareerProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CareerProfile update
   */
  export type CareerProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfile
     */
    select?: CareerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerProfile
     */
    omit?: CareerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a CareerProfile.
     */
    data: XOR<CareerProfileUpdateInput, CareerProfileUncheckedUpdateInput>
    /**
     * Choose, which CareerProfile to update.
     */
    where: CareerProfileWhereUniqueInput
  }

  /**
   * CareerProfile updateMany
   */
  export type CareerProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CareerProfiles.
     */
    data: XOR<CareerProfileUpdateManyMutationInput, CareerProfileUncheckedUpdateManyInput>
    /**
     * Filter which CareerProfiles to update
     */
    where?: CareerProfileWhereInput
    /**
     * Limit how many CareerProfiles to update.
     */
    limit?: number
  }

  /**
   * CareerProfile updateManyAndReturn
   */
  export type CareerProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfile
     */
    select?: CareerProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CareerProfile
     */
    omit?: CareerProfileOmit<ExtArgs> | null
    /**
     * The data used to update CareerProfiles.
     */
    data: XOR<CareerProfileUpdateManyMutationInput, CareerProfileUncheckedUpdateManyInput>
    /**
     * Filter which CareerProfiles to update
     */
    where?: CareerProfileWhereInput
    /**
     * Limit how many CareerProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CareerProfile upsert
   */
  export type CareerProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfile
     */
    select?: CareerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerProfile
     */
    omit?: CareerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the CareerProfile to update in case it exists.
     */
    where: CareerProfileWhereUniqueInput
    /**
     * In case the CareerProfile found by the `where` argument doesn't exist, create a new CareerProfile with this data.
     */
    create: XOR<CareerProfileCreateInput, CareerProfileUncheckedCreateInput>
    /**
     * In case the CareerProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareerProfileUpdateInput, CareerProfileUncheckedUpdateInput>
  }

  /**
   * CareerProfile delete
   */
  export type CareerProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfile
     */
    select?: CareerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerProfile
     */
    omit?: CareerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerProfileInclude<ExtArgs> | null
    /**
     * Filter which CareerProfile to delete.
     */
    where: CareerProfileWhereUniqueInput
  }

  /**
   * CareerProfile deleteMany
   */
  export type CareerProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerProfiles to delete
     */
    where?: CareerProfileWhereInput
    /**
     * Limit how many CareerProfiles to delete.
     */
    limit?: number
  }

  /**
   * CareerProfile.applications
   */
  export type CareerProfile$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationInclude<ExtArgs> | null
    where?: CvApplicationWhereInput
    orderBy?: CvApplicationOrderByWithRelationInput | CvApplicationOrderByWithRelationInput[]
    cursor?: CvApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CvApplicationScalarFieldEnum | CvApplicationScalarFieldEnum[]
  }

  /**
   * CareerProfile without action
   */
  export type CareerProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerProfile
     */
    select?: CareerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CareerProfile
     */
    omit?: CareerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CareerProfileInclude<ExtArgs> | null
  }


  /**
   * Model CvApplication
   */

  export type AggregateCvApplication = {
    _count: CvApplicationCountAggregateOutputType | null
    _avg: CvApplicationAvgAggregateOutputType | null
    _sum: CvApplicationSumAggregateOutputType | null
    _min: CvApplicationMinAggregateOutputType | null
    _max: CvApplicationMaxAggregateOutputType | null
  }

  export type CvApplicationAvgAggregateOutputType = {
    matchScore: number | null
  }

  export type CvApplicationSumAggregateOutputType = {
    matchScore: number | null
  }

  export type CvApplicationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    careerProfileId: string | null
    jobText: string | null
    extraNotes: string | null
    matchScore: number | null
    status: string | null
    error: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CvApplicationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    careerProfileId: string | null
    jobText: string | null
    extraNotes: string | null
    matchScore: number | null
    status: string | null
    error: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CvApplicationCountAggregateOutputType = {
    id: number
    userId: number
    careerProfileId: number
    jobText: number
    jobAnalysisJson: number
    matchJson: number
    questionsJson: number
    answersJson: number
    extraNotes: number
    matchScore: number
    status: number
    warningJson: number
    error: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CvApplicationAvgAggregateInputType = {
    matchScore?: true
  }

  export type CvApplicationSumAggregateInputType = {
    matchScore?: true
  }

  export type CvApplicationMinAggregateInputType = {
    id?: true
    userId?: true
    careerProfileId?: true
    jobText?: true
    extraNotes?: true
    matchScore?: true
    status?: true
    error?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CvApplicationMaxAggregateInputType = {
    id?: true
    userId?: true
    careerProfileId?: true
    jobText?: true
    extraNotes?: true
    matchScore?: true
    status?: true
    error?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CvApplicationCountAggregateInputType = {
    id?: true
    userId?: true
    careerProfileId?: true
    jobText?: true
    jobAnalysisJson?: true
    matchJson?: true
    questionsJson?: true
    answersJson?: true
    extraNotes?: true
    matchScore?: true
    status?: true
    warningJson?: true
    error?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CvApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CvApplication to aggregate.
     */
    where?: CvApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvApplications to fetch.
     */
    orderBy?: CvApplicationOrderByWithRelationInput | CvApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CvApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CvApplications
    **/
    _count?: true | CvApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CvApplicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CvApplicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CvApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CvApplicationMaxAggregateInputType
  }

  export type GetCvApplicationAggregateType<T extends CvApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateCvApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCvApplication[P]>
      : GetScalarType<T[P], AggregateCvApplication[P]>
  }




  export type CvApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CvApplicationWhereInput
    orderBy?: CvApplicationOrderByWithAggregationInput | CvApplicationOrderByWithAggregationInput[]
    by: CvApplicationScalarFieldEnum[] | CvApplicationScalarFieldEnum
    having?: CvApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CvApplicationCountAggregateInputType | true
    _avg?: CvApplicationAvgAggregateInputType
    _sum?: CvApplicationSumAggregateInputType
    _min?: CvApplicationMinAggregateInputType
    _max?: CvApplicationMaxAggregateInputType
  }

  export type CvApplicationGroupByOutputType = {
    id: string
    userId: string
    careerProfileId: string
    jobText: string
    jobAnalysisJson: JsonValue | null
    matchJson: JsonValue | null
    questionsJson: JsonValue | null
    answersJson: JsonValue | null
    extraNotes: string | null
    matchScore: number | null
    status: string
    warningJson: JsonValue | null
    error: string | null
    createdAt: Date
    updatedAt: Date
    _count: CvApplicationCountAggregateOutputType | null
    _avg: CvApplicationAvgAggregateOutputType | null
    _sum: CvApplicationSumAggregateOutputType | null
    _min: CvApplicationMinAggregateOutputType | null
    _max: CvApplicationMaxAggregateOutputType | null
  }

  type GetCvApplicationGroupByPayload<T extends CvApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CvApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CvApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CvApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], CvApplicationGroupByOutputType[P]>
        }
      >
    >


  export type CvApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    careerProfileId?: boolean
    jobText?: boolean
    jobAnalysisJson?: boolean
    matchJson?: boolean
    questionsJson?: boolean
    answersJson?: boolean
    extraNotes?: boolean
    matchScore?: boolean
    status?: boolean
    warningJson?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    careerProfile?: boolean | CareerProfileDefaultArgs<ExtArgs>
    draft?: boolean | CvApplication$draftArgs<ExtArgs>
    agentRuns?: boolean | CvApplication$agentRunsArgs<ExtArgs>
    _count?: boolean | CvApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvApplication"]>

  export type CvApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    careerProfileId?: boolean
    jobText?: boolean
    jobAnalysisJson?: boolean
    matchJson?: boolean
    questionsJson?: boolean
    answersJson?: boolean
    extraNotes?: boolean
    matchScore?: boolean
    status?: boolean
    warningJson?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    careerProfile?: boolean | CareerProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvApplication"]>

  export type CvApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    careerProfileId?: boolean
    jobText?: boolean
    jobAnalysisJson?: boolean
    matchJson?: boolean
    questionsJson?: boolean
    answersJson?: boolean
    extraNotes?: boolean
    matchScore?: boolean
    status?: boolean
    warningJson?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    careerProfile?: boolean | CareerProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvApplication"]>

  export type CvApplicationSelectScalar = {
    id?: boolean
    userId?: boolean
    careerProfileId?: boolean
    jobText?: boolean
    jobAnalysisJson?: boolean
    matchJson?: boolean
    questionsJson?: boolean
    answersJson?: boolean
    extraNotes?: boolean
    matchScore?: boolean
    status?: boolean
    warningJson?: boolean
    error?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CvApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "careerProfileId" | "jobText" | "jobAnalysisJson" | "matchJson" | "questionsJson" | "answersJson" | "extraNotes" | "matchScore" | "status" | "warningJson" | "error" | "createdAt" | "updatedAt", ExtArgs["result"]["cvApplication"]>
  export type CvApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    careerProfile?: boolean | CareerProfileDefaultArgs<ExtArgs>
    draft?: boolean | CvApplication$draftArgs<ExtArgs>
    agentRuns?: boolean | CvApplication$agentRunsArgs<ExtArgs>
    _count?: boolean | CvApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CvApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    careerProfile?: boolean | CareerProfileDefaultArgs<ExtArgs>
  }
  export type CvApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    careerProfile?: boolean | CareerProfileDefaultArgs<ExtArgs>
  }

  export type $CvApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CvApplication"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      careerProfile: Prisma.$CareerProfilePayload<ExtArgs>
      draft: Prisma.$CvDraftPayload<ExtArgs> | null
      agentRuns: Prisma.$AgentRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      careerProfileId: string
      jobText: string
      jobAnalysisJson: Prisma.JsonValue | null
      matchJson: Prisma.JsonValue | null
      questionsJson: Prisma.JsonValue | null
      answersJson: Prisma.JsonValue | null
      extraNotes: string | null
      matchScore: number | null
      status: string
      warningJson: Prisma.JsonValue | null
      error: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cvApplication"]>
    composites: {}
  }

  type CvApplicationGetPayload<S extends boolean | null | undefined | CvApplicationDefaultArgs> = $Result.GetResult<Prisma.$CvApplicationPayload, S>

  type CvApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CvApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CvApplicationCountAggregateInputType | true
    }

  export interface CvApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CvApplication'], meta: { name: 'CvApplication' } }
    /**
     * Find zero or one CvApplication that matches the filter.
     * @param {CvApplicationFindUniqueArgs} args - Arguments to find a CvApplication
     * @example
     * // Get one CvApplication
     * const cvApplication = await prisma.cvApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CvApplicationFindUniqueArgs>(args: SelectSubset<T, CvApplicationFindUniqueArgs<ExtArgs>>): Prisma__CvApplicationClient<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CvApplication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CvApplicationFindUniqueOrThrowArgs} args - Arguments to find a CvApplication
     * @example
     * // Get one CvApplication
     * const cvApplication = await prisma.cvApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CvApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, CvApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CvApplicationClient<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CvApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvApplicationFindFirstArgs} args - Arguments to find a CvApplication
     * @example
     * // Get one CvApplication
     * const cvApplication = await prisma.cvApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CvApplicationFindFirstArgs>(args?: SelectSubset<T, CvApplicationFindFirstArgs<ExtArgs>>): Prisma__CvApplicationClient<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CvApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvApplicationFindFirstOrThrowArgs} args - Arguments to find a CvApplication
     * @example
     * // Get one CvApplication
     * const cvApplication = await prisma.cvApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CvApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, CvApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CvApplicationClient<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CvApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CvApplications
     * const cvApplications = await prisma.cvApplication.findMany()
     * 
     * // Get first 10 CvApplications
     * const cvApplications = await prisma.cvApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cvApplicationWithIdOnly = await prisma.cvApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CvApplicationFindManyArgs>(args?: SelectSubset<T, CvApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CvApplication.
     * @param {CvApplicationCreateArgs} args - Arguments to create a CvApplication.
     * @example
     * // Create one CvApplication
     * const CvApplication = await prisma.cvApplication.create({
     *   data: {
     *     // ... data to create a CvApplication
     *   }
     * })
     * 
     */
    create<T extends CvApplicationCreateArgs>(args: SelectSubset<T, CvApplicationCreateArgs<ExtArgs>>): Prisma__CvApplicationClient<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CvApplications.
     * @param {CvApplicationCreateManyArgs} args - Arguments to create many CvApplications.
     * @example
     * // Create many CvApplications
     * const cvApplication = await prisma.cvApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CvApplicationCreateManyArgs>(args?: SelectSubset<T, CvApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CvApplications and returns the data saved in the database.
     * @param {CvApplicationCreateManyAndReturnArgs} args - Arguments to create many CvApplications.
     * @example
     * // Create many CvApplications
     * const cvApplication = await prisma.cvApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CvApplications and only return the `id`
     * const cvApplicationWithIdOnly = await prisma.cvApplication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CvApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, CvApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CvApplication.
     * @param {CvApplicationDeleteArgs} args - Arguments to delete one CvApplication.
     * @example
     * // Delete one CvApplication
     * const CvApplication = await prisma.cvApplication.delete({
     *   where: {
     *     // ... filter to delete one CvApplication
     *   }
     * })
     * 
     */
    delete<T extends CvApplicationDeleteArgs>(args: SelectSubset<T, CvApplicationDeleteArgs<ExtArgs>>): Prisma__CvApplicationClient<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CvApplication.
     * @param {CvApplicationUpdateArgs} args - Arguments to update one CvApplication.
     * @example
     * // Update one CvApplication
     * const cvApplication = await prisma.cvApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CvApplicationUpdateArgs>(args: SelectSubset<T, CvApplicationUpdateArgs<ExtArgs>>): Prisma__CvApplicationClient<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CvApplications.
     * @param {CvApplicationDeleteManyArgs} args - Arguments to filter CvApplications to delete.
     * @example
     * // Delete a few CvApplications
     * const { count } = await prisma.cvApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CvApplicationDeleteManyArgs>(args?: SelectSubset<T, CvApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CvApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CvApplications
     * const cvApplication = await prisma.cvApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CvApplicationUpdateManyArgs>(args: SelectSubset<T, CvApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CvApplications and returns the data updated in the database.
     * @param {CvApplicationUpdateManyAndReturnArgs} args - Arguments to update many CvApplications.
     * @example
     * // Update many CvApplications
     * const cvApplication = await prisma.cvApplication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CvApplications and only return the `id`
     * const cvApplicationWithIdOnly = await prisma.cvApplication.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CvApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, CvApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CvApplication.
     * @param {CvApplicationUpsertArgs} args - Arguments to update or create a CvApplication.
     * @example
     * // Update or create a CvApplication
     * const cvApplication = await prisma.cvApplication.upsert({
     *   create: {
     *     // ... data to create a CvApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CvApplication we want to update
     *   }
     * })
     */
    upsert<T extends CvApplicationUpsertArgs>(args: SelectSubset<T, CvApplicationUpsertArgs<ExtArgs>>): Prisma__CvApplicationClient<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CvApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvApplicationCountArgs} args - Arguments to filter CvApplications to count.
     * @example
     * // Count the number of CvApplications
     * const count = await prisma.cvApplication.count({
     *   where: {
     *     // ... the filter for the CvApplications we want to count
     *   }
     * })
    **/
    count<T extends CvApplicationCountArgs>(
      args?: Subset<T, CvApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CvApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CvApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CvApplicationAggregateArgs>(args: Subset<T, CvApplicationAggregateArgs>): Prisma.PrismaPromise<GetCvApplicationAggregateType<T>>

    /**
     * Group by CvApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CvApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CvApplicationGroupByArgs['orderBy'] }
        : { orderBy?: CvApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CvApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCvApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CvApplication model
   */
  readonly fields: CvApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CvApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CvApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    careerProfile<T extends CareerProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CareerProfileDefaultArgs<ExtArgs>>): Prisma__CareerProfileClient<$Result.GetResult<Prisma.$CareerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    draft<T extends CvApplication$draftArgs<ExtArgs> = {}>(args?: Subset<T, CvApplication$draftArgs<ExtArgs>>): Prisma__CvDraftClient<$Result.GetResult<Prisma.$CvDraftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    agentRuns<T extends CvApplication$agentRunsArgs<ExtArgs> = {}>(args?: Subset<T, CvApplication$agentRunsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CvApplication model
   */
  interface CvApplicationFieldRefs {
    readonly id: FieldRef<"CvApplication", 'String'>
    readonly userId: FieldRef<"CvApplication", 'String'>
    readonly careerProfileId: FieldRef<"CvApplication", 'String'>
    readonly jobText: FieldRef<"CvApplication", 'String'>
    readonly jobAnalysisJson: FieldRef<"CvApplication", 'Json'>
    readonly matchJson: FieldRef<"CvApplication", 'Json'>
    readonly questionsJson: FieldRef<"CvApplication", 'Json'>
    readonly answersJson: FieldRef<"CvApplication", 'Json'>
    readonly extraNotes: FieldRef<"CvApplication", 'String'>
    readonly matchScore: FieldRef<"CvApplication", 'Int'>
    readonly status: FieldRef<"CvApplication", 'String'>
    readonly warningJson: FieldRef<"CvApplication", 'Json'>
    readonly error: FieldRef<"CvApplication", 'String'>
    readonly createdAt: FieldRef<"CvApplication", 'DateTime'>
    readonly updatedAt: FieldRef<"CvApplication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CvApplication findUnique
   */
  export type CvApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationInclude<ExtArgs> | null
    /**
     * Filter, which CvApplication to fetch.
     */
    where: CvApplicationWhereUniqueInput
  }

  /**
   * CvApplication findUniqueOrThrow
   */
  export type CvApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationInclude<ExtArgs> | null
    /**
     * Filter, which CvApplication to fetch.
     */
    where: CvApplicationWhereUniqueInput
  }

  /**
   * CvApplication findFirst
   */
  export type CvApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationInclude<ExtArgs> | null
    /**
     * Filter, which CvApplication to fetch.
     */
    where?: CvApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvApplications to fetch.
     */
    orderBy?: CvApplicationOrderByWithRelationInput | CvApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CvApplications.
     */
    cursor?: CvApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CvApplications.
     */
    distinct?: CvApplicationScalarFieldEnum | CvApplicationScalarFieldEnum[]
  }

  /**
   * CvApplication findFirstOrThrow
   */
  export type CvApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationInclude<ExtArgs> | null
    /**
     * Filter, which CvApplication to fetch.
     */
    where?: CvApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvApplications to fetch.
     */
    orderBy?: CvApplicationOrderByWithRelationInput | CvApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CvApplications.
     */
    cursor?: CvApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CvApplications.
     */
    distinct?: CvApplicationScalarFieldEnum | CvApplicationScalarFieldEnum[]
  }

  /**
   * CvApplication findMany
   */
  export type CvApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationInclude<ExtArgs> | null
    /**
     * Filter, which CvApplications to fetch.
     */
    where?: CvApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvApplications to fetch.
     */
    orderBy?: CvApplicationOrderByWithRelationInput | CvApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CvApplications.
     */
    cursor?: CvApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvApplications.
     */
    skip?: number
    distinct?: CvApplicationScalarFieldEnum | CvApplicationScalarFieldEnum[]
  }

  /**
   * CvApplication create
   */
  export type CvApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a CvApplication.
     */
    data: XOR<CvApplicationCreateInput, CvApplicationUncheckedCreateInput>
  }

  /**
   * CvApplication createMany
   */
  export type CvApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CvApplications.
     */
    data: CvApplicationCreateManyInput | CvApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CvApplication createManyAndReturn
   */
  export type CvApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many CvApplications.
     */
    data: CvApplicationCreateManyInput | CvApplicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CvApplication update
   */
  export type CvApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a CvApplication.
     */
    data: XOR<CvApplicationUpdateInput, CvApplicationUncheckedUpdateInput>
    /**
     * Choose, which CvApplication to update.
     */
    where: CvApplicationWhereUniqueInput
  }

  /**
   * CvApplication updateMany
   */
  export type CvApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CvApplications.
     */
    data: XOR<CvApplicationUpdateManyMutationInput, CvApplicationUncheckedUpdateManyInput>
    /**
     * Filter which CvApplications to update
     */
    where?: CvApplicationWhereInput
    /**
     * Limit how many CvApplications to update.
     */
    limit?: number
  }

  /**
   * CvApplication updateManyAndReturn
   */
  export type CvApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * The data used to update CvApplications.
     */
    data: XOR<CvApplicationUpdateManyMutationInput, CvApplicationUncheckedUpdateManyInput>
    /**
     * Filter which CvApplications to update
     */
    where?: CvApplicationWhereInput
    /**
     * Limit how many CvApplications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CvApplication upsert
   */
  export type CvApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the CvApplication to update in case it exists.
     */
    where: CvApplicationWhereUniqueInput
    /**
     * In case the CvApplication found by the `where` argument doesn't exist, create a new CvApplication with this data.
     */
    create: XOR<CvApplicationCreateInput, CvApplicationUncheckedCreateInput>
    /**
     * In case the CvApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CvApplicationUpdateInput, CvApplicationUncheckedUpdateInput>
  }

  /**
   * CvApplication delete
   */
  export type CvApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationInclude<ExtArgs> | null
    /**
     * Filter which CvApplication to delete.
     */
    where: CvApplicationWhereUniqueInput
  }

  /**
   * CvApplication deleteMany
   */
  export type CvApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CvApplications to delete
     */
    where?: CvApplicationWhereInput
    /**
     * Limit how many CvApplications to delete.
     */
    limit?: number
  }

  /**
   * CvApplication.draft
   */
  export type CvApplication$draftArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvDraft
     */
    select?: CvDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvDraft
     */
    omit?: CvDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvDraftInclude<ExtArgs> | null
    where?: CvDraftWhereInput
  }

  /**
   * CvApplication.agentRuns
   */
  export type CvApplication$agentRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    where?: AgentRunWhereInput
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    cursor?: AgentRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentRunScalarFieldEnum | AgentRunScalarFieldEnum[]
  }

  /**
   * CvApplication without action
   */
  export type CvApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationInclude<ExtArgs> | null
  }


  /**
   * Model CvDraft
   */

  export type AggregateCvDraft = {
    _count: CvDraftCountAggregateOutputType | null
    _min: CvDraftMinAggregateOutputType | null
    _max: CvDraftMaxAggregateOutputType | null
  }

  export type CvDraftMinAggregateOutputType = {
    id: string | null
    applicationId: string | null
    html: string | null
    pdfBytes: Bytes | null
    createdAt: Date | null
  }

  export type CvDraftMaxAggregateOutputType = {
    id: string | null
    applicationId: string | null
    html: string | null
    pdfBytes: Bytes | null
    createdAt: Date | null
  }

  export type CvDraftCountAggregateOutputType = {
    id: number
    applicationId: number
    structuredCvJson: number
    sanitizedCvJson: number
    html: number
    pdfBytes: number
    renderMetricsJson: number
    createdAt: number
    _all: number
  }


  export type CvDraftMinAggregateInputType = {
    id?: true
    applicationId?: true
    html?: true
    pdfBytes?: true
    createdAt?: true
  }

  export type CvDraftMaxAggregateInputType = {
    id?: true
    applicationId?: true
    html?: true
    pdfBytes?: true
    createdAt?: true
  }

  export type CvDraftCountAggregateInputType = {
    id?: true
    applicationId?: true
    structuredCvJson?: true
    sanitizedCvJson?: true
    html?: true
    pdfBytes?: true
    renderMetricsJson?: true
    createdAt?: true
    _all?: true
  }

  export type CvDraftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CvDraft to aggregate.
     */
    where?: CvDraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvDrafts to fetch.
     */
    orderBy?: CvDraftOrderByWithRelationInput | CvDraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CvDraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvDrafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvDrafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CvDrafts
    **/
    _count?: true | CvDraftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CvDraftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CvDraftMaxAggregateInputType
  }

  export type GetCvDraftAggregateType<T extends CvDraftAggregateArgs> = {
        [P in keyof T & keyof AggregateCvDraft]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCvDraft[P]>
      : GetScalarType<T[P], AggregateCvDraft[P]>
  }




  export type CvDraftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CvDraftWhereInput
    orderBy?: CvDraftOrderByWithAggregationInput | CvDraftOrderByWithAggregationInput[]
    by: CvDraftScalarFieldEnum[] | CvDraftScalarFieldEnum
    having?: CvDraftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CvDraftCountAggregateInputType | true
    _min?: CvDraftMinAggregateInputType
    _max?: CvDraftMaxAggregateInputType
  }

  export type CvDraftGroupByOutputType = {
    id: string
    applicationId: string
    structuredCvJson: JsonValue
    sanitizedCvJson: JsonValue
    html: string
    pdfBytes: Bytes
    renderMetricsJson: JsonValue
    createdAt: Date
    _count: CvDraftCountAggregateOutputType | null
    _min: CvDraftMinAggregateOutputType | null
    _max: CvDraftMaxAggregateOutputType | null
  }

  type GetCvDraftGroupByPayload<T extends CvDraftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CvDraftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CvDraftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CvDraftGroupByOutputType[P]>
            : GetScalarType<T[P], CvDraftGroupByOutputType[P]>
        }
      >
    >


  export type CvDraftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    structuredCvJson?: boolean
    sanitizedCvJson?: boolean
    html?: boolean
    pdfBytes?: boolean
    renderMetricsJson?: boolean
    createdAt?: boolean
    application?: boolean | CvApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvDraft"]>

  export type CvDraftSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    structuredCvJson?: boolean
    sanitizedCvJson?: boolean
    html?: boolean
    pdfBytes?: boolean
    renderMetricsJson?: boolean
    createdAt?: boolean
    application?: boolean | CvApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvDraft"]>

  export type CvDraftSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    structuredCvJson?: boolean
    sanitizedCvJson?: boolean
    html?: boolean
    pdfBytes?: boolean
    renderMetricsJson?: boolean
    createdAt?: boolean
    application?: boolean | CvApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cvDraft"]>

  export type CvDraftSelectScalar = {
    id?: boolean
    applicationId?: boolean
    structuredCvJson?: boolean
    sanitizedCvJson?: boolean
    html?: boolean
    pdfBytes?: boolean
    renderMetricsJson?: boolean
    createdAt?: boolean
  }

  export type CvDraftOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "applicationId" | "structuredCvJson" | "sanitizedCvJson" | "html" | "pdfBytes" | "renderMetricsJson" | "createdAt", ExtArgs["result"]["cvDraft"]>
  export type CvDraftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | CvApplicationDefaultArgs<ExtArgs>
  }
  export type CvDraftIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | CvApplicationDefaultArgs<ExtArgs>
  }
  export type CvDraftIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | CvApplicationDefaultArgs<ExtArgs>
  }

  export type $CvDraftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CvDraft"
    objects: {
      application: Prisma.$CvApplicationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      applicationId: string
      structuredCvJson: Prisma.JsonValue
      sanitizedCvJson: Prisma.JsonValue
      html: string
      pdfBytes: Prisma.Bytes
      renderMetricsJson: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["cvDraft"]>
    composites: {}
  }

  type CvDraftGetPayload<S extends boolean | null | undefined | CvDraftDefaultArgs> = $Result.GetResult<Prisma.$CvDraftPayload, S>

  type CvDraftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CvDraftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CvDraftCountAggregateInputType | true
    }

  export interface CvDraftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CvDraft'], meta: { name: 'CvDraft' } }
    /**
     * Find zero or one CvDraft that matches the filter.
     * @param {CvDraftFindUniqueArgs} args - Arguments to find a CvDraft
     * @example
     * // Get one CvDraft
     * const cvDraft = await prisma.cvDraft.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CvDraftFindUniqueArgs>(args: SelectSubset<T, CvDraftFindUniqueArgs<ExtArgs>>): Prisma__CvDraftClient<$Result.GetResult<Prisma.$CvDraftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CvDraft that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CvDraftFindUniqueOrThrowArgs} args - Arguments to find a CvDraft
     * @example
     * // Get one CvDraft
     * const cvDraft = await prisma.cvDraft.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CvDraftFindUniqueOrThrowArgs>(args: SelectSubset<T, CvDraftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CvDraftClient<$Result.GetResult<Prisma.$CvDraftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CvDraft that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvDraftFindFirstArgs} args - Arguments to find a CvDraft
     * @example
     * // Get one CvDraft
     * const cvDraft = await prisma.cvDraft.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CvDraftFindFirstArgs>(args?: SelectSubset<T, CvDraftFindFirstArgs<ExtArgs>>): Prisma__CvDraftClient<$Result.GetResult<Prisma.$CvDraftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CvDraft that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvDraftFindFirstOrThrowArgs} args - Arguments to find a CvDraft
     * @example
     * // Get one CvDraft
     * const cvDraft = await prisma.cvDraft.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CvDraftFindFirstOrThrowArgs>(args?: SelectSubset<T, CvDraftFindFirstOrThrowArgs<ExtArgs>>): Prisma__CvDraftClient<$Result.GetResult<Prisma.$CvDraftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CvDrafts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvDraftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CvDrafts
     * const cvDrafts = await prisma.cvDraft.findMany()
     * 
     * // Get first 10 CvDrafts
     * const cvDrafts = await prisma.cvDraft.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cvDraftWithIdOnly = await prisma.cvDraft.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CvDraftFindManyArgs>(args?: SelectSubset<T, CvDraftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvDraftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CvDraft.
     * @param {CvDraftCreateArgs} args - Arguments to create a CvDraft.
     * @example
     * // Create one CvDraft
     * const CvDraft = await prisma.cvDraft.create({
     *   data: {
     *     // ... data to create a CvDraft
     *   }
     * })
     * 
     */
    create<T extends CvDraftCreateArgs>(args: SelectSubset<T, CvDraftCreateArgs<ExtArgs>>): Prisma__CvDraftClient<$Result.GetResult<Prisma.$CvDraftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CvDrafts.
     * @param {CvDraftCreateManyArgs} args - Arguments to create many CvDrafts.
     * @example
     * // Create many CvDrafts
     * const cvDraft = await prisma.cvDraft.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CvDraftCreateManyArgs>(args?: SelectSubset<T, CvDraftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CvDrafts and returns the data saved in the database.
     * @param {CvDraftCreateManyAndReturnArgs} args - Arguments to create many CvDrafts.
     * @example
     * // Create many CvDrafts
     * const cvDraft = await prisma.cvDraft.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CvDrafts and only return the `id`
     * const cvDraftWithIdOnly = await prisma.cvDraft.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CvDraftCreateManyAndReturnArgs>(args?: SelectSubset<T, CvDraftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvDraftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CvDraft.
     * @param {CvDraftDeleteArgs} args - Arguments to delete one CvDraft.
     * @example
     * // Delete one CvDraft
     * const CvDraft = await prisma.cvDraft.delete({
     *   where: {
     *     // ... filter to delete one CvDraft
     *   }
     * })
     * 
     */
    delete<T extends CvDraftDeleteArgs>(args: SelectSubset<T, CvDraftDeleteArgs<ExtArgs>>): Prisma__CvDraftClient<$Result.GetResult<Prisma.$CvDraftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CvDraft.
     * @param {CvDraftUpdateArgs} args - Arguments to update one CvDraft.
     * @example
     * // Update one CvDraft
     * const cvDraft = await prisma.cvDraft.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CvDraftUpdateArgs>(args: SelectSubset<T, CvDraftUpdateArgs<ExtArgs>>): Prisma__CvDraftClient<$Result.GetResult<Prisma.$CvDraftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CvDrafts.
     * @param {CvDraftDeleteManyArgs} args - Arguments to filter CvDrafts to delete.
     * @example
     * // Delete a few CvDrafts
     * const { count } = await prisma.cvDraft.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CvDraftDeleteManyArgs>(args?: SelectSubset<T, CvDraftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CvDrafts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvDraftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CvDrafts
     * const cvDraft = await prisma.cvDraft.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CvDraftUpdateManyArgs>(args: SelectSubset<T, CvDraftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CvDrafts and returns the data updated in the database.
     * @param {CvDraftUpdateManyAndReturnArgs} args - Arguments to update many CvDrafts.
     * @example
     * // Update many CvDrafts
     * const cvDraft = await prisma.cvDraft.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CvDrafts and only return the `id`
     * const cvDraftWithIdOnly = await prisma.cvDraft.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CvDraftUpdateManyAndReturnArgs>(args: SelectSubset<T, CvDraftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CvDraftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CvDraft.
     * @param {CvDraftUpsertArgs} args - Arguments to update or create a CvDraft.
     * @example
     * // Update or create a CvDraft
     * const cvDraft = await prisma.cvDraft.upsert({
     *   create: {
     *     // ... data to create a CvDraft
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CvDraft we want to update
     *   }
     * })
     */
    upsert<T extends CvDraftUpsertArgs>(args: SelectSubset<T, CvDraftUpsertArgs<ExtArgs>>): Prisma__CvDraftClient<$Result.GetResult<Prisma.$CvDraftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CvDrafts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvDraftCountArgs} args - Arguments to filter CvDrafts to count.
     * @example
     * // Count the number of CvDrafts
     * const count = await prisma.cvDraft.count({
     *   where: {
     *     // ... the filter for the CvDrafts we want to count
     *   }
     * })
    **/
    count<T extends CvDraftCountArgs>(
      args?: Subset<T, CvDraftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CvDraftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CvDraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvDraftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CvDraftAggregateArgs>(args: Subset<T, CvDraftAggregateArgs>): Prisma.PrismaPromise<GetCvDraftAggregateType<T>>

    /**
     * Group by CvDraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CvDraftGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CvDraftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CvDraftGroupByArgs['orderBy'] }
        : { orderBy?: CvDraftGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CvDraftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCvDraftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CvDraft model
   */
  readonly fields: CvDraftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CvDraft.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CvDraftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    application<T extends CvApplicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CvApplicationDefaultArgs<ExtArgs>>): Prisma__CvApplicationClient<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CvDraft model
   */
  interface CvDraftFieldRefs {
    readonly id: FieldRef<"CvDraft", 'String'>
    readonly applicationId: FieldRef<"CvDraft", 'String'>
    readonly structuredCvJson: FieldRef<"CvDraft", 'Json'>
    readonly sanitizedCvJson: FieldRef<"CvDraft", 'Json'>
    readonly html: FieldRef<"CvDraft", 'String'>
    readonly pdfBytes: FieldRef<"CvDraft", 'Bytes'>
    readonly renderMetricsJson: FieldRef<"CvDraft", 'Json'>
    readonly createdAt: FieldRef<"CvDraft", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CvDraft findUnique
   */
  export type CvDraftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvDraft
     */
    select?: CvDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvDraft
     */
    omit?: CvDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvDraftInclude<ExtArgs> | null
    /**
     * Filter, which CvDraft to fetch.
     */
    where: CvDraftWhereUniqueInput
  }

  /**
   * CvDraft findUniqueOrThrow
   */
  export type CvDraftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvDraft
     */
    select?: CvDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvDraft
     */
    omit?: CvDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvDraftInclude<ExtArgs> | null
    /**
     * Filter, which CvDraft to fetch.
     */
    where: CvDraftWhereUniqueInput
  }

  /**
   * CvDraft findFirst
   */
  export type CvDraftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvDraft
     */
    select?: CvDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvDraft
     */
    omit?: CvDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvDraftInclude<ExtArgs> | null
    /**
     * Filter, which CvDraft to fetch.
     */
    where?: CvDraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvDrafts to fetch.
     */
    orderBy?: CvDraftOrderByWithRelationInput | CvDraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CvDrafts.
     */
    cursor?: CvDraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvDrafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvDrafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CvDrafts.
     */
    distinct?: CvDraftScalarFieldEnum | CvDraftScalarFieldEnum[]
  }

  /**
   * CvDraft findFirstOrThrow
   */
  export type CvDraftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvDraft
     */
    select?: CvDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvDraft
     */
    omit?: CvDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvDraftInclude<ExtArgs> | null
    /**
     * Filter, which CvDraft to fetch.
     */
    where?: CvDraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvDrafts to fetch.
     */
    orderBy?: CvDraftOrderByWithRelationInput | CvDraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CvDrafts.
     */
    cursor?: CvDraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvDrafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvDrafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CvDrafts.
     */
    distinct?: CvDraftScalarFieldEnum | CvDraftScalarFieldEnum[]
  }

  /**
   * CvDraft findMany
   */
  export type CvDraftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvDraft
     */
    select?: CvDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvDraft
     */
    omit?: CvDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvDraftInclude<ExtArgs> | null
    /**
     * Filter, which CvDrafts to fetch.
     */
    where?: CvDraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CvDrafts to fetch.
     */
    orderBy?: CvDraftOrderByWithRelationInput | CvDraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CvDrafts.
     */
    cursor?: CvDraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CvDrafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CvDrafts.
     */
    skip?: number
    distinct?: CvDraftScalarFieldEnum | CvDraftScalarFieldEnum[]
  }

  /**
   * CvDraft create
   */
  export type CvDraftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvDraft
     */
    select?: CvDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvDraft
     */
    omit?: CvDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvDraftInclude<ExtArgs> | null
    /**
     * The data needed to create a CvDraft.
     */
    data: XOR<CvDraftCreateInput, CvDraftUncheckedCreateInput>
  }

  /**
   * CvDraft createMany
   */
  export type CvDraftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CvDrafts.
     */
    data: CvDraftCreateManyInput | CvDraftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CvDraft createManyAndReturn
   */
  export type CvDraftCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvDraft
     */
    select?: CvDraftSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CvDraft
     */
    omit?: CvDraftOmit<ExtArgs> | null
    /**
     * The data used to create many CvDrafts.
     */
    data: CvDraftCreateManyInput | CvDraftCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvDraftIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CvDraft update
   */
  export type CvDraftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvDraft
     */
    select?: CvDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvDraft
     */
    omit?: CvDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvDraftInclude<ExtArgs> | null
    /**
     * The data needed to update a CvDraft.
     */
    data: XOR<CvDraftUpdateInput, CvDraftUncheckedUpdateInput>
    /**
     * Choose, which CvDraft to update.
     */
    where: CvDraftWhereUniqueInput
  }

  /**
   * CvDraft updateMany
   */
  export type CvDraftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CvDrafts.
     */
    data: XOR<CvDraftUpdateManyMutationInput, CvDraftUncheckedUpdateManyInput>
    /**
     * Filter which CvDrafts to update
     */
    where?: CvDraftWhereInput
    /**
     * Limit how many CvDrafts to update.
     */
    limit?: number
  }

  /**
   * CvDraft updateManyAndReturn
   */
  export type CvDraftUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvDraft
     */
    select?: CvDraftSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CvDraft
     */
    omit?: CvDraftOmit<ExtArgs> | null
    /**
     * The data used to update CvDrafts.
     */
    data: XOR<CvDraftUpdateManyMutationInput, CvDraftUncheckedUpdateManyInput>
    /**
     * Filter which CvDrafts to update
     */
    where?: CvDraftWhereInput
    /**
     * Limit how many CvDrafts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvDraftIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CvDraft upsert
   */
  export type CvDraftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvDraft
     */
    select?: CvDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvDraft
     */
    omit?: CvDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvDraftInclude<ExtArgs> | null
    /**
     * The filter to search for the CvDraft to update in case it exists.
     */
    where: CvDraftWhereUniqueInput
    /**
     * In case the CvDraft found by the `where` argument doesn't exist, create a new CvDraft with this data.
     */
    create: XOR<CvDraftCreateInput, CvDraftUncheckedCreateInput>
    /**
     * In case the CvDraft was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CvDraftUpdateInput, CvDraftUncheckedUpdateInput>
  }

  /**
   * CvDraft delete
   */
  export type CvDraftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvDraft
     */
    select?: CvDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvDraft
     */
    omit?: CvDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvDraftInclude<ExtArgs> | null
    /**
     * Filter which CvDraft to delete.
     */
    where: CvDraftWhereUniqueInput
  }

  /**
   * CvDraft deleteMany
   */
  export type CvDraftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CvDrafts to delete
     */
    where?: CvDraftWhereInput
    /**
     * Limit how many CvDrafts to delete.
     */
    limit?: number
  }

  /**
   * CvDraft without action
   */
  export type CvDraftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvDraft
     */
    select?: CvDraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvDraft
     */
    omit?: CvDraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvDraftInclude<ExtArgs> | null
  }


  /**
   * Model AgentRun
   */

  export type AggregateAgentRun = {
    _count: AgentRunCountAggregateOutputType | null
    _avg: AgentRunAvgAggregateOutputType | null
    _sum: AgentRunSumAggregateOutputType | null
    _min: AgentRunMinAggregateOutputType | null
    _max: AgentRunMaxAggregateOutputType | null
  }

  export type AgentRunAvgAggregateOutputType = {
    inputTokens: number | null
    cachedInputTokens: number | null
    outputTokens: number | null
    costUsd: Decimal | null
    durationMs: number | null
  }

  export type AgentRunSumAggregateOutputType = {
    inputTokens: number | null
    cachedInputTokens: number | null
    outputTokens: number | null
    costUsd: Decimal | null
    durationMs: number | null
  }

  export type AgentRunMinAggregateOutputType = {
    id: string | null
    userId: string | null
    applicationId: string | null
    step: string | null
    model: string | null
    status: string | null
    inputTokens: number | null
    cachedInputTokens: number | null
    outputTokens: number | null
    costUsd: Decimal | null
    durationMs: number | null
    error: string | null
    createdAt: Date | null
  }

  export type AgentRunMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    applicationId: string | null
    step: string | null
    model: string | null
    status: string | null
    inputTokens: number | null
    cachedInputTokens: number | null
    outputTokens: number | null
    costUsd: Decimal | null
    durationMs: number | null
    error: string | null
    createdAt: Date | null
  }

  export type AgentRunCountAggregateOutputType = {
    id: number
    userId: number
    applicationId: number
    step: number
    model: number
    status: number
    inputTokens: number
    cachedInputTokens: number
    outputTokens: number
    costUsd: number
    durationMs: number
    error: number
    createdAt: number
    _all: number
  }


  export type AgentRunAvgAggregateInputType = {
    inputTokens?: true
    cachedInputTokens?: true
    outputTokens?: true
    costUsd?: true
    durationMs?: true
  }

  export type AgentRunSumAggregateInputType = {
    inputTokens?: true
    cachedInputTokens?: true
    outputTokens?: true
    costUsd?: true
    durationMs?: true
  }

  export type AgentRunMinAggregateInputType = {
    id?: true
    userId?: true
    applicationId?: true
    step?: true
    model?: true
    status?: true
    inputTokens?: true
    cachedInputTokens?: true
    outputTokens?: true
    costUsd?: true
    durationMs?: true
    error?: true
    createdAt?: true
  }

  export type AgentRunMaxAggregateInputType = {
    id?: true
    userId?: true
    applicationId?: true
    step?: true
    model?: true
    status?: true
    inputTokens?: true
    cachedInputTokens?: true
    outputTokens?: true
    costUsd?: true
    durationMs?: true
    error?: true
    createdAt?: true
  }

  export type AgentRunCountAggregateInputType = {
    id?: true
    userId?: true
    applicationId?: true
    step?: true
    model?: true
    status?: true
    inputTokens?: true
    cachedInputTokens?: true
    outputTokens?: true
    costUsd?: true
    durationMs?: true
    error?: true
    createdAt?: true
    _all?: true
  }

  export type AgentRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentRun to aggregate.
     */
    where?: AgentRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRuns to fetch.
     */
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentRuns
    **/
    _count?: true | AgentRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentRunMaxAggregateInputType
  }

  export type GetAgentRunAggregateType<T extends AgentRunAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentRun[P]>
      : GetScalarType<T[P], AggregateAgentRun[P]>
  }




  export type AgentRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentRunWhereInput
    orderBy?: AgentRunOrderByWithAggregationInput | AgentRunOrderByWithAggregationInput[]
    by: AgentRunScalarFieldEnum[] | AgentRunScalarFieldEnum
    having?: AgentRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentRunCountAggregateInputType | true
    _avg?: AgentRunAvgAggregateInputType
    _sum?: AgentRunSumAggregateInputType
    _min?: AgentRunMinAggregateInputType
    _max?: AgentRunMaxAggregateInputType
  }

  export type AgentRunGroupByOutputType = {
    id: string
    userId: string
    applicationId: string | null
    step: string
    model: string
    status: string
    inputTokens: number | null
    cachedInputTokens: number | null
    outputTokens: number | null
    costUsd: Decimal | null
    durationMs: number | null
    error: string | null
    createdAt: Date
    _count: AgentRunCountAggregateOutputType | null
    _avg: AgentRunAvgAggregateOutputType | null
    _sum: AgentRunSumAggregateOutputType | null
    _min: AgentRunMinAggregateOutputType | null
    _max: AgentRunMaxAggregateOutputType | null
  }

  type GetAgentRunGroupByPayload<T extends AgentRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentRunGroupByOutputType[P]>
            : GetScalarType<T[P], AgentRunGroupByOutputType[P]>
        }
      >
    >


  export type AgentRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    applicationId?: boolean
    step?: boolean
    model?: boolean
    status?: boolean
    inputTokens?: boolean
    cachedInputTokens?: boolean
    outputTokens?: boolean
    costUsd?: boolean
    durationMs?: boolean
    error?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    application?: boolean | AgentRun$applicationArgs<ExtArgs>
  }, ExtArgs["result"]["agentRun"]>

  export type AgentRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    applicationId?: boolean
    step?: boolean
    model?: boolean
    status?: boolean
    inputTokens?: boolean
    cachedInputTokens?: boolean
    outputTokens?: boolean
    costUsd?: boolean
    durationMs?: boolean
    error?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    application?: boolean | AgentRun$applicationArgs<ExtArgs>
  }, ExtArgs["result"]["agentRun"]>

  export type AgentRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    applicationId?: boolean
    step?: boolean
    model?: boolean
    status?: boolean
    inputTokens?: boolean
    cachedInputTokens?: boolean
    outputTokens?: boolean
    costUsd?: boolean
    durationMs?: boolean
    error?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    application?: boolean | AgentRun$applicationArgs<ExtArgs>
  }, ExtArgs["result"]["agentRun"]>

  export type AgentRunSelectScalar = {
    id?: boolean
    userId?: boolean
    applicationId?: boolean
    step?: boolean
    model?: boolean
    status?: boolean
    inputTokens?: boolean
    cachedInputTokens?: boolean
    outputTokens?: boolean
    costUsd?: boolean
    durationMs?: boolean
    error?: boolean
    createdAt?: boolean
  }

  export type AgentRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "applicationId" | "step" | "model" | "status" | "inputTokens" | "cachedInputTokens" | "outputTokens" | "costUsd" | "durationMs" | "error" | "createdAt", ExtArgs["result"]["agentRun"]>
  export type AgentRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    application?: boolean | AgentRun$applicationArgs<ExtArgs>
  }
  export type AgentRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    application?: boolean | AgentRun$applicationArgs<ExtArgs>
  }
  export type AgentRunIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    application?: boolean | AgentRun$applicationArgs<ExtArgs>
  }

  export type $AgentRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentRun"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      application: Prisma.$CvApplicationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      applicationId: string | null
      step: string
      model: string
      status: string
      inputTokens: number | null
      cachedInputTokens: number | null
      outputTokens: number | null
      costUsd: Prisma.Decimal | null
      durationMs: number | null
      error: string | null
      createdAt: Date
    }, ExtArgs["result"]["agentRun"]>
    composites: {}
  }

  type AgentRunGetPayload<S extends boolean | null | undefined | AgentRunDefaultArgs> = $Result.GetResult<Prisma.$AgentRunPayload, S>

  type AgentRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentRunCountAggregateInputType | true
    }

  export interface AgentRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentRun'], meta: { name: 'AgentRun' } }
    /**
     * Find zero or one AgentRun that matches the filter.
     * @param {AgentRunFindUniqueArgs} args - Arguments to find a AgentRun
     * @example
     * // Get one AgentRun
     * const agentRun = await prisma.agentRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentRunFindUniqueArgs>(args: SelectSubset<T, AgentRunFindUniqueArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgentRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentRunFindUniqueOrThrowArgs} args - Arguments to find a AgentRun
     * @example
     * // Get one AgentRun
     * const agentRun = await prisma.agentRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentRunFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunFindFirstArgs} args - Arguments to find a AgentRun
     * @example
     * // Get one AgentRun
     * const agentRun = await prisma.agentRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentRunFindFirstArgs>(args?: SelectSubset<T, AgentRunFindFirstArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunFindFirstOrThrowArgs} args - Arguments to find a AgentRun
     * @example
     * // Get one AgentRun
     * const agentRun = await prisma.agentRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentRunFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentRuns
     * const agentRuns = await prisma.agentRun.findMany()
     * 
     * // Get first 10 AgentRuns
     * const agentRuns = await prisma.agentRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentRunWithIdOnly = await prisma.agentRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentRunFindManyArgs>(args?: SelectSubset<T, AgentRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgentRun.
     * @param {AgentRunCreateArgs} args - Arguments to create a AgentRun.
     * @example
     * // Create one AgentRun
     * const AgentRun = await prisma.agentRun.create({
     *   data: {
     *     // ... data to create a AgentRun
     *   }
     * })
     * 
     */
    create<T extends AgentRunCreateArgs>(args: SelectSubset<T, AgentRunCreateArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgentRuns.
     * @param {AgentRunCreateManyArgs} args - Arguments to create many AgentRuns.
     * @example
     * // Create many AgentRuns
     * const agentRun = await prisma.agentRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentRunCreateManyArgs>(args?: SelectSubset<T, AgentRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentRuns and returns the data saved in the database.
     * @param {AgentRunCreateManyAndReturnArgs} args - Arguments to create many AgentRuns.
     * @example
     * // Create many AgentRuns
     * const agentRun = await prisma.agentRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentRuns and only return the `id`
     * const agentRunWithIdOnly = await prisma.agentRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentRunCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AgentRun.
     * @param {AgentRunDeleteArgs} args - Arguments to delete one AgentRun.
     * @example
     * // Delete one AgentRun
     * const AgentRun = await prisma.agentRun.delete({
     *   where: {
     *     // ... filter to delete one AgentRun
     *   }
     * })
     * 
     */
    delete<T extends AgentRunDeleteArgs>(args: SelectSubset<T, AgentRunDeleteArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgentRun.
     * @param {AgentRunUpdateArgs} args - Arguments to update one AgentRun.
     * @example
     * // Update one AgentRun
     * const agentRun = await prisma.agentRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentRunUpdateArgs>(args: SelectSubset<T, AgentRunUpdateArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgentRuns.
     * @param {AgentRunDeleteManyArgs} args - Arguments to filter AgentRuns to delete.
     * @example
     * // Delete a few AgentRuns
     * const { count } = await prisma.agentRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentRunDeleteManyArgs>(args?: SelectSubset<T, AgentRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentRuns
     * const agentRun = await prisma.agentRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentRunUpdateManyArgs>(args: SelectSubset<T, AgentRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentRuns and returns the data updated in the database.
     * @param {AgentRunUpdateManyAndReturnArgs} args - Arguments to update many AgentRuns.
     * @example
     * // Update many AgentRuns
     * const agentRun = await prisma.agentRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgentRuns and only return the `id`
     * const agentRunWithIdOnly = await prisma.agentRun.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentRunUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AgentRun.
     * @param {AgentRunUpsertArgs} args - Arguments to update or create a AgentRun.
     * @example
     * // Update or create a AgentRun
     * const agentRun = await prisma.agentRun.upsert({
     *   create: {
     *     // ... data to create a AgentRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentRun we want to update
     *   }
     * })
     */
    upsert<T extends AgentRunUpsertArgs>(args: SelectSubset<T, AgentRunUpsertArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AgentRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunCountArgs} args - Arguments to filter AgentRuns to count.
     * @example
     * // Count the number of AgentRuns
     * const count = await prisma.agentRun.count({
     *   where: {
     *     // ... the filter for the AgentRuns we want to count
     *   }
     * })
    **/
    count<T extends AgentRunCountArgs>(
      args?: Subset<T, AgentRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentRunAggregateArgs>(args: Subset<T, AgentRunAggregateArgs>): Prisma.PrismaPromise<GetAgentRunAggregateType<T>>

    /**
     * Group by AgentRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentRunGroupByArgs['orderBy'] }
        : { orderBy?: AgentRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentRun model
   */
  readonly fields: AgentRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    application<T extends AgentRun$applicationArgs<ExtArgs> = {}>(args?: Subset<T, AgentRun$applicationArgs<ExtArgs>>): Prisma__CvApplicationClient<$Result.GetResult<Prisma.$CvApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentRun model
   */
  interface AgentRunFieldRefs {
    readonly id: FieldRef<"AgentRun", 'String'>
    readonly userId: FieldRef<"AgentRun", 'String'>
    readonly applicationId: FieldRef<"AgentRun", 'String'>
    readonly step: FieldRef<"AgentRun", 'String'>
    readonly model: FieldRef<"AgentRun", 'String'>
    readonly status: FieldRef<"AgentRun", 'String'>
    readonly inputTokens: FieldRef<"AgentRun", 'Int'>
    readonly cachedInputTokens: FieldRef<"AgentRun", 'Int'>
    readonly outputTokens: FieldRef<"AgentRun", 'Int'>
    readonly costUsd: FieldRef<"AgentRun", 'Decimal'>
    readonly durationMs: FieldRef<"AgentRun", 'Int'>
    readonly error: FieldRef<"AgentRun", 'String'>
    readonly createdAt: FieldRef<"AgentRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentRun findUnique
   */
  export type AgentRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRun to fetch.
     */
    where: AgentRunWhereUniqueInput
  }

  /**
   * AgentRun findUniqueOrThrow
   */
  export type AgentRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRun to fetch.
     */
    where: AgentRunWhereUniqueInput
  }

  /**
   * AgentRun findFirst
   */
  export type AgentRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRun to fetch.
     */
    where?: AgentRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRuns to fetch.
     */
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentRuns.
     */
    cursor?: AgentRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentRuns.
     */
    distinct?: AgentRunScalarFieldEnum | AgentRunScalarFieldEnum[]
  }

  /**
   * AgentRun findFirstOrThrow
   */
  export type AgentRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRun to fetch.
     */
    where?: AgentRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRuns to fetch.
     */
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentRuns.
     */
    cursor?: AgentRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentRuns.
     */
    distinct?: AgentRunScalarFieldEnum | AgentRunScalarFieldEnum[]
  }

  /**
   * AgentRun findMany
   */
  export type AgentRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRuns to fetch.
     */
    where?: AgentRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRuns to fetch.
     */
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentRuns.
     */
    cursor?: AgentRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRuns.
     */
    skip?: number
    distinct?: AgentRunScalarFieldEnum | AgentRunScalarFieldEnum[]
  }

  /**
   * AgentRun create
   */
  export type AgentRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentRun.
     */
    data: XOR<AgentRunCreateInput, AgentRunUncheckedCreateInput>
  }

  /**
   * AgentRun createMany
   */
  export type AgentRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentRuns.
     */
    data: AgentRunCreateManyInput | AgentRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentRun createManyAndReturn
   */
  export type AgentRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * The data used to create many AgentRuns.
     */
    data: AgentRunCreateManyInput | AgentRunCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentRun update
   */
  export type AgentRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentRun.
     */
    data: XOR<AgentRunUpdateInput, AgentRunUncheckedUpdateInput>
    /**
     * Choose, which AgentRun to update.
     */
    where: AgentRunWhereUniqueInput
  }

  /**
   * AgentRun updateMany
   */
  export type AgentRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentRuns.
     */
    data: XOR<AgentRunUpdateManyMutationInput, AgentRunUncheckedUpdateManyInput>
    /**
     * Filter which AgentRuns to update
     */
    where?: AgentRunWhereInput
    /**
     * Limit how many AgentRuns to update.
     */
    limit?: number
  }

  /**
   * AgentRun updateManyAndReturn
   */
  export type AgentRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * The data used to update AgentRuns.
     */
    data: XOR<AgentRunUpdateManyMutationInput, AgentRunUncheckedUpdateManyInput>
    /**
     * Filter which AgentRuns to update
     */
    where?: AgentRunWhereInput
    /**
     * Limit how many AgentRuns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentRun upsert
   */
  export type AgentRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentRun to update in case it exists.
     */
    where: AgentRunWhereUniqueInput
    /**
     * In case the AgentRun found by the `where` argument doesn't exist, create a new AgentRun with this data.
     */
    create: XOR<AgentRunCreateInput, AgentRunUncheckedCreateInput>
    /**
     * In case the AgentRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentRunUpdateInput, AgentRunUncheckedUpdateInput>
  }

  /**
   * AgentRun delete
   */
  export type AgentRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter which AgentRun to delete.
     */
    where: AgentRunWhereUniqueInput
  }

  /**
   * AgentRun deleteMany
   */
  export type AgentRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentRuns to delete
     */
    where?: AgentRunWhereInput
    /**
     * Limit how many AgentRuns to delete.
     */
    limit?: number
  }

  /**
   * AgentRun.application
   */
  export type AgentRun$applicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CvApplication
     */
    select?: CvApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CvApplication
     */
    omit?: CvApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CvApplicationInclude<ExtArgs> | null
    where?: CvApplicationWhereInput
  }

  /**
   * AgentRun without action
   */
  export type AgentRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AnonymousSessionScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AnonymousSessionScalarFieldEnum = (typeof AnonymousSessionScalarFieldEnum)[keyof typeof AnonymousSessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    emailVerified: 'emailVerified',
    name: 'name',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const CareerProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    rawCvText: 'rawCvText',
    rawCvFileName: 'rawCvFileName',
    profileJson: 'profileJson',
    seniority: 'seniority',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CareerProfileScalarFieldEnum = (typeof CareerProfileScalarFieldEnum)[keyof typeof CareerProfileScalarFieldEnum]


  export const CvApplicationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    careerProfileId: 'careerProfileId',
    jobText: 'jobText',
    jobAnalysisJson: 'jobAnalysisJson',
    matchJson: 'matchJson',
    questionsJson: 'questionsJson',
    answersJson: 'answersJson',
    extraNotes: 'extraNotes',
    matchScore: 'matchScore',
    status: 'status',
    warningJson: 'warningJson',
    error: 'error',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CvApplicationScalarFieldEnum = (typeof CvApplicationScalarFieldEnum)[keyof typeof CvApplicationScalarFieldEnum]


  export const CvDraftScalarFieldEnum: {
    id: 'id',
    applicationId: 'applicationId',
    structuredCvJson: 'structuredCvJson',
    sanitizedCvJson: 'sanitizedCvJson',
    html: 'html',
    pdfBytes: 'pdfBytes',
    renderMetricsJson: 'renderMetricsJson',
    createdAt: 'createdAt'
  };

  export type CvDraftScalarFieldEnum = (typeof CvDraftScalarFieldEnum)[keyof typeof CvDraftScalarFieldEnum]


  export const AgentRunScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    applicationId: 'applicationId',
    step: 'step',
    model: 'model',
    status: 'status',
    inputTokens: 'inputTokens',
    cachedInputTokens: 'cachedInputTokens',
    outputTokens: 'outputTokens',
    costUsd: 'costUsd',
    durationMs: 'durationMs',
    error: 'error',
    createdAt: 'createdAt'
  };

  export type AgentRunScalarFieldEnum = (typeof AgentRunScalarFieldEnum)[keyof typeof AgentRunScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'Bytes[]'
   */
  export type ListBytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AnonymousSessionWhereInput = {
    AND?: AnonymousSessionWhereInput | AnonymousSessionWhereInput[]
    OR?: AnonymousSessionWhereInput[]
    NOT?: AnonymousSessionWhereInput | AnonymousSessionWhereInput[]
    id?: StringFilter<"AnonymousSession"> | string
    createdAt?: DateTimeFilter<"AnonymousSession"> | Date | string
    updatedAt?: DateTimeFilter<"AnonymousSession"> | Date | string
  }

  export type AnonymousSessionOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnonymousSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnonymousSessionWhereInput | AnonymousSessionWhereInput[]
    OR?: AnonymousSessionWhereInput[]
    NOT?: AnonymousSessionWhereInput | AnonymousSessionWhereInput[]
    createdAt?: DateTimeFilter<"AnonymousSession"> | Date | string
    updatedAt?: DateTimeFilter<"AnonymousSession"> | Date | string
  }, "id">

  export type AnonymousSessionOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AnonymousSessionCountOrderByAggregateInput
    _max?: AnonymousSessionMaxOrderByAggregateInput
    _min?: AnonymousSessionMinOrderByAggregateInput
  }

  export type AnonymousSessionScalarWhereWithAggregatesInput = {
    AND?: AnonymousSessionScalarWhereWithAggregatesInput | AnonymousSessionScalarWhereWithAggregatesInput[]
    OR?: AnonymousSessionScalarWhereWithAggregatesInput[]
    NOT?: AnonymousSessionScalarWhereWithAggregatesInput | AnonymousSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnonymousSession"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AnonymousSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AnonymousSession"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    name?: StringFilter<"User"> | string
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    careerProfile?: XOR<CareerProfileNullableScalarRelationFilter, CareerProfileWhereInput> | null
    applications?: CvApplicationListRelationFilter
    agentRuns?: AgentRunListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    careerProfile?: CareerProfileOrderByWithRelationInput
    applications?: CvApplicationOrderByRelationAggregateInput
    agentRuns?: AgentRunOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    emailVerified?: BoolFilter<"User"> | boolean
    name?: StringFilter<"User"> | string
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    careerProfile?: XOR<CareerProfileNullableScalarRelationFilter, CareerProfileWhereInput> | null
    applications?: CvApplicationListRelationFilter
    agentRuns?: AgentRunListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    name?: StringWithAggregatesFilter<"User"> | string
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type CareerProfileWhereInput = {
    AND?: CareerProfileWhereInput | CareerProfileWhereInput[]
    OR?: CareerProfileWhereInput[]
    NOT?: CareerProfileWhereInput | CareerProfileWhereInput[]
    id?: StringFilter<"CareerProfile"> | string
    userId?: StringFilter<"CareerProfile"> | string
    rawCvText?: StringFilter<"CareerProfile"> | string
    rawCvFileName?: StringNullableFilter<"CareerProfile"> | string | null
    profileJson?: JsonFilter<"CareerProfile">
    seniority?: StringFilter<"CareerProfile"> | string
    createdAt?: DateTimeFilter<"CareerProfile"> | Date | string
    updatedAt?: DateTimeFilter<"CareerProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    applications?: CvApplicationListRelationFilter
  }

  export type CareerProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    rawCvText?: SortOrder
    rawCvFileName?: SortOrderInput | SortOrder
    profileJson?: SortOrder
    seniority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    applications?: CvApplicationOrderByRelationAggregateInput
  }

  export type CareerProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: CareerProfileWhereInput | CareerProfileWhereInput[]
    OR?: CareerProfileWhereInput[]
    NOT?: CareerProfileWhereInput | CareerProfileWhereInput[]
    rawCvText?: StringFilter<"CareerProfile"> | string
    rawCvFileName?: StringNullableFilter<"CareerProfile"> | string | null
    profileJson?: JsonFilter<"CareerProfile">
    seniority?: StringFilter<"CareerProfile"> | string
    createdAt?: DateTimeFilter<"CareerProfile"> | Date | string
    updatedAt?: DateTimeFilter<"CareerProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    applications?: CvApplicationListRelationFilter
  }, "id" | "userId">

  export type CareerProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    rawCvText?: SortOrder
    rawCvFileName?: SortOrderInput | SortOrder
    profileJson?: SortOrder
    seniority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CareerProfileCountOrderByAggregateInput
    _max?: CareerProfileMaxOrderByAggregateInput
    _min?: CareerProfileMinOrderByAggregateInput
  }

  export type CareerProfileScalarWhereWithAggregatesInput = {
    AND?: CareerProfileScalarWhereWithAggregatesInput | CareerProfileScalarWhereWithAggregatesInput[]
    OR?: CareerProfileScalarWhereWithAggregatesInput[]
    NOT?: CareerProfileScalarWhereWithAggregatesInput | CareerProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CareerProfile"> | string
    userId?: StringWithAggregatesFilter<"CareerProfile"> | string
    rawCvText?: StringWithAggregatesFilter<"CareerProfile"> | string
    rawCvFileName?: StringNullableWithAggregatesFilter<"CareerProfile"> | string | null
    profileJson?: JsonWithAggregatesFilter<"CareerProfile">
    seniority?: StringWithAggregatesFilter<"CareerProfile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CareerProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CareerProfile"> | Date | string
  }

  export type CvApplicationWhereInput = {
    AND?: CvApplicationWhereInput | CvApplicationWhereInput[]
    OR?: CvApplicationWhereInput[]
    NOT?: CvApplicationWhereInput | CvApplicationWhereInput[]
    id?: StringFilter<"CvApplication"> | string
    userId?: StringFilter<"CvApplication"> | string
    careerProfileId?: StringFilter<"CvApplication"> | string
    jobText?: StringFilter<"CvApplication"> | string
    jobAnalysisJson?: JsonNullableFilter<"CvApplication">
    matchJson?: JsonNullableFilter<"CvApplication">
    questionsJson?: JsonNullableFilter<"CvApplication">
    answersJson?: JsonNullableFilter<"CvApplication">
    extraNotes?: StringNullableFilter<"CvApplication"> | string | null
    matchScore?: IntNullableFilter<"CvApplication"> | number | null
    status?: StringFilter<"CvApplication"> | string
    warningJson?: JsonNullableFilter<"CvApplication">
    error?: StringNullableFilter<"CvApplication"> | string | null
    createdAt?: DateTimeFilter<"CvApplication"> | Date | string
    updatedAt?: DateTimeFilter<"CvApplication"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    careerProfile?: XOR<CareerProfileScalarRelationFilter, CareerProfileWhereInput>
    draft?: XOR<CvDraftNullableScalarRelationFilter, CvDraftWhereInput> | null
    agentRuns?: AgentRunListRelationFilter
  }

  export type CvApplicationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    careerProfileId?: SortOrder
    jobText?: SortOrder
    jobAnalysisJson?: SortOrderInput | SortOrder
    matchJson?: SortOrderInput | SortOrder
    questionsJson?: SortOrderInput | SortOrder
    answersJson?: SortOrderInput | SortOrder
    extraNotes?: SortOrderInput | SortOrder
    matchScore?: SortOrderInput | SortOrder
    status?: SortOrder
    warningJson?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    careerProfile?: CareerProfileOrderByWithRelationInput
    draft?: CvDraftOrderByWithRelationInput
    agentRuns?: AgentRunOrderByRelationAggregateInput
  }

  export type CvApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CvApplicationWhereInput | CvApplicationWhereInput[]
    OR?: CvApplicationWhereInput[]
    NOT?: CvApplicationWhereInput | CvApplicationWhereInput[]
    userId?: StringFilter<"CvApplication"> | string
    careerProfileId?: StringFilter<"CvApplication"> | string
    jobText?: StringFilter<"CvApplication"> | string
    jobAnalysisJson?: JsonNullableFilter<"CvApplication">
    matchJson?: JsonNullableFilter<"CvApplication">
    questionsJson?: JsonNullableFilter<"CvApplication">
    answersJson?: JsonNullableFilter<"CvApplication">
    extraNotes?: StringNullableFilter<"CvApplication"> | string | null
    matchScore?: IntNullableFilter<"CvApplication"> | number | null
    status?: StringFilter<"CvApplication"> | string
    warningJson?: JsonNullableFilter<"CvApplication">
    error?: StringNullableFilter<"CvApplication"> | string | null
    createdAt?: DateTimeFilter<"CvApplication"> | Date | string
    updatedAt?: DateTimeFilter<"CvApplication"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    careerProfile?: XOR<CareerProfileScalarRelationFilter, CareerProfileWhereInput>
    draft?: XOR<CvDraftNullableScalarRelationFilter, CvDraftWhereInput> | null
    agentRuns?: AgentRunListRelationFilter
  }, "id">

  export type CvApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    careerProfileId?: SortOrder
    jobText?: SortOrder
    jobAnalysisJson?: SortOrderInput | SortOrder
    matchJson?: SortOrderInput | SortOrder
    questionsJson?: SortOrderInput | SortOrder
    answersJson?: SortOrderInput | SortOrder
    extraNotes?: SortOrderInput | SortOrder
    matchScore?: SortOrderInput | SortOrder
    status?: SortOrder
    warningJson?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CvApplicationCountOrderByAggregateInput
    _avg?: CvApplicationAvgOrderByAggregateInput
    _max?: CvApplicationMaxOrderByAggregateInput
    _min?: CvApplicationMinOrderByAggregateInput
    _sum?: CvApplicationSumOrderByAggregateInput
  }

  export type CvApplicationScalarWhereWithAggregatesInput = {
    AND?: CvApplicationScalarWhereWithAggregatesInput | CvApplicationScalarWhereWithAggregatesInput[]
    OR?: CvApplicationScalarWhereWithAggregatesInput[]
    NOT?: CvApplicationScalarWhereWithAggregatesInput | CvApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CvApplication"> | string
    userId?: StringWithAggregatesFilter<"CvApplication"> | string
    careerProfileId?: StringWithAggregatesFilter<"CvApplication"> | string
    jobText?: StringWithAggregatesFilter<"CvApplication"> | string
    jobAnalysisJson?: JsonNullableWithAggregatesFilter<"CvApplication">
    matchJson?: JsonNullableWithAggregatesFilter<"CvApplication">
    questionsJson?: JsonNullableWithAggregatesFilter<"CvApplication">
    answersJson?: JsonNullableWithAggregatesFilter<"CvApplication">
    extraNotes?: StringNullableWithAggregatesFilter<"CvApplication"> | string | null
    matchScore?: IntNullableWithAggregatesFilter<"CvApplication"> | number | null
    status?: StringWithAggregatesFilter<"CvApplication"> | string
    warningJson?: JsonNullableWithAggregatesFilter<"CvApplication">
    error?: StringNullableWithAggregatesFilter<"CvApplication"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CvApplication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CvApplication"> | Date | string
  }

  export type CvDraftWhereInput = {
    AND?: CvDraftWhereInput | CvDraftWhereInput[]
    OR?: CvDraftWhereInput[]
    NOT?: CvDraftWhereInput | CvDraftWhereInput[]
    id?: StringFilter<"CvDraft"> | string
    applicationId?: StringFilter<"CvDraft"> | string
    structuredCvJson?: JsonFilter<"CvDraft">
    sanitizedCvJson?: JsonFilter<"CvDraft">
    html?: StringFilter<"CvDraft"> | string
    pdfBytes?: BytesFilter<"CvDraft"> | Bytes
    renderMetricsJson?: JsonFilter<"CvDraft">
    createdAt?: DateTimeFilter<"CvDraft"> | Date | string
    application?: XOR<CvApplicationScalarRelationFilter, CvApplicationWhereInput>
  }

  export type CvDraftOrderByWithRelationInput = {
    id?: SortOrder
    applicationId?: SortOrder
    structuredCvJson?: SortOrder
    sanitizedCvJson?: SortOrder
    html?: SortOrder
    pdfBytes?: SortOrder
    renderMetricsJson?: SortOrder
    createdAt?: SortOrder
    application?: CvApplicationOrderByWithRelationInput
  }

  export type CvDraftWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    applicationId?: string
    AND?: CvDraftWhereInput | CvDraftWhereInput[]
    OR?: CvDraftWhereInput[]
    NOT?: CvDraftWhereInput | CvDraftWhereInput[]
    structuredCvJson?: JsonFilter<"CvDraft">
    sanitizedCvJson?: JsonFilter<"CvDraft">
    html?: StringFilter<"CvDraft"> | string
    pdfBytes?: BytesFilter<"CvDraft"> | Bytes
    renderMetricsJson?: JsonFilter<"CvDraft">
    createdAt?: DateTimeFilter<"CvDraft"> | Date | string
    application?: XOR<CvApplicationScalarRelationFilter, CvApplicationWhereInput>
  }, "id" | "applicationId">

  export type CvDraftOrderByWithAggregationInput = {
    id?: SortOrder
    applicationId?: SortOrder
    structuredCvJson?: SortOrder
    sanitizedCvJson?: SortOrder
    html?: SortOrder
    pdfBytes?: SortOrder
    renderMetricsJson?: SortOrder
    createdAt?: SortOrder
    _count?: CvDraftCountOrderByAggregateInput
    _max?: CvDraftMaxOrderByAggregateInput
    _min?: CvDraftMinOrderByAggregateInput
  }

  export type CvDraftScalarWhereWithAggregatesInput = {
    AND?: CvDraftScalarWhereWithAggregatesInput | CvDraftScalarWhereWithAggregatesInput[]
    OR?: CvDraftScalarWhereWithAggregatesInput[]
    NOT?: CvDraftScalarWhereWithAggregatesInput | CvDraftScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CvDraft"> | string
    applicationId?: StringWithAggregatesFilter<"CvDraft"> | string
    structuredCvJson?: JsonWithAggregatesFilter<"CvDraft">
    sanitizedCvJson?: JsonWithAggregatesFilter<"CvDraft">
    html?: StringWithAggregatesFilter<"CvDraft"> | string
    pdfBytes?: BytesWithAggregatesFilter<"CvDraft"> | Bytes
    renderMetricsJson?: JsonWithAggregatesFilter<"CvDraft">
    createdAt?: DateTimeWithAggregatesFilter<"CvDraft"> | Date | string
  }

  export type AgentRunWhereInput = {
    AND?: AgentRunWhereInput | AgentRunWhereInput[]
    OR?: AgentRunWhereInput[]
    NOT?: AgentRunWhereInput | AgentRunWhereInput[]
    id?: StringFilter<"AgentRun"> | string
    userId?: StringFilter<"AgentRun"> | string
    applicationId?: StringNullableFilter<"AgentRun"> | string | null
    step?: StringFilter<"AgentRun"> | string
    model?: StringFilter<"AgentRun"> | string
    status?: StringFilter<"AgentRun"> | string
    inputTokens?: IntNullableFilter<"AgentRun"> | number | null
    cachedInputTokens?: IntNullableFilter<"AgentRun"> | number | null
    outputTokens?: IntNullableFilter<"AgentRun"> | number | null
    costUsd?: DecimalNullableFilter<"AgentRun"> | Decimal | DecimalJsLike | number | string | null
    durationMs?: IntNullableFilter<"AgentRun"> | number | null
    error?: StringNullableFilter<"AgentRun"> | string | null
    createdAt?: DateTimeFilter<"AgentRun"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    application?: XOR<CvApplicationNullableScalarRelationFilter, CvApplicationWhereInput> | null
  }

  export type AgentRunOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    applicationId?: SortOrderInput | SortOrder
    step?: SortOrder
    model?: SortOrder
    status?: SortOrder
    inputTokens?: SortOrderInput | SortOrder
    cachedInputTokens?: SortOrderInput | SortOrder
    outputTokens?: SortOrderInput | SortOrder
    costUsd?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    application?: CvApplicationOrderByWithRelationInput
  }

  export type AgentRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentRunWhereInput | AgentRunWhereInput[]
    OR?: AgentRunWhereInput[]
    NOT?: AgentRunWhereInput | AgentRunWhereInput[]
    userId?: StringFilter<"AgentRun"> | string
    applicationId?: StringNullableFilter<"AgentRun"> | string | null
    step?: StringFilter<"AgentRun"> | string
    model?: StringFilter<"AgentRun"> | string
    status?: StringFilter<"AgentRun"> | string
    inputTokens?: IntNullableFilter<"AgentRun"> | number | null
    cachedInputTokens?: IntNullableFilter<"AgentRun"> | number | null
    outputTokens?: IntNullableFilter<"AgentRun"> | number | null
    costUsd?: DecimalNullableFilter<"AgentRun"> | Decimal | DecimalJsLike | number | string | null
    durationMs?: IntNullableFilter<"AgentRun"> | number | null
    error?: StringNullableFilter<"AgentRun"> | string | null
    createdAt?: DateTimeFilter<"AgentRun"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    application?: XOR<CvApplicationNullableScalarRelationFilter, CvApplicationWhereInput> | null
  }, "id">

  export type AgentRunOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    applicationId?: SortOrderInput | SortOrder
    step?: SortOrder
    model?: SortOrder
    status?: SortOrder
    inputTokens?: SortOrderInput | SortOrder
    cachedInputTokens?: SortOrderInput | SortOrder
    outputTokens?: SortOrderInput | SortOrder
    costUsd?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AgentRunCountOrderByAggregateInput
    _avg?: AgentRunAvgOrderByAggregateInput
    _max?: AgentRunMaxOrderByAggregateInput
    _min?: AgentRunMinOrderByAggregateInput
    _sum?: AgentRunSumOrderByAggregateInput
  }

  export type AgentRunScalarWhereWithAggregatesInput = {
    AND?: AgentRunScalarWhereWithAggregatesInput | AgentRunScalarWhereWithAggregatesInput[]
    OR?: AgentRunScalarWhereWithAggregatesInput[]
    NOT?: AgentRunScalarWhereWithAggregatesInput | AgentRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentRun"> | string
    userId?: StringWithAggregatesFilter<"AgentRun"> | string
    applicationId?: StringNullableWithAggregatesFilter<"AgentRun"> | string | null
    step?: StringWithAggregatesFilter<"AgentRun"> | string
    model?: StringWithAggregatesFilter<"AgentRun"> | string
    status?: StringWithAggregatesFilter<"AgentRun"> | string
    inputTokens?: IntNullableWithAggregatesFilter<"AgentRun"> | number | null
    cachedInputTokens?: IntNullableWithAggregatesFilter<"AgentRun"> | number | null
    outputTokens?: IntNullableWithAggregatesFilter<"AgentRun"> | number | null
    costUsd?: DecimalNullableWithAggregatesFilter<"AgentRun"> | Decimal | DecimalJsLike | number | string | null
    durationMs?: IntNullableWithAggregatesFilter<"AgentRun"> | number | null
    error?: StringNullableWithAggregatesFilter<"AgentRun"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AgentRun"> | Date | string
  }

  export type AnonymousSessionCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnonymousSessionUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnonymousSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnonymousSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnonymousSessionCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnonymousSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnonymousSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    emailVerified?: boolean
    name?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    careerProfile?: CareerProfileCreateNestedOneWithoutUserInput
    applications?: CvApplicationCreateNestedManyWithoutUserInput
    agentRuns?: AgentRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    emailVerified?: boolean
    name?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    careerProfile?: CareerProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: CvApplicationUncheckedCreateNestedManyWithoutUserInput
    agentRuns?: AgentRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    careerProfile?: CareerProfileUpdateOneWithoutUserNestedInput
    applications?: CvApplicationUpdateManyWithoutUserNestedInput
    agentRuns?: AgentRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    careerProfile?: CareerProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: CvApplicationUncheckedUpdateManyWithoutUserNestedInput
    agentRuns?: AgentRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    emailVerified?: boolean
    name?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id?: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id?: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerProfileCreateInput = {
    id?: string
    rawCvText: string
    rawCvFileName?: string | null
    profileJson: JsonNullValueInput | InputJsonValue
    seniority: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCareerProfileInput
    applications?: CvApplicationCreateNestedManyWithoutCareerProfileInput
  }

  export type CareerProfileUncheckedCreateInput = {
    id?: string
    userId: string
    rawCvText: string
    rawCvFileName?: string | null
    profileJson: JsonNullValueInput | InputJsonValue
    seniority: string
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: CvApplicationUncheckedCreateNestedManyWithoutCareerProfileInput
  }

  export type CareerProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawCvText?: StringFieldUpdateOperationsInput | string
    rawCvFileName?: NullableStringFieldUpdateOperationsInput | string | null
    profileJson?: JsonNullValueInput | InputJsonValue
    seniority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCareerProfileNestedInput
    applications?: CvApplicationUpdateManyWithoutCareerProfileNestedInput
  }

  export type CareerProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rawCvText?: StringFieldUpdateOperationsInput | string
    rawCvFileName?: NullableStringFieldUpdateOperationsInput | string | null
    profileJson?: JsonNullValueInput | InputJsonValue
    seniority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: CvApplicationUncheckedUpdateManyWithoutCareerProfileNestedInput
  }

  export type CareerProfileCreateManyInput = {
    id?: string
    userId: string
    rawCvText: string
    rawCvFileName?: string | null
    profileJson: JsonNullValueInput | InputJsonValue
    seniority: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CareerProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawCvText?: StringFieldUpdateOperationsInput | string
    rawCvFileName?: NullableStringFieldUpdateOperationsInput | string | null
    profileJson?: JsonNullValueInput | InputJsonValue
    seniority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rawCvText?: StringFieldUpdateOperationsInput | string
    rawCvFileName?: NullableStringFieldUpdateOperationsInput | string | null
    profileJson?: JsonNullValueInput | InputJsonValue
    seniority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvApplicationCreateInput = {
    id?: string
    jobText: string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: string | null
    matchScore?: number | null
    status?: string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutApplicationsInput
    careerProfile: CareerProfileCreateNestedOneWithoutApplicationsInput
    draft?: CvDraftCreateNestedOneWithoutApplicationInput
    agentRuns?: AgentRunCreateNestedManyWithoutApplicationInput
  }

  export type CvApplicationUncheckedCreateInput = {
    id?: string
    userId: string
    careerProfileId: string
    jobText: string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: string | null
    matchScore?: number | null
    status?: string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    draft?: CvDraftUncheckedCreateNestedOneWithoutApplicationInput
    agentRuns?: AgentRunUncheckedCreateNestedManyWithoutApplicationInput
  }

  export type CvApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutApplicationsNestedInput
    careerProfile?: CareerProfileUpdateOneRequiredWithoutApplicationsNestedInput
    draft?: CvDraftUpdateOneWithoutApplicationNestedInput
    agentRuns?: AgentRunUpdateManyWithoutApplicationNestedInput
  }

  export type CvApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    careerProfileId?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: CvDraftUncheckedUpdateOneWithoutApplicationNestedInput
    agentRuns?: AgentRunUncheckedUpdateManyWithoutApplicationNestedInput
  }

  export type CvApplicationCreateManyInput = {
    id?: string
    userId: string
    careerProfileId: string
    jobText: string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: string | null
    matchScore?: number | null
    status?: string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    careerProfileId?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvDraftCreateInput = {
    id?: string
    structuredCvJson: JsonNullValueInput | InputJsonValue
    sanitizedCvJson: JsonNullValueInput | InputJsonValue
    html: string
    pdfBytes: Bytes
    renderMetricsJson: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    application: CvApplicationCreateNestedOneWithoutDraftInput
  }

  export type CvDraftUncheckedCreateInput = {
    id?: string
    applicationId: string
    structuredCvJson: JsonNullValueInput | InputJsonValue
    sanitizedCvJson: JsonNullValueInput | InputJsonValue
    html: string
    pdfBytes: Bytes
    renderMetricsJson: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CvDraftUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    structuredCvJson?: JsonNullValueInput | InputJsonValue
    sanitizedCvJson?: JsonNullValueInput | InputJsonValue
    html?: StringFieldUpdateOperationsInput | string
    pdfBytes?: BytesFieldUpdateOperationsInput | Bytes
    renderMetricsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: CvApplicationUpdateOneRequiredWithoutDraftNestedInput
  }

  export type CvDraftUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    structuredCvJson?: JsonNullValueInput | InputJsonValue
    sanitizedCvJson?: JsonNullValueInput | InputJsonValue
    html?: StringFieldUpdateOperationsInput | string
    pdfBytes?: BytesFieldUpdateOperationsInput | Bytes
    renderMetricsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvDraftCreateManyInput = {
    id?: string
    applicationId: string
    structuredCvJson: JsonNullValueInput | InputJsonValue
    sanitizedCvJson: JsonNullValueInput | InputJsonValue
    html: string
    pdfBytes: Bytes
    renderMetricsJson: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CvDraftUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    structuredCvJson?: JsonNullValueInput | InputJsonValue
    sanitizedCvJson?: JsonNullValueInput | InputJsonValue
    html?: StringFieldUpdateOperationsInput | string
    pdfBytes?: BytesFieldUpdateOperationsInput | Bytes
    renderMetricsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvDraftUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    structuredCvJson?: JsonNullValueInput | InputJsonValue
    sanitizedCvJson?: JsonNullValueInput | InputJsonValue
    html?: StringFieldUpdateOperationsInput | string
    pdfBytes?: BytesFieldUpdateOperationsInput | Bytes
    renderMetricsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRunCreateInput = {
    id?: string
    step: string
    model: string
    status: string
    inputTokens?: number | null
    cachedInputTokens?: number | null
    outputTokens?: number | null
    costUsd?: Decimal | DecimalJsLike | number | string | null
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAgentRunsInput
    application?: CvApplicationCreateNestedOneWithoutAgentRunsInput
  }

  export type AgentRunUncheckedCreateInput = {
    id?: string
    userId: string
    applicationId?: string | null
    step: string
    model: string
    status: string
    inputTokens?: number | null
    cachedInputTokens?: number | null
    outputTokens?: number | null
    costUsd?: Decimal | DecimalJsLike | number | string | null
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
  }

  export type AgentRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    step?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAgentRunsNestedInput
    application?: CvApplicationUpdateOneWithoutAgentRunsNestedInput
  }

  export type AgentRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    applicationId?: NullableStringFieldUpdateOperationsInput | string | null
    step?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRunCreateManyInput = {
    id?: string
    userId: string
    applicationId?: string | null
    step: string
    model: string
    status: string
    inputTokens?: number | null
    cachedInputTokens?: number | null
    outputTokens?: number | null
    costUsd?: Decimal | DecimalJsLike | number | string | null
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
  }

  export type AgentRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    step?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    applicationId?: NullableStringFieldUpdateOperationsInput | string | null
    step?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AnonymousSessionCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnonymousSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnonymousSessionMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type CareerProfileNullableScalarRelationFilter = {
    is?: CareerProfileWhereInput | null
    isNot?: CareerProfileWhereInput | null
  }

  export type CvApplicationListRelationFilter = {
    every?: CvApplicationWhereInput
    some?: CvApplicationWhereInput
    none?: CvApplicationWhereInput
  }

  export type AgentRunListRelationFilter = {
    every?: AgentRunWhereInput
    some?: AgentRunWhereInput
    none?: AgentRunWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CvApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentRunOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CareerProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rawCvText?: SortOrder
    rawCvFileName?: SortOrder
    profileJson?: SortOrder
    seniority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rawCvText?: SortOrder
    rawCvFileName?: SortOrder
    seniority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rawCvText?: SortOrder
    rawCvFileName?: SortOrder
    seniority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CareerProfileScalarRelationFilter = {
    is?: CareerProfileWhereInput
    isNot?: CareerProfileWhereInput
  }

  export type CvDraftNullableScalarRelationFilter = {
    is?: CvDraftWhereInput | null
    isNot?: CvDraftWhereInput | null
  }

  export type CvApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    careerProfileId?: SortOrder
    jobText?: SortOrder
    jobAnalysisJson?: SortOrder
    matchJson?: SortOrder
    questionsJson?: SortOrder
    answersJson?: SortOrder
    extraNotes?: SortOrder
    matchScore?: SortOrder
    status?: SortOrder
    warningJson?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CvApplicationAvgOrderByAggregateInput = {
    matchScore?: SortOrder
  }

  export type CvApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    careerProfileId?: SortOrder
    jobText?: SortOrder
    extraNotes?: SortOrder
    matchScore?: SortOrder
    status?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CvApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    careerProfileId?: SortOrder
    jobText?: SortOrder
    extraNotes?: SortOrder
    matchScore?: SortOrder
    status?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CvApplicationSumOrderByAggregateInput = {
    matchScore?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BytesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Bytes
  }

  export type CvApplicationScalarRelationFilter = {
    is?: CvApplicationWhereInput
    isNot?: CvApplicationWhereInput
  }

  export type CvDraftCountOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    structuredCvJson?: SortOrder
    sanitizedCvJson?: SortOrder
    html?: SortOrder
    pdfBytes?: SortOrder
    renderMetricsJson?: SortOrder
    createdAt?: SortOrder
  }

  export type CvDraftMaxOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    html?: SortOrder
    pdfBytes?: SortOrder
    createdAt?: SortOrder
  }

  export type CvDraftMinOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    html?: SortOrder
    pdfBytes?: SortOrder
    createdAt?: SortOrder
  }

  export type BytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Bytes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type CvApplicationNullableScalarRelationFilter = {
    is?: CvApplicationWhereInput | null
    isNot?: CvApplicationWhereInput | null
  }

  export type AgentRunCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    applicationId?: SortOrder
    step?: SortOrder
    model?: SortOrder
    status?: SortOrder
    inputTokens?: SortOrder
    cachedInputTokens?: SortOrder
    outputTokens?: SortOrder
    costUsd?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentRunAvgOrderByAggregateInput = {
    inputTokens?: SortOrder
    cachedInputTokens?: SortOrder
    outputTokens?: SortOrder
    costUsd?: SortOrder
    durationMs?: SortOrder
  }

  export type AgentRunMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    applicationId?: SortOrder
    step?: SortOrder
    model?: SortOrder
    status?: SortOrder
    inputTokens?: SortOrder
    cachedInputTokens?: SortOrder
    outputTokens?: SortOrder
    costUsd?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentRunMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    applicationId?: SortOrder
    step?: SortOrder
    model?: SortOrder
    status?: SortOrder
    inputTokens?: SortOrder
    cachedInputTokens?: SortOrder
    outputTokens?: SortOrder
    costUsd?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentRunSumOrderByAggregateInput = {
    inputTokens?: SortOrder
    cachedInputTokens?: SortOrder
    outputTokens?: SortOrder
    costUsd?: SortOrder
    durationMs?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type CareerProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<CareerProfileCreateWithoutUserInput, CareerProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CareerProfileCreateOrConnectWithoutUserInput
    connect?: CareerProfileWhereUniqueInput
  }

  export type CvApplicationCreateNestedManyWithoutUserInput = {
    create?: XOR<CvApplicationCreateWithoutUserInput, CvApplicationUncheckedCreateWithoutUserInput> | CvApplicationCreateWithoutUserInput[] | CvApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CvApplicationCreateOrConnectWithoutUserInput | CvApplicationCreateOrConnectWithoutUserInput[]
    createMany?: CvApplicationCreateManyUserInputEnvelope
    connect?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
  }

  export type AgentRunCreateNestedManyWithoutUserInput = {
    create?: XOR<AgentRunCreateWithoutUserInput, AgentRunUncheckedCreateWithoutUserInput> | AgentRunCreateWithoutUserInput[] | AgentRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutUserInput | AgentRunCreateOrConnectWithoutUserInput[]
    createMany?: AgentRunCreateManyUserInputEnvelope
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type CareerProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CareerProfileCreateWithoutUserInput, CareerProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CareerProfileCreateOrConnectWithoutUserInput
    connect?: CareerProfileWhereUniqueInput
  }

  export type CvApplicationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CvApplicationCreateWithoutUserInput, CvApplicationUncheckedCreateWithoutUserInput> | CvApplicationCreateWithoutUserInput[] | CvApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CvApplicationCreateOrConnectWithoutUserInput | CvApplicationCreateOrConnectWithoutUserInput[]
    createMany?: CvApplicationCreateManyUserInputEnvelope
    connect?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
  }

  export type AgentRunUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AgentRunCreateWithoutUserInput, AgentRunUncheckedCreateWithoutUserInput> | AgentRunCreateWithoutUserInput[] | AgentRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutUserInput | AgentRunCreateOrConnectWithoutUserInput[]
    createMany?: AgentRunCreateManyUserInputEnvelope
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type CareerProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<CareerProfileCreateWithoutUserInput, CareerProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CareerProfileCreateOrConnectWithoutUserInput
    upsert?: CareerProfileUpsertWithoutUserInput
    disconnect?: CareerProfileWhereInput | boolean
    delete?: CareerProfileWhereInput | boolean
    connect?: CareerProfileWhereUniqueInput
    update?: XOR<XOR<CareerProfileUpdateToOneWithWhereWithoutUserInput, CareerProfileUpdateWithoutUserInput>, CareerProfileUncheckedUpdateWithoutUserInput>
  }

  export type CvApplicationUpdateManyWithoutUserNestedInput = {
    create?: XOR<CvApplicationCreateWithoutUserInput, CvApplicationUncheckedCreateWithoutUserInput> | CvApplicationCreateWithoutUserInput[] | CvApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CvApplicationCreateOrConnectWithoutUserInput | CvApplicationCreateOrConnectWithoutUserInput[]
    upsert?: CvApplicationUpsertWithWhereUniqueWithoutUserInput | CvApplicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CvApplicationCreateManyUserInputEnvelope
    set?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    disconnect?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    delete?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    connect?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    update?: CvApplicationUpdateWithWhereUniqueWithoutUserInput | CvApplicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CvApplicationUpdateManyWithWhereWithoutUserInput | CvApplicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CvApplicationScalarWhereInput | CvApplicationScalarWhereInput[]
  }

  export type AgentRunUpdateManyWithoutUserNestedInput = {
    create?: XOR<AgentRunCreateWithoutUserInput, AgentRunUncheckedCreateWithoutUserInput> | AgentRunCreateWithoutUserInput[] | AgentRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutUserInput | AgentRunCreateOrConnectWithoutUserInput[]
    upsert?: AgentRunUpsertWithWhereUniqueWithoutUserInput | AgentRunUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AgentRunCreateManyUserInputEnvelope
    set?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    disconnect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    delete?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    update?: AgentRunUpdateWithWhereUniqueWithoutUserInput | AgentRunUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AgentRunUpdateManyWithWhereWithoutUserInput | AgentRunUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type CareerProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CareerProfileCreateWithoutUserInput, CareerProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: CareerProfileCreateOrConnectWithoutUserInput
    upsert?: CareerProfileUpsertWithoutUserInput
    disconnect?: CareerProfileWhereInput | boolean
    delete?: CareerProfileWhereInput | boolean
    connect?: CareerProfileWhereUniqueInput
    update?: XOR<XOR<CareerProfileUpdateToOneWithWhereWithoutUserInput, CareerProfileUpdateWithoutUserInput>, CareerProfileUncheckedUpdateWithoutUserInput>
  }

  export type CvApplicationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CvApplicationCreateWithoutUserInput, CvApplicationUncheckedCreateWithoutUserInput> | CvApplicationCreateWithoutUserInput[] | CvApplicationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CvApplicationCreateOrConnectWithoutUserInput | CvApplicationCreateOrConnectWithoutUserInput[]
    upsert?: CvApplicationUpsertWithWhereUniqueWithoutUserInput | CvApplicationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CvApplicationCreateManyUserInputEnvelope
    set?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    disconnect?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    delete?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    connect?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    update?: CvApplicationUpdateWithWhereUniqueWithoutUserInput | CvApplicationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CvApplicationUpdateManyWithWhereWithoutUserInput | CvApplicationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CvApplicationScalarWhereInput | CvApplicationScalarWhereInput[]
  }

  export type AgentRunUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AgentRunCreateWithoutUserInput, AgentRunUncheckedCreateWithoutUserInput> | AgentRunCreateWithoutUserInput[] | AgentRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutUserInput | AgentRunCreateOrConnectWithoutUserInput[]
    upsert?: AgentRunUpsertWithWhereUniqueWithoutUserInput | AgentRunUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AgentRunCreateManyUserInputEnvelope
    set?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    disconnect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    delete?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    update?: AgentRunUpdateWithWhereUniqueWithoutUserInput | AgentRunUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AgentRunUpdateManyWithWhereWithoutUserInput | AgentRunUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutCareerProfileInput = {
    create?: XOR<UserCreateWithoutCareerProfileInput, UserUncheckedCreateWithoutCareerProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutCareerProfileInput
    connect?: UserWhereUniqueInput
  }

  export type CvApplicationCreateNestedManyWithoutCareerProfileInput = {
    create?: XOR<CvApplicationCreateWithoutCareerProfileInput, CvApplicationUncheckedCreateWithoutCareerProfileInput> | CvApplicationCreateWithoutCareerProfileInput[] | CvApplicationUncheckedCreateWithoutCareerProfileInput[]
    connectOrCreate?: CvApplicationCreateOrConnectWithoutCareerProfileInput | CvApplicationCreateOrConnectWithoutCareerProfileInput[]
    createMany?: CvApplicationCreateManyCareerProfileInputEnvelope
    connect?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
  }

  export type CvApplicationUncheckedCreateNestedManyWithoutCareerProfileInput = {
    create?: XOR<CvApplicationCreateWithoutCareerProfileInput, CvApplicationUncheckedCreateWithoutCareerProfileInput> | CvApplicationCreateWithoutCareerProfileInput[] | CvApplicationUncheckedCreateWithoutCareerProfileInput[]
    connectOrCreate?: CvApplicationCreateOrConnectWithoutCareerProfileInput | CvApplicationCreateOrConnectWithoutCareerProfileInput[]
    createMany?: CvApplicationCreateManyCareerProfileInputEnvelope
    connect?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCareerProfileNestedInput = {
    create?: XOR<UserCreateWithoutCareerProfileInput, UserUncheckedCreateWithoutCareerProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutCareerProfileInput
    upsert?: UserUpsertWithoutCareerProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCareerProfileInput, UserUpdateWithoutCareerProfileInput>, UserUncheckedUpdateWithoutCareerProfileInput>
  }

  export type CvApplicationUpdateManyWithoutCareerProfileNestedInput = {
    create?: XOR<CvApplicationCreateWithoutCareerProfileInput, CvApplicationUncheckedCreateWithoutCareerProfileInput> | CvApplicationCreateWithoutCareerProfileInput[] | CvApplicationUncheckedCreateWithoutCareerProfileInput[]
    connectOrCreate?: CvApplicationCreateOrConnectWithoutCareerProfileInput | CvApplicationCreateOrConnectWithoutCareerProfileInput[]
    upsert?: CvApplicationUpsertWithWhereUniqueWithoutCareerProfileInput | CvApplicationUpsertWithWhereUniqueWithoutCareerProfileInput[]
    createMany?: CvApplicationCreateManyCareerProfileInputEnvelope
    set?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    disconnect?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    delete?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    connect?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    update?: CvApplicationUpdateWithWhereUniqueWithoutCareerProfileInput | CvApplicationUpdateWithWhereUniqueWithoutCareerProfileInput[]
    updateMany?: CvApplicationUpdateManyWithWhereWithoutCareerProfileInput | CvApplicationUpdateManyWithWhereWithoutCareerProfileInput[]
    deleteMany?: CvApplicationScalarWhereInput | CvApplicationScalarWhereInput[]
  }

  export type CvApplicationUncheckedUpdateManyWithoutCareerProfileNestedInput = {
    create?: XOR<CvApplicationCreateWithoutCareerProfileInput, CvApplicationUncheckedCreateWithoutCareerProfileInput> | CvApplicationCreateWithoutCareerProfileInput[] | CvApplicationUncheckedCreateWithoutCareerProfileInput[]
    connectOrCreate?: CvApplicationCreateOrConnectWithoutCareerProfileInput | CvApplicationCreateOrConnectWithoutCareerProfileInput[]
    upsert?: CvApplicationUpsertWithWhereUniqueWithoutCareerProfileInput | CvApplicationUpsertWithWhereUniqueWithoutCareerProfileInput[]
    createMany?: CvApplicationCreateManyCareerProfileInputEnvelope
    set?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    disconnect?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    delete?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    connect?: CvApplicationWhereUniqueInput | CvApplicationWhereUniqueInput[]
    update?: CvApplicationUpdateWithWhereUniqueWithoutCareerProfileInput | CvApplicationUpdateWithWhereUniqueWithoutCareerProfileInput[]
    updateMany?: CvApplicationUpdateManyWithWhereWithoutCareerProfileInput | CvApplicationUpdateManyWithWhereWithoutCareerProfileInput[]
    deleteMany?: CvApplicationScalarWhereInput | CvApplicationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApplicationsInput
    connect?: UserWhereUniqueInput
  }

  export type CareerProfileCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<CareerProfileCreateWithoutApplicationsInput, CareerProfileUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: CareerProfileCreateOrConnectWithoutApplicationsInput
    connect?: CareerProfileWhereUniqueInput
  }

  export type CvDraftCreateNestedOneWithoutApplicationInput = {
    create?: XOR<CvDraftCreateWithoutApplicationInput, CvDraftUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: CvDraftCreateOrConnectWithoutApplicationInput
    connect?: CvDraftWhereUniqueInput
  }

  export type AgentRunCreateNestedManyWithoutApplicationInput = {
    create?: XOR<AgentRunCreateWithoutApplicationInput, AgentRunUncheckedCreateWithoutApplicationInput> | AgentRunCreateWithoutApplicationInput[] | AgentRunUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutApplicationInput | AgentRunCreateOrConnectWithoutApplicationInput[]
    createMany?: AgentRunCreateManyApplicationInputEnvelope
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
  }

  export type CvDraftUncheckedCreateNestedOneWithoutApplicationInput = {
    create?: XOR<CvDraftCreateWithoutApplicationInput, CvDraftUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: CvDraftCreateOrConnectWithoutApplicationInput
    connect?: CvDraftWhereUniqueInput
  }

  export type AgentRunUncheckedCreateNestedManyWithoutApplicationInput = {
    create?: XOR<AgentRunCreateWithoutApplicationInput, AgentRunUncheckedCreateWithoutApplicationInput> | AgentRunCreateWithoutApplicationInput[] | AgentRunUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutApplicationInput | AgentRunCreateOrConnectWithoutApplicationInput[]
    createMany?: AgentRunCreateManyApplicationInputEnvelope
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutApplicationsInput
    upsert?: UserUpsertWithoutApplicationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApplicationsInput, UserUpdateWithoutApplicationsInput>, UserUncheckedUpdateWithoutApplicationsInput>
  }

  export type CareerProfileUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<CareerProfileCreateWithoutApplicationsInput, CareerProfileUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: CareerProfileCreateOrConnectWithoutApplicationsInput
    upsert?: CareerProfileUpsertWithoutApplicationsInput
    connect?: CareerProfileWhereUniqueInput
    update?: XOR<XOR<CareerProfileUpdateToOneWithWhereWithoutApplicationsInput, CareerProfileUpdateWithoutApplicationsInput>, CareerProfileUncheckedUpdateWithoutApplicationsInput>
  }

  export type CvDraftUpdateOneWithoutApplicationNestedInput = {
    create?: XOR<CvDraftCreateWithoutApplicationInput, CvDraftUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: CvDraftCreateOrConnectWithoutApplicationInput
    upsert?: CvDraftUpsertWithoutApplicationInput
    disconnect?: CvDraftWhereInput | boolean
    delete?: CvDraftWhereInput | boolean
    connect?: CvDraftWhereUniqueInput
    update?: XOR<XOR<CvDraftUpdateToOneWithWhereWithoutApplicationInput, CvDraftUpdateWithoutApplicationInput>, CvDraftUncheckedUpdateWithoutApplicationInput>
  }

  export type AgentRunUpdateManyWithoutApplicationNestedInput = {
    create?: XOR<AgentRunCreateWithoutApplicationInput, AgentRunUncheckedCreateWithoutApplicationInput> | AgentRunCreateWithoutApplicationInput[] | AgentRunUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutApplicationInput | AgentRunCreateOrConnectWithoutApplicationInput[]
    upsert?: AgentRunUpsertWithWhereUniqueWithoutApplicationInput | AgentRunUpsertWithWhereUniqueWithoutApplicationInput[]
    createMany?: AgentRunCreateManyApplicationInputEnvelope
    set?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    disconnect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    delete?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    update?: AgentRunUpdateWithWhereUniqueWithoutApplicationInput | AgentRunUpdateWithWhereUniqueWithoutApplicationInput[]
    updateMany?: AgentRunUpdateManyWithWhereWithoutApplicationInput | AgentRunUpdateManyWithWhereWithoutApplicationInput[]
    deleteMany?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
  }

  export type CvDraftUncheckedUpdateOneWithoutApplicationNestedInput = {
    create?: XOR<CvDraftCreateWithoutApplicationInput, CvDraftUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: CvDraftCreateOrConnectWithoutApplicationInput
    upsert?: CvDraftUpsertWithoutApplicationInput
    disconnect?: CvDraftWhereInput | boolean
    delete?: CvDraftWhereInput | boolean
    connect?: CvDraftWhereUniqueInput
    update?: XOR<XOR<CvDraftUpdateToOneWithWhereWithoutApplicationInput, CvDraftUpdateWithoutApplicationInput>, CvDraftUncheckedUpdateWithoutApplicationInput>
  }

  export type AgentRunUncheckedUpdateManyWithoutApplicationNestedInput = {
    create?: XOR<AgentRunCreateWithoutApplicationInput, AgentRunUncheckedCreateWithoutApplicationInput> | AgentRunCreateWithoutApplicationInput[] | AgentRunUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutApplicationInput | AgentRunCreateOrConnectWithoutApplicationInput[]
    upsert?: AgentRunUpsertWithWhereUniqueWithoutApplicationInput | AgentRunUpsertWithWhereUniqueWithoutApplicationInput[]
    createMany?: AgentRunCreateManyApplicationInputEnvelope
    set?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    disconnect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    delete?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    update?: AgentRunUpdateWithWhereUniqueWithoutApplicationInput | AgentRunUpdateWithWhereUniqueWithoutApplicationInput[]
    updateMany?: AgentRunUpdateManyWithWhereWithoutApplicationInput | AgentRunUpdateManyWithWhereWithoutApplicationInput[]
    deleteMany?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
  }

  export type CvApplicationCreateNestedOneWithoutDraftInput = {
    create?: XOR<CvApplicationCreateWithoutDraftInput, CvApplicationUncheckedCreateWithoutDraftInput>
    connectOrCreate?: CvApplicationCreateOrConnectWithoutDraftInput
    connect?: CvApplicationWhereUniqueInput
  }

  export type BytesFieldUpdateOperationsInput = {
    set?: Bytes
  }

  export type CvApplicationUpdateOneRequiredWithoutDraftNestedInput = {
    create?: XOR<CvApplicationCreateWithoutDraftInput, CvApplicationUncheckedCreateWithoutDraftInput>
    connectOrCreate?: CvApplicationCreateOrConnectWithoutDraftInput
    upsert?: CvApplicationUpsertWithoutDraftInput
    connect?: CvApplicationWhereUniqueInput
    update?: XOR<XOR<CvApplicationUpdateToOneWithWhereWithoutDraftInput, CvApplicationUpdateWithoutDraftInput>, CvApplicationUncheckedUpdateWithoutDraftInput>
  }

  export type UserCreateNestedOneWithoutAgentRunsInput = {
    create?: XOR<UserCreateWithoutAgentRunsInput, UserUncheckedCreateWithoutAgentRunsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgentRunsInput
    connect?: UserWhereUniqueInput
  }

  export type CvApplicationCreateNestedOneWithoutAgentRunsInput = {
    create?: XOR<CvApplicationCreateWithoutAgentRunsInput, CvApplicationUncheckedCreateWithoutAgentRunsInput>
    connectOrCreate?: CvApplicationCreateOrConnectWithoutAgentRunsInput
    connect?: CvApplicationWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutAgentRunsNestedInput = {
    create?: XOR<UserCreateWithoutAgentRunsInput, UserUncheckedCreateWithoutAgentRunsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgentRunsInput
    upsert?: UserUpsertWithoutAgentRunsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAgentRunsInput, UserUpdateWithoutAgentRunsInput>, UserUncheckedUpdateWithoutAgentRunsInput>
  }

  export type CvApplicationUpdateOneWithoutAgentRunsNestedInput = {
    create?: XOR<CvApplicationCreateWithoutAgentRunsInput, CvApplicationUncheckedCreateWithoutAgentRunsInput>
    connectOrCreate?: CvApplicationCreateOrConnectWithoutAgentRunsInput
    upsert?: CvApplicationUpsertWithoutAgentRunsInput
    disconnect?: CvApplicationWhereInput | boolean
    delete?: CvApplicationWhereInput | boolean
    connect?: CvApplicationWhereUniqueInput
    update?: XOR<XOR<CvApplicationUpdateToOneWithWhereWithoutAgentRunsInput, CvApplicationUpdateWithoutAgentRunsInput>, CvApplicationUncheckedUpdateWithoutAgentRunsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBytesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Bytes
  }

  export type NestedBytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Bytes | BytesFieldRefInput<$PrismaModel>
    in?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Bytes[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Bytes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CareerProfileCreateWithoutUserInput = {
    id?: string
    rawCvText: string
    rawCvFileName?: string | null
    profileJson: JsonNullValueInput | InputJsonValue
    seniority: string
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: CvApplicationCreateNestedManyWithoutCareerProfileInput
  }

  export type CareerProfileUncheckedCreateWithoutUserInput = {
    id?: string
    rawCvText: string
    rawCvFileName?: string | null
    profileJson: JsonNullValueInput | InputJsonValue
    seniority: string
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: CvApplicationUncheckedCreateNestedManyWithoutCareerProfileInput
  }

  export type CareerProfileCreateOrConnectWithoutUserInput = {
    where: CareerProfileWhereUniqueInput
    create: XOR<CareerProfileCreateWithoutUserInput, CareerProfileUncheckedCreateWithoutUserInput>
  }

  export type CvApplicationCreateWithoutUserInput = {
    id?: string
    jobText: string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: string | null
    matchScore?: number | null
    status?: string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    careerProfile: CareerProfileCreateNestedOneWithoutApplicationsInput
    draft?: CvDraftCreateNestedOneWithoutApplicationInput
    agentRuns?: AgentRunCreateNestedManyWithoutApplicationInput
  }

  export type CvApplicationUncheckedCreateWithoutUserInput = {
    id?: string
    careerProfileId: string
    jobText: string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: string | null
    matchScore?: number | null
    status?: string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    draft?: CvDraftUncheckedCreateNestedOneWithoutApplicationInput
    agentRuns?: AgentRunUncheckedCreateNestedManyWithoutApplicationInput
  }

  export type CvApplicationCreateOrConnectWithoutUserInput = {
    where: CvApplicationWhereUniqueInput
    create: XOR<CvApplicationCreateWithoutUserInput, CvApplicationUncheckedCreateWithoutUserInput>
  }

  export type CvApplicationCreateManyUserInputEnvelope = {
    data: CvApplicationCreateManyUserInput | CvApplicationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AgentRunCreateWithoutUserInput = {
    id?: string
    step: string
    model: string
    status: string
    inputTokens?: number | null
    cachedInputTokens?: number | null
    outputTokens?: number | null
    costUsd?: Decimal | DecimalJsLike | number | string | null
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    application?: CvApplicationCreateNestedOneWithoutAgentRunsInput
  }

  export type AgentRunUncheckedCreateWithoutUserInput = {
    id?: string
    applicationId?: string | null
    step: string
    model: string
    status: string
    inputTokens?: number | null
    cachedInputTokens?: number | null
    outputTokens?: number | null
    costUsd?: Decimal | DecimalJsLike | number | string | null
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
  }

  export type AgentRunCreateOrConnectWithoutUserInput = {
    where: AgentRunWhereUniqueInput
    create: XOR<AgentRunCreateWithoutUserInput, AgentRunUncheckedCreateWithoutUserInput>
  }

  export type AgentRunCreateManyUserInputEnvelope = {
    data: AgentRunCreateManyUserInput | AgentRunCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type CareerProfileUpsertWithoutUserInput = {
    update: XOR<CareerProfileUpdateWithoutUserInput, CareerProfileUncheckedUpdateWithoutUserInput>
    create: XOR<CareerProfileCreateWithoutUserInput, CareerProfileUncheckedCreateWithoutUserInput>
    where?: CareerProfileWhereInput
  }

  export type CareerProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: CareerProfileWhereInput
    data: XOR<CareerProfileUpdateWithoutUserInput, CareerProfileUncheckedUpdateWithoutUserInput>
  }

  export type CareerProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawCvText?: StringFieldUpdateOperationsInput | string
    rawCvFileName?: NullableStringFieldUpdateOperationsInput | string | null
    profileJson?: JsonNullValueInput | InputJsonValue
    seniority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: CvApplicationUpdateManyWithoutCareerProfileNestedInput
  }

  export type CareerProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawCvText?: StringFieldUpdateOperationsInput | string
    rawCvFileName?: NullableStringFieldUpdateOperationsInput | string | null
    profileJson?: JsonNullValueInput | InputJsonValue
    seniority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: CvApplicationUncheckedUpdateManyWithoutCareerProfileNestedInput
  }

  export type CvApplicationUpsertWithWhereUniqueWithoutUserInput = {
    where: CvApplicationWhereUniqueInput
    update: XOR<CvApplicationUpdateWithoutUserInput, CvApplicationUncheckedUpdateWithoutUserInput>
    create: XOR<CvApplicationCreateWithoutUserInput, CvApplicationUncheckedCreateWithoutUserInput>
  }

  export type CvApplicationUpdateWithWhereUniqueWithoutUserInput = {
    where: CvApplicationWhereUniqueInput
    data: XOR<CvApplicationUpdateWithoutUserInput, CvApplicationUncheckedUpdateWithoutUserInput>
  }

  export type CvApplicationUpdateManyWithWhereWithoutUserInput = {
    where: CvApplicationScalarWhereInput
    data: XOR<CvApplicationUpdateManyMutationInput, CvApplicationUncheckedUpdateManyWithoutUserInput>
  }

  export type CvApplicationScalarWhereInput = {
    AND?: CvApplicationScalarWhereInput | CvApplicationScalarWhereInput[]
    OR?: CvApplicationScalarWhereInput[]
    NOT?: CvApplicationScalarWhereInput | CvApplicationScalarWhereInput[]
    id?: StringFilter<"CvApplication"> | string
    userId?: StringFilter<"CvApplication"> | string
    careerProfileId?: StringFilter<"CvApplication"> | string
    jobText?: StringFilter<"CvApplication"> | string
    jobAnalysisJson?: JsonNullableFilter<"CvApplication">
    matchJson?: JsonNullableFilter<"CvApplication">
    questionsJson?: JsonNullableFilter<"CvApplication">
    answersJson?: JsonNullableFilter<"CvApplication">
    extraNotes?: StringNullableFilter<"CvApplication"> | string | null
    matchScore?: IntNullableFilter<"CvApplication"> | number | null
    status?: StringFilter<"CvApplication"> | string
    warningJson?: JsonNullableFilter<"CvApplication">
    error?: StringNullableFilter<"CvApplication"> | string | null
    createdAt?: DateTimeFilter<"CvApplication"> | Date | string
    updatedAt?: DateTimeFilter<"CvApplication"> | Date | string
  }

  export type AgentRunUpsertWithWhereUniqueWithoutUserInput = {
    where: AgentRunWhereUniqueInput
    update: XOR<AgentRunUpdateWithoutUserInput, AgentRunUncheckedUpdateWithoutUserInput>
    create: XOR<AgentRunCreateWithoutUserInput, AgentRunUncheckedCreateWithoutUserInput>
  }

  export type AgentRunUpdateWithWhereUniqueWithoutUserInput = {
    where: AgentRunWhereUniqueInput
    data: XOR<AgentRunUpdateWithoutUserInput, AgentRunUncheckedUpdateWithoutUserInput>
  }

  export type AgentRunUpdateManyWithWhereWithoutUserInput = {
    where: AgentRunScalarWhereInput
    data: XOR<AgentRunUpdateManyMutationInput, AgentRunUncheckedUpdateManyWithoutUserInput>
  }

  export type AgentRunScalarWhereInput = {
    AND?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
    OR?: AgentRunScalarWhereInput[]
    NOT?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
    id?: StringFilter<"AgentRun"> | string
    userId?: StringFilter<"AgentRun"> | string
    applicationId?: StringNullableFilter<"AgentRun"> | string | null
    step?: StringFilter<"AgentRun"> | string
    model?: StringFilter<"AgentRun"> | string
    status?: StringFilter<"AgentRun"> | string
    inputTokens?: IntNullableFilter<"AgentRun"> | number | null
    cachedInputTokens?: IntNullableFilter<"AgentRun"> | number | null
    outputTokens?: IntNullableFilter<"AgentRun"> | number | null
    costUsd?: DecimalNullableFilter<"AgentRun"> | Decimal | DecimalJsLike | number | string | null
    durationMs?: IntNullableFilter<"AgentRun"> | number | null
    error?: StringNullableFilter<"AgentRun"> | string | null
    createdAt?: DateTimeFilter<"AgentRun"> | Date | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    emailVerified?: boolean
    name?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    careerProfile?: CareerProfileCreateNestedOneWithoutUserInput
    applications?: CvApplicationCreateNestedManyWithoutUserInput
    agentRuns?: AgentRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    emailVerified?: boolean
    name?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    careerProfile?: CareerProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: CvApplicationUncheckedCreateNestedManyWithoutUserInput
    agentRuns?: AgentRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    careerProfile?: CareerProfileUpdateOneWithoutUserNestedInput
    applications?: CvApplicationUpdateManyWithoutUserNestedInput
    agentRuns?: AgentRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    careerProfile?: CareerProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: CvApplicationUncheckedUpdateManyWithoutUserNestedInput
    agentRuns?: AgentRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    email: string
    emailVerified?: boolean
    name?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    careerProfile?: CareerProfileCreateNestedOneWithoutUserInput
    applications?: CvApplicationCreateNestedManyWithoutUserInput
    agentRuns?: AgentRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    email: string
    emailVerified?: boolean
    name?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    careerProfile?: CareerProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: CvApplicationUncheckedCreateNestedManyWithoutUserInput
    agentRuns?: AgentRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    careerProfile?: CareerProfileUpdateOneWithoutUserNestedInput
    applications?: CvApplicationUpdateManyWithoutUserNestedInput
    agentRuns?: AgentRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    careerProfile?: CareerProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: CvApplicationUncheckedUpdateManyWithoutUserNestedInput
    agentRuns?: AgentRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCareerProfileInput = {
    id?: string
    email: string
    emailVerified?: boolean
    name?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    applications?: CvApplicationCreateNestedManyWithoutUserInput
    agentRuns?: AgentRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCareerProfileInput = {
    id?: string
    email: string
    emailVerified?: boolean
    name?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    applications?: CvApplicationUncheckedCreateNestedManyWithoutUserInput
    agentRuns?: AgentRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCareerProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCareerProfileInput, UserUncheckedCreateWithoutCareerProfileInput>
  }

  export type CvApplicationCreateWithoutCareerProfileInput = {
    id?: string
    jobText: string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: string | null
    matchScore?: number | null
    status?: string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutApplicationsInput
    draft?: CvDraftCreateNestedOneWithoutApplicationInput
    agentRuns?: AgentRunCreateNestedManyWithoutApplicationInput
  }

  export type CvApplicationUncheckedCreateWithoutCareerProfileInput = {
    id?: string
    userId: string
    jobText: string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: string | null
    matchScore?: number | null
    status?: string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    draft?: CvDraftUncheckedCreateNestedOneWithoutApplicationInput
    agentRuns?: AgentRunUncheckedCreateNestedManyWithoutApplicationInput
  }

  export type CvApplicationCreateOrConnectWithoutCareerProfileInput = {
    where: CvApplicationWhereUniqueInput
    create: XOR<CvApplicationCreateWithoutCareerProfileInput, CvApplicationUncheckedCreateWithoutCareerProfileInput>
  }

  export type CvApplicationCreateManyCareerProfileInputEnvelope = {
    data: CvApplicationCreateManyCareerProfileInput | CvApplicationCreateManyCareerProfileInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCareerProfileInput = {
    update: XOR<UserUpdateWithoutCareerProfileInput, UserUncheckedUpdateWithoutCareerProfileInput>
    create: XOR<UserCreateWithoutCareerProfileInput, UserUncheckedCreateWithoutCareerProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCareerProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCareerProfileInput, UserUncheckedUpdateWithoutCareerProfileInput>
  }

  export type UserUpdateWithoutCareerProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    applications?: CvApplicationUpdateManyWithoutUserNestedInput
    agentRuns?: AgentRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCareerProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    applications?: CvApplicationUncheckedUpdateManyWithoutUserNestedInput
    agentRuns?: AgentRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CvApplicationUpsertWithWhereUniqueWithoutCareerProfileInput = {
    where: CvApplicationWhereUniqueInput
    update: XOR<CvApplicationUpdateWithoutCareerProfileInput, CvApplicationUncheckedUpdateWithoutCareerProfileInput>
    create: XOR<CvApplicationCreateWithoutCareerProfileInput, CvApplicationUncheckedCreateWithoutCareerProfileInput>
  }

  export type CvApplicationUpdateWithWhereUniqueWithoutCareerProfileInput = {
    where: CvApplicationWhereUniqueInput
    data: XOR<CvApplicationUpdateWithoutCareerProfileInput, CvApplicationUncheckedUpdateWithoutCareerProfileInput>
  }

  export type CvApplicationUpdateManyWithWhereWithoutCareerProfileInput = {
    where: CvApplicationScalarWhereInput
    data: XOR<CvApplicationUpdateManyMutationInput, CvApplicationUncheckedUpdateManyWithoutCareerProfileInput>
  }

  export type UserCreateWithoutApplicationsInput = {
    id?: string
    email: string
    emailVerified?: boolean
    name?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    careerProfile?: CareerProfileCreateNestedOneWithoutUserInput
    agentRuns?: AgentRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApplicationsInput = {
    id?: string
    email: string
    emailVerified?: boolean
    name?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    careerProfile?: CareerProfileUncheckedCreateNestedOneWithoutUserInput
    agentRuns?: AgentRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApplicationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
  }

  export type CareerProfileCreateWithoutApplicationsInput = {
    id?: string
    rawCvText: string
    rawCvFileName?: string | null
    profileJson: JsonNullValueInput | InputJsonValue
    seniority: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCareerProfileInput
  }

  export type CareerProfileUncheckedCreateWithoutApplicationsInput = {
    id?: string
    userId: string
    rawCvText: string
    rawCvFileName?: string | null
    profileJson: JsonNullValueInput | InputJsonValue
    seniority: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CareerProfileCreateOrConnectWithoutApplicationsInput = {
    where: CareerProfileWhereUniqueInput
    create: XOR<CareerProfileCreateWithoutApplicationsInput, CareerProfileUncheckedCreateWithoutApplicationsInput>
  }

  export type CvDraftCreateWithoutApplicationInput = {
    id?: string
    structuredCvJson: JsonNullValueInput | InputJsonValue
    sanitizedCvJson: JsonNullValueInput | InputJsonValue
    html: string
    pdfBytes: Bytes
    renderMetricsJson: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CvDraftUncheckedCreateWithoutApplicationInput = {
    id?: string
    structuredCvJson: JsonNullValueInput | InputJsonValue
    sanitizedCvJson: JsonNullValueInput | InputJsonValue
    html: string
    pdfBytes: Bytes
    renderMetricsJson: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type CvDraftCreateOrConnectWithoutApplicationInput = {
    where: CvDraftWhereUniqueInput
    create: XOR<CvDraftCreateWithoutApplicationInput, CvDraftUncheckedCreateWithoutApplicationInput>
  }

  export type AgentRunCreateWithoutApplicationInput = {
    id?: string
    step: string
    model: string
    status: string
    inputTokens?: number | null
    cachedInputTokens?: number | null
    outputTokens?: number | null
    costUsd?: Decimal | DecimalJsLike | number | string | null
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAgentRunsInput
  }

  export type AgentRunUncheckedCreateWithoutApplicationInput = {
    id?: string
    userId: string
    step: string
    model: string
    status: string
    inputTokens?: number | null
    cachedInputTokens?: number | null
    outputTokens?: number | null
    costUsd?: Decimal | DecimalJsLike | number | string | null
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
  }

  export type AgentRunCreateOrConnectWithoutApplicationInput = {
    where: AgentRunWhereUniqueInput
    create: XOR<AgentRunCreateWithoutApplicationInput, AgentRunUncheckedCreateWithoutApplicationInput>
  }

  export type AgentRunCreateManyApplicationInputEnvelope = {
    data: AgentRunCreateManyApplicationInput | AgentRunCreateManyApplicationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutApplicationsInput = {
    update: XOR<UserUpdateWithoutApplicationsInput, UserUncheckedUpdateWithoutApplicationsInput>
    create: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApplicationsInput, UserUncheckedUpdateWithoutApplicationsInput>
  }

  export type UserUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    careerProfile?: CareerProfileUpdateOneWithoutUserNestedInput
    agentRuns?: AgentRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    careerProfile?: CareerProfileUncheckedUpdateOneWithoutUserNestedInput
    agentRuns?: AgentRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CareerProfileUpsertWithoutApplicationsInput = {
    update: XOR<CareerProfileUpdateWithoutApplicationsInput, CareerProfileUncheckedUpdateWithoutApplicationsInput>
    create: XOR<CareerProfileCreateWithoutApplicationsInput, CareerProfileUncheckedCreateWithoutApplicationsInput>
    where?: CareerProfileWhereInput
  }

  export type CareerProfileUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: CareerProfileWhereInput
    data: XOR<CareerProfileUpdateWithoutApplicationsInput, CareerProfileUncheckedUpdateWithoutApplicationsInput>
  }

  export type CareerProfileUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawCvText?: StringFieldUpdateOperationsInput | string
    rawCvFileName?: NullableStringFieldUpdateOperationsInput | string | null
    profileJson?: JsonNullValueInput | InputJsonValue
    seniority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCareerProfileNestedInput
  }

  export type CareerProfileUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rawCvText?: StringFieldUpdateOperationsInput | string
    rawCvFileName?: NullableStringFieldUpdateOperationsInput | string | null
    profileJson?: JsonNullValueInput | InputJsonValue
    seniority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvDraftUpsertWithoutApplicationInput = {
    update: XOR<CvDraftUpdateWithoutApplicationInput, CvDraftUncheckedUpdateWithoutApplicationInput>
    create: XOR<CvDraftCreateWithoutApplicationInput, CvDraftUncheckedCreateWithoutApplicationInput>
    where?: CvDraftWhereInput
  }

  export type CvDraftUpdateToOneWithWhereWithoutApplicationInput = {
    where?: CvDraftWhereInput
    data: XOR<CvDraftUpdateWithoutApplicationInput, CvDraftUncheckedUpdateWithoutApplicationInput>
  }

  export type CvDraftUpdateWithoutApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    structuredCvJson?: JsonNullValueInput | InputJsonValue
    sanitizedCvJson?: JsonNullValueInput | InputJsonValue
    html?: StringFieldUpdateOperationsInput | string
    pdfBytes?: BytesFieldUpdateOperationsInput | Bytes
    renderMetricsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvDraftUncheckedUpdateWithoutApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    structuredCvJson?: JsonNullValueInput | InputJsonValue
    sanitizedCvJson?: JsonNullValueInput | InputJsonValue
    html?: StringFieldUpdateOperationsInput | string
    pdfBytes?: BytesFieldUpdateOperationsInput | Bytes
    renderMetricsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRunUpsertWithWhereUniqueWithoutApplicationInput = {
    where: AgentRunWhereUniqueInput
    update: XOR<AgentRunUpdateWithoutApplicationInput, AgentRunUncheckedUpdateWithoutApplicationInput>
    create: XOR<AgentRunCreateWithoutApplicationInput, AgentRunUncheckedCreateWithoutApplicationInput>
  }

  export type AgentRunUpdateWithWhereUniqueWithoutApplicationInput = {
    where: AgentRunWhereUniqueInput
    data: XOR<AgentRunUpdateWithoutApplicationInput, AgentRunUncheckedUpdateWithoutApplicationInput>
  }

  export type AgentRunUpdateManyWithWhereWithoutApplicationInput = {
    where: AgentRunScalarWhereInput
    data: XOR<AgentRunUpdateManyMutationInput, AgentRunUncheckedUpdateManyWithoutApplicationInput>
  }

  export type CvApplicationCreateWithoutDraftInput = {
    id?: string
    jobText: string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: string | null
    matchScore?: number | null
    status?: string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutApplicationsInput
    careerProfile: CareerProfileCreateNestedOneWithoutApplicationsInput
    agentRuns?: AgentRunCreateNestedManyWithoutApplicationInput
  }

  export type CvApplicationUncheckedCreateWithoutDraftInput = {
    id?: string
    userId: string
    careerProfileId: string
    jobText: string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: string | null
    matchScore?: number | null
    status?: string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agentRuns?: AgentRunUncheckedCreateNestedManyWithoutApplicationInput
  }

  export type CvApplicationCreateOrConnectWithoutDraftInput = {
    where: CvApplicationWhereUniqueInput
    create: XOR<CvApplicationCreateWithoutDraftInput, CvApplicationUncheckedCreateWithoutDraftInput>
  }

  export type CvApplicationUpsertWithoutDraftInput = {
    update: XOR<CvApplicationUpdateWithoutDraftInput, CvApplicationUncheckedUpdateWithoutDraftInput>
    create: XOR<CvApplicationCreateWithoutDraftInput, CvApplicationUncheckedCreateWithoutDraftInput>
    where?: CvApplicationWhereInput
  }

  export type CvApplicationUpdateToOneWithWhereWithoutDraftInput = {
    where?: CvApplicationWhereInput
    data: XOR<CvApplicationUpdateWithoutDraftInput, CvApplicationUncheckedUpdateWithoutDraftInput>
  }

  export type CvApplicationUpdateWithoutDraftInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutApplicationsNestedInput
    careerProfile?: CareerProfileUpdateOneRequiredWithoutApplicationsNestedInput
    agentRuns?: AgentRunUpdateManyWithoutApplicationNestedInput
  }

  export type CvApplicationUncheckedUpdateWithoutDraftInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    careerProfileId?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agentRuns?: AgentRunUncheckedUpdateManyWithoutApplicationNestedInput
  }

  export type UserCreateWithoutAgentRunsInput = {
    id?: string
    email: string
    emailVerified?: boolean
    name?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    careerProfile?: CareerProfileCreateNestedOneWithoutUserInput
    applications?: CvApplicationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAgentRunsInput = {
    id?: string
    email: string
    emailVerified?: boolean
    name?: string
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    careerProfile?: CareerProfileUncheckedCreateNestedOneWithoutUserInput
    applications?: CvApplicationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAgentRunsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAgentRunsInput, UserUncheckedCreateWithoutAgentRunsInput>
  }

  export type CvApplicationCreateWithoutAgentRunsInput = {
    id?: string
    jobText: string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: string | null
    matchScore?: number | null
    status?: string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutApplicationsInput
    careerProfile: CareerProfileCreateNestedOneWithoutApplicationsInput
    draft?: CvDraftCreateNestedOneWithoutApplicationInput
  }

  export type CvApplicationUncheckedCreateWithoutAgentRunsInput = {
    id?: string
    userId: string
    careerProfileId: string
    jobText: string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: string | null
    matchScore?: number | null
    status?: string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    draft?: CvDraftUncheckedCreateNestedOneWithoutApplicationInput
  }

  export type CvApplicationCreateOrConnectWithoutAgentRunsInput = {
    where: CvApplicationWhereUniqueInput
    create: XOR<CvApplicationCreateWithoutAgentRunsInput, CvApplicationUncheckedCreateWithoutAgentRunsInput>
  }

  export type UserUpsertWithoutAgentRunsInput = {
    update: XOR<UserUpdateWithoutAgentRunsInput, UserUncheckedUpdateWithoutAgentRunsInput>
    create: XOR<UserCreateWithoutAgentRunsInput, UserUncheckedCreateWithoutAgentRunsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAgentRunsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAgentRunsInput, UserUncheckedUpdateWithoutAgentRunsInput>
  }

  export type UserUpdateWithoutAgentRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    careerProfile?: CareerProfileUpdateOneWithoutUserNestedInput
    applications?: CvApplicationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAgentRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    careerProfile?: CareerProfileUncheckedUpdateOneWithoutUserNestedInput
    applications?: CvApplicationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CvApplicationUpsertWithoutAgentRunsInput = {
    update: XOR<CvApplicationUpdateWithoutAgentRunsInput, CvApplicationUncheckedUpdateWithoutAgentRunsInput>
    create: XOR<CvApplicationCreateWithoutAgentRunsInput, CvApplicationUncheckedCreateWithoutAgentRunsInput>
    where?: CvApplicationWhereInput
  }

  export type CvApplicationUpdateToOneWithWhereWithoutAgentRunsInput = {
    where?: CvApplicationWhereInput
    data: XOR<CvApplicationUpdateWithoutAgentRunsInput, CvApplicationUncheckedUpdateWithoutAgentRunsInput>
  }

  export type CvApplicationUpdateWithoutAgentRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutApplicationsNestedInput
    careerProfile?: CareerProfileUpdateOneRequiredWithoutApplicationsNestedInput
    draft?: CvDraftUpdateOneWithoutApplicationNestedInput
  }

  export type CvApplicationUncheckedUpdateWithoutAgentRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    careerProfileId?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: CvDraftUncheckedUpdateOneWithoutApplicationNestedInput
  }

  export type SessionCreateManyUserInput = {
    id?: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AccountCreateManyUserInput = {
    id?: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvApplicationCreateManyUserInput = {
    id?: string
    careerProfileId: string
    jobText: string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: string | null
    matchScore?: number | null
    status?: string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentRunCreateManyUserInput = {
    id?: string
    applicationId?: string | null
    step: string
    model: string
    status: string
    inputTokens?: number | null
    cachedInputTokens?: number | null
    outputTokens?: number | null
    costUsd?: Decimal | DecimalJsLike | number | string | null
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvApplicationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    careerProfile?: CareerProfileUpdateOneRequiredWithoutApplicationsNestedInput
    draft?: CvDraftUpdateOneWithoutApplicationNestedInput
    agentRuns?: AgentRunUpdateManyWithoutApplicationNestedInput
  }

  export type CvApplicationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    careerProfileId?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: CvDraftUncheckedUpdateOneWithoutApplicationNestedInput
    agentRuns?: AgentRunUncheckedUpdateManyWithoutApplicationNestedInput
  }

  export type CvApplicationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    careerProfileId?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRunUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    step?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: CvApplicationUpdateOneWithoutAgentRunsNestedInput
  }

  export type AgentRunUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: NullableStringFieldUpdateOperationsInput | string | null
    step?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRunUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: NullableStringFieldUpdateOperationsInput | string | null
    step?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CvApplicationCreateManyCareerProfileInput = {
    id?: string
    userId: string
    jobText: string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: string | null
    matchScore?: number | null
    status?: string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CvApplicationUpdateWithoutCareerProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutApplicationsNestedInput
    draft?: CvDraftUpdateOneWithoutApplicationNestedInput
    agentRuns?: AgentRunUpdateManyWithoutApplicationNestedInput
  }

  export type CvApplicationUncheckedUpdateWithoutCareerProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    draft?: CvDraftUncheckedUpdateOneWithoutApplicationNestedInput
    agentRuns?: AgentRunUncheckedUpdateManyWithoutApplicationNestedInput
  }

  export type CvApplicationUncheckedUpdateManyWithoutCareerProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jobText?: StringFieldUpdateOperationsInput | string
    jobAnalysisJson?: NullableJsonNullValueInput | InputJsonValue
    matchJson?: NullableJsonNullValueInput | InputJsonValue
    questionsJson?: NullableJsonNullValueInput | InputJsonValue
    answersJson?: NullableJsonNullValueInput | InputJsonValue
    extraNotes?: NullableStringFieldUpdateOperationsInput | string | null
    matchScore?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    warningJson?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRunCreateManyApplicationInput = {
    id?: string
    userId: string
    step: string
    model: string
    status: string
    inputTokens?: number | null
    cachedInputTokens?: number | null
    outputTokens?: number | null
    costUsd?: Decimal | DecimalJsLike | number | string | null
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
  }

  export type AgentRunUpdateWithoutApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    step?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAgentRunsNestedInput
  }

  export type AgentRunUncheckedUpdateWithoutApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    step?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRunUncheckedUpdateManyWithoutApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    step?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    inputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    cachedInputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    outputTokens?: NullableIntFieldUpdateOperationsInput | number | null
    costUsd?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}