function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  };
}

@testable(true)
class MyClass {
  eggs = 'DEADBEAF';
  static log = e => console.log(e);
}

console.log('##', 'class feature', 'STATIC:', MyClass.log);
console.log('##', 'class feature', 'decorators:', MyClass.isTestable);
console.log('##', 'class feature', 'class-properties:', new MyClass().eggs);
