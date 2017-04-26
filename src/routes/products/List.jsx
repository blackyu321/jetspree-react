import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import {getRequests} from "../../data/requests.js";
import RaisedButton from "material-ui/RaisedButton";
import ProductView from "./View.jsx";
import Dialog from "material-ui/Dialog";
import "../requests/List.css";
import DialogBox from "../../components/DialogBox";

class ProductsLayout extends React.Component {
    render() {
        return (
            <div className="productsListWrap">
                <div className="overflowFixBeta">
                    <div className="container">
                        <div className="table">
                            {/*<div className="leftSide">
                                Category here
                            </div>*/}
                            <div className="contentWrap tableCell full vatop">
                                <div className="content colWrap productList productAnimate">
                                    <Products />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class Products extends React.Component {
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

                    return (
                        <div className="colMd4 col" key={obj.id}>
                            <Link to={{
                                pathname: `/products/${obj.id}`,
                                state: {modal: true, item: obj, image_host: this.state.imageHost}
                            }}>
                                <div className="bgWhite relative">
                                    <div className="imgWrap">
                                        <img
                                            src={this.state.imageHost + obj.image_path}
                                            alt="should be here"/>
                                    </div>
                                    <div className="productInfo">

                                        <div className="hoverImg">
                                        <img src={this.state.imageHost + obj.image_path} alt="should be here"/>
                                        </div>
                                        <h4>{obj.name}</h4>
                                        <div className="mgBottom colorSec">{obj.price}</div>
                                        <RaisedButton label="I want this" primary={true} className="pullRight abBottomRight"/>
                                    </div>
                                    <div className="requestBy">

                                            <div className="inlineBlock">
                                            <div className="avatar inlineBlock vaMiddle">
                                                <img src="http://images.kdramastars.com/data/images/full/166525/jin-se-yeon.jpg?w=320&h=&l=50&t=40" />
                                            </div>
                                            <div className="avatar inlineBlock vaMiddle">
                                                <img src="https://68.media.tumblr.com/a7e3ca3a883c7cea6dc549438008167f/tumblr_ole0a73C7x1w4ty6ho4_400.png" />
                                            </div>
                                            <div className="avatar inlineBlock vaMiddle">
                                                <img src="http://www.sritown.com/korean/star/oh-yeon-seo/oh-yeon-seo-05.jpg" />
                                            </div>
                                            </div>
                                            <div className="inlineBlock vaMiddle">
                                                5 Requested
                                            </div>

                                    </div>
                                </div>
                            </Link>
                        </div>
                    )

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
                    errorMessage={this.state.messageError}
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
            <ProductView id={match.params.id} item={item} imageHost={imageHost}/>
            {/*<button type='button' onClick={back}>Close</button>*/}

        </Dialog>
    )
};

class ProductsList extends React.Component {
    // We can pass a location to <Switch/> that will tell it to
    // ignore the router's current location and use the location
    // prop instead.
    //
    // We can also use "location state" to tell the app the user
    // wants to go to `/images/2` in a modal, rather than as the
    // main page, keeping the gallery visible behind it.
    //
    // Normally, `/images/2` wouldn't match the gallery at `/`.
    // So, to get both screens to render, we can save the old
    // location and pass it to Switch, so it will think the location
    // is still `/` even though its `/images/2`.
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
                    <Route exact path='/products' component={ProductsLayout}/>
                </Switch>
                {isModal ?
                    <div className="modalView"><Route path='/products/:id' component={Modal}/>
                    </div> : <Route exact path='/products/:Id' component={ProductView}/>}
            </div>
        )
    }
}


export default ProductsList;