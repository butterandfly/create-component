var createComp = require('./create-component.js');
var path = require('path');

// 存放comp的路径
var compPath = path.join('./target');
var compName = 'testComp';

//function createTplObject(compName) {
//  return {
//    'compName': compName,
//    'compNameDash': camelToDash(compName),
//    'compTplPath': compTplPath
//  }
//}

var compCreatingTemplatesPath = './component-template';

createComp(compName, [
  //{'suffix': '.html', 'tplFile': path.join(compCreatingTemplatesPath, 'component.html')},
  {'suffix': '.js', 'tplFile': path.join(compCreatingTemplatesPath, 'component.js')},
  //{'suffix': '.scss', 'tplFile': path.join(compCreatingTemplatesPath, 'component.scss'), 'createTplObject': {}}
], compPath);