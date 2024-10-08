/**
 * Test if session storage is supported for the browser.
 * @returns {boolean}
 */

import { Message } from "ai"
import { AxiosResponse } from "axios"

const API_KEY_LOCAL_STORAGE_KEY = "skyfire_local_api_key"
export const isLocalStorageSupported = () => {
  try {
    const key = "__storage__test"
    if (window) {
      window["localStorage"].setItem(key, "")
      window["localStorage"].removeItem(key)
      return true
    } else {
      return false
    }
  } catch {
    return false
  }
}

export function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

export const getApiKeyFromLocalStorage = () => {
  if (!isLocalStorageSupported()) {
    return null
  }
  return localStorage.getItem(API_KEY_LOCAL_STORAGE_KEY)
}

export const removeApiKeyFromLocalStorage = () => {
  if (!isLocalStorageSupported()) {
    return
  }
  localStorage.removeItem(API_KEY_LOCAL_STORAGE_KEY)
}

export const setApiKeyToLocalStorage = (apiKey: string): boolean => {
  if (!isLocalStorageSupported()) {
    return false
  }
  if (apiKey === undefined || !isValidUUID(apiKey)) {
    removeApiKeyFromLocalStorage()
    return false
  }

  localStorage.setItem(API_KEY_LOCAL_STORAGE_KEY, apiKey)
  return true
}

export function usdAmount(usdc: number | string) {
  if (usdc === undefined || usdc === null) {
    return "0.00 USD"
  }
  if (typeof usdc === "string") {
    usdc = usdc.split(" ")[0]
  }
  // Converts USDC to USD by dividing by 1,000,000
  const usdAmount = Number(usdc) / 1000000
  return "$" + usdAmount.toFixed(7) + " USD"
}

export function formatReponseToChatSystemData(
  response: AxiosResponse,
  existingMessages: Message[]
): Message[] {
  const messageId = `claim-${response.config.url}`

  // Check if the message already exists
  const messageExists = existingMessages.some((msg) => msg.id === messageId)
  if (messageExists) {
    return [] // Return an empty array if the message already exists
  }

  const originalMessageObj: Message = {
    id: messageId,
    role: "system",
    content: `${
      response.config.metadata?.title || `Response from ${response.config.url}`
    } attached.`,
  }

  const chunkedMessages: Message[] = [
    {
      id: `${messageId}-chunk-0`,
      role: "system",
      content: `<Chunk>This is the JSON data from the API "${
        response.config.metadata?.title || ""
      }" response ${
        response.config.url
      }. Please answer my questions based on this data [Data]"${JSON.stringify(
        response.data
      )}[/Data]. When you answer the questions, don't use JSON format directly`,
    } as Message,
  ]

  return [originalMessageObj, ...chunkedMessages]
}

export function concatenateMessages(messageGroups: Message[][]): Message[] {
  return messageGroups.reduce((acc, group) => acc.concat(group), [])
}
