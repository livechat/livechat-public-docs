// import * as  pJS  from 'particles.js';
var pJS = require('particles.js')

export default function(container, color) {
	var particlesJS = window.particlesJS || {}
	particlesJS(container, {
		"particles": {
			"color": {
				"value": color
			},
			"line_linked": {
				"enable": true,
				"distance": 100,
				"color": color,
				"opacity": 0.7,
				"width": 30
			},
			"number": {
				"value": 20,
				"density": {
					"enable": true,
					"value_area": 80
				}
			},
			"shape": {
				"type": ["circle"],
			},
			"size": {
				"value": 0,
				"random": true,
			},
			"move": {
				"enable": true,
				"out_mode": "bounce",
				"speed": 0,
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
			  "onhover": {
				"enable": false,
				"mode": "repulse"
			  },
			  "onclick": {
				"enable": false,
				"mode": "push"
			  },
			  "resize": true
			}
		},
		"retina_detect": true
	});
}