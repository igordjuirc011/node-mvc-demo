import mongoose, {Schema, Document, Model} from "mongoose";

export type UserDoc = Document & {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean
}

interface UserAttrs {
    name: UserDoc['name'];
    email: UserDoc['email'];
    password: UserDoc['password'];
}

interface User extends Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

const UserSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
});


UserSchema.statics.build = (attrs: UserAttrs) => {
    return new UserModel(attrs);
}

const UserModel = mongoose.model<UserDoc, User>('User', UserSchema);


export {UserModel}