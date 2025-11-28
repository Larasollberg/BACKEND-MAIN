import ENVIRONMENT from "../config/environment.config.js"
import mailTransporter from "../config/mailer.config.js"
import { ServerError } from "../utils/customError.utils.js"
import MemberWorkspaceRepository from "../repositories/memberWorkspace.repository.js"
import UserRepository from "../repositories/user.repository.js"
import WorkspaceRepository from "../repositories/workspace.repository.js"
import jwt from 'jsonwebtoken'

class WorkspaceService {
    static async getAll(user_id) {
        const members = await MemberWorkspaceRepository.getAllByUserId(user_id)
        return members
    }

    static async create(user_id, name, url_img) {
    
        const workspace_created = await WorkspaceRepository.create(name, url_img)
        
        await MemberWorkspaceRepository.create(user_id, workspace_created._id, 'admin')

        return workspace_created
    } 

    static async invite(member, workspace_selected, email_invited, role_invited) {
        const user_invited = await UserRepository.getByEmail(email_invited)
        if (!user_invited) {
            throw new ServerError(404, 'No existe el usuario')
        }

        const already_member = await MemberWorkspaceRepository.getByUserIdAndWorkspaceId(user_invited._id, workspace_selected._id)

        if (already_member) {
            throw new ServerError(400, 'Usuario ya es un miembro de este workspace')
        }

        const invitation_token = jwt.sign(
            {
                id_invited: user_invited._id,
                id_inviter: member._id,
                id_workspace: workspace_selected._id,
                invited_role: role_invited
            },
            ENVIRONMENT.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        await mailTransporter.sendMail({
            to: email_invited,
            from: ENVIRONMENT.GMAIL_USER,
            subject: "Te han invitado a un espacio de trabajo",
            html: `
                        <h1>Has sido invitado al workspace: ${workspace_selected.name}</h1>
                        <a href="${ENVIRONMENT.URL_API_BACKEND}/api/member/confirm/${invitation_token}">Aceptar</a>
                        `
        })
    }

}


export default WorkspaceService