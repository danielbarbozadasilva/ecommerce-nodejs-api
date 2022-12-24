const { category, product } = require('../models/models.index')

const categoryMapper = require('../mappers/mappers.category')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllCategoryService = async () => {
  try {
    const resultDB = await category.find({})

    return {
      success: true,
      message: 'Categories successfully listed',
      data: resultDB.map((item) => categoryMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listCategoryAvailabilityService = async () => {
  try {
    const resultDB = await category.find({ availability: true })

    return {
      success: true,
      message: 'Categories successfully listed',
      data: resultDB.map((item) => categoryMapper.toDTO(item))
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

const createCategoryService = async (body) => {
  try {
    const resultDB = await category.create({
      name: body.name,
      code: body.code,
      availability: true
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

const updateCategoryService = async (categoryid, body) => {
  try {
    const result = await category.findOneAndUpdate(
      { _id: categoryid },
      {
        $set: {
          name: body.name,
          code: body.code,
          availability: body.availability
        }
      },
      { new: true }
    )

    return {
      success: true,
      message: 'Category updated successfully',
      data: categoryMapper.toDTO(result)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const deleteCategoryService = async (categoryid) => {
  try {
    await category.deleteOne({ _id: categoryid })

    return {
      success: true,
      message: 'Category deleted successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateImageCategoryService = async (categoryid, file) => {
  try {
    const result = await category.findOne({ _id: categoryid })
    result.photo = file.filename
    await result.save()

    return {
      success: true,
      message: 'Operation performed successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllCategoryService,
  listCategoryAvailabilityService,
  listCategoryByIdService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
  updateImageCategoryService
}
