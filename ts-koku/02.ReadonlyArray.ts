let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

console.log(ro);

// a = ro;
a = ro as number[];