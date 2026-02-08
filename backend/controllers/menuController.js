const MenuItem = require('../models/MenuItem');

// @desc    Fetch all menu items
// @route   GET /api/menu
// @access  Public
const getMenu = async (req, res, next) => {
    try {
        const pageSize = Number(req.query.pageSize) || 10;
        const page = Number(req.query.page) || 1;

        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const count = await MenuItem.countDocuments({ ...keyword });
        const menuItems = await MenuItem.find({ ...keyword })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ menuItems, page, pages: Math.ceil(count / pageSize), total: count });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private/Admin
const createMenuItem = async (req, res, next) => {
    try {
        const { name, category, description, price, image, isAvailable } = req.body;

        const menuItem = new MenuItem({
            name,
            category,
            description,
            price,
            image,
            isAvailable,
        });

        const createdMenuItem = await menuItem.save();
        res.status(201).json(createdMenuItem);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
const updateMenuItem = async (req, res, next) => {
    try {
        const { name, category, description, price, image, isAvailable } = req.body;

        const menuItem = await MenuItem.findById(req.params.id);

        if (menuItem) {
            menuItem.name = name || menuItem.name;
            menuItem.category = category || menuItem.category;
            menuItem.description = description || menuItem.description;
            menuItem.price = price || menuItem.price;
            menuItem.image = image || menuItem.image;
            menuItem.isAvailable =
                isAvailable !== undefined ? isAvailable : menuItem.isAvailable;

            const updatedMenuItem = await menuItem.save();
            res.json(updatedMenuItem);
        } else {
            res.status(404);
            throw new Error('Menu item not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);

        if (menuItem) {
            await menuItem.deleteOne();
            res.json({ message: 'Menu item removed' });
        } else {
            res.status(404);
            throw new Error('Menu item not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
};
