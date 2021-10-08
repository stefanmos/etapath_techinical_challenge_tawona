class Api::V1::PackagesController < ApplicationController
  before_action :verify_authenticity_token
  before_action :set_package, only: %i[ update destroy ]
  
  # GET /packages or /packages.json
  #def index
  #  @packages = Package.all
  #  render json: @packages
  #end

  # GET /packages/1 or /packages/1.json
  #def show
  #end

  # GET /packages/new
  #def new
  #  @package = current_user.packages.build
  #end

  # GET /packages/userPackages
  def userpackages
    # order buy date created in descending order
    # we can also get limited entries here in the case the user has many packages then use
    # start_from 
    @packages = @current_user.packages.order(created_at: :desc).all
    render json: @packages
  end

  # POST /packages or /packages.json
  def create
    # instance of current user has already been created in the application controller
    # which this controller inherits from
    
    @package = @current_user.packages.build(package_params)
    if @package.save
      render json: @package
    else
      render json: @package.errors
    end
  end

  # PATCH/PUT /packages/1 or /packages/1.json
  def update
    if @package.update(package_params)
      render json: @package
    else
      render json: @package.errors
    end
  end

  # DELETE /packages/1 or /packages/1.json
  def destroy
    if @package.destroy
      render json: @package
    else
      render json: @package.errors
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_package
      @package = Package.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def package_params
      params.require(:package).permit(:reference_number, :location, :destination, :date, :timeslot, :user_id)
    end
end