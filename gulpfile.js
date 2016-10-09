'use strict';

const
  gulpLoadPlugins = require('gulp-load-plugins'),
  plugins = gulpLoadPlugins({
    pattern: "*"
  }),
  gulp = require('gulp'),
  fs = require('fs'),
  ftp = require("./ftp.json");

var settings = {
	local: 'local', // for local develop
	ftp: 'ftp' // build files and upoload it on ftp server

}
/////////settings////////////
var buildSetting = settings.local; // build local or ftp
var comporess = false // set comporess or not build files
var conn = plugins.vinylFtp.create(ftp.conf);  
var htmlBeautifyOptions = { "indent_size": 2};
//////////////////////////////////////////////
var libsPath = {
  bootstrap: {
    js: [
      'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js'
    ],
    scss: [
     'bower_components/bootstrap-sass/assets/stylesheets/**/*.*'
    ],
    css: [
        'src/libs/bootstrap/css/**/*.*'
      ],
    fonts: ['bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*']
  },
  jquery: {
    js: [
        'bower_components/jquery/dist/jquery.min.js'
      ]
  },
  slick: {
    js: [
        'bower_components/slick-carousel/slick/slick.min.js'
      ],
    css: [
        'bower_components/slick-carousel/slick/slick.css',
        'bower_components/slick-carousel/slick/slick-theme.css'
      ],
    fonts: [
        'bower_components/slick-carousel/slick/fonts/*.*'
      ],
    images: [
        'bower_components/slick-carousel/slick/ajax-loader.gif'
      ]
  },
  fullpage: {
    js: [
        'bower_components/fullpage.js/dist/jquery.fullpage.min.js'
      ],
    css: [
        'bower_components/fullpage.js/dist/jquery.fullpage.min.css'
      ]
  },
  susy: {
    scss: [
      'bower_components/susy/sass/**/*.*'
    ]
  },
  breakpoint: {
    scss: [
      'bower_components/breakpoint-sass/stylesheets/**/*.*'
    ]
  },
  bourbon: {
    scss: [
      'bower_components/bourbon/app/assets/stylesheets/**/*.*'
    ]
  }
}

//set what your want use
var libs = {
  jquery: libsPath.jquery, // inject name jquery
   susy: libsPath.susy,
  // breakpoint: libsPath.breakpoint,
  // bourbon: libsPath.bourbon
  // bootstrap: libsPath.bootstrap, // inject name bootstrap
   //slick: libsPath.slick, // inject name slick
  //fullpage:libsPath.fullpage, // inject name fullpage
}
var root = "app/";
var path = {
  build: {
    html: root,
    js: root + 'js/',
    css: root + '/css/',
    img: root + '/images/',
    fonts: root + '/fonts/',
    libs: root + '/libs/',
    sprite: "../images/",
	//php: '/../test.site/',
  },
  src: {
    html: 'src/template/pages/*.html',
    js: 'src/js/main.js',
    style: ['src/style/**/*.scss', '!src/style/libs/**/*.scss'],
    libStyle: 'src/style/libs/**/*.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*',
    libs: 'src/libs/**/*.*',
    sprite: 'src/style/helpers/',
	//php:'php/test.site/test.site/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*',
    sprite: 'src/sprites/*.png',
	//php:'php/*/**/*.php*'
  },
  clean: 'build'
};

var swigOpt = {
  load_json: true,
  json_path: './src/template/data/',
  defaults: {
    cache: false
  }
};

var sassOptions = {
  outputStyle: 'expanded'
};

var configServer = {
  tunnel: false,
  host: 'localhost',
  logPrefix: "Frontend_Devil",
  proxy: 'tachky.local',
  port: 80,
  browser: "firefox",
  logLevel: 'silent'
};

/*clear build directory*/
function clean() {

  return plugins.del(root + '*');
}

function html_build() {

  return gulp.src(path.src.html)
   //.pipe(plugins.newer(path.build.html))
    .pipe(plugins.swig(swigOpt).on('error', plugins.notify.onError(function (e) {
      console.log(e);
      return "AHTUNG TWIG ERROR!!"
    })))
    .pipe(plugins.htmlBeautify(htmlBeautifyOptions))
    .pipe(plugins.remember('html'))
    .pipe(plugins.if(buildSetting === "ftp", conn.dest(root)))
    .pipe(plugins.if(buildSetting === "local", gulp.dest(path.build.html)))
    .on('end', plugins.browserSync.reload);
}
function php_build() {

  return gulp.src(path.src.php)
   .pipe(plugins.newer(path.build.php))
    .pipe(plugins.remember('php'))
    .pipe(plugins.if(buildSetting === "ftp", conn.dest(path.build.php)))
    .on('end', plugins.browserSync.reload);
}
function js_build() {

  return gulp.src(path.src.js)
	.pipe(plugins.newer(path.build.js))
    .pipe(plugins.rigger())
    .pipe(plugins.remember('js'))
	.pipe(plugins.if(comporess, plugins.jsmin()))
    .pipe(plugins.if(buildSetting === "ftp", conn.dest(path.build.js)))
    .pipe(plugins.if(buildSetting === "local", gulp.dest(path.build.js)))
    .pipe(plugins.browserSync.stream());
}

function style_build() {

  return gulp.src(path.src.style)
    .pipe(plugins.newer(path.build.css))
    .pipe(plugins.sass(sassOptions).on('error', plugins.notify.onError(function (e) {
      console.log(e);
      return "AHTUNG SASS ERROR!!"
    })))
    .pipe(plugins.autoprefixer({
      browsers: ['last 16 versions'],
      cascade: false
    }))
	.pipe(plugins.if(comporess, plugins.cssmin()))
    .pipe(plugins.remember('style'))
    .pipe(plugins.if(buildSetting === "ftp", conn.dest(path.build.css)))
    .pipe(plugins.if(buildSetting === "local", gulp.dest(path.build.css)))
    .pipe(plugins.browserSync.stream());
}

function image_build() {

  return gulp.src(path.src.img, {

    })
    .pipe(plugins.newer(path.build.img))
    .pipe(plugins.imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [plugins.imageminPngquant()],
      interlaced: true
    }))
    .pipe(plugins.remember('image'))
    .pipe(plugins.if(buildSetting === "ftp", conn.dest(path.build.img)))
    .pipe(plugins.if(buildSetting === "local", gulp.dest(path.build.img)))
    .pipe(plugins.browserSync.stream());
}

function sprite_build() {

  var spriteData = gulp.src('src/sprites/*.png')
    .pipe(plugins.newer(path.build.img))
    .pipe(plugins.spritesmith({
      imgName: path.build.sprite+'sprite.png',
      cssName: '_sprite.scss',
      cssTemplate: 'src/style/helpers/_sprite_template.handlebars',
      cssOpts: {
        cssSelector: function (item) {
          if (item.name.indexOf('-hover') !== -1) {
            return '.icon-' + item.name.replace('-hover', ':hover');
          } else {
            return '.icon-' + item.name;
          }
        }
      }
    }));
   spriteData.pipe(plugins.remember('sprite'))
   spriteData.img.pipe(plugins.if(buildSetting === "ftp", conn.dest(root)))
   spriteData.img.pipe(plugins.if(buildSetting === "local", gulp.dest(path.build.img)))
  return spriteData.css.pipe(gulp.dest(path.src.sprite));
}

function fonts_build() {

  return gulp.src(path.src.fonts)
     .pipe(plugins.newer(path.build.fonts))
    .pipe(gulp.dest(path.build.fonts))
    .pipe(plugins.if(buildSetting === "ftp", conn.dest(path.build.fonts)))
    .pipe(plugins.if(buildSetting === "local", gulp.dest(path.build.fonts)))
    .pipe(plugins.browserSync.stream());
}

//install libs
function lib_install(cb) {

  for (var item in libs) {
    var nameLib = item;
    for (var fileType in libs[item]) {
      for (var i = 0; libs[item][fileType].length > i; i++) {
        var path = libs[item][fileType][i];
        if (fileType === 'scss') {
          if (!fs.existsSync('src/style/libs/' + nameLib))
            gulp.src(path).pipe(gulp.dest('src/style/libs/'));
        } else {      
          gulp.src(path)
          .pipe(gulp.dest('src/libs/' + nameLib + '/' + fileType + '/'))
        }
      }
    }
  }
  cb();
}

function lib_build(){
 return gulp.src(path.src.libs)
  .pipe(plugins.if(buildSetting === "ftp", conn.dest(path.build.libs)))
  .pipe(plugins.if(buildSetting === "local", gulp.dest(path.build.libs)))
}

function lib_contact_build(){
	gulp.src('src/libs/**/*.css')
	.pipe(plugins.concat('libs.css'))
	.pipe(plugins.if(comporess, plugins.cssmin()))
	.pipe(plugins.if(buildSetting === "ftp", conn.dest(path.build.css)))
	.pipe(plugins.if(buildSetting === "local", gulp.dest(path.build.css)))
	
	gulp.src('src/libs/**/*.js')
	.pipe(plugins.concat('libs.js'))
	.pipe(plugins.if(buildSetting === "ftp", conn.dest(path.build.js)))
	.pipe(plugins.if(buildSetting === "local", gulp.dest(path.build.js)))
		
	return 	gulp.src(['src/libs/**/*.png', 'src/libs/**/*.gif', 'src/libs/**/*.jpg', 'src/libs/**/*.svg'])
	.pipe(plugins.flatten())
	.pipe(plugins.if(buildSetting === "ftp", conn.dest(path.build.img)))
	.pipe(plugins.if(buildSetting === "local", gulp.dest(path.build.img)))
}

/*inject css js to index file*/
function inc_build() {

  var stream = gulp.src('src/template/pages/*.html')
    .pipe(plugins.inject(gulp.src([
        root + 'js/**/*.js'
   ], {
      read: false
    }), {
      name: 'dev',
      ignorePath: root,
      addPrefix: '.',
      addRootSlash: false
    }))
    .pipe(plugins.inject(gulp.src([
        root + 'css/**/*.css'
   ], {
      read: false
    }), {
      name: 'dev',
      ignorePath: root,
      addPrefix: '.',
      addRootSlash: false
    }));

  for (var lib in libs) {
    if (libs[lib].css !== undefined) {
      stream.pipe(plugins.inject(gulp.src([
          root + 'libs/' + lib + '/css/*.css'
        ], {
        read: false
      }), {
        name: lib,
        ignorePath: root,
        addPrefix: '.',
        addRootSlash: false
      }));
    }

    if (libs[lib].js !== undefined) {
      stream.pipe(plugins.inject(gulp.src([
         root + 'libs/' + lib + '/js/*.js'
        ], {
        read: false
      }), {
        name: lib,
        ignorePath: root,
        addPrefix: '.',
        addRootSlash: false
      }));
    }
  }
 return stream.pipe(gulp.dest('src/template/pages/'));
}

function webserver() {

  return plugins.browserSync(configServer);
}

var build = gulp.series(
  sprite_build,
  gulp.parallel(
    lib_contact_build,
    fonts_build,
    image_build,
    style_build,
    js_build
  ),
  //inc_build,
  html_build
);

function upload() {
  var conn = plugins.vinylFtp.create(ftp.conf);  
  var stream =  gulp.src(ftp.files, {
      base: '.',
      buffer: true
    })
    .pipe(conn.dest(ftp.pathToServer));
	return stream.pipe(plugins.browserSync.stream());
}

function watch() {

  gulp.watch(path.watch.html, html_build).on('unlink', function (filepath) {
    return plugins.remember.forget('html', plugins.resolvePath(filepath));
  });
  gulp.watch(path.watch.php, php_build).on('unlink', function (filepath) {
    return plugins.remember.forget('php', plugins.resolvePath(filepath));
  });
  gulp.watch(path.watch.style, style_build).on('unlink', function (filepath) {
    return plugins.remember.forget('style', plugins.resolvePath(filepath));
  });

  gulp.watch(path.watch.js, js_build).on('unlink', function (filepath) {
    return plugins.remember.forget('js', plugins.resolvePath(filepath));
  });

  gulp.watch(path.watch.img, image_build).on('unlink', function (filepath) {
    return plugins.remember.forget('image', plugins.resolvePath(filepath));
  });

  gulp.watch(path.watch.sprite, sprite_build).on('unlink', function (filepath) {
    return plugins.remember.forget('sprite', plugins.resolvePath(filepath));
  });
  
  gulp.watch(path.watch.fonts, fonts_build);
}

exports.clean = clean;
exports.webserver = webserver;
exports.build = build;
exports.watch = watch;
exports.html_build = html_build;
exports.php_build = php_build;
exports.js_build = js_build;
exports.style_build = style_build;
exports.image_build = image_build;
exports.sprite_build = sprite_build;
exports.fonts_build = fonts_build;
exports.inc_build = inc_build;
exports.lib_install = lib_build;
exports.lib_build = lib_build;
exports.lib_contact_build= lib_contact_build;

exports.upload = upload;
////////
exports.default = gulp.series(build,
  gulp.parallel(watch, webserver));
