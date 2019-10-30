import React from 'react'
import { Container, Column, Line } from 'UI/Container'
import { Header, HeaderText, Text, ChartHeader } from 'UI/Header'
import Chart from "react-apexcharts";

const App = () => {
  const chartData = {
    options: {
      chart: {
        id: "basic-bar"
      },
      labels: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  }
  return (
    <Container>
      <Header>
        <HeaderText>Dashboard</HeaderText>
        <Text>
          Visão geral do progresso dos Blox na instituição
        </Text>
      </Header>
      <Line>
        <Column>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="donut"
          />
        </Column>
        <Column>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="donut"
          />
        </Column>
        <Column>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="donut"
          />
        </Column>
      </Line>
      <Line>
        <Column>
          <ChartHeader>Quantidade de blox por: </ChartHeader>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
          />
        </Column>
      </Line>
    </Container>
  )
}

export default App