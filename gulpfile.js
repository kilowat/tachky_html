'use strict';

const
  gulpLoadPlugins = require('gulp-load-plugins'),
  plugins = gulpLoadPlugins({
    pattern: "*"
  }),
  gulp = require('gulp'),
  fs = require('fs'),
  ftp = require("./ftp.json");

var env = process.env.NODE_ENV || 'local';
var conn = plugins.vinylFtp.create(ftp.conf);  
var ignorinc = 'app';
var htmlBeautifyOptions = { "indent_size": 2};

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
  vtip:{
    js:[
      'src/libs/vtip/js/vtip.js'
    ]
  },
  numberInput:{
    js:[
      'src/libs/numberInput/js/number_input.js'
    ]
  },
  fancybox:{
	  js: [
		"src/libs/fancybox/js/jquery.fancybox.pack.js"
	  ],
	  css:[
		"src/libs/fancybox/css/jquery.fancybox.css"
	],
	images:[
		'src/libs/fancybox/images/blank.gif',
		'src/libs/fancybox/images/fancybox_loading.gif',
		'src/libs/fancybox/images/fancybox_loading@2x.gif',
		'src/libs/fancybox/images/fancybox_overlay.png',
		'src/libs/fancybox/images/fancybox_sprite.png',
		'src/libs/fancybox/images/fancybox_sprite@2x.png',
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
   select:{
	  js:[
		"src/libs/customselect/js/selectize.min.js"
	  ]
	},
	cropper:{
	  js:[
		"src/libs/cropper/js/cropper.min.js"
	  ],
	  css:[
		"src/libs/cropper/css/cropper.css"
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
  },
  priceSlider:{
    js:[
      'src/libs/priceSlider/js/jquery.slider.min.js'
    ]
  }
}

//set what your want use
var libs = {
  jquery: libsPath.jquery, // inject name jquery
   susy: libsPath.susy,
   breakpoint: libsPath.breakpoint,
  vtip:libsPath.vtip,
  numberInput:libsPath.numberInput,
 // priceSlider:libsPath.priceSlider,
  // bourbon: libsPath.bourbon
  // bootstrap: libsPath.bootstrap, // inject name bootstrap
   //slick: libsPath.slick, // inject name slick
   //select:libsPath.select,
   //fancybox:libsPath.fancybox,
   //cropper:libsPath.cropper,
  //fullpage:libsPath.fullpage, // inject name fullpage
}
var root = "./app/";

var path = {
  build: {
	php: root+'php',
    html: root,
    js: root + 'js/',
    css: root + 'css/',
    img: root + 'images/',
    fonts: root + 'fonts/',
    libs: root + 'libs/',
	sprite: "../images/",
  },
  src: {
	php: 'src/php/*.*',
    html: 'src/template/pages/*.html',
    js: 'src/js/**/*.js',
    style: ['src/style/**/*.scss', '!src/style/libs/**/*.scss'],
    libStyle: 'src/style/libs/**/*.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*',
    libs : 'src/libs/**/*.*',
    sprite: 'src/style/helpers/'
  },
  watch: {
	php: 'src/php/*.*',
    html: 'src/template/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*',
    sprite: 'src/sprites/*.png'
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
};

/*clear build directory*/
function clean() {

  return plugins.del(root + '*');
}

function php_build(){
 return gulp.src(path.src.php)
    .pipe(plugins.if(env === "ftp", conn.dest(path.build.php)))
    .pipe(plugins.if(env === "local", gulp.dest(path.build.php)))
    .on('end', plugins.browserSync.reload);
}

function html_build() {

  return gulp.src(path.src.html)
   .pipe(plugins.newer(path.src.html))
    .pipe(plugins.swig(swigOpt).on('error', plugins.notify.onError(function (e) {
      console.log(e);
      return "AHTUNG TWIG ERROR!!"
    })))
	.pipe(plugins.htmlBeautify(htmlBeautifyOptions))
    .pipe(plugins.remember('html'))
    .pipe(plugins.if(env === "ftp", conn.dest(root)))
    .pipe(plugins.if(env === "local", gulp.dest(path.build.html)))
    .on('end', plugins.browserSync.reload);
}

function js_build() {

  return gulp.src(path.src.js)
    .pipe(plugins.if(env === "ftp", conn.dest(path.build.js)))
    .pipe(plugins.if(env === "local", gulp.dest(path.build.js)))
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
    .pipe(plugins.remember('style'))
    .pipe(plugins.if(env === "ftp", conn.dest(path.build.css)))
    .pipe(plugins.if(env === "local", gulp.dest(path.build.css)))
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
    .pipe(plugins.if(env === "ftp", conn.dest(path.build.img)))
    .pipe(plugins.if(env === "local", gulp.dest(path.build.img)))
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
   spriteData.img.pipe(plugins.if(env === "ftp", conn.dest(root)))
   spriteData.img.pipe(plugins.if(env === "local", gulp.dest(path.build.img)))
  return spriteData.css.pipe(gulp.dest(path.src.sprite));
}

function fonts_build() {

  return gulp.src(path.src.fonts)
    .pipe(plugins.newer(path.build.fonts))
    .pipe(gulp.dest(path.build.fonts))
    .pipe(plugins.if(env === "ftp", conn.dest(path.build.fonts)))
    .pipe(plugins.if(env === "local", gulp.dest(path.build.fonts)))
    .pipe(plugins.browserSync.stream());
}

//install libs
function lib_build(cb) {

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
          .pipe(plugins.if(env === "ftp", conn.dest(root+'/libs/' + nameLib + '/' + fileType + '/')))
          .pipe(plugins.if(env === "local", (gulp.dest(root + 'libs/' + nameLib + '/' + fileType + '/'))))
        }
      }
    }
  }
  cb();
}

/*inject css js to index file*/
function inc_build() {
  var stream = gulp.src('src/template/layout/main.html')
    .pipe(plugins.inject(gulp.src([
        root + 'js/**/*.js'
   ], {
      read: false
    }), {
      name: 'dev',
      ignorePath: ignorinc,
      addPrefix: '.',
      addRootSlash: false
    }))
    .pipe(plugins.inject(gulp.src([
        root + 'css/**/*.css'
   ], {
      read: false
    }), {
      name: 'dev',
      ignorePath: ignorinc,
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
        ignorePath: ignorinc,
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
        ignorePath: ignorinc,
        addPrefix: '.',
        addRootSlash: false
      }));
    }
  }
  return stream.pipe(gulp.dest('src/template/layout/'));
}

function webserver() {

  return plugins.browserSync(configServer);
}

var build = gulp.series(
  sprite_build,
  gulp.parallel(
    lib_build,
    fonts_build,
    image_build,
    style_build,
    js_build
	//php_build
  ),
  inc_build,
  html_build
);

function upload() {
  var conn = plugins.vinylFtp.create(ftp.conf);  
  var stream =  gulp.src(ftp.files, {
      base: 'app',
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
exports.php = php_build;
exports.html_build = html_build;
exports.js_build = js_build;
exports.style_build = style_build;
exports.image_build = image_build;
exports.sprite_build = sprite_build;
exports.fonts_build = fonts_build;
exports.inc_build = inc_build;
exports.lib_build = lib_build;
exports.upload = upload;
////////
exports.default = gulp.series(build,
  gulp.parallel(watch, webserver));
