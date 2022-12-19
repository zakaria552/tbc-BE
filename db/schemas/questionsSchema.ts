const questionsSchema = mongoose.Schema(
  {
    category: String,
    id: { type: String, required: true },
    correctAnswer: String,
    incorrectAnswers: Array,
    question: String,
    tags: Array,
    type: String,
    difficulty: String,
    regions: Array,
    isNiche: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("question", questionsSchema);
