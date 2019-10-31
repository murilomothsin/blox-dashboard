class Api::DashboardsController < ApplicationController
  def index
    data = Array.new
    options = [
      { id: 1, name: "Quantitativo" },
      { id: 2, name: "Técnico" },
      { id: 3, name: "Complementar" },
      { id: 4, name: "Básico" }
    ]
    cycles = [
      { id: 1, name:  "1. Ciclo" },
      { id: 2, name:  "2. Ciclo" },
      { id: 3, name:  "3. Ciclo" },
    ]
    shifts = [
      { id: 1, name: "Matutino" },
      { id: 2, name: "Noturno" },
    ]

    0.upto(rand(10)).each do |i|
      data << {
        id: i+1,
        title: "Matemática #{i+1}",
        knowledge_area: options[rand(4)],
        functional_area: options[rand(4)],
        blox_profile: options[rand(4)],
        cycle: cycles[rand(3)],
        shift: shifts[rand(2)],
      }
    end

    render json: data
  end

  def stacked
    render json: {
      labels: [ "Administração", "Matemática", "Português", "Filosofia" ],
        series: [
          {
            name: "Noturno",
            data: [rand(10), rand(10), rand(10), rand(10)]
          },
          {
            name: "Matutino",
            data: [rand(10), rand(10), rand(10), rand(10)]
          }
        ],
        options: {
          chart: {
            stacked: true,
          },
        }
    }
  end
end
