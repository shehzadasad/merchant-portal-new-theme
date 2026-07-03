import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
export default function App(props) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [contentState, setContentState] = useState('')

  return (
    <div
      style={{
        marginTop: '50px',
        marginBottom: '50px',
        height: '200px',
        overflow: 'auto',
      }}
    >
      {/* <h1>React Editors</h1>
      <h2>Start editing to see some magic happen!</h2> */}
      <div style={{ border: '1px solid black', padding: '2px' }}>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onContentStateChange={props.setProductDescription}
          placeholder='Product Description'
        />
      </div>
    </div>
  )
}
