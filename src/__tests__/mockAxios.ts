/* eslint-env jest */
import fs from 'fs-extra-promise'
import { resolve } from 'path'
import axios from 'axios'

export default async function mockAxios(options: any) {
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
    if (process.env['DEBUG_MOCKS']) console.log(error)
  }
  if (!content) {
    const response = await axios(options)
    const contentType: string = response.headers['content-type']

    content = {
      data: response.data,
      status: response.status,
      headers: response.headers || { ['content-type']: contentType },
    }
    await fs.writeFileAsync(path, JSON.stringify(content, null, 2))
  }

  return content
}

jest.mock('../axios', () => mockAxios)
