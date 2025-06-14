const User = require('./User.model')
const studentSchema = new mongoose.Schema({
  currentSemester: Number,
  cgpa: Number,
  projects: [
    {
      title: String,
      description: String,
      technologies: [String],
      githubUrl: String,
    },
  ],
  internships: [
    {
      company: String,
      role: String,
      duration: String,
      description: String,
    },
  ],
  certifications: [
    {
      name: String,
      issuer: String,
      dateCompleted: Date,
    },
  ],
})
module.exports = User.discriminator('Student', studentSchema)
