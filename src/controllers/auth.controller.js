import ENVIRONMENT from "../config/environment.config.js"
import AuthService from "../services/auth.service.js"
import jwt from 'jsonwebtoken'
import { ServerError } from "../utils/customError.utils.js"

class AuthController {
    
    static async register(request, response) {
        try {

            const {
                name, 
                email, 
                password
            } = request.body
            console.log(request.body)
            
            if(!name){
                throw new ServerError(
                    400, 
                    'Debes enviar un nombre de usuario valido')
            }
            else if(!email || !String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
                throw new ServerError(
                    400, 
                    'Debes enviar un email válido'
                )
            }
            else if(!password || password.length < 8){
                throw new ServerError(
                    400, 
                    'Debes enviar una contraseña valida, mayor a 8 caracteres'
                )
            }
            await AuthService.register(name, email, password)

            response.json({
                ok: true,
                status: 200,
                message: 'Usuario registrado correctamente'
            })
        } catch (error) {
            console.log(error)
            if (error.status) {
                return response.status(error.status).json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                return response.status(500).json(
                    {
                        ok: false,
                        status: 500,
                        message: 'Error interno del servidor'
                    }
                )
            }
        }

    }
    static async login(request, response) {
        try{
            const {email, password} = request.body

            const { authorization_token, user } = await AuthService.login(email, password)
            return response.json({
                ok: true,
                message: 'Logueado con exito',
                status: 200,
                data: {
                    authorization_token: authorization_token,
                    //user: user
                }
            })
        }
        catch (error) {
            console.log(error)
            if (error.status) {
                return response.status(error.status).json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                return response.status(500).json(
                    {
                        ok: false,
                        status: 500,
                        message: 'Error interno del servidor'
                    }
                )
            }
        }
    }

    static async verifyEmail(request, response) {
        try{
            const { verification_token } = request.params;
            
            await AuthService.verifyEmail(verification_token)

            return response.redirect(ENVIRONMENT.URL_FRONTEND + '/login')
            
        } 
        catch (error) {
            console.log(error)
            if (error.status) {
                return response.status(error.status).json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {
                return response.status(500).json(
                    {
                        ok: false,
                        status: 500,
                        message: 'Error interno del servidor'
                    }
                )
            }
        }
    }
}



export default AuthController   