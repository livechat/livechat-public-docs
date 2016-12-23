function particleCover(container, color) {
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
				"width": .7
			},
			"number": {
				"value": 20,
				"density": {
					"enable": true,
					"value_area": 70
				}
			},
			"shape": {
				"type": ["circle"]
			},
			"opacity": {
				"value": 0.7,
				"random": false,
				"anim": {
					"enable": false,
					"speed": .15,
					"opacity_min": 0.1,
					"sync": true
				}
			},
			"size": {
				"value": 2.5,
				"random": true,
				"anim": {
					"enable": true,
					"speed": .1,
					"size_min": .3,
					"sync": true
				}
			},
			"move": {
				"enable": true,
				"speed": .15,
				"direction": "none",
				"random": true,
				"straight": false,
				"out_mode": "bounce",
				"attract": {
					"enable": true,
					"rotateX": 1200,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": true,
					"mode": ["bubble", "grab"]
				},
				"onclick": {
					"enable": true,
					"mode": "push"
				},
				"resize": false
			},
			"modes": {
				"grab": {
					"distance": 100,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 100,
					"size": 3,
					"duration": 1
				},
				"push": {
					"particles_nb": 1
				}
			}
		},
		"retina_detect": true
	});
}