import {Env} from './Env'

export class EChartOptions {
  constructor(public isDark: boolean = false) {}

  backgroundColor = 'rgba(0, 0, 0, 0)'

  xAxis: any = {
    type: 'category',
    axisLine: {show: false},
    boundaryGap: false,
  }

  yAxis: any = {
    type: 'value',
    axisLine: {show: false},
    splitLine: {lineStyle: {opacity: 0.5}},
    boundaryGap: false,
    minInterval: 1,
    offset: 0,
  }

  grid: any = {
    top: 40,
    bottom: 60,
    left: 70,
    right: '5%',
  }

  tooltip: any = {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
    },
  }

  series: any = []

  color: any = {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: Env.PALETTE_PRIMARY, // color at 0% position
      },
      {
        offset: 1,
        color: this.isDark ? Env.PALETTE_LIGHTER : Env.PALETTE_DARKER, // color at 100% position
      },
    ],
    global: false, // false by default
  }
}
