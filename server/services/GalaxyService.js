import mongoose from "mongoose";
import Galaxy from "../models/Galaxy";
import ApiError from "../utils/ApiError"

const _repository = mongoose.model("Galaxy", Galaxy);

class GalaxyService {
  async getById(id) {
    let data = await _repository.findById(id);
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
  }
  async getByName(searchName) {
    let data = await _repository.findOne({ name: searchName });
    if (!data) {
      throw new ApiError("Invalid Name", 400);
    }
    return data;
  }
  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }
  async edit(id, update) {
    let data = await _repository.findOneAndUpdate({ _id: id }, update, {
      new: true
    });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
  }
  async delete(id) {
    let data = await _repository.findOneAndDelete({ _id: id });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
  }
}

const galaxyService = new GalaxyService();
export default galaxyService;
