const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });

    if (!categoryData) {
      return res.status(404).json({ message: 'Could not retrieve categories.'});
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, { include: [{ model: Product }] });

    if (!categoryData) {
      return res.status(404).json({ message: 'No category found matching that ID.'});
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body)

    if (!categoryData) {
      return res.status(404).json({ message: 'Could not create category.'});
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update({ category_name: req.body.category_name }, {
      where: {
        id: req.params.id
      }
    });

    if(!categoryData) {
      return res.status(404).json({ message: 'No category found matching that ID.'});
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!categoryData) {
      return res.status(404).json({ message: 'No category found matching that ID.'});
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
