// 构造图和广度优先遍历
function Graph() {
  var vertices = [];
  var adjList = new Map();
  this.addVertex = function(v) {
    vertices.push(v);
    adjList.set(v, []);
  };
  this.addEdge = function(v, w) {
    adjList.get(v).push(w);
    adjList.get(w).push(v);
  };
  this.toString = function() {
    var s = "";
    for (var i = 0; i < vertices.length; i++) {
      s += vertices[i] + "->";
      var neighbors = adjList.get(vertices[i]);
      for (var j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + "";
      }
      s += "\n";
    }
    return s;
  };

  this.bfs = function(v, callback) {
    var color = initialzeColor();
    var queue = [];
    queue.push(v);
    while (queue.length > 0) {
      var u = queue.shift();
      var neighbors = adjList.get(u);
      color[u] = "grey";
      for (let i = 0; i < neighbors.length; i++) {
        var w = neighbors[i];
        if (color[w] === "white") {
          color[w] = "grey";
          queue.push(w);
        }
      }
      color[u] = "black";
      if (callback) {
        callback(u);
      }
    }
  };

  this.BFS = function(v, callback) {
    var color = initialzeColor();
    var queue = [];
    var d = []; // 记录距离
    var pred = []; // 前溯节点
    queue.push(v);

    for (let i = 0; i < vertices.length; i++) {
      d[vertices[i]] = 0;
      pred[vertices[i]] = null;
    }

    while (queue.length > 0) {
      var u = queue.shift();
      var neighbors = adjList.get(u);
      color[u] = "grey";
      for (let i = 0; i < neighbors.length; i++) {
        var w = neighbors[i];
        if (color[w] === "white") {
          color[w] = "grey";
          d[w] = d[u] + 1;
          pred[w] = u;
          queue.push(w);
        }
      }
      color[u] = "black";
    }
    return {
      distance: d,
      predecessors: pred
    };
  };
}

// 构造图
var graph = new Graph();
var myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

// console.log(graph.toString());

// 广度优先搜索

const initialzeColor = function() {
  var color = [];
  for (var i = 0; i < myVertices.length; i++) {
    color[myVertices[i]] = "white";
  }
  return color;
};

function prinNode(value) {
  // console.log("visited Node is", value);
}
graph.bfs("A", prinNode);
var short = graph.BFS(myVertices[0]);

for (let i = 0; i < myVertices.length; i++) {
  var toVertex = myVertices[i];
  var path = [];
  for (let v = toVertex; v != "A"; v = short.predecessors[v]) {
    path.push(v);
  }
  path.push("A");
  var s = path.pop();
  while (path.length > 0) {
    s += "-" + path.pop();
  }
  console.log(s);
}
console.log(short);
