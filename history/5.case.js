class AsyncParralleHook { // 钩子是同步的
  constructor(args) { // agrs => ['name']
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
    let finalCallback = args.pop(); // 拿出最终的函数
    let index = 0;
    let done = () => { // promise.all
      index++;
      if(index == this.tasks.length){
        finalCallback();
      }
    }
    this.tasks.forEach(task => {
      task(...args, done);
    })
  }
}

let hook = new AsyncParralleHook(['name']);
let total = 0;
hook.tapAsync('react', function (name, cb) {
  setTimeout(() => {
    console.log('react', name);
    cb();
  }, 1000);
})
hook.tapAsync('node', function (name, cb) {
  setTimeout(() => {
    console.log('node', name);
    cb();
  }, 1000);
})
hook.callAsync('hbj', function(){
  console.log('end');
});