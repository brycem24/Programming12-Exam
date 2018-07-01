function sortByY(entity1, entity2) {
	let comparison = 0;
	if (entity1.y > entity2.y)
		comparison = 1;
	else
		comparison = -1;
	return comparison;
}

function start(context) {
	console.log("Welcome to Goodbye World, my final exam project.")
	console.log("Your screen resolution is being read as: " +
		window.innerWidth + "," + window.innerHeight
	);

	map.generate();
	entities.push(player);
	entities.push(new Grandma(200,300));
	entities.push(new Bob(500,200));
}

function update(context) {
	if (!gameProperties.isPaused) {
		screen.draw(context);
		camera.update(context);

		context.fillStyle = "#FFFFFF";
		//	context.fillRect(map.MIN_X,map.MIN_Y, map.MAX_X, map.MAX_Y);
		context.fillRect(-200,0,1280,480);

		map.draw(context);

		player.move();

		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			if (entity.tag == "Bob" || entity.tag == "Grandma")
				entity.move();
			entity.drawShadow(context);
		}

		entities.sort(sortByY);

		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			entity.draw(context);	
		}

		if (player.health <= 0)
			gameOver.show(context);

		dayAndNightCycle.tick(context);


		//Draw post-processing effects:
		postProcessing.applyVignette(context);

		screen.updateHealthBar();

		if (!gameProperties.gameOver)
			screen.draw(context);
	}
}


