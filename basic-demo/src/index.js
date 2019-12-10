import style1 from './style1.css';
import inlineStyle from '!loader-a!css-loader!./inline.css';
import { welcome } from './module-a';
console.log('style1',style1);
console.log('inlineStyle',inlineStyle);

welcome();