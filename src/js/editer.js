import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/**
 * 富文本编辑器
 */
class Editer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        }
        this.handleChange = this.handleChange.bind(this);
        // this.imageHandler = this.imageHandler.bind(this);
    }
    handleChange(value) {
        this.props.contentChange(value);
    }

    modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    render() {
        return (
            <div className="text-editor">
                <ReactQuill theme="snow"
                    modules={this.modules}
                    formats={this.formats}
                    onChange={this.handleChange}>
                </ReactQuill>
            </div>
        );
    }
}

export default Editer;