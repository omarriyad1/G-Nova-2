const express = require('express');
const router = express();
const userContoller=require('../controllers/AdminController');
const adminEstateController = require('../controllers/estateController');
const compoundController = require('../controllers/compoundController');
const workerController = require('../controllers/workerController');

const middleware=require('../middleware/authMiddleware');

//admin account
router.post('/register',userContoller.signup);
router.post('/login',userContoller.signin);
router.get('/getinfo',middleware,userContoller.getadmininfo);
router.post('/forgetpassword',userContoller.forgotPassword);
router.post('/resetpassword',userContoller.resetPassword);
//manage estates
router.get('/getallestates',middleware, adminEstateController.getAllEstates);
router.get('/getestatebyid/:id', middleware,adminEstateController.getEstateById);
router.post('/createestate', middleware,adminEstateController.createEstate);
router.put('/updateestate/ :id',middleware, adminEstateController.updateEstate);
router.delete('/deleteestate/ :id',middleware, adminEstateController.deleteEstate);
router.get('/getestatebyname/:name',middleware, adminEstateController.getEstateByName);
router.get('/getestatesbycategory/:category',middleware, adminEstateController.getEstatesByCategory);
//router.put('/editprofile',middleware,userContoller.updateprofile);
//offers
router.patch('/estate/:id/apply-offer',middleware, adminEstateController.applyOffer);
router.get('/estates/offers', middleware,adminEstateController.getAllEstatesWithOffers);
router.get('/estates/city/:city', middleware,adminEstateController.getEstatesByCity);
router.patch('/estate/:id/remove-offer',middleware, adminEstateController.removeOffer);

router.get('/estates/newly-launched',middleware, adminEstateController.getNewlyLaunchedEstates);

// --------------Compound routes-------------------------------

/*
Postman json:

{
  "name": "Green Meadows",
  "estates": [
    "64d4b9e2f834a063946c610a", 
    "64d4b9e2f834a063946c610b"
  ],
  "compoundImages": [
    "https://example.com/images/compound1.jpg",
    "https://example.com/images/compound2.jpg"
  ],
  "address": "123 Main Street",
  "city": "Springfield",
  "state": "Illinois",
  "description": "A luxurious compound located in the heart of Springfield, offering top-notch amenities and serene living.",
  "contactInfo": {
    "phone": "+1-800-123-4567",
    "email": "contact@greenmeadows.com"
  },
  "workers": [
    "64d4b9e2f834a063946c610c",
    "64d4b9e2f834a063946c610d"
  ]
}

*/
// Get all compounds
router.get('/getAllCompounds',middleware,compoundController.getAllCompounds);
// Get a single compound by ID
router.get('/getCompoundById/:id',middleware,compoundController.getCompoundById);
// Create a new compound
router.post('/createCompound',middleware,compoundController.uploadphoto,compoundController.resizePhoto,compoundController.createCompound);
// Update a compound by ID
router.put('/updateCompound/:id', middleware,compoundController.updateCompound);
// Delete a compound by ID
router.delete('/deleteCompound/:id',middleware, compoundController.deleteCompound);


//worker routes 
// Route to add a new worker
router.post('/addworker', middleware,workerController.addWorker);

// Route to update an existing worker
router.put('/updateworker/:id',middleware, workerController.updateWorker);

// Route to delete a worker
router.delete('/deleteworker/:id', middleware,workerController.deleteWorker);
// Get all workers
router.get('/getallworkers',middleware, workerController.getAllWorkers);

// Get worker by ID
router.get('/getworkerbyid/:id',middleware, workerController.getWorkerById);

// Get worker by name
router.get('/getworkerbyname/:name', middleware,workerController.getWorkerByName);
module.exports = router;


