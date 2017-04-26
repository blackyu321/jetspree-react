import React from "react";
import {Form} from "formsy-react";
import {postRequests, PostRequest2} from "../data/requests";
import {Redirect} from "react-router-dom";
import "./SignUp.css";
import DropZone from "react-dropzone";
import FormsyText from "formsy-material-ui/lib/FormsyText";
import FlatButton from "material-ui/FlatButton";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import DropDown from '../components/DropDown';
import DialogBox from '../components/DialogBox';
import {loadCurrencies, loadCities} from '../data/hardcoded-data';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import Axios from 'axios';

const styles = {
    textfield: {
        width: '100%'
    },
    floatingLabelFocusStyle: {},
    underlineStyle: {},
    errorStyle: {
        lineHeight: '20px',
        bottom: -2
    }
};

const customStlye = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(33, 28, 28, 0.74902)',
        zIndex: 100
    },
    content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        width: '500px',
        height: '300px',
    }
};

class postRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            imageFiles1: [],
            imageFiles2: [],
            imageFiles3: [],
            prefill:'',
            stepindex: 0,
            finished: false,
            request: {},
            itemCount: 1,
			stateList: [],
            error: false,
			messageError: [],
            imageurl: '',
			success: false,
			redirect: false
        };
        
        //Submit
        this.submit = this.submit.bind(this);
    }

    handleClose = () => {
        this.setState({error: false})
    };
    
    handleSuccessOpen = () => {
        this.setState({success: true})
    };
    
    handleSuccessClose = () => {
        this.setState({success: false, redirect: true})
    };
    
    enableButton = () => {
        this.setState({
            canSubmit: true
        });
    };

    disableButton = () => {
        this.setState({
            canSubmit: false
        });
    };
	
	componentWillMount() {
        console.log(this.props)
        if (this.props.location.state !== undefined)
        {
            this.setState({
                prefill: this.props.location.state.name
            })
        }
    }
	
	errorMessage = () => {
	    return {
			numeric: 'only integer value!'
        }
    }
	
	// shouldComponentUpdate(nextProps, nextState) {
    //     let button = this.state.canSubmit !== nextState.canSubmit;
    //     return button;
    // }

    reset() {
        this.setState({
            prefill: {}
        })
    }
    
    postImage = (data) => {
       Axios({
           method: 'POST',
           url: 'https://serene-meadow-20972.herokuapp.com/image',
           data: {
               image: data
           }
       }).then((res) => {
           console.log(res.data);
           this.setState({
               imageurl: res.data.url
           });
       }).catch((err) => {
           console.log(err);
       })
    }
    

    onDrop = (acceptedFiles, rejectedFiles) => {
        var file = acceptedFiles[0];
		
        const reader = new FileReader();
        reader.onload = (event) => {
			this.postImage(event.target.result);
            this.setState({
                imageFiles1: event.target.result
            })
        };
        reader.readAsDataURL(file);
    };
	
	onDrop2 = (acceptedFiles, rejectedFiles) => {
		var file = acceptedFiles[0];
		const reader = new FileReader();
		reader.onload = (event) => {
			this.setState({
				imageFiles2: event.target.result
			})
		};
		reader.readAsDataURL(file);
	};
	
	onDrop3 = (acceptedFiles, rejectedFiles) => {
		var file = acceptedFiles[0];
		const reader = new FileReader();
		reader.onload = (event) => {
			this.setState({
				imageFiles3: event.target.result
			})
		};
		reader.readAsDataURL(file);
	};
	
	additemCount = () => {
	    this.setState({
			itemCount: this.state.itemCount + 1
        })
    }
    
    removeitemCount = () => {
	    if(this.state.itemCount > 0) {
			this.setState({
				itemCount: this.state.itemCount - 1
			})
		}
    }
    
	handleNext = () => {
        this.setState({
			stepindex: this.state.stepindex + 1,
            finished: this.state.stepindex >= 2
        });
    };
    
    handlePrev = () => {
        if (this.state.stepindex > 0) {
            this.setState({
                stepindex: this.state.stepindex - 1
            });
        }
    };
	
	updateState = (event, data) => {
	    loadCities().map((options, i) => {
	        if(options.name === data) {
	            this.setState({
                    stateList: options.state
                })
            }
        })
    }
    
    storeFormData = (data) => {
		//client side error checking
        if(this.state.stepindex == 0) {
            
            // var errormsg = [{'message' : 'errorMsg123'}];
            //     if(data.price != '123') {
            //     this.setState({
            //         error: true,
            //         messageError: errormsg
            //     })
            //     return;
            // }
            
            data.imageurl = this.state.imageurl;
            
            this.setState({
                request: Object.assign(this.state.request, data)
            })
            
			console.log(this.state.request);
		}
		else if (this.state.stepindex == 1) {
            this.setState({
                request: Object.assign(this.state.request, data)
            })
            
			console.log(this.state.request);
		}
		else if (this.state.stepindex == 2) {
            // if no error then do the following step
            this.setState({
                request: Object.assign(this.state.request, data)
            })
            
            this.submit(this.state.request);
		}
		else {
			alert('no page found');
		}
		
		this.handleNext();
    }
	
	getStepContent(stepindex) {
        switch(stepindex) {
            case 0:
                return (
                    <Form
                        onSubmit={this.storeFormData}
                        onValid={this.enableButton}
                        onInvalid={this.disableButton}
                        className="login">
                        <ul>
                            <li>
                                <FormsyText
                                    value={this.state.prefill}
                                    name="name"
                                    hintText=""
                                    floatingLabelText="Name"
                                    style={styles.textfield}
                                    errorStyle={styles.errorStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    required/>
                            </li>
                            <li>
                                <FormsyText
                                    value=""
                                    name="price"
                                    hintText=""
                                    floatingLabelText="Price"
                                    // validations={errorMessage.numeric}
                                    style={styles.textfield}
                                    errorStyle={styles.errorStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    required/>
                            </li>
                            <li>
                                <DropDown
                                    name="currency"
                                    floatingLabelText="Currency"
                                    currencies={loadCurrencies()} />
                            </li>
                            <li>
                                <FormsyText
                                    value=""
                                    name="description"
                                    hintText=""
                                    floatingLabelText="Description"
                                    style={styles.textfield}
                                    errorStyle={styles.errorStyle}
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    required/>
                            </li>
                            <li style={{'display' : 'inline-block','marginTop' : '10px'}}>
                                <DropZone
                                    onDrop={this.onDrop}
                                    accept="image/*"
                                >
                                        Drag and Drop image files
                                        <img src={this.state.imageFiles1} style={{'display':'block'}} />
                                </DropZone>
                            </li>
                            <li style={{'display' : 'inline-block'}}>
                                <DropZone
                                    onDrop={this.onDrop2}
                                    accept="image/*"
                                >
                                    <div>
                                        Drag and Drop image files
                                        <img src={this.state.imageFiles2} style={{'display':'block'}} />
                                    </div>
                                </DropZone>
                            </li>
                            <li style={{'display' : 'inline-block'}}>
                                <DropZone
                                    onDrop={this.onDrop3}
                                    accept="image/*"
                                >
                                    <div>
                                        Drag and Drop image files
                                        <img src={this.state.imageFiles3} style={{'display':'block'}} />
                                    </div>
                                </DropZone>
                            </li>
                            <li>
                                <div>
                                    <FormsyText
                                        value=""
                                        name="countries"
                                        hintText="E.g Japan,USA"
                                        floatingLabelText="Buying the item from"
                                        style={styles.textfield}
                                        errorStyle={styles.errorStyle}
                                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                        required/>
                                </div>
                            </li>
                        </ul>
                        <div>
                            <p> Quantity </p>
                            <FloatingActionButton mini={true}
                                                  style={{'display':'inline-block'}}
                                                  onClick={this.additemCount}>
                                <ContentAdd />
                            </FloatingActionButton>
                            <p style={{
                                'display':'inline-block',
                                'marginLeft':'20px',
                                'marginRight':'20px',
                                'fontSize':'40px'
                            }}> {this.state.itemCount} </p>
                            <FloatingActionButton mini={true}
                                                  onClick={this.removeitemCount}>
                                <ContentRemove />
                            </FloatingActionButton>
                        </div>
                        <div className="floatWrap">
                            <div className="pullRight">
                                <FlatButton type="submit"
                                            label="Next"
                                            disabled={!this.state.canSubmit}
                                            className="bgPri"
                                />
                            </div>
                        </div>
                    </Form>
                )
            case 1:
                return (
                    <Form
                        onSubmit={this.storeFormData}
                        onValid={this.enableButton}
                        onInvalid={this.disableButton} >
                        <div>
                            <FormsyText
                                value=""
                                name="address1"
                                hintText=""
                                floatingLabelText="Address 1"
                                style={styles.textfield}
                                errorStyle={styles.errorStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                required/>
    
                            <FormsyText
                                value=""
                                name="address2"
                                hintText=""
                                floatingLabelText="Address 2"
                                style={styles.textfield}
                                errorStyle={styles.errorStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                required/>
                            
                            <DropDown
                                name="city"
                                floatingLabelText="City"
                                cities={loadCities()}
                                onCityChange={this.updateState}/>
                            
                            <DropDown
                                name="state"
                                floatingLabelText="State"
                                state={this.state.stateList} />
    
                            <FormsyText
                                value=""
                                name="postcode"
                                hintText=""
                                floatingLabelText="PostCode"
                                style={styles.textfield}
                                errorStyle={styles.errorStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                required/>
                            <FormsyText
                                value=""
                                name="tips"
                                hintText=""
                                floatingLabelText="Tips"
                                style={styles.textfield}
                                errorStyle={styles.errorStyle}
                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                required/>
                            
                            <div className="floatWrap">
                                <div className="pullRight">
                                    <FlatButton type="submit"
                                                label="Next"
                                                disabled={!this.state.canSubmit}
                                                className="bgPri"
                                    />
                                </div>
                            </div>
                            
                        </div>
                    </Form>
                )
            case 2:
                return (
                    <div>
                        <Form
                            onSubmit={this.storeFormData} >
                            <div>
                                <p> Your Address Data </p>
                                <p> Item Price </p>
                                <p> Tips </p>
                                <p> JetSpree Fees </p>
                                <p> Your Payment Stuff </p>
                                <div className="floatWrap">
                                    <div className="pullRight">
                                        <FlatButton type="submit"
                                                    label="Let's do it"
                                                    disabled={!this.state.canSubmit}
                                                    className="bgPri"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                )
        }
    }
    
    submit(data) {
		PostRequest2(data)
            .then(response => {
                 this.handleSuccessOpen() // or redirect to other page
            })
    }

    render() {
	    
	    if(this.state.redirect == true) {
	        return <Redirect to="/"/>
        }
        
        return (
            <div className="accountForm stayCenter mgTop40" style={{'maxWidth': '700px'}}>
                <h2>Post Request</h2>
                
                <DialogBox
                    title="Message"
                    open={this.state.error}
                    onRequestClose={this.handleClose}
                    errorMessage={this.state.messageError}
                />
                
                <DialogBox
                    title="Success"
                    open={this.state.success}
                    onRequestClose={this.handleSuccessClose}
                    message="Post Request SUCCESS!"
                />
                
                <Stepper activeStep={this.state.stepindex}>
                    <Step>
                        <StepLabel>Item Details</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Shipment</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Summary</StepLabel>
                    </Step>
                </Stepper>
	
				{this.getStepContent(this.state.stepindex)}
            </div>

        );
    }
}

export default postRequest;