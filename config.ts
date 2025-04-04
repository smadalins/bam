import * as dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()

const envSchema = Joi.object({
    BASE_URL: Joi.string().uri().required(),
    API_URL: Joi.string().uri().required(),
}).unknown(true)

const envVars = envSchema.validate(process.env, { allowUnknown: true, abortEarly: false })

if (envVars.error) {
    throw new Error(`Environment variables validation error: ${envVars.error.message}`)
}

export class Config {
    static readonly BASE_URL = envVars.value.BASE_URL
    static readonly API_URL = envVars.value.API_URL
}
