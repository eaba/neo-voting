import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import ReactECharts from 'echarts-for-react'
import {RootStore} from '~src/store/RootStore'
import {Await, AwaitActivity} from '~src/app/await'
import {EChartOptions} from '~src/app/EChartOptions'
import {VotesStats} from '~src/models/VotesStats'

function CardVotesStats(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const {app} = useSelector(RootStore.app.getters)

  const [model, setModel] = useState<VotesStats>()
  const [options, setOptions] = useState<EChartOptions>(new EChartOptions())

  async function populate() {
    const model = new VotesStats()

    try {
      await model.populate()
    } catch {
      return
    }

    setModel(model)
    populateChart(model)
  }

  function populateChart(model: VotesStats) {
    const options = new EChartOptions(app.isDark)
    options.xAxis.data = model.blockIndex ?? []
    options.tooltip.formatter =
      'Block Index: <b>{b0}</b><br/>Vote Count: <b>{c0}</b><br /><span style="color: orangered">Threshold: <b>{c1}</b></span>'
    options.series = [
      {
        name: 'Block Index',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {},
        areaStyle: {
          opacity: 0.7,
        },
        data: model.voteCount ?? [],
      },
      {
        name: 'Threshold',
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: 'orangered',
        },
        areaStyle: {
          opacity: 0,
        },
        data: model.blockIndex.map(() => model.threshold) ?? [],
      },
    ]

    setOptions(options)
  }

  useEffect(() => {
    Await.run('populateCardVotesStats', populate)
  }, [])

  useEffect(() => {
    if (model) {
      populateChart(model)
    }
  }, [app.isDark])

  return (
    <div {...props}>
      <div className={'card'}>
        <div className={'mb-2 title'}>Total Votes</div>

        {model && (
          <AwaitActivity name={'populateCardVotesStats'}>
            <ReactECharts
              option={options}
              theme={app.isDark ? 'dark' : undefined}
              notMerge={true}
              lazyUpdate={true}
            />
          </AwaitActivity>
        )}
      </div>
    </div>
  )
}

export default CardVotesStats
