<template>
    <div class="card chart-card">
        <div class="card-body">
            <div id="chart">
                <apexchart height="245" width="250" type="radialBar" :options="chartOptions" :series="series"></apexchart>
            </div>
        </div>
    </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'

export default {
    components: {
        apexchart: VueApexCharts
    },
    data() {
        return  {
            series: [44, 55, 67],
          chartOptions: {
            chart: {
              height: 350,
              type: 'radialBar',
            },
            colors: ['#09488b', '#0e79eb', '#70b3fa '],
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: {
                    fontSize: '22px',
                  },
                  value: {
                    fontSize: '16px',
                  },
                  total: {
                    show: true,
                    label: 'Total',
                    formatter: function () {
                      // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                      return 249
                    }
                  }
                }
              }
            },
            labels: ['Apples', 'Oranges', 'Bananas'],
          },
        }
          
    },
    
    
}
</script>