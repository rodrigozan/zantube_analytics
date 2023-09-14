import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://thelofichillmusic:Zyuohger12@ytanalytics.y8tisuy.mongodb.net/?retryWrites=true&w=majority';

if (!mongoose.connections[0]) {
  mongoose.connect(MONGODB_URI);
}

export default mongoose;
