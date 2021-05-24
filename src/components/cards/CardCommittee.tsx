import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import ReactECharts from 'echarts-for-react'
import {RootStore} from '~src/store/RootStore'
import {Await, AwaitActivity} from '~src/app/await'
import {EChartOptions} from '~src/app/EChartOptions'
import {Candidate, CommitteeResponse} from '~src/models/Candidate'
import {Env} from '~src/app/Env'
import {Modal} from '~src/app/modal'

function CardCommittee(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const {app} = useSelector(RootStore.app.getters)

  const [model, setModel] = useState<CommitteeResponse>()
  const [options, setOptions] = useState<EChartOptions>(new EChartOptions())

  async function populate() {
    let model: CommitteeResponse

    try {
      model = await Candidate.getCommittees()
    } catch {
      return
    }

    setModel(model)
    populateChart(model)
  }

  function chartEvent(e: any) {
    Modal.open('candidate', e.name)
  }

  function populateChart(model: CommitteeResponse) {
    const options = new EChartOptions(app.isDark)

    options.color = [
      '#5470c6',
      '#91cc75',
      '#fac858',
      '#ee6666',
      '#73c0de',
      '#3ba272',
      '#fc8452',
      '#9a60b4',
      '#ea7ccc',
    ]

    options.tooltip = {
      formatter: 'Public Key: <b>{b0}</b><br/>Votes: <b>{c0}</b>',
      trigger: 'item',
    }

    options.series = [
      {
        name: 'Committee',
        type: 'pie',
        label: {
          formatter: '{per|{d}%}',
          color: app.isDark ? Env.PALETTE_WHITE : Env.PALETTE_BLACK,
          rich: {
            per: {
              color: app.isDark ? Env.PALETTE_DARKEST : Env.PALETTE_WHITE,
              backgroundColor: app.isDark
                ? Env.PALETTE_PRIMARY
                : Env.PALETTE_DARKER,
              padding: [3, 4],
              borderRadius: 4,
            },
          },
        },
        data:
          model.committee.map((it) => {
            const name = Object.keys(it)[0] ?? ''
            const value = it[name]
            return {name, value}
          }) ?? [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ]

    setOptions(options)
  }

  useEffect(() => {
    Await.run('populateCardCommittee', populate)
  }, [])

  useEffect(() => {
    if (model) {
      populateChart(model)
    }
  }, [app.isDark])

  return (
    <div {...props}>
      <div className={'card'}>
        <div className={'mb-2 title'}>Committee Overview</div>

        {model && (
          <AwaitActivity name={'populateCardCommittee'}>
            <ReactECharts
              option={options}
              theme={app.isDark ? 'dark' : undefined}
              notMerge={true}
              lazyUpdate={true}
              onEvents={{
                click: chartEvent,
              }}
            />
          </AwaitActivity>
        )}
      </div>
    </div>
  )
}

export default CardCommittee
