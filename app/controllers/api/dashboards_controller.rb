class Api::DashboardsController < ApplicationController
  def index
    data = Array.new
    options = [
      { id: 1, name: "Quantitativo" },
      { id: 2, name: "Técnico" },
      { id: 3, name: "Complementar" },
      { id: 4, name: "Básico" }
    ]
    shifts = ["Matutino", "Noturno"]

    0.upto(rand(10)).each do |i|
      data << {
        id: i+1,
        title: "Matemática #{i+1}",
        knowledge_area: options[rand(4)],
        functional_area: options[rand(4)],
        blox_profile: options[rand(4)],
        cycle: { id: 1, name:  "#{i+1}. Ciclo" },
        shift: { id: 1, name:  shifts[rand(2)] },
      }
    end

    render json: data
  end
end
