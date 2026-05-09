console.clear()

process.title = "Sleepyy AFK Bot"

console.log(`
███████╗██╗░░░░░███████╗███████╗██████╗░██╗░░░██╗
██╔════╝██║░░░░░██╔════╝██╔════╝██╔══██╗╚██╗░██╔╝
██████╗░██║░░░░░█████╗░░█████╗░░██████╔╝░╚████╔╝░
╚════██╗██║░░░░░██╔══╝░░██╔══╝░░██╔═══╝░░░╚██╔╝░░
██████╔╝███████╗███████╗███████╗██║░░░░░░░░██║░░░
╚═════╝░╚══════╝╚══════╝╚══════╝╚═╝░░░░░░░░╚═╝░░░

        Sleepyy AFK Bot
        Made By Sleepyy

`)


const mineflayer = require('mineflayer')

function startBot() {

  const bot = mineflayer.createBot({
    host: 'SilkRoad12.aternos.me',
    port: 33282,
    username: 'AFK_Server',
       version: '1.21.6'
  })

  bot.on('login', () => {
    console.log('✅ Bot joined the server')
  })

  bot.on('spawn', () => {
    console.log('🚀 Bot spawned into the world')

    // Send a chat message
    bot.chat('AFK Bot Connected')

    // Simple anti-afk movement every 10 seconds
    setInterval(() => {

      if (!bot.entity) return

      // Jump
      bot.setControlState('jump', true)

      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 500)

      // Random look direction
      const yaw = Math.random() * Math.PI * 2
      bot.look(yaw, 0, true)

    }, 10000)
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return

    console.log(`[${username}] ${message}`)
  })

  bot.on('kicked', (reason) => {
    console.log('❌ Bot was kicked:')
    console.log(reason)
  })

  bot.on('end', () => {
    console.log('🔄 Disconnected, reconnecting in 30 seconds...')

    setTimeout(() => {
      startBot()
    }, 30000)
  })

  bot.on('error', (err) => {
    console.log('⚠️ Error:')
    console.log(err.message)
  })
}

startBot()