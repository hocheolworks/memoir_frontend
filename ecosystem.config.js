module.exports = {
  apps: [
    {
      name: "memoir_frontend",
      script: "node_modules/next/dist/bin/next",
    },
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "54.180.51.124",
      path: "/home/ubuntu/memoir_frontend/",
      repo: "git@github.com:hocheolworks/memoir_frontend.git",
      ref: "origin/main",
      key: "/Users/hjlee/Projects/pems/memoir_prd.pem",
      "post-deploy":
        "npm i; npm run build; pm2 start npm --name memoir_frontend -- start --watch;",
    },
  },
};
