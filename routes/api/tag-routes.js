const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET request - find all tags, including associated product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product
        }
      ]
    })
    res.status(200).json(tagData);

  } catch(err) {
    res.status(500).json(err);
  }
});

// GET request - find a tag by an `id`, including associated product data
router.get('/:id', async (req, res) => {  
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ]
    })

    if(!tagData) {
      res.status(404).json({
        message: "Tag with this ID not found"
      })
      return;
    }

    res.status(200).json(tagData);

  } catch(err) {
    res.status(500).json(err);
  }
});

// POST request - create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
  } catch(err) {
    res.status(500).json(err);
  }
});

// PUT request - update a tag's name by its `id`
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated] = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        }
      }
    )

    if(rowsUpdated === 0) {
      res.status(404).json({
        message: "Tag with this ID not found."
      })
      return;
    }

    res.status(200).json({
      message: "Tag updated successfully."
      // TODO: what other information can be sent?
    })

  } catch(err) {
    res.status(500).json(err);
  }
});

// DELETE request - delete a tag by its `id`
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(!deletedTag) {
      res.status(404).json({
        message: "Tag with this ID not found."
      })
      return;
    }

    res.status(200).json({
      message: "Tag deleted successfully."
      // TODO: what other information can be sent?
    })
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
