import Users from "../models/User.model.js"

class UserRepository {

    static async createUser(name, email, password) {
        const user = await Users.create({
            name,
            email,
            password,
        })
        return user
    }

    static async deleteById(user_id) {
        await Users.findByIdAndDelete(user_id)
        return true
    }

    static async updateById(user_id, new_values) {
        const user_updated = await Users.findByIdAndUpdate(
            user_id,
            new_values,
            { new: true }
        )

        return user_updated
    }


    static async getByEmail (email){
        console.log("Intentando buscar email:", email)
        try{
        const user = await Users.findOne({email: email})
        console.log("Resultado Mongoose:", user)
        return user
        }
        catch (e) {
        // Si hay un error de importación de Mongoose, este catch lo atrapará
        console.error("ERROR EN REPOSITORIO DB:", e); 
        return null;
    }
    }

        static async findByVerificationToken(token) {
        const user = await Users.findOne({ verificationToken: token });
        return user;
    }

}



export default UserRepository

