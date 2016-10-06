var gulp = require('gulp');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');

var path_theme = './src/shop/bundled/resources';
var remoteSrc = require('gulp-remote-src');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

gulp.task('all', function (cb) {
    'use strict';
    runSequence('jsbundle', 'cssbundle', cb);
});


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

gulp.task('jsbundle', function () {
    'use strict';
    remoteSrc([
        'bluedynamics/bda.plone.shop/master/src/bda/plone/shop/browser/shop.js',
        'bluedynamics/bda.plone.cart/master/src/bda/plone/cart/browser/cookie_functions.js',
        'bluedynamics/bda.plone.cart/master/src/bda/plone/cart/browser/cart.js',
        'bluedynamics/bda.plone.checkout/master/src/bda/plone/checkout/browser/checkout.js',
        'bluedynamics/bda.plone.discount/master/src/bda/plone/discount/browser/discount.js',
        'bluedynamics/bda.plone.orders/master/src/bda/plone/orders/browser/resources/qrcode.js',
        'bluedynamics/bda.plone.orders/master/src/bda/plone/orders/browser/resources/orders.js'
    ], {
        base: 'https://raw.githubusercontent.com/'
    })
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(concat('shop-bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path_theme));
});

gulp.task('cssbundle', function () {
    'use strict';
    remoteSrc([
        'bluedynamics/bda.plone.cart/master/src/bda/plone/cart/browser/cart_p5.css',
        'bluedynamics/bda.plone.checkout/master/src/bda/plone/checkout/browser/checkout_p5.css',
        'bluedynamics/bda.plone.discount/master/src/bda/plone/discount/browser/discount_p5.css',
        'bluedynamics/bda.plone.payment/master/src/bda/plone/payment/resources/payment_p5.css',
        'bluedynamics/bda.plone.shop/master/src/bda/plone/shop/browser/shop_p5.css'
    ], {
        base: 'https://raw.githubusercontent.com/'
    })
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.init())
        .pipe(concat('shop-bundle.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path_theme));
});
