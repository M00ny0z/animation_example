/**
 * GameEngine file to handle overall game loop
 * Thanks to Dr. Chris Marriott and Seth Ladd
 */
// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
class GameEngine {
   constructor() {
       this.entities = [];
       this.showOutlines = false;
       this.ctx = null;
       this.click = null;
       this.mouse = null;
       this.wheel = null;
       this.surfaceWidth = null;
       this.surfaceHeight = null;
   };

   init(ctx) {
       this.ctx = ctx;
       this.surfaceWidth = this.ctx.canvas.width;
       this.surfaceHeight = this.ctx.canvas.height;
       this.startInput();
       this.timer = new Timer();
   };

   start() {
       const that = this;
       (function gameLoop() {
           that.loop();
           requestAnimFrame(gameLoop, that.ctx.canvas);
       })();
   };

   startInput() {
       const that = this;

       const getXandY = function (e) {
           const x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
           const y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

           return { x: x, y: y };
       }

       this.ctx.canvas.addEventListener("mousemove", function (e) {
           //console.log(getXandY(e));
           that.mouse = getXandY(e);
       }, false);

       this.ctx.canvas.addEventListener("click", function (e) {
           //console.log(getXandY(e));
           that.click = getXandY(e);
       }, false);

       this.ctx.canvas.addEventListener("wheel", function (e) {
           //console.log(getXandY(e));
           that.wheel = e;
           //       console.log(e.wheelDelta);
           e.preventDefault();
       }, false);

       this.ctx.canvas.addEventListener("contextmenu", function (e) {
           //console.log(getXandY(e));
           that.rightclick = getXandY(e);
           e.preventDefault();
       }, false);
   };

   addEntity(entity) {
       this.entities.push(entity);
   };

   draw() {
       this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
       this.ctx.save();
       for (let i = 0; i < this.entities.length; i++) {
           this.entities[i].draw(this.ctx);
       }
   };

   update() {
       const entitiesCount = this.entities.length;

       for (let i = 0; i < entitiesCount; i++) {
           const entity = this.entities[i];

           if (!entity.removeFromWorld) {
               entity.update();
           }
       }

       for (let i = this.entities.length - 1; i >= 0; --i) {
           if (this.entities[i].removeFromWorld) {
               this.entities.splice(i, 1);
           }
       }
   };

   loop() {
       this.clockTick = this.timer.tick();
       this.update();
       this.draw();
   };
};