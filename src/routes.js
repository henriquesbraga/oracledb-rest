const {Router} = require('express');
const {insertData, deleteData, selectAll, selectById, updateData} = require('./controllers/indexController');

const router = Router();

router.post('/insert', insertData);
router.delete('/delete', deleteData);
router.put('/update', updateData);
router.get('/all', selectAll);
router.get('/byid', selectById);

module.exports = router;