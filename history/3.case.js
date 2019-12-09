class SyncWaterfallHook { // 钩子是同步的
  constructor(args) { // agrs => ['name']
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    let [first, ...others] = this.tasks;
    let ret = first(...args);
    others.reduce((a, b) => {
      return b(a);
    }, ret)
  }
}

let hook = new SyncWaterfallHook(['name']);
hook.tap('react', function (name) {
  console.log('react', name);
  return 'reactok'
})
hook.tap('node', function (data) {
  console.log('node', data);
  return 'node ok'
})
hook.tap('webpack', function (data) {
  console.log('node', data);
})
hook.call('hbj');