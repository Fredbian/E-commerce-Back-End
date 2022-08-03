const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(tag => {
      // if not found
      if (!tag) {
        return res.status(404).json({ message: 'Tags are not found!' })
      }
      // else return tag data
      res.json(tag)
    })
    // handle err
    .catch(err => {
      // log error message 
      console.log(err.message)
      res.status(500).json(err)
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(tag => {
      if (!tag) {
        return res.status(404).json({ message: 'Can not get tag by this id!' })
      }
      // else return tag data
      res.json(tag)
    })
    // handle err
    .catch(err => {
      console.log(err.message)
      res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    // return tag data
    .then(tag => res.json(tag))
    // handle err
    .catch(err => {
      console.log(err.message)
      res.status(500).json(err)
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, { where: { id: req.params.id } })
    .then(tag => {
      // if not found
      if (!tag) {
        return res.status(404).json({ message: 'Can not get tag by this id!' })
      }
      // else return tag data
      res.json(tag)
    })
    // handle err
    .catch(err => {
      console.log(err.message)
      res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: { id: req.params.id } })
  .then(tag => {
    // if not found
    if(!tag) {
      return res.status(404).json({message: 'Can not get tag by this id!'})
    }
    // else return tag data
    res.json(tag)
  })
  // handle err
  .catch(err => {
    console.log(err.message)
    res.status(500).json(err)
  })
});

module.exports = router;
