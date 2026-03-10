class KeyResultsController < ApplicationController
  before_action :set_objective
  before_action :set_key_result, only: [ :destroy ]

  def create
    @key_result = @objective.key_results.new(key_result_params)
    if @key_result.save
      redirect_to @objective, notice: "Key result created successfully"
    else
      redirect_to @objective, alert: "Error creating key result"
    end
  end

  def destroy
    @key_result.destroy
    redirect_to @objective, notice: "Key result deleted successfully"
  end

  private

  def set_objective
    @objective = Objective.find(params[:objective_id])
  end

  def set_key_result
    @key_result = KeyResult.find(params[:id])
  end

  def key_result_params
    params.expect(key_result: [ :description, :target_value, :metric ])
  end
end
