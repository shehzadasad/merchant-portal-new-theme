import * as React from 'react'
import Button from '@mui/material/Button'

import Stack from '@mui/material/Stack'
import { Chat } from '@mui/icons-material'

export default function ChatButton() {
  return (
    <Stack direction='row' spacing={2}>
      <Button variant='contained' startIcon={<Chat />}>
        Chat with an Expert
      </Button>
    </Stack>
  )
}
