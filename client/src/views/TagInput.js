import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
 
const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];
 
export default class TagInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };
    }
 
    render() {
        const { handleAddition, handleDelete, tagArrayName, tags, placeholder } = this.props;
        return (
            <ReactTags 
                tags={tags}
                handleAddition={(tag) => { console.log("handling."); handleAddition(tagArrayName, tag) }}
                handleDelete={(index)=> { handleDelete(tagArrayName, index) }}
                handleInputBlur={(inputtedText) => { 
                    if (inputtedText !== '') 
                        handleAddition(tagArrayName, {id:inputtedText, text:inputtedText })
                }}
                delimiters={delimiters} 
                inputFieldPosition="top"
                placeholder={placeholder}
                allowDragDrop={false}
                autofocus={false}
                classNames= {{
                  tag: 'filter-tag',
                  tagInputField: 'filter-text-input'
                }}
            />
        )
    }
};