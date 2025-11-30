import ChannelRepository from "../repositories/channel.repository.js";

class ChannelController {
    static async create(request, response) {
        try {
            const { name } = request.body;
            const { workspace_id } = request.params
            /*if (!name || !workspace_id) {
                return response.status(400).json({
                    ok: false,
                    status: 400,
                    message: "Nombre del canal y workspace_id son requeridos",
                });
            }
            const workspaceChannels = await ChannelRepository.getAllByWorkspaceAndName(
                workspace_id, name
            );

            if (workspaceChannels.length > 0) {
                return response.status(409).json({
                    ok: false,
                    status: 409,
                    message: "Ya existe un canal con este nombre en el workspace",
                });
            }

            const isPrivate = false;*/
            await ChannelRepository.create(
                name,
                isPrivate,
                workspace_id
            );
                response.json({
            ok: true,
            message: "Canal creado exitosamente",
        });
        } catch (error) {
        response.json({
            ok: false,
            message: error.message,
        });
    }
            /*const updatedChannels = await ChannelRepository.getAllByWorkspace(
                workspace_id
            );

            return response.status(201).json({
                ok: true,
                status: 201,
                message: "Canal creado con éxito",
                data: {
                    channels: updatedChannels,
                },
            });
        } catch (error) {
            console.error("Error creating channel:", error);
            return response.status(500).json({
                ok: false,
                status: 500,
                message: "Error interno del servidor al crear el canal",
            });
        }*/
    }
    static async getAllByWorkspace (request, response){
        try{
            //Obtener la lista de canales de un espacio de trabajo
            const {workspace_id} = request.params
            const channels = await ChannelRepository.getAllByWorkspace( workspace_id);

            return response.json({
                ok: true, 
                status:200,
                message: "Lista de canales obtenida",
                data: {
                    channels: channels
                }
            })
        }catch (error) {
            console.error("Error al listar channels:", error);
            return response.status(500).json({
                ok: false,
                status: 500,
                message: "Error interno del servidor al listar los canales",
            });
        }
    }
    static async deleteChannel(request, response) {
    try {
        const { workspace_id, channel_id } = request.params;
        const user_id = request.user.id;

        const member =
            await MemberWorkspaceRepository.getMemberWorkspaceByUserIdAndWorkspaceId(
            user_id,
            workspace_id
            );
        if (!member || member.role != ROLES.ADMIN) {
            return response.status(403).json({
            ok: false,
            message: "Solo los administradores pueden eliminar canales",
            });
        }

        await ChannelRepository.deleteById(channel_id);

        response.json({
            ok: true,
            message: "Canal eliminado exitosamente",
        });
        } catch (error) {
        response.status(500).json({
            ok: false,
            message: error.message,
        });
        }
    }
    }


export default ChannelController


