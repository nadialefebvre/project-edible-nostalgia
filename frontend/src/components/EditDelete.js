import React from "react"
import { useNavigate } from "react-router-dom"

import Grid from '@mui/material/Grid'

import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import Confirm from "./Confirm"

const EditDelete = (props) => {
  const {
    editPath,
    openAction,
    open,
    setOpen,
    handleDelete,
    itemId,
    title,
    text
  } = props

  const navigate = useNavigate()

  return (
    <Grid container justifyContent="flex-end">
      <IconButton
        aria-label="edit"
        size="small"
        onClick={() => navigate(editPath)}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={openAction}
      >
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
      <Confirm
        open={open}
        setOpen={setOpen}
        handleDelete={handleDelete}
        itemId={itemId}
        title={title}
        text={text}
      />
    </Grid>
  )
}

export default EditDelete
