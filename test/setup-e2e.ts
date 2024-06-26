import { prisma } from "@/lib/prisma";
import { execSync } from "child_process";
import { randomUUID } from "crypto";
import { env } from "../src/env/index";

function generateUniqueDatabaseURL(schemaId: string) { 
  const { DATABASE_URL } = env
  
  if (!DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL into your env file");    
  }

  const url = new URL(DATABASE_URL)

  url.searchParams.set("schema", schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(() => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)
  process.env.DATABASE_URL = databaseURL

  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})