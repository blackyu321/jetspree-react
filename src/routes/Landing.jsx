import React from "react";
//import logo from "../logo.svg";
import Select from "react-select";
import {Link} from "react-router-dom";
import {getRequests} from "../data/requests.js";
//import {loadRecommendations, loadTrips} from "../data/traveller.js";
import {FormattedDate} from "react-intl";
import ReactImageFallback from "react-image-fallback";
import "./Landing.css";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Dialog from "material-ui/Dialog";
//import How1 from "../../public/imgs/how1.png";
//import How2 from "../../public/imgs/how2.png";
//import How3 from "../../public/imgs/how3.png";
//import How4 from "../../public/imgs/how4.png";
//import banner from "../../public/imgs/banner7.jpg";
import travellerBanner from "../../public/imgs/suitcase.jpg"
import happywomen from "../../public/imgs/happywomen.jpg"
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import {Products} from "./products/List";
import {CompletedRequests} from "./requests/List"
//import history from "../helper/History";
import ReactTooltip from 'react-tooltip'


// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const people = [
    {
        first: 'Charlie',
        last: 'Brown',
        twitter: 'dancounsell'
    },
    {
        first: 'Charlotte',
        last: 'White',
        twitter: 'mtnmissy'
    }
];

/*function getSuggestions(value) {
 const escapedValue = escapeRegexCharacters(value.trim());
 if (escapedValue === '') {
 return [];
 }
 const regex = new RegExp('\\b' + escapedValue, 'i');
 return people.filter(person => regex.test(getSuggestionValue(person)));
 }*/


function getSuggestionValue(suggestion) {
    return `${suggestion.name}`;
}

function renderSuggestion(suggestion, {query}) {
    const suggestionText = `${suggestion.name}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
        <a href={"/products/" + suggestion.id}>
            <div className={'suggestion-content '}>

                <div className="smallImgWrap"><img src={suggestion.pic}/></div>
                <span className="name">
                {
                    parts.map((part, index) => {
                        const className = part.highlight ? 'highlight' : null;
                        return (
                            <span className={className} key={index}>
                        {part.text}
                    </span>
                        );
                    })
                }
                </span>

            </div>
        </a>
    );
}


class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: [],
            isFetch: false
        };
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
    }

    onChange = (event, {newValue, method}) => {
        this.setState({
            value: newValue
        });
    };

    getSuggestionValue(suggestion) {
        //this.props.passId(suggestion.id) //pass clicked result to app.jsx
        //return `${suggestion.name}`; // display clicked result name (original)
    }

    onSuggestionsFetchRequested = ({value}) => {
        getRequests({
            pagesize: 5,
            name: value,
        }).then((data) => {
            if (data.success) {
                this.setState({
					suggestions: data.result.map((obj, i) => {
						return {name: obj.name, id: obj.id, pic: data.image_host + obj.image_path};
					}),
					isFetch: true
				})
            }
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const {value, suggestions} = this.state;
        const inputProps = {placeholder: "What are you want to buy?", value, onChange: this.onChange};

        let toolTip;
        let transition = "aniOff";
        if (this.state.isFetch) {
            if (this.state.suggestions.length === 0 && this.state.value !== '') {
                toolTip = <div className="toolTips slideInDown delay">No suggestion or doesn't match? Post a new request
                    instead</div>;
                transition = 'aniOn';
            } else {
                transition = 'aniOff';
            }
        }

        return (
            <div id="searchBar">
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}/>
                <RaisedButton className={`btnPost transition ${transition}`} primary={true} label="Post Request"
                              containerElement={<Link to={{pathname: '/post-request', state: {name: this.state.value}}}/>}/>
                {toolTip}
            </div>
        );
    }
}

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: '',
            name: 'cake',
            category: 'snacks',
            countries: [],
            categories: [],
            modalOpen: false,
        };
        this.buttonClick = this.buttonClick.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
    }

    loadData(pagesize) {
        let param = {
            name: this.state.name,
            category: this.state.category,
            pagesize: pagesize
        };
        getRequests(param).then((data) => {
            this.setState({requests: JSON.stringify(data)});
        });
    }

    buttonClick(pagesize) {
        this.setState({requests: ""});
        this.loadData(pagesize);
    }

    inputChange(event) {
        this.setState({name: event.target.value});
    }

    changeCategory(val) {
        this.setState({category: val.value});
    }

    render() {
        return (
            <div className="LandingPage">
                <div id="banner">
                    <div className="bannerimg">
                        <img src={happywomen} alt="banner"/>
                    </div>
                    <div className="banner fullheight">
                        <div className="container fullheight">
                            <div className="table fullheight stayCenter">
                                <div className="banner-text tableCell vaMiddle full">
                                    <h1>Order stuff Globally from traveller. 100% worry-free.</h1>
                                    <p>Get your stuff within 2 weeks, or you can have all your money fully refunded.
                                        Guaranteed.</p>
                                    {/*<div className="askuser">Please tell us who you are</div>
                                     <RaisedButton label="I am Shopper" primary={true} className="btnShopper btnBig" style={{height: '45px',}}/>
                                     <RaisedButton label="I am Traveller" secondary={true} className="btnTraveller btnBig" style={{height: '45px',}}/>
                                     */}
                                    <SearchBar passId={this.props.passId} passValue={this.props.passValue}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bgWhiteX">
                    {/*<div className="howItWork taCenter">
                     <div className="container">
                     <h2>How Jetspree Work?</h2>
                     <div className="colMd3 col"><img src={How1} alt="post your request"/>
                     <div><p className="colorPri">Post your buy request</p><span>Request any item from around the world.</span>
                     </div>
                     </div>
                     <div className="colMd3 col"><img src={How2} alt="post your request"/>
                     <div><p className="colorPri">Traveller offer to help</p><span>Accept traveller's offer and deposit money.</span>
                     </div>
                     </div>
                     <div className="colMd3 col"><img src={How3} alt="post your request"/>
                     <div><p className="colorPri">Traveller delivers item</p><span>100% refund if not fullfilled.</span>
                     </div>
                     </div>
                     <div className="colMd3 col"><img src={How4} alt="post your request"/>
                     <div><p className="colorPri">Payment release to traveller</p><span>Traveller will be paid after acknowledged by shopper.</span>
                     </div>
                     </div>
                     </div>
                     </div>*/}

                    <div className="container pd40">
                        <div>
                            {/*<aside className="leftSide">
                             <h3>Recent Trips<span className="colorGrey small">See what they're going to buy</span>
                             </h3>
                             <ul className="travelerList">
                             <Trips />
                             </ul>
                             </aside>*/}
                            <div>
                                <div className="floatWrap mgBottom10">
                                    <h3 className="pullLeft">Recently Completed</h3>
                                    <div className="pullRight mgTop10"><span>View All</span></div>
                                </div>
                                <div className="content colWrap recentList">
                                    <CompletedRequests />
                                    {/* <label>Name:</label><input type="text" value={this.state.name}
                                     onChange={this.inputChange}/><br />
                                     <label>Category</label><Select name="form-category" searchable={false}
                                     clearable={false}
                                     value={this.state.category}
                                     options={this.state.categories}
                                     onChange={this.changeCategory}/>
                                     <input type="button" onClick={() => this.buttonClick(100)} value="Get 100 records"/>
                                     <input type="button" onClick={() => this.buttonClick(1000)}
                                     value="Get 1000 records!"/>
                                     <pre>{this.state.requests}</pre>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative sectionBanner buyerBanner">
                    <div className="container">
                        <div className="travelBanner table full">
                            <div className="tableCell vaMiddle">
                                <h2>Request with Confidence</h2>
                                <p>100% refund if your request is not fulﬁlled. No question asked.</p>
                                <div className="mgTop20">
                                    <i className="iconfont icon-paypal"></i> Power by <span data-tip data-for='paypaltt' className="paypal inlineBlock">Paypal</span>
                                    <ReactTooltip id="paypaltt" place="right" type="info" effect="solid">
                                        <span>PayPal is a worldwide online payments system that supports online money transfers and serves as an electronic alternative to traditional paper methods like checks and money orders.</span>
                                    </ReactTooltip>
                                </div>
                            </div>
                            <div className="pullRight sideBanner">
                                <img src={happywomen} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bgWhiteX">
                    <div className="container pd40">
                        <div className="contentWrap">
                            <div className="floatWrap mgBottom10">
                                <h3 className="pullLeft">Popular Items</h3>
                                <div className="pullRight mgTop10"><span>View All</span></div>
                            </div>
                            <div className="content colWrap productList popularList">
                                <Products />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative sectionBanner pdWrap">
                    <div className="container">
                        <div className="travelBanner">
                            <img className="bgBanner" src={travellerBanner}/>
                            <div className="pullLeft bannerAction">
                                <h2>Traveling soon? Earn money while on your trip!</h2>
                                <p>Just grab the requested items and send them to us at the airport.<br />It’s that simple.</p>
                                <FlatButton label="Where are you going to?" className="btnSec btnBig bgSec"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Landing;
//export default  withStyles(homeStyle)(Landing);