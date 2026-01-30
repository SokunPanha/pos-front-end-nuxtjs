import { posSettings } from '~~/server/data/orders'

export default defineEventHandler(() => {
  return {
    success: true,
    settings: posSettings
  }
})
