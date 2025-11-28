import Users from "../models/user.model.js"

class UserRepository {

    static async create(name, email, password) {
        const result = await Users.insertOne({
            name: name,
            email: email,
            password: password,
        })
        return result
    }

    static async getAll() {
    const users_get = await Users.find();
    return users_get;
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
        const user = await Users.findOne({ email: email });
        return user
    }

    static async getById(user_id) {
    const user_found = await Users.findById(user_id);
    return user_found;
    }
    

        static async findByVerificationToken(token) {
        const user = await Users.findOne({ verificationToken: token });
        return user;
    }

}



export default UserRepository

