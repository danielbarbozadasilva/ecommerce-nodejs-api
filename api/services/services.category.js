const { category, product } = require('../models/models.index')
const categoryMapper = require('../mappers/mappers.category')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllCategoryService = async () => {
  try {
    const resultDB = await category.aggregate([
      {
        $lookup: {
          from: product.collection.name,
          localField: '_id',
          foreignField: 'category',
          as: 'product'
        }
      }
    ])
    return {
      success: true,
      message: 'Categories successfully listed',
      data: resultDB.map((item) => categoryMapper.toDTOList(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listCategoryByIdService = async (categoryid) => {
  try {
    const resultDB = await category.find({ _id: categoryid })

    return {
      success: true,
      message: 'Category listed successfully',
      data: resultDB.map((item) => categoryMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createCategoryService = async (body, files) => {
  try {
    const resultDB = await category.create({
      name: body.name,
      code: body.code,
      availability: true,
      photo: files?.length ? files[0].filename : ''
    })

    return {
      success: true,
      message: 'Category created successfully',
      data: categoryMapper.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateCategoryService = async (categoryid, body, files) => {
  try {
    const result = await category.findOne({ _id: categoryid })

    result.name = body.name
    result.code = body.code
    result.availability = body.availability
    result.photo = files?.length ? files[0].filename : ''

    result.save()

    return {
      success: true,
      message: 'Category updated successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const deleteCategoryService = async (categoryid) => {
  try {
    await category.deleteOne({ _id: categoryid })
    await product.deleteMany({ category: categoryid })

    return {
      success: true,
      message: 'Category deleted successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllCategoryService,
  listCategoryByIdService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService
}
