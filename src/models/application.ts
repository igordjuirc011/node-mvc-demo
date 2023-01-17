import mongoose, {Schema, Document, Model} from "mongoose";

export type ApplicationDoc = Document & {
    userId: Schema.Types.ObjectId
    eventId: Schema.Types.ObjectId,
    isWinner: boolean
}

interface ApplicationAttrs {
    userId: Schema.Types.ObjectId,
    eventId: Schema.Types.ObjectId
}

interface Application extends Model<ApplicationDoc>{
    build(attrs: ApplicationAttrs): ApplicationDoc
}

const ApplicationSchema: Schema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    eventId: {type: Schema.Types.ObjectId, ref: 'Event'},
    isWinner: {type: Boolean, default: false}
});


ApplicationSchema.statics.build = (attrs: ApplicationAttrs) => {
    return new ApplicationModel(attrs);
}

const ApplicationModel = mongoose.model<ApplicationDoc, Application>('Application', ApplicationSchema);


export {ApplicationModel}