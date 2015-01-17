var path = require('path');
var fs = require('fs');
var template = require('template');
var util = require('util');

/**
 * @type function
 * @description 该方法能够生成一个组件目录及其所需的文件，支持模板
 *
 * @param {string} compName 是组件名称，组件目录会以组件命名
 * @param {object|array} files 数组包含要创建的每个文件的设置，
 *                如{suffix: '.html', tplFile: './tpl/comp_tpl.html'}，
 *                其中suffix是文件的后缀，tplFile是模板文件路径，若name存在则无视suffix直接以name命名
 * @param {string} createPath 是创建组件的路径
 */
function createComp(compName, files, createPath) {

	if(!util.isArray(files)) {
		// 构建文件路径
		var file = files;
		if (!file.name) {
			// 后缀
			file.name = compName + file.suffix;
		}
		var filePath = path.join(createPath, file.name);

		// 检查文件是否已存在
		if (fs.existsSync(filePath)) {
			console.log('Error: ' + filePath + '已存在');
			return;
		}

		var tplObj;
		file.createTplObject ?
			tplObj = file.createTplObject(compName) :
			tplObj = simpleTplObject(compName);

		createFile(filePath, file.tplFile, tplObj);
		return;
	}

	var compDirPath = path.join(createPath, compName);
	// 检查目录是否已存在
	if (fs.existsSync(filePath)) {
		console.log('Error: ' + filePath + '已存在');
		return;
	}

	fs.mkdirSync(compDirPath);
	var i, len;
	for (i = 0, len = files.length; i < len; i++) {
		var file = files[i];
		if (!file.name) {
			// 后缀
			file.name = compName + file.suffix;
		}
		var filePath = path.join(compDirPath, file.name);

		var tplObj;
		file.createTplObject ?
			tplObj = file.createTplObject(compName) :
			tplObj = simpleTplObject(compName);

		createFile(filePath, file.tplFile, tplObj);
	}
}
module.exports = createComp;

// 从模板中创建文件
function createFileFromTpl(tplPath, object, destPath) {
	var data = fs.readFileSync(tplPath)
	var contents = template(data.toString(), object);
	fs.writeFileSync(destPath, contents);
}
// 该方法创建一个文件
function createFile(filePath, tplFile, tplObj) {
	if (tplFile) {
		// 从tpl创建
		createFileFromTpl(tplFile, tplObj, filePath);
	} else {
		// 直接创建
		fs.writeFileSync(filePath, '');
	}
}

function simpleTplObject(name) {
	return {
		name: name
	}
}

// test
/*
 var files = [
 {suffix: '.html', tplFile: './tpl/comp_tpl.html'},
 {suffix: '.scss'},
 {name: 'example.scss'}
 ];

 var file = {suffix: '.scss'};

 createComp('newComp', file, './');
 */
