import React, { useEffect } from "react"
import Sidebar from "./component/Sidebar"
import Editor from "./component/Editor"

import Split from 'react-split'
import {nanoid} from "nanoid"



export default function App() {
  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem("notes")) || []
)
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    
    function deleteNote(nodeid) {
        // event.stopPropagation()
        // Your code here
        console.log("Node deleted")
        console.log(currentNoteId)
     setNotes(oldarr=>{
let newarr=oldarr.filter((item)=>{
if(item.id != nodeid){
    return item;
}
})
return newarr
       })
     
    }

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [...prevNotes,newNote])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        setNotes(oldNotes =>{
          const UpdatedArr=oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote}
         );
         const UpdateInd=UpdatedArr.findIndex(note=> note.id === currentNoteId);
         console.log(UpdateInd)
         if(UpdateInd > -1){
            const[UpdatedNote]=UpdatedArr.splice(UpdateInd,1);
            UpdatedArr.unshift(UpdatedNote);
         }
         return UpdatedArr;
        })
     
        }
 
    
    useEffect(()=>{
      // lazily initialization of state so it does not reach local storage every time the component is rerendered.
      ()=>
localStorage.setItem("notes",JSON.stringify(notes))
    },[notes])
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNode={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
