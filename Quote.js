var randQuote = [
        {number: 1, x: 415, y: 290, fontSize: '25px', tip: 'Be The Hunter\nNot The Hunted'},
        {number: 2, x: 380, y: 275, fontSize: '22px', tip: 'Knowledge Is Your Ammo\nPreparation Is Your Game'},
        {number: 3, x: 418, y: 275, fontSize: '25px', tip: 'Carpe Pecunia\n(SEIZE THE MONEY)'},
        {number: 4, x: 405, y: 290, fontSize: '25px', tip: 'CHARGE!\n(OR CHECK OR CASH)'},
        {number: 5, x: 415, y: 290, fontSize: '25px', tip: 'U Send UM\nWe Suspend UM'},
        {number: 6, x: 400, y: 290, fontSize: '25px', tip: 'The Subro Is\nStrong With This One'},
        {number: 7, x: 415, y: 300, fontSize: '25px', tip: 'Grab UM By\nThe Assets'},
        {number: 8, x: 415, y: 280, fontSize: '25px', tip: "They Can Run But\nThey Can't Drive"}
    ];
    
    function getRandQuote () {
        var quote = randQuote[Math.floor(Math.random(0, 8) * 8)];

        setTimeout(function() {
            setTimeout(() => Score.dimGame(), 500);

            setTimeout(() => game.add.sprite(game.world.centerX, game.world.centerY, 'bgimage3').anchor.setTo(.5), 500);
            
            setTimeout(() => game.add.text(382, 200 , 'Subro Suvival Tip #' + quote.number, { fontSize: '18px', fill: '#000', 'wordWrap': true, 'wordWrapWidth': 300, 'align': 'center', font: 'Press Start 2P' }), 500);
            setTimeout(() => game.add.text(quote.x, quote.y, quote.tip, textSetting), 1400);

            var textSetting = {'fontSize': quote.fontSize, 'fill': '#000', 'wordWrap': true, 'wordWrapWidth': 200, 'align': 'center', font: 'Press Start 2P'};

        }, 500);
    }