var randQuote = [
        {number: 1, x: 350, y: 300, fontSize: '20px', tip: 'Be The Hunter\nNot The Hunted'},
        {number: 2, x: 390, y: 300, fontSize: '20x', tip: 'Knowledge Is Your Ammo\nPreparation Is Your Game'},
        {number: 3, x: 340, y: 300, fontSize: '20px', tip: 'Carpe Pecunia\n(SEIZE THE MONEY)'},
        {number: 4, x: 345, y: 300, fontSize: '20px', tip: 'CHARGE!\n(OR CHECK OR CASH)'},
        {number: 5, x: 360, y: 300, fontSize: '20px', tip: 'U Send UM\nWe Suspend UM'},
        {number: 6, x: 340, y: 300, fontSize: '20px', tip: 'The Subro Is\nStrong With This One'},
        {number: 7, x: 385, y: 300, fontSize: '20px', tip: 'Grab UM By\nThe Assets'},
        {number: 8, x: 365, y: 280, fontSize: '25px', tip: "They Can Run But\nThey Can't Drive"}
    ];
    
    function getRandQuote () {
        var quote = randQuote[Math.floor(Math.random(0, 8) * 8)];

        setTimeout(function() {
            setTimeout(() => Score.dimGame(), 500);

            setTimeout(() => game.add.sprite(game.world.centerX, game.world.centerY, 'bgimage3').anchor.setTo(.5), 500);
            
            setTimeout(() => game.add.text(380, 200 , 'Subro Suvival Tip #' + quote.number, { fontSize: '25px', fill: '#000' }), 2000);
            setTimeout(() => game.add.text(quote.x, quote.y, quote.tip, textSetting), 2000);

            var textSetting = {'fontSize': quote.fontSize, 'fill': '#000', 'wordWrap': true, 'wordWrapWidth': 200};

        }, 500);
    }