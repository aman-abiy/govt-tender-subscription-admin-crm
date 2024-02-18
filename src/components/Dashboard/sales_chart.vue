<template>
    <div class="card chart-card">
        <div class="card-body">
            <h5 class="title">Daily Sales <span class="count"></span></h5>
            <hr>
            <div id="chart">
                <apexchart height="300" width="750" type="bar" :options="chartOptions" :series="series"></apexchart>
            </div>
        </div>
    </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import { GET_SALES_LAST_10_DAYS } from '../../store/action_types'

export default {
    components: {
        apexchart: VueApexCharts
    },
    data() {
        return  {
            series: [
            {
              name: 'Actual',
              data: []
            }
          ],
          chartOptions: {
            chart: {
              height: 350,
              type: 'bar'
            },
            plotOptions: {
              bar: {
                horizontal: true,
              }
            },
            colors: ['#00E396'],
            dataLabels: {
              formatter: function(val, opt) {
                const goals =
                  opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                    .goals
            
                if (goals && goals.length) {
                  return `${val} / ${goals[0].value}`
                }
                return val
              }
            },
            legend: {
              show: true,
              showForSingleSeries: true,
              customLegendItems: ['Actual', 'Expected'],
              markers: {
                fillColors: ['#00E396', '#775DD0']
              }
            }
          },
          
          
        }
    },
    computed: {
        salesLast10Days() {
            return this.$store.getters.salesLast10Days.data
        }
    },
    methods: {
        updateSeriesLine() {
            let tempData = []
            this.salesLast10Days.saleAmountByDay.forEach((e, i) => {
                tempData.push({
                  x: this.salesLast10Days.weekDays[i],
                  y: e,
                  goals: [
                    {
                      name: 'Expected',
                      value: 4950,
                      strokeWidth: 10,
                      strokeHeight: 0,
                      strokeLineCap: 'round',
                      strokeColor: '#775DD0'
                    }
                  ]
                },)
            })
            this.series = [{
                data: tempData
            }]
            this.chartOptions = {
                xaxis: {
                    categories: this.usersLast10Days.weekDays
                },
            };
        },
        getLast10DaysSales()  {
            this.$store.dispatch(GET_SALES_LAST_10_DAYS).then(() => this.updateSeriesLine())
        }
    },
    mounted() {
        this.getLast10DaysSales()
        // this.updateSeriesLine()
    }
}
    

</script>