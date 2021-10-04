class Api::V1::PackagesController < ApplicationController
  before_action :verify_authenticity_token
  before_action :set_package, only: %i[ show edit update destroy ]


  def verify_authenticity_token
    if request.headers['Authorization'].nil? 
      head :unauthorized
    else
      begin
        token = request.headers["Authorization"]
        decoded = JWT.decode(token,Rails.application.secrets.secret_key_base).first
        @current_user = User.find(decoded["id"])
      rescue #JWT:: Verification error
        render json: {
          loginRequired: true,
        }
      end
    end    
  end
  
  # GET /packages or /packages.json
  def index
    @packages = Package.all
    render json: @packages
  end

  # GET /packages/1 or /packages/1.json
  def show
  end

  # GET /packages/new
  def new
    @package = current_user.packages.build
  end

  # GET /packages/userPackages
  def userpackages
    @packages = @current_user.packages.all
    render json: @packages
  end

  # POST /packages or /packages.json
  def create
    @current_user = User.find(params[:user_id])
    @package = @current_user.packages.build(package_params)
    if @package.save
      render json: @package
    else
      render json: @package.errors
    end
  end

  # PATCH/PUT /packages/1 or /packages/1.json
  def update
    #@current_user = User.find(params[:user_id])
    #@package = @current_user.packages.find_by(reference_number: params[:reference_number])
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