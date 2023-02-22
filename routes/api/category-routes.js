const router = require("express").Router();
const { Category, Product } = require("../../models");
const { update } = require("../../models/Product");

// The `/api/categories` endpoint

// GET request - retrieve all category data
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      // find all categories
      include: [
        {
          model: Product
        },
      ],
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET request - find a category data by ID
router.get("/:id", async (req, res) => {
  try {
    const categoryDataById = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
        },
      ],
    });

    if (!categoryDataById) {
      res.status(404).json({
        // 404 status code means the server could not find the data
        message: "Category with this ID not found.",
      });
      return;
    }

    res.status(200).json(categoryDataById);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST request - create a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body); // create a new category
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err); // 400 status code means the server could not understand the request
  }
});

// PUT request - update category by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );

    if (updatedCategory === 0) {
      res.status(404).json({
        message: "Category with this ID not found.",
      });
      return;
    }

    res.status(200).json({
      message: "Category updated successfully.",
      rows_updated: updatedCategory[1], // TODO: why must an index be included?
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE request - delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const delCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!delCategory) {
      res.status(404).json({
        message: "Category with this ID not found.",
      });
      return;
    }

    res.status(200).json({
      message: "Category deleted successfully.",
      rows_deleted: delCategory
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
