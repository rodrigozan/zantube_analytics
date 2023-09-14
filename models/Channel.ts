import mongoose, { Schema, Document } from 'mongoose';

interface IChannel extends Document {
  channelId: string;
  // Adicione outros campos necessários para as estatísticas
}

const ChannelSchema: Schema = new Schema({
  channelId: { type: String, required: true, unique: true },
  // Defina outros campos aqui
});

const ChannelModel = mongoose.model('New_Channel', ChannelSchema);

export default ChannelModel;
