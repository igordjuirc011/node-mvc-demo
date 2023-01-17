import mongoose, {Schema, Document, Model} from "mongoose";
import {ApplicationDoc} from "./application";

export type EventDoc = Document & {
    name: string;
    place: string;
    address: string;
    date: Date;
    ticketSets: number;
    tickets: number;
    applications: ApplicationDoc[];
}

interface EventAttrs {
    name: string;
    place: string;
    address: string;
    date: Date;
    ticketSets: number;
    tickets: number;
    competitionId: Schema.Types.ObjectId;
}

interface Event extends Model<EventDoc> {
    build(attrs: EventAttrs): EventDoc;
}

const EventSchema: Schema = new Schema({
    name: {type: String, required: true},
    place: {type: String, required: true},
    address: {type: String, required: true},
    date: {type: Date, required: true},
    ticketSets: {type: Number, required: true},
    tickets: {type: Number, required: true},
    competitionId: {type: Schema.Types.ObjectId, ref: 'Competition'},
    applications: [{type: Schema.Types.ObjectId, ref: 'Application'}]
});

EventSchema.statics.build = (attrs: EventAttrs) => {
    return new EventModel(attrs);
}

const EventModel = mongoose.model<EventDoc, Event>('Event', EventSchema);

export {EventModel}