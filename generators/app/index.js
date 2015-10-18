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
      default: 'My Wormhole Subtheme'
     }, {
      type: 'input',
      name: 'name',
      message: 'What is the machine name of your subtheme?',
      default: this.appname
      // validate: appNameValidation,
      // filter: function (input) {
      //   return input.toLowerCase().replace(/[^a-z0-9]+/, '_').substr(0, 32);
      // }
    }, {
      type: 'input',
      name: 'description',
      message: 'What is a description of your theme?',
      default: 'An aweseome theme powered by Backdrop CMS and Yeoman!'
    }, {
      type: 'input',
      name: 'userName',
      message: 'What is your name?',
      default: this.user.name
    }, {
      type: 'input',
      name: 'userEmail',
      message: 'What is your email?',
      default: this.user.email
    }, {
      type: 'input',
      name: 'repo',
      message: 'Repository URL:'
    } 
    ];
    return prompts;
 },
  _saveProps: function (props, callback) {
    this.appname = props.name;
    this.humanName = props.humanName;
    this.description = props.description;
    this.repo = props.repo;
    this.userName = props.userName;
    this.userEmail = props.userEmail;
    callback();
  },
   initializing: function () {
    this.pkg = require('../../package.json');

     // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing ' + chalk.green('Backdrop Theme') + ' generator!'
    ));
  },
   prompting: function () {
    var done = this.async();
    this.prompt(this._getPrompts(), function (props) {
      this._saveProps(props, done);
    }.bind(this));
  },

   writing: {
    app: function () {
      var destRoot = this.destinationRoot(),
        sourceRoot = this.sourceRoot(),
        appDir = destRoot + '/app',
        templateContext = {
          appname: this.appname,
          humanName: this.humanName,
          description: this.description,
          userName: this.userName,
          userEmail: this.userEmail,
          repo: this.repo,
        }; 
      this.directory('css', 'css');
      this.directory('sass', 'sass');
      this.directory('js', 'js');
      this.directory('images', 'images');
      this.directory('templates', 'templates');
      this.fs.copyTpl(
        this.templatePath('_config.rb'),
        this.destinationPath('config.rb')
      );
      this.fs.copyTpl (
        this.templatePath('_comment.tpl.php'),
        this.destinationPath('templates/comment.tpl.php'), templateContext
      );  
      this.fs.copyTpl (
        this.templatePath('_maintenance-page.tpl.php'),
        this.destinationPath('templates/maintenance-page.tpl.php'), templateContext
      );
      this.fs.copyTpl (
        this.templatePath('_node.tpl.php'),
        this.destinationPath('templates/node.tpl.php'), templateContext
      );
      this.fs.copyTpl (
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), templateContext
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'), templateContext
      );
      this.fs.copyTpl (
        this.templatePath('_README.md'),
        this.destinationPath('README.md'), templateContext
      );
      this.fs.copyTpl(
        this.templatePath('_template.php'),
        this.destinationPath('template.php'), templateContext
      );
      this.fs.copyTpl (
        this.templatePath('_theme_settings.php'),
        this.destinationPath('theme_settings'), templateContext
      );
      this.fs.copyTpl(
        this.templatePath('_wormhole.info'),
        this.destinationPath(this.appname + '.info'), templateContext
      );
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('Gemfile'),
        this.destinationPath('Gemfile')
      );
      this.fs.copy(
        this.templatePath('screenshot.png'),
        this.destinationPath('screenshot.png')
      );
    }
  },

  install: function () {
    this.installDependencies();
  },
  end: function () {
    this.log(yosay(
      'Enjoy your new ' + chalk.green('Backdrop Theme') + ' Good Bye!'
    ));
  }
});
