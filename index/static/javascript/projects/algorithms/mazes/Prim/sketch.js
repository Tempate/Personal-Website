const cols = 50;
const rows = 50;

var grid = [];
var walls = [];
var w;

var current;
var finished = false;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent("mazeCanvas");
    canvas.mousePressed(reset);

    title = createElement("h3", "Prim's Algorithm");
    title.parent("pageTitle");

    reset();
}

function reset() {
    w = width / cols;

    grid = [];
    walls = [];

    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
            grid.push(new Cell(x, y));
        }
    }

    current = grid[0];
    current.visited = true;
    current.getNext();
}

function draw() {
    background(0);

    if (walls.length > 0) {
        current.visited = true;
        current.getNext();
        current = removeWall();
    }

    for (var i in grid)
        grid[i].show();
}

function removeWall() {
    if (walls.length === 0)
        return;

    var r = round(random(walls.length - 1));
    var wall = walls[r];

    var neighbors = [
        [grid[index(wall.x - 1, wall.y)],
            grid[index(wall.x + 1, wall.y)]
        ],
        [grid[index(wall.x, wall.y - 1)],
            grid[index(wall.x, wall.y + 1)]
        ]
    ];

    for (var i in neighbors) {
        var a = neighbors[i][0];
        var b = neighbors[i][1];

        if (a && b && (a.visited != b.visited)) {
            wall.visited = true;
            walls.splice(r, 1);
            return a.visited ? b : a;
        }
    }

    walls.splice(r, 1);
    return removeWall();
}

function index(x, y) {
    return (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) ? false : x + y * cols;
}

function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;

    this.show = function() {
        if (this.visited) {
            fill(255, 0, 0);
        } else {
            fill(17);
        }
        noStroke();
        rect(this.x * w, this.y * w, w, w);
    }

    this.getNext = function() {
        this.walls = [
            grid[index(this.x, this.y - 1)],
            grid[index(this.x + 1, this.y)],
            grid[index(this.x, this.y + 1)],
            grid[index(this.x - 1, this.y)]
        ];

        for (var i = 0; i < this.walls.length; i++) {
            var wall = this.walls[i];
            if (wall && insideArray(wall))
                walls.push(wall);
        }
    }
}

function insideArray(wall) {
    for (var i = 0; i < walls.length; i++) {
        if (walls[i] === wall)
            return false;
    }
    return true;
}
