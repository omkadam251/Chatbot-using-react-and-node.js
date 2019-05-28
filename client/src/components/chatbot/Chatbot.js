
import React, { Component } from 'react';
import axios from "axios/index";

import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

import Message from './Message';
import Card from './Card';
import QuickReplies from './QuickReplies';

const cookies = new Cookies();


class Chatbot extends Component {
	messagesEnd;
	talkInput;

    constructor(props) {
        super(props);
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);

        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);


        this.state = {
            messages: [],
						showBot: true,
						shopWelcomeSent: false,
						clientToken: false,
						regenerateToken: 0

        };
				if (cookies.get('userID') === undefined) {
           cookies.set('userID', uuid(), { path: '/' });
         }
				 console.log(cookies.get('userID'));
    }


		async df_text_query(text) {

        let says = {
            speaks: 'user',
            msg: {
                text : {
									text: text
                }
            }
        }
        this.setState({ messages: [...this.state.messages, says]});
	//			const res = await axios.post('/api/df_text_query',  {text: Text});
	 //	//		const res = await axios.post('/api/df_text_query',  {text: Text, userID: cookies.get('userID')});
	 const request = {
					 queryInput: {
							 text: {
									 text: text,
									 languageCode: 'en-US',
							 },
	          }
					};

			 await this.df_client_call(request);

    };


    async df_event_query(event)
		{
			const request = {
            queryInput: {
                event: {
                    name: event,
                    languageCode: 'en-US',
                },
            }
        };

        await this.df_client_call(request);

    };

    async df_client_call(request) {


    	try{

	//			const res = await axios.post('/api/df_event_query',  {event: event});
//	//		const res = await axios.post('/api/df_event_query',  {event: event, userID: cookies.get('userID')});

if (this.state.clientToken === false) {
const res = await axios.get('/api/get_client_token');
this.setState({clientToken: res.data.token});

//console.log(res.data.queryResult);
            }
						//console.log("hi2");

            var config = {
                headers: {
									'Authorization': "Bearer " + this.state.clientToken,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };


            const res = await axios.post(
                'https://dialogflow.googleapis.com/v2/projects/' + process.env.REACT_APP_GOOGLE_PROJECT_ID +
                '/agent/sessions/' + process.env.REACT_APP_DF_SESSION_ID + cookies.get('userID') + ':detectIntent',
                request,
                config
            );



   if (res.data.queryResult.fulfillmentMessages ) {
//console.log("hi3");

        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'bot',
                msg: msg
            }

            this.setState({ messages: [...this.state.messages, says]});
        	}
        }
				this.setState({regenerateToken : 0});
			}
        catch(error)
        {
					if (error.response.status === 401 && this.state.regenerateToken < 1) {
							this.setState({ clientToken: false, regenerateToken: 1 });
							this.df_client_call(request);
					}

					else {
							let says = {
									speaks: 'bot',
									msg: {
											text : {
													text: "I'm having troubles. I need to terminate. will be back later"
									}
																		      }
								                }
																this.setState({ messages: [...this.state.messages, says]});
	 let that = this;
	 setTimeout(function(){
			 that.setState({ showBot: false})
	 }, 20000);
        }
		}
	}

		// this.setState({ messages: [...this.state.messages, says]});

		//  let that = this;
	  //            setTimeout(function(){
	  //                that.setState({ showBot: false})
	  //            }, 2000);
	  //        }
		// 			 resolveAfterXSeconds(x) {
    //     return new Promise(resolve => {
    //         setTimeout(() => {
    //             resolve(x);
    //         }, x * 1000);
    //     })
    // }


    componentDidMount() {
        this.df_event_query('Welcome');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
				//this.talkInput.focus();

				if ( this.talkInput ) {
					 this.talkInput.focus();
			 }
	 }

	 show(event) {
			window.event.preventDefault();
			 window.event.stopPropagation();
			 this.setState({showBot: true});
	 }

	 hide() {
			 window.event.preventDefault();
		 window.event.stopPropagation();
			 this.setState({showBot: false});
    }

    _handleQuickReplyPayload(event,payload,text)  {
    		window.event.preventDefault();
    //		 window.event.stopPropogation();


	// Insert the events here in switch method that u will declare in dialogflow
				switch (payload) {


												case 'training_auto_fee':
										        this.df_event_query('AUTO_FEE');
														break;
												case 'training_mech_fee':
													 	this.df_event_query('MECH_FEE');
														break;
												case 'training_electrical_fee':
														this.df_event_query('ELECTRICAL_FEE	');
														break;
												case 'training_etc_fee':
										        this.df_event_query('ETC_FEE');
														break;
												case 'training_civil_fee':
										        this.df_event_query('CIVIL_FEE');
														break;
												case 'training_cse_fee':
										        this.df_event_query('CSE_FEE');
														break;
												case 'training_it_fee':
										        this.df_event_query('IT_FEE');
														break;

												case 'training_mmech_fee':
														this.df_event_query('MMECH_FEE');
														break;

												case 'training_mcivil_fee':
														this.df_event_query('MCIVIL_FEE');
														break;
												case 'training_mcse_fee':
														this.df_event_query('MCSE_FEE');
														break;
												case 'training_bba_fee':
														this.df_event_query('BBA_FEE');
														break;
												case 'training_mba_fee':
														this.df_event_query('MBA_FEE');
														break;
														case 'training_btech_fee':
																this.df_event_query('BTECH_FEE');
																break;
																case 'training_documents':
																		this.df_event_query('DOCUMENTS');
																		break;

														case 'training_mtech_fee':
																this.df_event_query('MTECH_FEE');
																break;
														case 'training_management_fee':
												       	this.df_event_query('MANAGEMENT_FEE');
																break;




	            default:
	                this.df_text_query(text);
	                break;
	        }

    }

    renderCards(cards) {
			return cards.map((card, i) => <Card key={i} payload={card}/>);
    }

    renderOneMessage(message, i)
    {
        if (message.msg && message.msg.text && message.msg.text.text)
        {
					  console.log("if",i);
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
        }
        else if (message.msg
					       && message.msg.payload
								 && message.msg.payload.fields
								 && message.msg.payload.fields.cards)

        { //message.msg.payload.fields.cards.listValue.values
						console.log(message.msg.payload.fields);
						console.log("else1",i);
            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow: 'hidden'}}>
                        <div className="col s2">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
                        </div>
                        <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
												<div style={{ height: 300, width:message.msg.payload.cards.length * 270}}>
														{this.renderCards(message.msg.payload.cards)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

       else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.quick_replies)
        {
					console.log("else2",i);
            return <QuickReplies
						text={message.msg.payload.text ? message.msg.payload.text : null}
                key={i}
                replyClick={this._handleQuickReplyPayload}
                speaks={message.speaks}
								payload={message.msg.payload.quick_replies}/>;
        }
	}
    renderMessages(returnedMessages) {
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
            	return this.renderOneMessage(message, i);
                });
        } else {
            return null;
        }
    }
    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }


    render() {
			if (this.state.showBot) {
					return (
							<div style={{ minHeight: 500, maxHeight: 470, width:400, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgray'}}>
									<nav>
											<div className="nav-wrapper">
													<a href="/" className="brand-logo">ChatBot</a>
													<ul id="nav-mobile" className="right hide-on-med-and-down">
															<li><a href="/" onClick={this.hide}>Close</a></li>
													</ul>
											</div>
									</nav>

									<div id="chatbot"  style={{ minHeight: 388, maxHeight: 388, width:'100%', overflow: 'auto'}}>

									{this.renderMessages(this.state.messages)}
                        <div ref={(el) => { this.messagesEnd = el; }}
                             style={{ float:"left", clear: "both" }}>
                        </div>
                    </div>
                    <div className=" col s12" >
                        <input style={{margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}} ref={(input) => { this.talkInput = input; }} placeholder="type a message:"  onKeyPress={this._handleInputKeyPress} id="user_says" type="text" />
                    </div>

                </div>
            );
        } else {
            return (
                <div style={{ minHeight: 40, maxHeight: 500, width:400, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgray'}}>
                    <nav>
                        <div className="nav-wrapper">
                            <a href="/" className="brand-logo">ChatBot</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/" onClick={this.show}>Show</a></li>
                            </ul>
                        </div>
                    </nav>

                     <div ref={(el) => { this.messagesEnd = el; }}
                         style={{ float:"left", clear: "both" }}>
                     </div>
										 </div>

									 );
        }
    }
}
export default Chatbot;
