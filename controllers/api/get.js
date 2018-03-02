const Router = require('koa-router');
const router = new Router();

router.post('/get/wsurl',(ctx)=>{
  console.log(ctx);
})

module.exports = router;