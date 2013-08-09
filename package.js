Package.describe({
  summary: "Greenlight profile site template"
});

Package.on_use(function (api, where) {

    api.use('router', ['client', 'server']);
    api.use(['templating'], 'client');
    
    api.add_files(['client/profile_page.html', 'client/profile_page.js', 'client/profile_page.css'], 'client');
    
    api.add_files(['client/profile_page_public.html', 'client/profile_page_public.js', 'client/profile_page_public.css'], 'client');

    api.add_files('client/profile.js', 'client');
    api.add_files('server/profile.js', 'server');
});

Package.on_test(function (api) {
    api.add_files('profile_tests.js', 'client');
});
