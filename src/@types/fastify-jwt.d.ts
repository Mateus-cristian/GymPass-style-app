// fastify-jwt.d.ts
import '@fastify/jwt'

export declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      role: 'ADMIN' | 'MEMBER'
    } // user type is return type of `request.user` object
  }
}
