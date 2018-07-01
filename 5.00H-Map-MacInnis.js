class Map 
{
	constructor() {
		this.grid = maps.outdoors;

		this.width = this.grid[0].length;
		this.height = this.grid.length;

		this.TILE_SIZE = 48;
		this.MIN_Y = -this.height * this.TILE_SIZE + gameProperties.SCREEN_HEIGHT;
		this.MIN_X = -this.width * this.TILE_SIZE + gameProperties.SCREEN_WIDTH; 
		this.MAX_X = gameProperties.SCREEN_WIDTH;
		this.MAX_Y = gameProperties.SCREEN_HEIGHT;
		this.FLOWERS_TILE_1 = new Texture(1,2);
		this.GRASS_TILE_1 = new Texture(3,0);
		this.GRASS_TILE_2 = new Texture(5,0);
		this.MOUNTAIN_TILE_1 = new Texture(1,6);
		this.tiles = [];
		this.tileGrid = [];
		
		this.spawnPoints = [
			{x: 221, y: 173},
			{x: 1000, y: 125},
			{x: 1200, y: 650},
			{x: 629, y: 554},
			{x: 650, y: 977},
			{x: 266, y: 625},
			{x: 111, y: 1268},
		];
	}

	generate() {
		for (var y = 0; y < this.height; y++)
		{
			this.tileGrid[y] = [];
			for (var x = 0; x < this.width; x++)
			{
				var tileProperties = {};
				if (this.grid[y][x] == 0) {
					tileProperties.texture = this.FLOWERS_TILE_1;
					tileProperties.isCollider = false;
				}
				else if (this.grid[y][x] == 1) {
					tileProperties.texture = this.GRASS_TILE_1;
					tileProperties.isCollider = false;
				}

				else if (this.grid[y][x] == 2) {
					tileProperties.texture = this.GRASS_TILE_2;
					tileProperties.isCollider = false;
				}

				else if (this.grid[y][x] == 3) {
					tileProperties.texture = this.MOUNTAIN_TILE_1;
					tileProperties.isCollider = true;
				}

				tileProperties.x = x * this.TILE_SIZE;
				tileProperties.y = y * this.TILE_SIZE;
				tileProperties.w = this.TILE_SIZE;
				tileProperties.h = this.TILE_SIZE;

				var tile = new Tile(
					tileProperties.x, tileProperties.y,
					x,y,
					tileProperties.w, tileProperties.h,
					tileProperties.texture,
					tileProperties.isCollider
				);

				this.tiles.push(tile);
				this.tileGrid[y][x] = tile;
			}
		}
		
	}

	//OUTPUT: Draw all the tiles.
	draw(context) {
		for (var i = 0; i < this.tiles.length; i++)
			this.tiles[i].draw(context);
	}
}
