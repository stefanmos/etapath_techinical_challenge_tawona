class Api::V1::SessionsController < ApplicationController
    #protect_from_forgery with: :null_session
    #protect_from_forgery except: :sample
    skip_before_action :verify_authenticity_token
    #acts_as_token_authentication_handler_for User
    def create
        user  = User.find_by_email(params[:email])
        #user  = User.where(email: params[:email]).first

        @current_user = user

        if user&.valid_password?(params[:password])
            #sign_in(:user,user)
            render json: user.as_json(only: [:id, :email, :authentication_token]), status: :created
        else
            #render json: user.errors
            head(:unauthorized)
        end
    end


    def savepackage
        @current_user.packages.create(params[:user_id]);
    end
    
    
    def destroy
    end

    # Only allow a list of trusted parameters through.
    def session_params
        params.require(:session).permit(:email, :password,:authentication_token)
    end
end