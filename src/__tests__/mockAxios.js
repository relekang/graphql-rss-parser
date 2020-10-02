/* eslint-env jest */
const fs = require('fs-extra-promise')
const { resolve } = require('path')
const axios = require('axios')

async function mockAxios(options) {
  const path = resolve(
    __dirname,
    '../../__fixtures__',
    (options.url || '').replace(/https?:\/\//, '').replace(/\//g, '_') + '.json'
  )
  let content
  try {
    content = JSON.parse((await fs.readFileAsync(path)).toString())
  } catch (error) {
    // eslint-disable-next-line no-console
    if (process.env.DEBUG_MOCKS) console.log(error)
  }
  if (!content) {
    const response = await axios(options)

    content = {
      data: response.data,
      status: response.status,
      headers: response.headers || { ['content-type']: response['contentType'] },
    }
    await fs.writeFileAsync(path, JSON.stringify(content, null, 2))
  }

  return content
}

jest.mock('../axios', () => mockAxios)

module.exports = mockAxios
