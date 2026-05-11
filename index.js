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
    username: 'AFFK_Server',
    version: '1.21.6'
  })

  let antiAfkLoop

  bot.on('login', () => {
    console.log('✅ Bot joined the server')
  })

  bot.on('spawn', () => {

    console.log('🚀 Bot spawned into the world')

    bot.chat('AFK Bot Connected')

    if (antiAfkLoop) clearInterval(antiAfkLoop)

    antiAfkLoop = setInterval(() => {

      if (!bot.entity) return

      const actions = ['forward', 'back', 'left', 'right']

      const randomAction =
        actions[Math.floor(Math.random() * actions.length)]

      // وقف كل الحركات
      actions.forEach(action => {
        bot.setControlState(action, false)
      })

      // حركة عشوائية
      bot.setControlState(randomAction, true)

      // سبرنت
      bot.setControlState('sprint', true)

      // نط
      bot.setControlState('jump', true)

      // لف الكاميرا
      const yaw = Math.random() * Math.PI * 2
      const pitch = (Math.random() - 0.5) * 0.5

      bot.look(yaw, pitch, true)

      // رسالة بالشات كل فترة
      if (Math.random() > 0.7) {
        bot.chat('/list')
      }

      console.log(`🎮 Moving: ${randomAction}`)

      // وقف الحركة بعد 3 ثواني
      setTimeout(() => {

        bot.setControlState(randomAction, false)
        bot.setControlState('jump', false)
        bot.setControlState('sprint', false)

      }, 3000)

    }, 7000)

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

    console.log('🔄 Disconnected, reconnecting in 5 seconds...')

    setTimeout(() => {
      startBot()
    }, 5000)

  })

  bot.on('error', (err) => {

    console.log('⚠️ Error:')
    console.log(err.message)

  })

}

startBot()