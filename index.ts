import fastify, { FastifyInstance } from "fastify"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"

const server = fastify()

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Fastify sandbox",
      description: "Sandbox API",
      version: "0.1.0",
    },
  },
})

server.register(fastifySwaggerUi, {
  uiConfig: {
    tryItOutEnabled: true,
  },
})

const routes = async (server: FastifyInstance) => {
  server.get(
    "/",
    {
      schema: {
        operationId: "root",
        response: {
          default: {
            description: "Root response",
            type: "object",
            properties: {
              message: {
                type: "string",
              },
            },
          },
        },
      },
    },
    async (_request, reply) => {
      reply
        .code(200)
        .send({ message: "hello world" })
    }
  )
}
server.register(routes)

server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
