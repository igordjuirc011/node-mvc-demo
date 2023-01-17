import mongoose, {Schema, Document, Model} from "mongoose";
import {EventDoc} from "./event";

export type CompetitionDoc = Document & {
    name: string;
    status: string;
    events: EventDoc[];
}

interface CompetitionAttrs {
    name: CompetitionDoc['name'];
}

interface Competition extends Model<CompetitionDoc> {
    build(attrs: CompetitionAttrs): CompetitionDoc;
}

const CompetitionSchema: Schema = new Schema({
    name: {type: String, required: true},
    status: {type: String, default: 'inactive'},
    events: [{ type: Schema.Types.ObjectId, ref: 'Event'}]
});


CompetitionSchema.statics.build = (attrs: CompetitionAttrs) => {
    return new CompetitionModel(attrs);
}

const CompetitionModel = mongoose.model<CompetitionDoc, Competition>('Competition', CompetitionSchema);


export {CompetitionModel}
