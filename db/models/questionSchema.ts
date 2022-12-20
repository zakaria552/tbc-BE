const mongoose = require("mongoose");
// const { Schema, Document } = require("mongoose");

export interface IQuestion extends mongoose.Document {
  category: String;
  id: String;
  correctAnswer: String;
  incorrectAnswers: Array<String>;
  question: String;
  tags: Array<String>;
  type: String;
  difficulty: String;
  regions: Array<any>;
  isNiche: Boolean;
}

const questionSchema = new Schema(
  {
    category: { type: String, required: true },
    id: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    incorrectAnswers: { type: Array<String>, required: true },
    question: { type: String, required: true },
    tags: { type: Array<String>, required: true },
    type: { type: String, required: true },
    difficulty: { type: String, required: true },
    regions: { type: Array<any>, required: false },
    isNiche: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model<IQuestion>("question", questionSchema);
console.log(Question);

module.exports = Question;

export {};
