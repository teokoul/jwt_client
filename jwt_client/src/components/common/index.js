// components/common/index.js 
export * from './Loading';
export * from './Button';
export * from './Input';
export * from './TextLink';
export * from './Loading';

// By exporting components in a folder with index.js, 
// we can import those components in one statement with 
// other components indexed in this directory, 
// e.g.: import { Loading, Button, ... } from ‘./common/'; 
// vs import Loading from ‘./common/Loading; 
// import Button from ‘./common/Button;’.