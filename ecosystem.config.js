module.exports = {
  apps: [
    {
      name: "kingdomkids",
      script: "node_modules/.bin/next",
      args: "start -p 3535",
      cwd: "/KingdomKids",
      env: { NODE_ENV: "production" },
      restart_delay: 1000,
      max_restarts: 10,
      watch: false,
    },
  ],
};
