import letters from './letters.js';

module.exports = {
	start () {
		const $Doc = window.$Doc;

	    window.$Space = new Easycanvas.class.physics({
	    	name: 'PhysicsBox',
	        physics: {
	            gravity: 1,
	        },
	    });
	    $Doc.add($Space);

    	const STATIC_LETTER_WIDTH = window.w / 13;
    	const STATIC_LETTER_WIDTH_PHYSICS = STATIC_LETTER_WIDTH / 2;
    	const STATIC_LETTER_WIDTH_SMALL = STATIC_LETTER_WIDTH / 3;

	    {
	    	let $Statics = new Easycanvas.Sprite({
	    		name: 'static-letters'
	    	});
	    	$Space.add($Statics);

	    	'E A S Y _ C A N V A S'.split(' ').forEach((letter, index) => {
	    		if (letter === '_') return;

			    let e = new Easycanvas.class.physics({
			        name: 'static-' + letter + Math.random(),
			        content: {
			            img: Easycanvas.ImgLoader(letters[letter]),
			        },
			        physics: {
			            shape: [
			                [[0, 0], [STATIC_LETTER_WIDTH_PHYSICS, 0]],
			                [[STATIC_LETTER_WIDTH_PHYSICS, 0], [STATIC_LETTER_WIDTH_PHYSICS, STATIC_LETTER_WIDTH_PHYSICS]],
			                [[STATIC_LETTER_WIDTH_PHYSICS, STATIC_LETTER_WIDTH_PHYSICS], [0, STATIC_LETTER_WIDTH_PHYSICS]],
			                [[0, STATIC_LETTER_WIDTH_PHYSICS], [0, 0]],
			            ],
			            friction: 0.6,
			            elasticity: 1,
			            static: true,
			        },
			        style: {
			            tw: STATIC_LETTER_WIDTH_PHYSICS, th: STATIC_LETTER_WIDTH_PHYSICS,
			            sx: 0, sy: 0,
			            tx: STATIC_LETTER_WIDTH * (index + 1),
			            ty: window.h - 100,
		            	locate: 'lt',
			            zIndex: 1,
			            opacity: 0.2
			        },
			    });
			    $Statics.add(e);
			    e.physicsOn();
	    	});
	    }

    	let $Fallings = new Easycanvas.Sprite({
    		name: 'falling-letters'
    	});
    	$Space.add($Fallings);

	    let addLetter = function () {
	    	let randomLetter = ['E', 'A', 'S', 'Y', 'C', 'N', 'V'][parseInt(Math.random() * 100) % 7];
		    let letter = new Easycanvas.class.physics({
		        name: 'fall-' + randomLetter,
		        content: {
		            img: Easycanvas.ImgLoader(letters[randomLetter]),
		        },
		        physics: {
		            shape: [
		                [0, 0],
		                [STATIC_LETTER_WIDTH_SMALL, 0],
		                [STATIC_LETTER_WIDTH_SMALL, STATIC_LETTER_WIDTH_SMALL],
		                [0, STATIC_LETTER_WIDTH_SMALL]
		            ],
		            mass: 1,
		            friction: 0.6,
		            elasticity: 0.6,
		        },
		        style: {
		            tw: STATIC_LETTER_WIDTH_SMALL, th: STATIC_LETTER_WIDTH_SMALL,
		            sx: 0, sy: 0,
		            tx: Math.random() * window.w * 2 - STATIC_LETTER_WIDTH_SMALL,
		            ty: 20,
		            locate: 'lt',
		            zIndex: 1,
		            opacity: Math.random() * 0.2
		        },
		    });
		    $Fallings.add(letter);
		    letter.physicsOn();
		    return letter;
	    };

	    setInterval(() => {
	    	if (document.hidden || $Doc.lastFps < $Doc.maxFps * 0.9) {
	    		return;
	    	}
	    	var l = addLetter();
	    	setTimeout(() => {
    			l.remove();
    		}, 5000);
	    }, 100);

	    $Space.launch();
	},
};
