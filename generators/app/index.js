'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
   _getPrompts: function () {
    var prompts = [{
      type: 'input',
      name: 'humanName',
      message: 'What should I call your subtheme?',
      default: 'An awesome theme powered by Backdrop and Yeoman!'
     }, {
      type: 'input',
      name: 'name',
      message: 'What is the machine name of your subtheme?',
      default: this.appname,
      validate: appNameValidation,
      filter: function (input) {
        return input.toLowerCase().replace(/[^a-z0-9]+/, '_').substr(0, 32);
      }
    }, {
      type: 'input',
      name: 'description',
      message: 'Subtheme description:',
      default: 'An aweseome theme powered by Backdrop CMS and Yeoman!'
    }, {
      type: 'input',
      name: 'userName',
      message: 'Your Full name:',
      default: this.user.name
    }, {
      type: 'input',
      name: 'userEmail',
      message: 'Your Email:',
      default: this.user.email
    }, {
      type: 'input',
      name: 'repo',
      message: 'Repository URL:'
    }, 
      return prompts;
    }];
    
 },
  _saveProps: function (props, callback) {
    this.humanName = props.humanName;
    this.appname = props.name;
    this.description = props.description;
    this.repo = props.repo;
    this.userName = props.userName;
    this.userEmail = props.userEmail;
    callback();
  },
  _createProjectFileSystem: function () {
    var destRoot = this.destinationRoot(),
        sourceRoot = this.sourceRoot(),
        appDir = destRoot + '/app',
        templateContext = {
          appname = this.appname,
          humanName = this.humanName,
          description = this.description,
          userName = this.userName,
          userEmail = this.userEmail,
          repo = this.repo,
        };
  },
   initializing: function () {
    this.pkg = require('../../package.json');

   prompting: function () {
    var done = this.async();
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing ' + chalk.green('Backdroptheme') + ' generator!'
    ));
 
    this.prompt(this_getPrompts, function (props) {
      this._saveProps(props, done);
    }.bind(this));
  },

  writing: {
    app: function () {
      var destRoot = this.destinationRoot(),
        sourceRoot = this.sourceRoot(),
        appDir = destRoot + '/app',
        templateContext = {
          appname = this.appname,
          humanName = this.humanName,
          description = this.description,
          userName = this.userName,
          userEmail = this.userEmail,
          repo = this.repo,
        }; { 
      this.fs.copyTpl (
        this.templatePath('_package.json'),
        this.destinationPath('package.json' templateContext);
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json' templateContext);
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
