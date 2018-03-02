const Router = require('koa-router');
const router = new Router();

router.post('/ws/push',(ctx)=>{
  console.log(ctx);
})

module.exports = router;