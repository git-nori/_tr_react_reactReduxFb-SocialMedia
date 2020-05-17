import React, { useState } from 'react'

import TooltipIconbtn from '../../components/TooltipIconbtn'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

const DeleteScream = ({screamId, deleteScream}) => {
  const [show, setShow] = useState(false)

  const hdlShowDlg = () => {
    setShow(true)
  }

  const hdlHideDlg = () => {
    setShow(false)
  }

  const hdlClkDel = () => {
    deleteScream(screamId)
    setShow(false)
  }

  return (
    <>
      <TooltipIconbtn tip={"Delete scream"} onClick={hdlShowDlg}>
        <Delete color="error" />
      </TooltipIconbtn>

      <Dialog open={show} onClose={hdlHideDlg} fullWidth={true} maxWidth="xs">
        <DialogTitle>Delete scream</DialogTitle>
        <DialogContent>
        Are you sure you want to delete this scream ?
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={hdlClkDel}>Delete</Button>
          <Button variant="outlined" color="secondary" onClick={hdlHideDlg}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteScream