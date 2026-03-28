import { spawn } from 'node:child_process'
import { createServer } from 'node:net'

function parsePort(input, fallback) {
  const value = Number.parseInt(input ?? '', 10)
  if (Number.isNaN(value) || value <= 0 || value > 65535) {
    return fallback
  }
  return value
}

function isPortFree(port, host) {
  return new Promise((resolve, reject) => {
    const server = createServer()
    server.once('error', (error) => {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'EADDRINUSE') {
        resolve(false)
        return
      }
      reject(error)
    })
    server.once('listening', () => {
      server.close((closeError) => {
        if (closeError) {
          reject(closeError)
          return
        }
        resolve(true)
      })
    })
    server.listen(port, host)
  })
}

async function findFreePort(startPort, host, maxTries = 20) {
  for (let offset = 0; offset <= maxTries; offset += 1) {
    const candidate = startPort + offset
    const free = await isPortFree(candidate, host)
    if (free) {
      return candidate
    }
  }
  throw new Error(`No free port found in range ${startPort}-${startPort + maxTries}`)
}

async function main() {
  const host = process.env.HOST ?? process.env.NITRO_HOST ?? '::'
  const preferredPort = parsePort(process.env.PORT ?? process.env.NITRO_PORT, 3000)
  const port = await findFreePort(preferredPort, host)

  if (port !== preferredPort) {
    process.stdout.write(`Port ${preferredPort} is busy, starting on ${port}\n`)
  }

  const child = spawn('node', ['.output/server/index.mjs'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: String(port),
      NITRO_PORT: String(port),
      HOST: host,
      NITRO_HOST: host,
    },
  })

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal)
      return
    }
    process.exit(code ?? 0)
  })
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
  process.exit(1)
})
