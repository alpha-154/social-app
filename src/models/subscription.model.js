import mongoose, { Schema } from "mongoose"

const subscriptionSchema = Schema({
     subscriber: {
        type: Schema.Types.ObjectId, //one who's subscribing
        ref: "User"
     },
     
     channel: {
        type: Schema.Types.ObjectId, //one to whom `subscriber` is subscribing
        ref: "User"
     },

}, { timestamps: true})

export const Subscription = mongoose.model("Subscription", subscriptionSchema)