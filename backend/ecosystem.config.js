module.exports = {
  apps : [{
    name: 'newsletter',
    script: 'app.js',
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true,
    watch: true,
    watch_delay: 1000,
    ignore_watch : ["node_modules", "logs"],
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production",
       "DB_USERNAME":"root",
       "DB_PASSWORD":"rJqnKNVAkEl1",
       "DATABASE_URI": "127.0.0.1",
       "DATABASE_PORT": "27017"
    }
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
