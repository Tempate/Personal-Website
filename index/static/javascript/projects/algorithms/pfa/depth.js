class DepthFirst {
    constructor() {
        this.finished = false;
        this.queue = [];

        this.name = "Depth First Search";
        this.summary = "";
    }

    findPath() {
      
    }

    findPath(current, neighbor) {
        let newPath = false;
        let temp = current._g + distance(neighbor, current);

        if (unvisitedSpots.includes(neighbor)) {
            newPath = temp < neighbor._g;
        } else {
            addSorted(unvisitedSpots, neighbor);
            neighbor._visited = true;
            newPath = true;
        }

        if (newPath) {
            neighbor._g = temp;
            neighbor._h = distance(neighbor, end);
            neighbor._f = neighbor._g + neighbor._h;
            neighbor._path = current._path.slice();
            neighbor._path.push(neighbor);
        }
    }
}
