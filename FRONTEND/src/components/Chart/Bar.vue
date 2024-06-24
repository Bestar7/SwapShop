<template>
  <Bar
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// TODO add type
const chartData = {
  labels: ['January', 'February', 'March'],
  datasets: [{
    label:"set1",
    backgroundColor: '#f80000',
    data: [70, 20, 12] 
  },
  {
    label:"set2",
    backgroundColor: '#110000',
    data: [50, 1, 50] 
  }]
}
const chartOptions = {
  responsive: true
}

</script>