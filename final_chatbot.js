'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
/*
app.post('/webhook/', function (req, res) {
let messaging_events = req.body.entry[0].messaging
for (let i = 0; i < messaging_events.length; i++) {
let event = req.body.entry[0].messaging[i]
let sender = event.sender.id
if (event.message && event.message.text) {
let text = event.message.text
sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
}
}
res.sendStatus(200)
})
*/

const token = "EAACEwflK268BAKIR8wnRdzTrcix8OOTAwA5ZChAwbLtbjifMSoYjGRqIM97uLrT0Hl8utxz3VQlZBm0cQzzCZBo2opyB5gZBQOQUQumdDrqfzis7vOlIZCf1z1b4iEo0L2nLbQDW5oWZBFSAtZAAfPHWSw8MFCbG0EPdAXwlIUcdAZDZD"

function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                        }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                        }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendHelloMessage(sender) {
    let messageData = { text:"Welcome to Trash Talk! We are here to help you sort your garabage and save the world! Please remeber to enter your answer exactly as we show the option. Please write if your item is 'Plastic', 'Paper', 'Glass', 'Metal' or 'Scraps'. " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


function sendPlasticMessage(sender) {
    let messageData = { text:"You chose Plastic. Please type if your item is a 'tub, bottle or cup', 'packaging', a 'lid', a 'bag', or 'food related' " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


function sendPlasticMessage_A(sender) {
    let messageData = { text:"You chose 'tub, bottle or cup'. Please type if your item is 'motoroil or antifreeze', 'perscription vial' or 'other' (such as a yogurt or shampoo container) " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


function sendTrashMessage(sender) {
    let messageData = { text:"Your item should go in the trash! Thank you for using Trash Talk! Please enter 'hello' to do another item. " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendRecycleMessage(sender) {
    let messageData = { text:"Your item should go in the recycling! Thank you for using Trash Talk! Please enter 'hello' to do another item. " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPackagingMessage(sender) {
    let messageData = { text:"You chose packaging. Please type if your item is a 'wrapper', or 'styrofoam' " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendStyrofoamMessage(sender) {
    let messageData = { text:"You chose styrofoam. Please type if your item is 'packing', or a 'cup or carton' " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPackingMessage(sender) {
    let messageData = { text:"Your item goes in the trash. Please try to resuse before throwing in trash. Thank you for using Trash Talk! Please enter 'hello' to do another item.' " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendcuporcartonMessage(sender) {
    let messageData = { text:"Your item goes in the trash. Thank you for using Trash Talk! Please enter 'hello' to do another item.' " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendFoodRelatedMessage(sender) {
    let messageData = { text:"You chose Food Related. Please type if your item is 'plate or utensils' or 'take out container' " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendTrashnotpaperMessage(sender) {
    let messageData = { text:"Your item goes in the trash. But please make sure that if it is a paper take out container that it goes in recycling. Thank you for using Trash Talk! Please enter 'hello' to do another item.' " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperMessage(sender) {
    let messageData = { text:"You chose Paper. Please type if your item is a: 'magazine/newspaper', 'wrapping paper', 'book', 'cardboard', 'tissue, paper towel, or paper', or  'container, box, cup, or carton'. " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperAMessage(sender) {
    let messageData = { text:"You chose magazine/newspaper. These items are recyclable! Enter 'hello' in order to go back to the first question and enter another item. " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperBMessage(sender) {
    let messageData = { text:"You chose wrapping paper. Please type if the wrapping paper is: 'covered in foil' or 'not covered in foil' . " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperBAMessage(sender) {
    let messageData = { text:"You chose covered in foil. This type of paper goes into the trash. Enter 'hello' in order to go back to the first question and enter another item! " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperBBMessage(sender) {
    let messageData = { text:"You chose not covered in foil. This type of paper goes into recycling! Enter 'hello' in order to go back to the first question and enter another item! " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperCMessage(sender) {
    let messageData = { text:"You chose book. Please consider donating your book! If your book can't be donated, it can be recycled if it's paperback. Otherwise, hardback books go in the trash. Enter 'hello' in order to go back to the first question and enter another item! " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperDMessage(sender) {
    let messageData = { text:"You chose cardboard. Please type if the piece of cardboard is: 'covered in wax or plastic' or 'not covered' . " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperDAMessage(sender) {
    let messageData = { text:"You chose 'covered in wax or plastic'. This cardboard item goes in the trash. Enter 'hello' in order to go back to the first question and enter another item! " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperDBMessage(sender) {
    let messageData = { text:"You chose 'not covered'. This cardboard item goes in the recycling! Enter 'hello' in order to go back to the first question and enter another item! " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperEMessage(sender) {
    let messageData = { text:"You chose tissue/paper towel/paper. Please type if this item is 'mail/envelopes', 'dirty' or 'clean' . " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
function sendPaperEAMessage(sender) {
    let messageData = { text:"You chose mail/envelopes. This goes into recycling!  Enter 'hello' in order to go back to the first question and enter another item! " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperEBMessage(sender) {
    let messageData = { text:"You chose 'dirty'. If the tissue/paper towel/paper is covered in chemicals, it goes in the trash. Otherwise, it can go in the compost! Thank you for using Trash Talk! Please enter 'hello' to sort a new item. " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperECMessage(sender) {
    let messageData = { text:"You chose clean. This goes into recycling!  Enter 'hello' in order to go back to the first question and enter another item! " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperFMessage(sender) {
    let messageData = { text:"You chose container, box, cup, or carton. Please type in whether the item is 'clean' or 'soiled' " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperFAMessage(sender) {
    let messageData = { text:"You chose clean. This type of paper goes into the recycling. Enter 'hello' in order to go back to the first question and enter another item! " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperFBMessage(sender) {
    let messageData = { text:"You chose soiled. Please type in whether this item is a 'soiled food box' or is 'cleanable' " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperFB1Message(sender) {
    let messageData = { text:"You chose soiled food box. This type of paper is compostable!. Enter 'hello' in order to go back to the first question and enter another item! " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPaperFB2Message(sender) {
    let messageData = { text:"You chose cleanable. Make sure your item is completely clean and hasn't been covered in any liquid, and then put it in the recycling! Enter 'hello' in order to go back to the first question and enter another item! " }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendMetalMessage(sender) {
    let messageData = { text:"You chose Metal. Please type if your item is  'aluminum and/or tin',  'fewer than 35lbs/2x2 ft', 'more than 35 lbs/2x2 ft' or 'sharp or greasy' . " }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}
function sendMetalAMessage(sender) {
    let messageData = { text:"You chose aluminum and/or tin. Please type if your item is a 'can' or is 'foil'. " }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}
function sendMetalAAMessage(sender) {
    let messageData = { text:"You chose 'can'. Please type whether your item is covered in 'paint, oil, or spray', or 'not'. " }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}
function sendMetalAA1Message(sender) {
    let messageData = { text:"You chose covered in paint/oil/spray. This type of item goes in the trash. Enter 'hello' to go back to the first question and enter another item! " }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}
function sendMetalABMessage(sender) {
    let messageData = { text:"You chose Foil. This item goes into the recyling! Enter 'hello' to go back to the first question and enter another item! " }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}
function sendMetalBMessage(sender) {
    let messageData = { text:"You chose fewer than 35lbs/2x2 ft. Please type whether this item is a 'clothes hanger', 'small appliance', a 'cap or lid', or is 'none' of these things." }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}
function sendMetaldonateMessage(sender) {
    let messageData = { text:"Please donate this item! If you can't donate this item, it goes in the trash. Enter 'hello' to go back to the first question if you want to enter another item." }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}
function sendMetalCMessage(sender) {
    let messageData = { text:"You chose More than 35lbs/2x2 ft. If it's an appliance that can be used by someone else, try to donate it! Otherwise it goes in the trash. Enter 'hello' to go back to the first question and enter another item! " }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}

/*function sendScrapsMessage(sender) {
    let messageData = { text:"You chose Scraps/Waste. Please type if your item is A: yard waste; or B: food scraps; "}
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}*/

function sendGlassMessage(sender) {
    let messageData = { text:"You chose glass. Please type if your item is 'broken', 'mirror or window', 'ceramic', 'jar or bottle' or 'lightbulb' "}
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendlightbulbMessage(sender) {
    let messageData = { text:"You chose lightbulb. Please type if your item is 'compact florescent tubes' or 'incandescent or halogen'"}
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendscraps_wasteMessage(sender) {
    let messageData = { text:"You chose scraps. Please type if your item is 'yard waste' or 'food scraps'"}
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendCompostMessage(sender) {
    let messageData = { text:"Your item goes in the compost! Thank you got using trash talk! Please enter 'hello' to do another item "}
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

/*
function sendPlasticAMessage(sender) {
let messageData = { text:"You chose A: tub, bottle or cup. Please type if your item is A: motoroil or antifreeze; B: perscription vial; or C: other (such as a yogurt or shampoo container) . " }
request({
url: 'https://graph.facebook.com/v2.6/me/messages',
qs: {access_token:token},
method: 'POST',
json: {
recipient: {id:sender},
message: messageData,
}
}, function(error, response, body) {
if (error) {
console.log('Error sending messages: ', error)
} else if (response.body.error) {
console.log('Error: ', response.body.error)
}
})
}

/*function sendFirstMessage(sender) {
let messageData = {
"attachment": {
"type": "template",
"payload": {
"template_type": "generic",
"elements": [{
"title": "Welcome to Trash Talk",
"subtitle": "We are here to help you sort your garbage and save the world!",
"image_url": "https://scontent-sea1-1.xx.fbcdn.net/v/t31.0-8/20643289_411881605876597_1720212181995019141_o.jpg?oh=69391d5b569bbb55f1e9a378658fc14c&oe=59F73924",
"buttons": [{
"type": "web_url",
"url": "https://www.messenger.com",
"title": "Plastic"
}, {
"type": "postback",
"title": "Paper",
"payload": "Payload for first element in a generic bubble",
}, {
"type": "postback",
"title": "More options please",
"payload": "This is a test. I need more buttons",
}],
}, {
"title": "Second card",
"subtitle": "Element #2 of an hscroll",
"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
"buttons": [{
"type": "postback",
"title": "Postback",
"payload": "Payload for second element in a generic bubble",
}],
}]
}
}
}
request({
url: 'https://graph.facebook.com/v2.6/me/messages',
qs: {access_token:token},
method: 'POST',
json: {
recipient: {id:sender},
message: messageData,
}
}, function(error, response, body) {
if (error) {
console.log('Error sending messages: ', error)
} else if (response.body.error) {
console.log('Error: ', response.body.error)
}
})
}
/*
app.post('/webhook/', function (req, res) {
let messaging_events = req.body.entry[0].messaging
for (let i = 0; i < messaging_events.length; i++) {
let event = req.body.entry[0].messaging[i]
let sender = event.sender.id
if (event.message && event.message.text) {
let text = event.message.text
if (text === 'Generic') {
sendGenericMessage(sender)
continue
}
sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
}
}
res.sendStatus(200)
})*/

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
            if ((text == 'hi') || (text =="hello")) {
                sendHelloMessage(sender)
                continue
            }
            if (text.toLowerCase() =='plastic'){
                sendPlasticMessage(sender)
                continue
            }
            if((text.toLowerCase() =='tub') || (text.toLowerCase() =='bottle') || (text.toLowerCase() == 'cup') || (text.toLowerCase() == 'tub, bottle or cup'))  {
                sendPlasticMessage_A(sender)
                continue
            }
            if ((text.toLowerCase() =='motoroil') || (text.toLowerCase()== 'antifreeze')) {
                sendTrashMessage(sender)
                continue
            }
            if (text.toLowerCase() =='other'){
                sendRecycleMessage(sender)
                continue
            }
            if (text.toLowerCase() =='persciption vial'){
                sendTrashMessage(sender)
                continue
            }
            if (text.toLowerCase() =='packaging'){
                sendPackagingMessage(sender)
                continue
            }
            if (text.toLowerCase() =='wrapper'){
                sendTrashMessage(sender)
                continue
            }
            if (text.toLowerCase() =='styrofoam'){
                sendStyrofoamMessage(sender)
                continue
            }
            if (text.toLowerCase() =='packing'){
                sendPackingMessage(sender)
                continue
            }
            if (text.toLowerCase() =='cup or carton'){
                sendcuporcartonMessage(sender)
                continue
            }
            if (text.toLowerCase() =='lid'){
                sendTrashMessage(sender)
                continue
            }
            if (text.toLowerCase() =='bag'){
                sendRecycleMessage(sender)
                continue
            }
            if (text.toLowerCase() =='food related'){
                sendFoodRelatedMessage(sender)
                continue
            }
            if (text.toLowerCase() =='plate or utensils'){
                sendTrashMessage(sender)
                continue
            }
            if (text.toLowerCase() =='take out container'){
                sendTrashnotpaperMessage(sender)
                continue
            }

            if (text.toLowerCase() =='paper'){
                sendPaperMessage(sender)
                continue
            }
            if ((text.toLowerCase() =='magazine/newspaper') || (text.toLowerCase() =='magazine') || (text.toLowerCase() =='newspaper')){
                sendPaperAMessage(sender)
                continue
            }
            if (text.toLowerCase() =='wrapping paper'){
                sendPaperBMessage(sender)
                continue
            }
            if (text.toLowerCase() =='covered in foil'){
                sendPaperBAMessage(sender)
                continue
            }
            if (text.toLowerCase() =='not covered in foil'){
                sendPaperBBMessage(sender)
                continue
            }
            if (text.toLowerCase() =='book'){
                sendPaperCMessage(sender)
                continue
            }
            if (text.toLowerCase() =='cardboard'){
                sendPaperDMessage(sender)
                continue

            }
            if ((text.toLowerCase() =='covered in wax or plastic') || (text.toLowerCase() =='covered in wax') || (text.toLowerCase() =='covered in plastic') || (text.toLowerCase() =='plastic') || (text.toLowerCase() =='wax')){
                sendPaperDAMessage(sender)
                continue
            }
            if (text.toLowerCase() =='not covered'){
                sendPaperDBMessage(sender)
                continue
            }
            if ((text.toLowerCase() =='tissue, paper towel, or paper') || (text.toLowerCase() =='tissue') || (text.toLowerCase() =='paper towel') || (text.toLowerCase() =='paper')) {
                sendPaperEMessage(sender)
                continue
            }
            if ((text.toLowerCase() =='mail/envelopes') || (text.toLowerCase() =='mail') || (text.toLowerCase() =='envelopes')  || (text.toLowerCase() =='envelope')) {
                sendPaperEAMessage(sender)
                continue
            }
            if (text.toLowerCase() =='dirty'){
                sendPaperEBMessage(sender)
                continue
            }
            if (text.toLowerCase() =='clean'){
                sendPaperECMessage(sender)
                continue
            }
            if ((text.toLowerCase() =='container, box, cup, or carton') || (text.toLowerCase() =='container') || (text.toLowerCase() =='box') || (text.toLowerCase() =='cup') || (text.toLowerCase() =='carton')){
                sendPaperFMessage(sender)
                continue
            }
            if (text.toLowerCase() =='clean'){
                sendPaperFAMessage(sender)
                continue
            }
            if (text.toLowerCase() =='soiled'){
                sendPaperFBMessage(sender)
                continue
            }
            if (text.toLowerCase() =='soiled food box') {
                sendPaperFB1Message(sender)
                continue
            }
            if (text.toLowerCase() =='cleanable'){
                sendPaperFB2Message(sender)
                continue
            }
						if (text.toLowerCase() =='metal'){
                sendMetalMessage(sender)
                continue
            }
						if ((text.toLowerCase() =='aluminum and/or tin') || (text.toLowerCase() =='aluminum')  || (text.toLowerCase() =='tin')  || (text.toLowerCase() =='aluminum/tin') || (text.toLowerCase() =='aluminum or tin') || (text.toLowerCase() =='aluminum and tin')){
                sendMetalAMessage(sender)
                continue
            }
						if (text.toLowerCase() =='can'){
                sendMetalAAMessage(sender)
                continue
            }
						if ((text.toLowerCase() =='paint, oil, or spray') || (text.toLowerCase() =='paint') || (text.toLowerCase() =='oil') || (text.toLowerCase() =='spray')){
                sendMetalAA1Message(sender)
                continue
            }
						if (text.toLowerCase() =='not'){
                sendRecycleMessage(sender)
                continue
            }

						if (text.toLowerCase() =='foil'){
                sendMetalABMessage(sender)
                continue
            }
						if ((text.toLowerCase() =='fewer than 35lbs/2x2 ft') || (text.toLowerCase() =='fewer than 35lbs') || (text.toLowerCase() =='fewer than 2x2 ft') || (text.toLowerCase() =='less') || (text.toLowerCase() =='less than') || (text.toLowerCase() =='fewer than')){
                sendMetalBMessage(sender)
                continue
            }
						if ((text.toLowerCase() =='clothes hanger') || (text.toLowerCase() =='hanger')){
                sendMetaldonateMessage(sender)
                continue
            }
						if (text.toLowerCase() =='small appliance'){
                sendMetaldonateMessage(sender)
                continue
            }
						if (text.toLowerCase() =='cap or lid'){
                sendTrashMessage(sender)
                continue
            }
						if ((text.toLowerCase() =='none') || (text.toLowerCase() =='none of these')){
                sendRecycleMessage(sender)
                continue
            }
						if ((text.toLowerCase() =='more than 35 lbs/2x2 ft') || (text.toLowerCase() =='more than 35lbs') || (text.toLowerCase() =='more than 2x2 ft') || (text.toLowerCase() =='more') || (text.toLowerCase() =='more than')){
                sendMetalCMessage(sender)
                continue
            }
						if ((text.toLowerCase() =='sharp or greasy') || (text.toLowerCase() =='sharp') || (text.toLowerCase() =='greasy')){
                sendTrashMessage(sender)
                continue
            }
            // }
            // }
            // }
            //}
            // }

            // }
            // }
            if (text.toLowerCase() =='glass'){
                sendGlassMessage(sender)
                continue
            }
            if  (text.toLowerCase() =='broken'){
                sendTrashMessage(sender)
                continue
            }
            if  (text.toLowerCase() =='mirror or window'){
                sendTrashMessage(sender)
                continue
            }
            if (text.toLowerCase() =='ceramic'){
                sendTrashMessage(sender)
                continue
            }
            if (text.toLowerCase() =='jar or bottle'){
                sendRecycleMessage(sender)
                continue
            }
            if (text.toLowerCase() =='lightbulb'){
                sendlightbulbMessage(sender)
                continue
            }
            if ((text.toLowerCase() =='compact florescent tubes') || (text.toLowerCase() =='cfl') || (text.toLowerCase() =='cfl tibes')){
                sendRecycleMessage(sender)
                continue
            }
            if ((text.toLowerCase() =='incandescent or halogen') || (text.toLowerCase() =='incandescent') || (text.toLowerCase() =='halogen')){
                sendTrashMessage(sender)
                continue
            }
            if (text.toLowerCase() =='scraps'){
                sendscraps_wasteMessage(sender)
                continue
            }
            if (text.toLowerCase() =='yard waste'){
                sendCompostMessage(sender)
                continue
            }
            if (text.toLowerCase() =='food scraps'){
                sendCompostMessage(sender)
                continue
            }




            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
        }
        if (event.postback) {
            let text = JSON.stringify(event.postback)
            sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
            continue
        }
    }
    res.sendStatus(200)
})
