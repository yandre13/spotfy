import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const algorithm = 'aes-256-cbc'
const key = 'b2d9cd98f95b1a299a6f816d515fff42'
const iv = 'b2d9cd98f95b1a29'

// const algorithm = 'aes-256-cbc'
// const key = randomBytes(32)
// const iv = randomBytes(16)

export function encrypt(text: string): string {
  const cipher = createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

export function decrypt(encrypted: string): string {
  const decipher = createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
