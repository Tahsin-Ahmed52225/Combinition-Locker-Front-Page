particlesJS("particles-js", {"particles":{"number":{"value":6,"density":{"enable":true,"value_area":800}},"color":{"value":"#1b1e34"},"shape":{"type":"edge","stroke":{"width":0,"color":"#000"},"polygon":{"nb_sides":6},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.3,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":160,"random":false,"anim":{"enable":true,"speed":10,"size_min":40,"sync":false}},"line_linked":{"enable":false,"distance":200,"color":"#ffffff","opacity":1,"width":2},"move":{"enable":true,"speed":8,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"grab"},"onclick":{"enable":true,"mode":"remove"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});
var count_particles, stats, update; 
// stats = new Stats; stats.setMode(0); 
// stats.domElement.style.position = 'absolute'; 
// stats.domElement.style.left = '0px'; 
// stats.domElement.style.top = '0px';
//  document.body.appendChild(stats.domElement); 
 count_particles = document.querySelector('.js-count-particles'); 
 update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;
$(function(){
    
	var comboArray = [0, 0, 0, 0, 0];
	var combination = [5, 2, 2, 2, 5];
	
	var gridIncrement = $( ".lock-dial ul" ).css('line-height').replace('px', '')/2;
	var numNums = $( ".lock-dial:eq(0) ul li" ).length;
	var halfHeight = gridIncrement*numNums;
	var initTop = -(halfHeight-gridIncrement);
	
	$( ".lock-dial ul" ).css('top', initTop);
	
	$( ".lock-dial ul" ).draggable({
		grid: [ 0, gridIncrement ],
		axis: 'y',
		drag: function(){
			var dragDir = $(this).css('top').replace('px', '') < initTop ? "up" : "down";
			
			if(dragDir == "up"){
				var curNum = parseInt($(this).find('li:last-child').text()) + 1;
				if(curNum < 10){
					$(this).append('<li>'+curNum+'</li>');
				}else{
					$(this).append('<li>0</li>');
				};
			}else{
				var curNum = parseInt($(this).find('li:first-child').text()) - 1;
				var thisTop = parseInt($(this).css('margin-top').replace('px', ''));
				
				$(this).css({
					marginTop: thisTop-(gridIncrement*2)
				});
				
				if(curNum > -1){
					$(this).prepend('<li>'+curNum+'</li>');
				}else{
					$(this).prepend('<li>9</li>');
				};
			};
		},
		stop: function(){
		
			//MATHS		
			var negOrPos = $(this).css('margin-top').replace('px', '') > 0 ? 1 : -1;
			var thisTopTotal = parseInt($(this).css('top').replace('px', '')) + Math.abs(initTop);
			var marginMinified = parseInt(Math.abs($(this).css('margin-top').replace('px', ''))) - thisTopTotal;
			var numIncs = Math.floor(marginMinified/(halfHeight*2));
			var totalDif = numIncs*(halfHeight*2);
			var topTen = (marginMinified - totalDif)*negOrPos;
			var activeIndex = Math.abs(topTen/(gridIncrement*2)) + (halfHeight/(gridIncrement*2));
			
			$(this).attr("data-combo-num", $(this).find('li').eq(activeIndex).text()).css({
				top: -315,
				marginTop: topTen
			}).find('li').slice(20).remove();
			
			for(var i=0; i<$( ".lock-dial ul" ).length; i++){
				comboArray[i] = $( ".lock-dial ul:eq("+i+")" ).attr("data-combo-num");
			}
			
			
			if(comboArray == ""+combination){
				$('.lock-dial ul').draggable('disable');
				$('#lock-wrapper').addClass("unlocked");
				$('.lock-dial').each(function(){
					var $this = $(this);
					$this.find('ul').delay(400).css('color', '#0f0').fadeOut(function(){
						$this.animate({
							marginTop: 150
						}, function(){
							$this.fadeOut(function(){
								$('.welcome-message').fadeIn();
							});
						});
					});
				});
			}
		}
	});

})
