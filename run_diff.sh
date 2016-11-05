#!/bin/bash

export BIDS_MASTER=/Users/measter/src/github/codetojoy/bids_ng1

function doDiff {
    diff $1 $2
    if [ $? -ne 0 ]; then echo "TRACER check $1" ; fi
}

doDiff app.js $BIDS_MASTER
doDiff index.html $BIDS_MASTER

doDiff controllers/configController.js $BIDS_MASTER/controllers
doDiff controllers/gameController.js $BIDS_MASTER/controllers
doDiff controllers/mainController.js $BIDS_MASTER/controllers

doDiff models/player.js $BIDS_MASTER/models

doDiff services/DealerService.js $BIDS_MASTER/services
doDiff services/StrategyService.js $BIDS_MASTER/services

doDiff views/botHand.html $BIDS_MASTER/views
doDiff views/buttonBar.html $BIDS_MASTER/views
doDiff views/gameMain.html $BIDS_MASTER/views
doDiff views/humanHand.html $BIDS_MASTER/views
doDiff views/kitty.html $BIDS_MASTER/views
doDiff views/players.html $BIDS_MASTER/views
doDiff views/prizeCard.html $BIDS_MASTER/views
doDiff views/status.html $BIDS_MASTER/views

doDiff views/config/buttonBar.html $BIDS_MASTER/views/config
doDiff views/config/configMain.html $BIDS_MASTER/views/config
