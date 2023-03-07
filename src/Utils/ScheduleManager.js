import MsgModel from '../Model/MsgModel.js'
import BotManager from './BotManager.js'

const createScheduleTimer = async () => {
  setInterval(() => {
    checkMsgs()
  }, 1 * 1000)
  checkMsgs()
}

const checkMsgs = async () => {
  const today = new Date()
  const msgs = await MsgModel.getAllMsg({
    $and: [
      { 'schedule.initial_date': { $lte: today } },
      { 'schedule.final_date': { $gte: today } },
      {
        'schedule.send_hour': new Date().getHours()
      },
      {
        'schedule.send_minute': new Date().getMinutes()
      }
    ]
  })
  const sendLogs = []
  for (const msg of msgs) {
    const log = await setSenderTimers(msg)
    sendLogs.push(log)
  }
}

const setSenderTimers = (msg) => {
  return BotManager.sendMsg(msg)
}

export default {
  createScheduleTimer,
  checkMsgs,
  setSenderTimers
}
