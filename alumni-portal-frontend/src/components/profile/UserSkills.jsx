import {
  Box,
  Typography,
  Chip,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import { useState } from 'react'

const UserSkills = ({ skills, onUpdate }) => {
  const [open, setOpen] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const [skillsList, setSkillsList] = useState(skills || [])

  const handleAddSkill = () => {
    if (newSkill.trim() && !skillsList.includes(newSkill.trim())) {
      const updatedSkills = [...skillsList, newSkill.trim()]
      setSkillsList(updatedSkills)
      onUpdate(updatedSkills)
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skillsList.filter((skill) => skill !== skillToRemove)
    setSkillsList(updatedSkills)
    onUpdate(updatedSkills)
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">Skills</Typography>
        <Button size="small" onClick={() => setOpen(true)}>
          Edit Skills
        </Button>
      </Box>

      {skillsList.length > 0 ? (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {skillsList.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => handleRemoveSkill(skill)}
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No skills added yet.
        </Typography>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Skills</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              label="Add Skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <Button variant="contained" onClick={handleAddSkill}>
              Add
            </Button>
          </Box>

          <Box
            sx={{
              minHeight: 200,
              border: '1px solid #ddd',
              borderRadius: 1,
              p: 2,
            }}
          >
            {skillsList.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {skillsList.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleRemoveSkill(skill)}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            ) : (
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ mt: 8 }}
              >
                No skills added
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UserSkills
