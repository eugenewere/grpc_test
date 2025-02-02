const grpc  = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());
server.addService(
    todoPackage.Todo.service,
     {
        "createTodo": createTodo,
        "readTodos": readTodos,
        "readTodosStream": readTodosStream,
    }
);
server.start();

const todos = []
function createTodo (call, callback) {
    const todoObj = {
        "id": todos.length + 1,
        "text": call.request.text,
    }
    todos.push(todoObj);
    console.log(call);
    console.log(todos)
    callback(null, todoObj);
}

function readTodos (call, callback) {
    console.log(call);
    callback(null, {"items": todos})
}

function readTodosStream(call, callback) {
    todos.forEach(index => call.write(index))
    call.end();
}