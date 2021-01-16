class Cartman {
   constructor(game, ASSET_MANAGER, x, y,) {
      // (1, 235) is basic sprite start
      // (225, 330) is crying sprite start, 88 is height, 87 is width
      Object.assign(this, { game, x, y });
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cartman.png");
      this.basicAnimation = new Animator(this.spritesheet, 1, 235, 100, 90, 2, 0.5, 104, true, false);
      this.cryingAnimation = new Animator(this.spritesheet, 225, 330, 87, 88, 2, 0.5, 4, true, true);
      this.flip = true;
      this.hasFlipped = false;
   };

   update() {
      if (this.basicAnimation.isDone() && !this.hasFlipped) {
         this.flip = !this.flip;
         this.hasFlipped = true;
      }
   };

   draw(ctx) {
      if (this.flip) {
         this.basicAnimation.drawFrame(this.game.clockTick, ctx, 0, 0, 4);
      } else {
         this.cryingAnimation.drawFrame(this.game.clockTick, ctx, 0, 0, 4);
      }
      // this.cryingAnimation.drawFrame(this.game.clockTick, ctx, 0, 0, 4);
   };
}