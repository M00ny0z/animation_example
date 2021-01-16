(function() {
   window.addEventListener("load", main);

   function main() {
      const gameEngine = new GameEngine();
      const ASSET_MANAGER = new AssetManager();
      
      ASSET_MANAGER.queueDownload('./sprites/cartman.png');
      ASSET_MANAGER.downloadAll(function () {
         const canvas = document.querySelector('canvas');
         const ctx = canvas.getContext('2d');

         const cartman = new Cartman(gameEngine, ASSET_MANAGER, 5, 5);

         gameEngine.addEntity(cartman);
         

         gameEngine.init(ctx);
         gameEngine.start()
      });
   };
   
})();