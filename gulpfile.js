var gulp = require('gulp');
// var copy = require('gulp-copy');
// var less = require('gulp-less');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');

var path_theme = './src/shop/bundled/resources';
// var path_plonetheme = './npm_modules/plonetheme.barceloneta/plonetheme/barceloneta/theme';
var remoteSrc = require('gulp-remote-src');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');


gulp.task('all', function (cb) {
    'use strict';
    runSequence('jsbundle', 'cssbundle', cb);
});

// // RUN ALL in sequence
// gulp.task('all', function(cb) {
//     'use strict';
//     runSequence('theme', 'plone', cb);
// });

// // RUN ALL THEME
// gulp.task('theme', function(cb) {
//     'use strict';
//     runSequence(['lesslib', 'less', 'concatjs'], cb);
// });

// // RUN ALL PLONE
// gulp.task('plone', function(cb) {
//     'use strict';
//     runSequence(['ploneless', 'plonejs', 'ploneimg', 'plonefonts'], cb);
// });


// // THEME TASKS
// //
// gulp.task('lesslib', function() {
//     'use strict';
//     return gulp.src([path_theme + '/less/libraries.less', ])
//     .pipe(sourcemaps.init())
//     .pipe(less())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest(path_theme + '/css'));
// });

// gulp.task('less', function() {
//     'use strict';
//     return gulp.src([
//         path_theme + '/less/site-default.less',
//         path_theme + '/less/site-aaf.less',
//         path_theme + '/less/site-afo.less',
//         path_theme + '/less/site-ahk.less',
//         path_theme + '/less/site-arb.less',
//         path_theme + '/less/site-aut.less',
//         path_theme + '/less/site-hda.less',
//         path_theme + '/less/site-ia.less',
//         path_theme + '/less/site-ogfa.less',
//         path_theme + '/less/site-orte.less',
//         path_theme + '/less/site-vai.less',
//         path_theme + '/less/site-zv.less',
//     ])
//     .pipe(sourcemaps.init())
//     .pipe(less())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest(path_theme + '/css'));
// });

gulp.task('concatjs', function () {
    'use strict';
    return gulp.src([
        './src/shop/bundled/resources/shop/shop.js',
        './src/shop/bundled/resources/shop/cart.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('shop-bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path_theme));
});

// gulp.task('watch', function () {
//     'use strict';
//     gulp.watch('./schubiduquartett/Basic-Theme2/less/*.less', ['less', 'ploneless']);
// });

gulp.task('jsbundle', function () {
    'use strict';
    remoteSrc([
        'bluedynamics/bdajax/master/src/bdajax/resources/bdajax.js',
        'bluedynamics/bdajax/master/src/bdajax/resources/overlay.js',
        'bluedynamics/bda.plone.cart/master/src/bda/plone/cart/browser/cookie_functions.js',
        'bluedynamics/bda.plone.cart/fa0e1bd9ec78e9f5dcb8251145205d952c0ae28d/src/bda/plone/cart/browser/cart.js',
        // 'bluedynamics/bda.plone.cart/master/src/bda/plone/cart/browser/cart.js',
        'bluedynamics/bda.plone.checkout/master/src/bda/plone/checkout/browser/checkout.js',
        'bluedynamics/bda.plone.discount/master/src/bda/plone/discount/browser/discount.js',
        'collective/collective.js.datatables/4.1.2/collective/js/datatables/resources/media/js/jquery.dataTables.min.js',
        'bluedynamics/bda.plone.orders/master/src/bda/plone/orders/browser/resources/qrcode.js',
        'bluedynamics/bda.plone.orders/master/src/bda/plone/orders/browser/resources/orders.js',
        'bluedynamics/bda.plone.shop/master/src/bda/plone/shop/browser/shop.js'
    ], {
        base: 'https://raw.githubusercontent.com/'
    })
        // .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(concat('shop-bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path_theme));
});

gulp.task('cssbundle', function () {
    'use strict';
    remoteSrc([
        'bluedynamics/bdajax/master/src/bdajax/resources/bdajax.css',
        'bluedynamics/bda.plone.cart/master/src/bda/plone/cart/browser/cart_p5.css',
        'bluedynamics/bda.plone.checkout/master/src/bda/plone/checkout/browser/checkout_p5.css',
        'bluedynamics/bda.plone.discount/master/src/bda/plone/discount/browser/discount_p5.css',
        'bluedynamics/bda.plone.payment/master/src/bda/plone/payment/resources/payment_p5.css',
        'collective/collective.js.datatables/4.1.2/collective/js/datatables/resources/media/css/jquery.dataTables.min.css',
        'bluedynamics/bda.plone.orders/master/src/bda/plone/orders/browser/resources/orders_p5.css',
        'bluedynamics/bda.plone.shop/master/src/bda/plone/shop/browser/shop_p5.css'
    ], {
        base: 'https://raw.githubusercontent.com/'
    })
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.init())
        .pipe(concat('shop-bundle.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path_theme));
});

// // PLONE INTEGRATION
// //
// gulp.task('ploneless', function() {
//     'use strict';
//     return gulp.src([
//         path_plonetheme + '/less/libraries.less',
//         path_plonetheme + '/less/site-default.less',
//         path_plonetheme + '/less/site-aaf.less',
//         path_plonetheme + '/less/site-afo.less',
//         path_plonetheme + '/less/site-ahk.less',
//         path_plonetheme + '/less/site-arb.less',
//         path_plonetheme + '/less/site-aut.less',
//         path_plonetheme + '/less/site-hda.less',
//         path_plonetheme + '/less/site-ia.less',
//         path_plonetheme + '/less/site-ogfa.less',
//         path_plonetheme + '/less/site-orte.less',
//         path_plonetheme + '/less/site-vai.less',
//         path_plonetheme + '/less/site-zv.less',
//     ])
//     .pipe(sourcemaps.init())
//     .pipe(less({
//         paths: [path_theme + '/..', ] // one level up, to be able to reference 'Basic-Theme2'
//     }))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest(path_plonetheme + '/css'));
// });
// gulp.task('plonejs', function() {
//     'use strict';
//     return gulp.src([path_theme + '/js/libraries.js', path_theme + '/js/main.js'])
//     .pipe(copy(path_plonetheme + '/js', {
//         prefix: 3
//     }));
// });
// gulp.task('ploneimg', function() {
//     'use strict';
//     return gulp.src([path_theme + '/img/*'])
//     .pipe(copy(path_plonetheme + '/img/', {
//         prefix: 3
//     }));
// });
// gulp.task('plonefonts', function() {
//     'use strict';
//     return gulp.src([path_theme + '/fonts/**/*'])
//     .pipe(copy(path_plonetheme + '/fonts/', {
//         prefix: 3
//     }));
// });
