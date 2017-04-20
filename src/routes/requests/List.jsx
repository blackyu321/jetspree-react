import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import {getRequests} from "../../data/requests.js";
import RaisedButton from "material-ui/RaisedButton";
import RequestView from "./View.jsx";
import Dialog from "material-ui/Dialog";
import "../requests/List.css";
import DialogBox from "../../components/DialogBox";

class RequestsLayout extends React.Component {
    render() {
        return (
            <div className="itemsListWrap">
                <div className="overflowFixBeta">
                    <div className="container">
                        <div className="table">
                            <div className="leftSide">
                                Category here
                            </div>
                            <div className="contentWrap tableCell full vatop">
                                <div className="content colWrap productList">
                                    <Requests />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            error: false,
            messageError: []
        };
    }

    initData() {
        let paramItems = {
            pagesize: 20
        };
        getRequests(paramItems).then((data) => {
            this.setState({items: data.result, imageHost: data.image_host});
        }).catch((error) => {
            var errmsg = this.state.messageError;
            errmsg.push(error);
            this.setState({error: true});
        });
    }

    componentDidMount() {
        this.initData();
    }

    handleClose = () => {
        this.setState({error: false})
    };

    render() {
        if (this.state.items.length > 0) {
            let itemsNodes = this.state.items.map((obj, i) => {
                if (i < 6) {
                    return (
                        <div className="colMd6 col" key={obj.id}>
                            <Link to={{
                                pathname: `/requests/${obj.id}`,
                                state: {modal: true, item: obj, image_host: this.state.imageHost}
                            }}>
                                <div className="bgWhite relative">
                                    <div className="imgWrap">
                                        <img
                                            src={this.state.imageHost + obj.image_path}
                                            alt="should be here"/>
                                    </div>
                                    <div className="productInfo"><h4>{obj.name}</h4>
                                        <div className="mgBottom colorSec">{obj.price}</div>
                                        <RaisedButton label="Buy" primary={true} className="pullRight abBottomRight"/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                } return null
            });

            return (
                <div>
                    {itemsNodes}
                </div>
            )
        } else if (this.state.error) {
            return (
                <DialogBox
                    title="Message"
                    open={this.state.error}
                    onRequestClose={this.handleClose}
                    errorMessage={this.state.messageError[0].message}
                />
            )
        }
        return null
    }
}



export class CompletedRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            error: false,
            messageError: []
        };
    }

    initData() {
        let paramItems = {
            pagesize: 20
        };
        getRequests(paramItems).then((data) => {
            this.setState({items: data.result, imageHost: data.image_host});
        }).catch((error) => {
            var errmsg = this.state.messageError;
            errmsg.push(error);
            this.setState({error: true});
        });
    }

    componentDidMount() {
        this.initData();
    }

    handleClose = () => {
        this.setState({error: false})
    };

    render() {
        if (this.state.items.length > 0) {
            let itemsNodes = this.state.items.map((obj, i) => {
                if (i < 6) {
                    return (
                        <div className="colMd6 col" key={obj.id}>
                            <Link to={{
                                pathname: `/requests/${obj.id}`,
                                state: {modal: true, item: obj, image_host: this.state.imageHost}
                            }}>
                                <div className="bgWhite relative">
                                    <div className="imgWrap">
                                        <img
                                            src={this.state.imageHost + obj.image_path}
                                            alt="should be here"/>
                                    </div>
                                    <div className="productInfo">
                                        <h4>{obj.name}</h4>
                                        <div className="mgBottom colorSec">{obj.price}</div>
                                    </div>
                                    <div className="completedBy">
                                        <div className="table full">
                                        <div className="avatar">
                                            <img src="https://a0.muscache.com/im/pictures/90aef051-f5b7-471a-b4f2-fbb3f5e5fb89.jpg?aki_policy=profile_x_medium" />
                                        </div>
                                        <div className="tableCell vaMiddle">
                                        <span>Yuho</span> delivered Nindento Swtich to hub
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                } return null
            });

            return (
                <div>
                    {itemsNodes}
                </div>
            )
        } else if (this.state.error) {
            return (
                <DialogBox
                    title="Message"
                    open={this.state.error}
                    onRequestClose={this.handleClose}
                    errorMessage={this.state.messageError[0].message}
                />
            )
        }
        return null
    }
}



const styles = {
    dialogRoot: {
        paddingTop: 0,

    },
    dialogBody: {
        minHeight: 400,
        background: "#fff",
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        fontSize: 'inherit'

    },
    dialogTitle: {
        fontSize: 18,
        padding: "10px 20px"
    }
};

const Modal = ({match, history}) => {
    if (match.isExact) {
        var modalOpen = true
    }

    const back = () => {
        var modalOpen = false;
        history.goBack();
    };

    let item = (history.location.state.item ? history.location.state.item : {});
    let imageHost = (history.location.state.image_host ? history.location.state.image_host : '');

    return (
        <Dialog modal={false} open={modalOpen} onRequestClose={back} autoScrollBodyContent={true} className="itemModal"
                bodyStyle={ styles.dialogBody } style={ styles.dialogRoot } titleStyle={ styles.dialogTitle}
                repositionOnUpdate={ false }>
            <RequestView id={match.params.id} item={item} imageHost={imageHost}/>
            {/*<button type='button' onClick={back}>Close</button>*/}

        </Dialog>
    )
};

class RequestsList extends React.Component {
    previousLocation = this.props.location;

    componentWillUpdate(nextProps) {
        const {location} = this.props;
        // set previousLocation if props.location is not modal
        if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
            this.previousLocation = this.props.location
        }
    }

    render() {
        const {location} = this.props;
        const isModal = (
            location.state && location.state.modal && this.previousLocation !== location // not initial render
        );

        return (
            <div>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route exact path='/requests' component={RequestsLayout}/>
                </Switch>
                {isModal ?
                    <div className="modalView"><Route path='/requests/:id' component={Modal}/>
                    </div> : <Route exact path='/requests/:Id' component={RequestView}/>}
            </div>
        )
    }
}


export default RequestsList;