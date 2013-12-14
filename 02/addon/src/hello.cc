#include <node.h>
#include <v8.h>

using namespace v8;
// 实现预定义的方法
Handle<Value> SayHello(const Arguments& args) {
  HandleScope scope;
  return scope.Close(String::New("Hello world!"));
}

// 给传入的目标对象添加sayHello方法
void Init(Handle<Object> target) {
  target->Set(String::NewSymbol("sayHello"), FunctionTemplate::New(SayHello)->GetFunction());
}
// 调用NODE_MODULE将注册方法定义到内存中。
NODE_MODULE(hello, Init)
