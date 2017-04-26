import React from "react";
import {Link} from "react-router-dom";
import {getRequest} from "../../data/requests.js";
import ReactImageFallback from "react-image-fallback";
import Placeholder from "../../../public/imgs/greyImg.gif";
import RaisedButton from "material-ui/RaisedButton";
import "../requests/View.css";
import "./View.css";

export class RequestDetails extends React.Component {
	/* constructor(props) {
	 super(props)
	 }*/

    render() {
        return (
			<div className="itemRight">
				<div className="itemImgWrap">
					<ReactImageFallback
						src={this.props.image_host + this.props.item.image_path}
						alt={this.props.item.name}
						fallbackImage={Placeholder} initialImage={Placeholder}/>
				</div>
				<div className="itemInfo">
					<h1>
						<Link to={{
                            pathname: `/products/${this.props.item.id}`,
                            state: {modal: false}
                        }}>{this.props.item.name}</Link>
					</h1>
					<p className="small">Product Id: {this.props.item.id}</p>
					<p className="itemPrice"><span>{this.props.item.price}</span></p>
					<div className="mgTop30">
						<p className="description">{this.props.item.description}</p>
					</div>
					<div className="floatWrap">
						<RaisedButton label="Buy" primary={true} className="pullRight abBottomRight"/>
					</div>

				</div>
			</div>
        )
    }
}

class RequestView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: (this.props.item ||
            {
                id: '',
                name: '',
                image_path: ''
            }),
            image_host: (this.props.imageHost || '')
        }
    }

    initData() {
        if (this.props.match) {
            // standalone page
            getRequest({
                id: this.props.match.params.Id
            }).then((data) => {
                this.setState({
                    id: data.id,
                    item: data.result[0],
                    image_host: data.image_host,
                    standalone: true
                });
            });
        } else {
            //modal page, load from ViewModal.js > const Modal
            getRequest({
                id: this.props.item.id
            }).then((data) => {
                this.setState({
                    id: data.id,
                    item: data.result[0],
                    image_host: data.image_host,
                    standalone: false
                });
            });
        }
    }

    componentDidMount() {
        this.initData();
    }

    render() {
        if (this.state.standalone === true) {
            return (
				<div className="container standalone mgTop60">
					<div className="itemWrap">
						<div className="itemBg table full">
							<div className="itemLeft">
								<div className="squareInfo">
									<div className="bgWhite">
										<a><span className="colorPri">from</span> USA</a>
									</div>
									<div className="bgWhite">
										<a><span className="colorPri">11</span> Requested</a>
									</div>
									<div className="bgWhite">
										<a><span className="colorPri">2</span> Pushed</a>
									</div>
									<div className="bgWhite">
										<a><i className="iconfont icon-facebook1"></i> Share</a>
									</div>
									<div className="bgWhite">
										<a><i className="iconfont icon-twitter"></i> Share</a>
									</div>
								</div>
							</div>
							<RequestDetails item={this.state.item} image_host={this.state.image_host}/>
						</div>
					</div>
                    <RequestRelated />
				</div>
            )
        }
        if (this.state.standalone === false) {
            return (
				<div className="container itemFull">
					<div className="itemWrap">
						<RequestDetails item={this.state.item} image_host={this.state.image_host}/>
					</div>
				</div>
            )
        }
        return null
    }
}

class RequestRelated extends React.Component {
    render() {
        return (
			<div className="content productList mgTop60">
				<h3>Related Product</h3>
				<div className="colWrap mgTop30">
					<div className="colMd4 col">
						<a href="/products/19">
							<div className="bgWhite relative">
								<div className="imgWrap">
									<img
										src="https://s3-ap-southeast-1.amazonaws.com/jetspree/requests/19/kettle-chips-mature-cheddar-and-red-onion.png"
										alt="should be here"/>
								</div>
								<div className="productInfo"><h4>Kettle Chips Mature Cheddar &amp; Red Onion</h4>
									<div className="mgBottom">14.5</div>
								</div>
							</div>
						</a>
					</div>
					<div className="colMd4 col">
						<a href="/products/19">
							<div className="bgWhite relative">
								<div className="imgWrap">
									<img
										src="https://s3-ap-southeast-1.amazonaws.com/jetspree/requests/19/kettle-chips-mature-cheddar-and-red-onion.png"
										alt="should be here"/>
								</div>
								<div className="productInfo"><h4>Kettle Chips Mature Cheddar &amp; Red Onion</h4>
									<div className="mgBottom">14.5</div>
								</div>
							</div>
						</a>
					</div>
					<div className="colMd4 col">
						<a href="/products/19">
							<div className="bgWhite relative">
								<div className="imgWrap">
									<img
										src="https://s3-ap-southeast-1.amazonaws.com/jetspree/requests/19/kettle-chips-mature-cheddar-and-red-onion.png"
										alt="should be here"/>
								</div>
								<div className="productInfo"><h4>Kettle Chips Mature Cheddar &amp; Red Onion</h4>
									<div className="mgBottom">14.5</div>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
        )
    }
}

export default RequestView;