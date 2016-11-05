#!/bin/bash

export BIDS_MASTER=/Users/measter/src/github/codetojoy/bids_ng1

function emitLog {
    if [ $? -ne 0 ]; then echo "TRACER check $1" ; fi
}

diff app.js $BIDS_MASTER
emitLog "app.js"

diff index.html $BIDS_MASTER
emitLog "index.html"

diff controllers/configController.js $BIDS_MASTER/controllers
emitLog "controllers/configController.js"
diff controllers/gameController.js $BIDS_MASTER/controllers
emitLog "controllers/gameController.js"
diff controllers/mainController.js $BIDS_MASTER/controllers
emitLog "controllers/mainController.js"

diff services/DealerService.js $BIDS_MASTER/services
emitLog "services/DealerService.js"
diff services/StrategyService.js $BIDS_MASTER/services
emitLog "services/StrategyService.js"

diff views/botHand.html $BIDS_MASTER/views
emitLog "views/botHand.html"
diff views/buttonBar.html $BIDS_MASTER/views
emitLog "views/buttonBar.html"
diff views/gameMain.html $BIDS_MASTER/views
emitLog "views/gameMain.html"
diff views/humanHand.html $BIDS_MASTER/views
emitLog "views/humanHand.html"
diff views/kitty.html $BIDS_MASTER/views
emitLog "views/kitty.html"
diff views/players.html $BIDS_MASTER/views
emitLog "views/players.html"
diff views/prizeCard.html $BIDS_MASTER/views
emitLog "views/prizeCard.html"
diff views/status.html $BIDS_MASTER/views
emitLog "views/status.html"

diff views/config/buttonBar.html $BIDS_MASTER/views/config
emitLog "views/config/buttonBar.html"
diff views/config/configMain.html $BIDS_MASTER/views/config
emitLog "views/config/configMain.html"
