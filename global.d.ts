declare module '*.m.scss' {
  const exports: { [exportName: string]: string };
  export = exports;
}
