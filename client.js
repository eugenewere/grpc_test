const grpc  = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;


const client  = new todoPackage.Todo('localhost:40000', grpc.credentials.createInsecure())

client.createTodo({
    "id": 1,
    "text": " Create Todo"
}, (err, response) => {
    console.log(`This is Test ${JSON.stringify(response)}`);
    
})

// client.readTodos({}, (err, res) => {
//     console.log(JSON.stringify(res))
// })

const call = client.readTodosStream()
call.on("data", item => {
    console.log(`This is stream ${JSON.stringify(item)}`)
})
call.on("end", e => console.log('server endded'))