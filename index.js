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

let reconnecting = false
let antiAfkLoop = null

function startBot() {

  const bot = mineflayer.createBot({
    host: 'SilkRoad12.aternos.me',
    username: 'dhiyaa',
    version: '1.21.6'
  })

  bot.on('login', () => {

    console.log('✅ Bot joined the server')

  })

  bot.on('spawn', () => {

    console.log('🚀 Bot spawned into the world')

    reconnecting = false

    // حذف أي لوب قديم
    if (antiAfkLoop) {
      clearInterval(antiAfkLoop)
    }

    antiAfkLoop = setInterval(() => {

      if (!bot.entity) return

      const actions = ['forward', 'back', 'left', 'right']

      const randomAction =
        actions[Math.floor(Math.random() * actions.length)]

      // وقف كل الحركات القديمة
      actions.forEach(action => {
        bot.setControlState(action, false)
      })

      // حركة عشوائية
      bot.setControlState(randomAction, true)

      // نط
      bot.setControlState('jump', true)

      // لف الكاميرا
      const yaw = Math.random() * Math.PI * 2
      const pitch = (Math.random() - 0.5) * 0.5

      bot.look(yaw, pitch, true)

      console.log(`🎮 Moving: ${randomAction}`)

      // وقف الحركة بعد ثانيتين
      setTimeout(() => {

        bot.setControlState(randomAction, false)
        bot.setControlState('jump', false)

      }, 2000)

    }, 20000)

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

    if (antiAfkLoop) {
      clearInterval(antiAfkLoop)
      antiAfkLoop = null
    }

    if (reconnecting) return

    reconnecting = true

    console.log('🔄 Disconnected, reconnecting in 30 seconds...')

    setTimeout(() => {

      reconnecting = false
      startBot()

    }, 30000)

  })

  bot.on('error', (err) => {

    console.log('⚠️ Error:')
    console.log(err.message)

  })

}

startBot()