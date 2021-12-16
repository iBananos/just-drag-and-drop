interface Foo {
    bar(bar: any); foo: string; 
}
 
export function test(foo: Foo) {
    console.log(foo.bar);       //// TS2339
}