lock '3.4.0'

set :application, 'vg-prices'
set :repo_url, 'https://github.com/dzhaparoff/vg-prices.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/home/vg/prices/'

set :keep_releases, 3

set :linked_files, fetch(:linked_files, [])
                       .push(
                           'config/database.yml',
                           'config/mongoid.yml',
                           'config/puma.rb',
                           'config/secrets.yml',
                           'config/cable.yml',
                           'config/application.yml',
                           'frontend/package.json',
                           'frontend/bower.json',
                           'frontend/.bowerrc'
                       )

set :linked_dirs, fetch(:linked_dirs, [])
                      .push(
                          'log',
                          'tmp/pids',
                          'tmp/cache',
                          'tmp/sockets',
                          'vendor/bundle',
                          'public/system',
                          'frontend/bower_components',
                          'frontend/node_modules'
                      )

set :puma_bind, "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_default_control_app, "unix://#{shared_path}/tmp/sockets/pumactl.sock"
set :puma_conf, "#{shared_path}/config/puma.rb"
set :puma_access_log, "#{shared_path}/log/puma_access.log"
set :puma_error_log, "#{shared_path}/log/puma_error.log"
set :puma_role, :app
set :puma_env, fetch(:rack_env, fetch(:rails_env, 'production'))
set :puma_threads, [1, 4]
set :puma_workers, 0
set :puma_worker_timeout, nil
set :puma_init_active_record, true
set :puma_preload_app, false
set :nginx_use_ssl, false

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end

  before :start, :make_dirs
end

namespace :deploy do

  desc "Make sure local git is in sync with remote."
  task :check_revision do
    on roles(:app) do
      unless `git rev-parse HEAD` == `git rev-parse origin/master`
        puts "WARNING: HEAD is not the same as origin/master"
        puts "Run `git push` to sync changes."
        exit
      end
    end
  end

  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'puma:restart'
    end
  end

  after :restart, :clear_cache do
    on roles(:app) do
      # execute "cd '#{shared_path}/frontend'; npm install"
      # execute "cd '#{shared_path}/frontend'; bower install"
      execute "cd '#{current_path}/frontend'; npm run precompile"

      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

  before :starting,     :check_revision
  # after  :finishing,    :compile_assets
  after  :finishing,    :cleanup
  after  :finishing,    :restart

  after :finishing, 'deploy:cleanup'

end