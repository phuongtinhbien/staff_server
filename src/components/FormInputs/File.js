import React, { Component } from 'react';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import cx from 'classnames';

const config = {
  apiKey: "AIzaSyDivvXHQjKJiis-bACI60BTJkZWHwAqu34",
  authDomain: "luandry-2f439.firebaseapp.com",
  storageBucket: "luandry-2f439.appspot.com"
};
firebase.initializeApp(config);

class ProfilePage extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };
 
  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref(this.props.folder||"images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };
 
  render() {
    let {input,
      label,
      type,
      folder,
      meta: { touched, error, warning },
      inputClassName,
      placeholder,
      helpText,
      disabled,
      viewMode,
      hidden} = this.props;
    return (

      <div>
          <div>
          <input
              {...input}
              type="text"
              className={cx(inputClassName, 'form-control', {
                error: !!error
              })}
              value={this.state.avatarURL}
            
              placeholder={placeholder}
              disabled={disabled}
              hidden={hidden} />
            { touched && error &&
              <label className="error" style={{color:"red",fontSize:11, fontWeight:"normal"}} htmlFor={input.name}>{error}</label>
            }

            { helpText &&
              <span className="help-block">{helpText}</span>
            }
            
          </div>
          <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}}>
                Chọn hình ảnh <br></br>
                {this.state.isUploading && <span>Đang upload: {this.state.progress}</span>}
                <FileUploader
                  hidden
                 
                
                  accept="image/*"
                  storageRef={firebase.storage().ref(folder)}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                />
              </label>
              {this.state.avatarURL && <span><img height="150px" src={this.state.avatarURL} /> 
              <button type="button" className="btn btn-xs btn-danger"
              onClick={ e=>{firebase.storage().ref(folder).child(this.state.avatar).delete();
              this.setState({avatarURL: null, progress: null});
               }}> x</button></span>}
      </div>
    );
  }
}
 
export default ProfilePage;