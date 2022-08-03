const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then(category=> {
    // if not found
    if(!category) {
      return res.status(404).json({message: 'Categories are not found!'})
    }
    // else
    res.json(category)
  })
    // handle error
    .catch(err => {
    // log error message  
    console.log(err.message)
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(category => {
    // if not found
    if(!category) {
     return res.status(404).json({message: 'Category is not found!'})
    }
    // else
    res.json(category)
  })
  // handle error
  .catch(err => {
    // log err message
    console.log(err.message)
    res.status(500).json(err)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(category => res.json(category))
  // handle err 
  .catch(err => {
    console.log(err.message)
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {where: {id: req.params.id}})
  .then(category => {
    // if not found
    if (!category) {
      return res.status(404).json({message: 'Can not get any category by this id!'})
    }
    // else
    res.json(category)
  })
  // handle error
  .catch(err => {
    // log err message
    console.log(err.message)
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where: {id: req.params.id}})
  .then(category => {
    // if not found
    if(!category){
      return res.status(404).json({message: 'Can not get any category by this id!'})
    }
    // else
    res.json(category)
  })
  // handle err
  .catch(err => {
    console.log(err.message)
    res.status(500).json(err)
  })
});

module.exports = router;
