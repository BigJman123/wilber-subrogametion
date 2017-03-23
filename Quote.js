var randQuote = [
        {number: 1, x: 442, y: 270, fontSize: '30px', tip: 'Be The Hunter\nNot The Hunted'},
        {number: 2, x: 403, y: 260, fontSize: '30px', tip: 'Knowledge Is Your Ammo\nPreparation Is Your Game'},
        {number: 3, x: 418, y: 275, fontSize: '30px', tip: 'Carpe Pecunia\n(SEIZE THE MONEY)'},
        {number: 4, x: 413, y: 290, fontSize: '30px', tip: 'CHARGE!\n(OR CHECK OR CASH)'},
        {number: 5, x: 410, y: 290, fontSize: '30px', tip: 'U Send UM\nWe Suspend UM'},
        {number: 6, x: 408, y: 290, fontSize: '30px', tip: 'The Subro Is\nStrong With This One'},
        {number: 7, x: 412, y: 300, fontSize: '30px', tip: 'Grab UM By\nThe Assets'},
        {number: 8, x: 422, y: 280, fontSize: '30px', tip: "They Can Run But\nThey Can't Drive"}
    ];
    
    function getRandQuote () {
        var quote = randQuote[Math.floor(Math.random(0, 8) * 8)];

        setTimeout(function() {
            setTimeout(() => Score.dimGame(), 500);

            setTimeout(() => game.add.sprite(game.world.centerX, game.world.centerY, 'bgimage3').anchor.setTo(.5), 500);
            
            setTimeout(() => game.add.text(377, 200 , 'Subro Suvival Tip #' + quote.number, { fontSize: '25px', fill: '#000' }), 500);
            setTimeout(() => game.add.text(quote.x, quote.y, quote.tip, textSetting), 1400);

            var textSetting = {'fontSize': quote.fontSize, 'fill': '#000', 'wordWrap': true, 'wordWrapWidth': 200, 'align': 'center'};

        }, 500);
    }