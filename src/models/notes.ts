import { Model, Schema, Document, model} from 'mongoose';

export interface Notes extends Document{
    titulo:string,
    descripcion:string, 
}
const NotesSchema = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    titulo:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    descripcion:{
        type:String,
        unique:false,
        required:false,
        trim:true
    },
});

NotesSchema.pre<Notes>('save', async function(next){
    next();
})

export default model<Notes>('Notas', NotesSchema);