const controller = new ScrollMagic.Controller({
		globalSceneOptions:{
			triggerHook: 'onLeave'
		}
	});
const $sections = $("section");

console.log($sections[0].height);

console.log($sections);
for(var i=0; i<$sections.length; i++){
	const scene = new ScrollMagic.Scene(
		{
			offset: 200,
			triggerElement: $sections[i]
		})
	.setPin($sections[i])
	.addTo(controller);
}

