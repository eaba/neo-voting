import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import ReactECharts from 'echarts-for-react'
import {RootStore} from '~src/store/RootStore'
import {Await, AwaitActivity} from '~src/app/await'
import TableRegisteredCandidateStats from '~src/components/tables/TableRegisteredCandidateStats'
import {RegisteredCandidateStats} from '~src/models/RegisteredCandidateStats'
import {EChartOptions} from '~src/app/EChartOptions'

function CardRegisteredCandidateStats(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const {app} = useSelector(RootStore.app.getters)

  const [model, setModel] = useState<RegisteredCandidateStats>()
  const [options, setOptions] = useState<EChartOptions>(new EChartOptions())

  async function populate() {
    const model = new RegisteredCandidateStats()

    try {
      await model.populate()
    } catch {
      return
    }

    setModel(model)
    populateChart(model)
  }

  function populateChart(model: RegisteredCandidateStats) {
    const options = new EChartOptions(app.isDark)
    options.xAxis.data = model.blockIndex ?? []
    options.tooltip.formatter =
      'Block Index: <b>{b0}</b><br/>Count: <b>{c0}</b>'
    options.series = {
      name: 'Block Index',
      type: 'line',
      smooth: true,
      showSymbol: false,
      lineStyle: {},
      areaStyle: {
        opacity: 0.7,
      },
      data: model.candidateCount ?? [],
    }

    setOptions(options)
  }

  useEffect(() => {
    Await.run('populateCardRegisteredCandidateStats', populate)
  }, [])

  useEffect(() => {
    if (model) {
      populateChart(model)
    }
  }, [app.isDark])

  return (
    <div {...props}>
      <div className={'card card--square'}>
        <div className={'mb-2 title'}>Registered Candidates</div>

        {model && (
          <AwaitActivity name={'populateCardRegisteredCandidateStats'}>
            <ReactECharts
              option={options}
              theme={app.isDark ? 'dark' : undefined}
              notMerge={true}
              lazyUpdate={true}
            />

            <div className={'-mx-2 md:-mx-4 mb-4'}>
              <TableRegisteredCandidateStats model={model} />
            </div>
          </AwaitActivity>
        )}
      </div>
    </div>
  )
}

export default CardRegisteredCandidateStats
