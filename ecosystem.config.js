module.exports = {
  apps: [
    {
      name: "memoir_frontend",
      cwd: "/home/ubuntu/memoir_frontend/",
      script: "npm",
      args: "start",
    },
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "54.180.51.124",
      path: "/home/ubuntu/memoir_frontend/",
      repo: "git@github.com:hocheolworks/memoir_frontend.git",
      ref: "origin/main",
      key: "/Users/hjlee/Development/Pems/memoir_prd.pem",
      "post-deploy":
        "npm i; npm run build; pm2 stop memoir_frontend; pm2 delete memoir_frontend; pm2 start npm --name memoir_frontend -- start --watch --update-env;",
    },
  },
};
