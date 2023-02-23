const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET request - Find all products
router.get('/', async (req, res) => {
  // find all products, including their associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: Category
        },
        {
          model: Tag,
          through: ProductTag
        }
      ]
    })
    res.status(200).json(productData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET request - Find a single product by its `id`, including their associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const productDataById = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category
        },
        {
          model: Tag,
          through: ProductTag
        }
      ]
    })
      
    if (!productDataById) {
      res.status(404).json({
        message: "Product with this ID not found."
      });
      return;
    }
    res.status(200).json(productDataById);

    } catch(err) {
    res.status(500).json(err);
  }
});

// POST request - create a new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
      console.log('product =>', product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// PUT request - update product by its `id` value

router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } }); // returns [{id: , product_id: , tag_id:}, {}, {}]
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tagId) => !productTagIds.includes(tagId))
        .map((tagId) => {
          return {
            product_id: req.params.id,
            tagId,
          };
        }); //[] 

      
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
      
      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json({
      message: "Product updated successfully.", 
      productTag_deleted: updatedProductTags[0],
      productTag_created: updatedProductTags[1].length
    }))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// DEL request - delete a product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const delProduct = await Product.destroy({
      where: {
        id: req.params.id,
      }
    })

    if(!delProduct) {
      res.status(400).json({
        message: "Product with this ID not found."
      });
      return;
    }

    res.status(200).json({
      message: "Product deleted successfully.",
      rows_updated: delProduct
    })

  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
