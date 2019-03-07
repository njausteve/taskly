module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: "com.taskly.app",
        copyright: "Copyright © year njausteve",
        mac: {
          icon: "./src/assets/icon.png"
        },
        win: {
          icon: "./src/assets/icon.png"
        }
      }
    }
  }
};
