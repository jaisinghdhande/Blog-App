const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
  },
  {
    timestamps: true,
  }
);

const BlogModel =  model("Blog", BlogSchema);

module.exports = BlogModel;
