import MessageService from "../services/message.services.js"

class MessageController {
    static async create(request, response) {
        const {channel_id} = request.params
        const {content} = request.body
        const member_id = request.member._id
        /*const messages_list = await MessageService.create(content, member_id, channel_id)
        response.status(201).json(
            {
                ok: true,
                status: 201, 
                message:'Mensaje creado',
                data: {
                    messages: messages_list
                }
            }
        )*/
        await MessageService.create(member_id, channel_id, content);
        response.json({
            ok: true,
            message: "Mensaje creado exitosamente",
        });
        } catch (error) {
        response.json({
            ok: false,
            message: error.message,
        });
        }
    
    

    static async getAllByChannel(request, response) {
        const { channel_id } = request.params
        const messages_list = await MessageService.getAllByChannelId(channel_id)
        response.json(
            {
                ok: true,
                data: {
            messages: messages,
            },
        });
        } catch (error) {
        response.json({
            ok: false,
            message: error.message,
        });
        }
    }


export default MessageController