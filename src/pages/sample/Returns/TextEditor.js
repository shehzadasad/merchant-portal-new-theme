import React, { useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Parser from 'html-react-parser'
// import textEditorStyles from './textEditor-styles'
const TextEditor = ({ descriptionVal, setDescriptionVal }) => {
  //   const classes = textEditorStyles()

  const onchange = (event) => {
    setValue(event)
    // onChangeText(event)
    const text = Parser(event).props.children

    setDescriptionVal(text)
  }
  const [value, setValue] = useState(descriptionVal)
  return (
    <div>
      <ReactQuill
        theme='snow'
        // className={classes.Quill}
        value={value}
        onChange={onchange}
        placeholder=''
      />
      {/* <div className={classes.btnSave}>
        <Button
          btnType='success'
          variant='contained'
          onClick={handleTextSave}
        >
          Save
        </Button>
      </div> */}
    </div>
  )
}

export default TextEditor
