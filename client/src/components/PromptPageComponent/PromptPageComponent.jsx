import React from 'react'
import Prompt from '../Prompt/Prompt'
import { useState, useRef } from 'react'
import './PromptPageComponent.css'

function PromptPageComponent() {

    const [prompts, setPrompts] = useState([{id: 0, element: <Prompt key={0} />}]);
    const nextId = useRef(1); // useRef to keep track of the next available ID
  
    const addPrompt = (index) => {
      const newPrompt = {id: nextId.current, element: <Prompt key={nextId.current} />};
      nextId.current++; // Increment the counter
      // Insert a new Prompt component right after the current index
      const newPrompts = [
        ...prompts.slice(0, index + 1),
        newPrompt,
        ...prompts.slice(index + 1)
      ];
      setPrompts(newPrompts);
    };
  
    const removePrompt = (index) => {
      if (prompts.length > 1) {
        const newPrompts = prompts.filter((_, i) => i !== index);
        setPrompts(newPrompts);
      }
    };

    return (
      <div className="prompt-container">
        {prompts.map((prompt, index) => (
          <div key={prompt.id} className="prompt-item">
            <span className="prompt-number">{index + 1}</span> 
            {prompt.element}
            <button className="button" onClick={() => addPrompt(index)}>Add</button>
            <button className="button button-remove" onClick={() => removePrompt(index)}>Remove</button>
          </div>
        ))}
      </div>
    );
}

export default PromptPageComponent
