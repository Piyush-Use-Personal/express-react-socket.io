import mongoose from 'mongoose'
import { MONGODB_URL } from './../constant/env.js'

const mongoURL = MONGODB_URL
if(!mongoURL) {
    throw new Error('ENV::Database URL is required!')
}
mongoose.connect(mongoURL).then(() => {
    console.log('connected to mongodb')
}).catch((err) => console.log(err))