import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Prisma 연결 테스트 (개발 환경에서만)
if (process.env.NODE_ENV === 'development') {
  prisma.$connect().catch((error) => {
    console.error('Prisma 연결 오류:', error)
  })
}

