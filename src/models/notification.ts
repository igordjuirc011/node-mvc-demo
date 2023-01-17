import mongoose, {Schema, Document, Model} from "mongoose";

export type NotificationDoc = Document & {
    userId: Schema.Types.ObjectId;
    message: string;
    seen: boolean;
}

interface NotificationAttrs {
    userId: NotificationDoc['userId'];
    message: NotificationDoc['message'];
}

interface Notification extends Model<NotificationDoc> {
    build(attrs: NotificationAttrs): NotificationDoc;
}

const NotificationSchema: Schema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    message: {type: String, required: true},
    seen: {type: Boolean, default: false}
});


NotificationSchema.statics.build = (attrs: NotificationAttrs) => {
    return new NotificationModel(attrs);
}

const NotificationModel = mongoose.model<NotificationDoc, Notification>('Notification', NotificationSchema);


export {NotificationModel}