require.config({
  name: 'ng-famous',
  preserveLicenseComments: false,
  include: 'requireLib',
  shim: {
    ng: {
      exports: 'angular'
    },
    'angular-route' : [
      'ng'
    ]
  },  
  paths: {
    ng: 'components/angular/angular',
    'angular-route': 'components/angular-route/angular-route',
    famous: 'components/famous/dist/famous',
    'famous-angular': 'components/famous-angular/dist/famous-angular',
    'domReady': 'components/requirejs-domready/domReady',
    requireLib: 'components/requirejs/require',
    imagesLoaded: 'components/imagesloaded/imagesloaded.pkgd'
  },
  options: {
    baseUrl: 'js'
  },
  packages: [

  ],
  deps: ['angular/app']
});
