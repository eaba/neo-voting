import React, {useState} from 'react'
import {AxiosResponse} from 'axios'
import {Request} from '@simpli/serialized-request'
import {Await, AwaitActivity} from '~src/app/await'
import type {HelloResponse} from '~src/pages/api/hello'

function CardHelloWorld() {
  const [value, setValue] = useState<string>()
  const [height, setHeight] = useState<number>()

  async function test() {
    try {
      const promises: Promise<AxiosResponse>[] = [
        Request.post('/api/hello')
          .name('hello')
          .as<HelloResponse>()
          .delay(5000)
          .fetchResponse(),
        Request.get('/api/height')
          .name('height')
          .asNumber()
          .delay(3000)
          .fetchResponse(),
      ]

      const response = await Await.run('populate', () => Promise.all(promises))

      setValue(response[0].data.value)
      setHeight(response[1].data)
    } catch {}
  }

  return (
    <div className={'card'}>
      <div className={'mb-2 text-xl font-bold'}>Test hello world contract</div>

      <AwaitActivity
        name={'populate'}
        className={'flex flex-col justify-center'}
      >
        <>
          <button className={'btn'} onClick={test}>
            Click to test
          </button>

          {value && height && (
            <div className={'mt-4 flex'}>
              <div className={'mr-2 flex-1 text-sm'}>
                Value: <b>{value}</b>
              </div>
              <div className={'flex-1 text-sm'}>
                Height: <b>{height}</b>
              </div>
            </div>
          )}
        </>
      </AwaitActivity>
    </div>
  )
}

export default CardHelloWorld
