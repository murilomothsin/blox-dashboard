import React, { useEffect, useState } from 'react'
import { Container, Column, Line } from 'UI/Container'
import { Header, HeaderText, Text, ChartHeader } from 'UI/Header'
import Chart from "react-apexcharts";

const App = () => {

  const [data, setData] = useState()

  const fetchData = async () => {
    const response = await fetch('/api/dashboards')
    const responseJson = await response.json()
    const labels = ["Quantitativo", "Técnico", "Complementar", "Básico"]
    const counter = {
      profile: {
        title: "Blox por Perfil",
        data: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
        labels: labels,
        options: {
          plotOptions: {
            pie: {
              donut: {
                total: {
                  show: true,
                  showAlways: true,
                }
              }
            }
          }
        }
      },
      functional: {
        title: "Blox por Área Funcional",
        data: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
        labels: labels
      },
      knowledge: {
        title: "Blox por Área de Competência",
        data: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
        labels: labels
      },
      stacked: {},
    }
    responseJson.forEach(elem => {
      counter.profile.data[elem.blox_profile.id]++
      counter.functional.data[elem.functional_area.id]++
      counter.knowledge.data[elem.knowledge_area.id]++
    })
    const responseStacked = await fetch('/api/stacked')
    counter.stacked = await responseStacked.json()

    setData(counter)
  }

  useEffect(() => {
    fetchData()
  }, [])

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
        name: "Noturno",
        data: []
      },
      {
        name: "Matutino",
        data: []
      }
    ]
  }

  const titleFormat = title => (title ? {
    text: title,
    align: 'center',
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: '16px',
      color: '#263238'
    }
  } : {})
  
  const renderGraph = (data, type = "donut") => {
    const options = {
      labels: data.labels,
      title: titleFormat(data.title),
      legend: {
        position: 'bottom'
      },
      ...data.options
    }
    console.log(options)
    return (
      <Chart
        options={options}
        series={data.series ? data.series : Object.values(data.data)}
        type={type}
      />
    )
  }
  if(!data){
     return null
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
          {renderGraph(data.profile)}
        </Column>
        <Column>
          {renderGraph(data.functional)}
        </Column>
        <Column>
          {renderGraph(data.knowledge)}
        </Column>
      </Line>
      <Line>
        <Column>
          <ChartHeader>Quantidade de blox por: </ChartHeader>
          {renderGraph(data.stacked, "bar")}
        </Column>
      </Line>
    </Container>
  )
}

export default App