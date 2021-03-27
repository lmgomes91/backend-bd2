import mongoose, { Schema } from 'mongoose'

const itemSchema = new Schema({
  photos: {
    type: [Buffer]
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  address: {
    type: String
  },
  usedTime: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5, 6]
  },
  donated: {
    type: Boolean,
    default: false
  },
  giver: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: Schema.ObjectId,
    ref: 'User',
    default: null
  },
  category: {
    type: Number,
    enum: ['Roupas', 'Alimentos não perecíveis', 'Brinquedos', 'Móveis', 'Eletrodomésticos', 'Outros']
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

itemSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      photos: this.photos,
      name: this.name,
      description: this.description,
      address: this.address,
      usedTime: this.usedTime,
      donated: this.donated,
      giver: this.giver,
      receiver: this.receiver,
      category: this.category,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Item', itemSchema)

export const schema = model.schema
export default model
