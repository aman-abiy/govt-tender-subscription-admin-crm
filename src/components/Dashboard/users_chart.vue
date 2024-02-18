<template>
    <div class="card chart-card">
        <div class="card-body">
            <h5 class="title">Users <span class="count">(25,241)</span></h5>
            <hr>
            <div id="chart">
                <apexchart ref="usersChart" height="300" width="750" type="area" :options="chartOptions" :series="series"></apexchart>
            </div>
        </div>
    </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import { GET_USERS_LAST_10_DAYS } from '../../store/action_types'

export default {
    components: {
        apexchart: VueApexCharts
    },
    data() {
        return  {
            series: [{
                name: 'series1',
                data: []
            },],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'area'
                },
                colors: ['#007bff'],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                },
            },
        }
    },
    computed: {
        usersLast10Days() {
            return this.$store.getters.usersLast10Days.data
        }
    },
    methods: {
        updateSeriesLine() {
            this.series = [{
                data: this.usersLast10Days.counts
            }]
            this.chartOptions = {
                xaxis: {
                    categories: this.usersLast10Days.weekDays
                },
            };

        },
        getUsersLast10Days()  {
            this.$store.dispatch(GET_USERS_LAST_10_DAYS).then(() => this.updateSeriesLine())
        },
    },
    mounted() {
        this.getUsersLast10Days()
        // this.updateSeriesLine()
    }
    
}
</script>