import { Component } from 'react'
import { cloudinaryService } from '../../services/cloudinaryService.js'

export class CardCover extends Component {

    state = {
        isUploading: false
    }

    coverColors = () => {
        return ['#f9ed69', '#a56cc1', '#f38181', '#95e1d3', '#878ecd', '#3fc1c9',
            '#a1dd70', '#ffcc29', '#19456b', '#d32626', '#16c79a', '#fcbad3', '#ffaa64', '#de95ba', '#17b978', ]
    }

    onUploadImg = async ev => {
        this.setState({ isUploading: true })
        const { secure_url } = await cloudinaryService.uploadImg(ev.target.files[0])
        this.setState({ isUploading: false }, () => this.props.onFinishUpload(secure_url))
    }

    setColor = (color) => {
        console.log('the chosen color is', color);
        this.props.onUpdateCoverColor(color)

    }

    render() {
        const { isUploading } = this.state
        return (
            <div className="card-cover-modal flex column">
                <div className="uploader">
                    <label className="upload-btn" htmlFor="imageUploader">{isUploading ? 'Uploading....' : 'Upload Image'}</label>
                    <input onChange={this.onUploadImg} hidden
                        type="file" accept="image/*" id="imageUploader" />
                </div>
                <h3>Colors</h3>
                <div className="card-cover-colors">
                    {this.coverColors().map((color, idx) => {
                        return <div className="cover-colors-menu" key={idx}
                            style={{ backgroundColor: color }} onClick={() => this.setColor(color)}></div>
                    })}
                </div>
                <div className="card-cover-btns flex">
                    <button onClick={this.props.toggleCoverMenu} className="card-cover-btn">Ok</button>
                    <button onClick={this.props.toggleCoverMenu} className="card-cover-btn">✕</button>
                </div>
            </div>
        )
    }
}