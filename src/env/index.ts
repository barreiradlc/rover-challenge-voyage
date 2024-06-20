import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production']).default('dev'),
  PORT: z.coerce.number()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid vars', _env.error.format())

  throw new Error('Invalid vars')
}

const env = _env.data

export { env }
