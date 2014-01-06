'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AsbpGenerator = module.exports = function AsbpGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AsbpGenerator, yeoman.generators.Base);

AsbpGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log('ASBP');

  var prompts = [{
    name: 'projectName',
    message: 'What is the project called?',
    default: this.appname
  },
  {
    name: 'cssPreprocessor',
    message: 'Which CSS preprocessor do you want to use?',
    type: 'list',
    choices: [
    {name: 'Stylus', value: 'grunt-contrib-stylus'}, 
    {name: 'SASS', value: 'grunt-contrib-sass'}, 
    {name: 'LESS', value: 'grunt-contrib-less'}
    ]
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;
    
    this.npmInstall(props.cssPreprocessor, ['--save-dev']);

    cb();
  }.bind(this));
};

AsbpGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

AsbpGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
