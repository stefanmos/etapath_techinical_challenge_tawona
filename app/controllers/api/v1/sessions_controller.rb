class Api::V1::SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    #Skip before verification here, all of the controller's actions do not have to be authenticated
    #This resourse is not protected

    def create
        #find user by email
        user  = User.find_by_email(params[:email])

        #check if user registered by the email exists and if the password is valid
        if user&.valid_password?(params[:password])

            #if password is valid generate a jwt token and send it back in the response to the client
            render json: {
                jwt: encode_token({
                    id: user.id,
                    email: user.email
                })
            }
        else
            #if user does not exist or password is incorrect, send unauthorized
            head(:unauthorized)
        end
    end

    private 

    # function to create a token based on the user id and email
    def encode_token (payload = {})
        #set expiration date of the token
        exp = 2.minutes.from_now
        #convert 'exp' to integer and add to add to the payload
        payload[:exp] = exp.to_i
        #generate encode token
        return JWT.encode(payload,Rails.application.secrets.secret_key_base)
    end

    # Only allow a list of trusted parameters through.
    def session_params
        params.require(:session).permit(:email, :password,:authentication_token)
    end
end