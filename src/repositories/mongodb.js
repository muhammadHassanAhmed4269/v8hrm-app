class MongoRepository {
  constructor(model) {
    this.model = model;
  }

  async create(form_data) {
    try {
      return await this.model.create(form_data);
    } catch (error) {
      throw new Error("Failed to create data");
    }
  }

  async findById(_id, select, populate) {
    try {
      return await this.model.findById(_id).select(select).populate(populate);
    } catch (error) {
      throw new Error("Failed to find data by ID");
    }
  }

  async findOne(filtered_query, select, populate) {
    try {
      return await this.model
        .findOne(filtered_query)
        .select(select)
        .populate(populate);
    } catch (error) {
      throw new Error("Failed to find data");
    }
  }

  async find(filtered_query, select, populate) {
    try {
      return await this.model
        .find(filtered_query)
        .select(select)
        .populate(populate);
    } catch (error) {
      throw new Error("Failed to find data");
    }
  }

  async findByIdAndUpdate(_id, form_data) {
    try {
      return await this.model.findByIdAndUpdate(_id, form_data, { new: true });
    } catch (error) {
      throw new Error("Failed to update data by ID");
    }
  }

  async findOneAndUpdate(filtered_query, form_data) {
    try {
      return await this.model.findOneAndUpdate(filtered_query, form_data, {
        new: true,
      });
    } catch (error) {
      throw new Error("Failed to update data");
    }
  }

  async findByIdAndDelete(_id) {
    try {
      return await this.model.findByIdAndDelete(_id);
    } catch (error) {
      throw new Error("Failed to delete data by ID");
    }
  }

  async findOneAndDelete(filtered_query) {
    try {
      return await this.model.findOneAndDelete(filtered_query);
    } catch (error) {
      throw new Error("Failed to delete data");
    }
  }

  async insertMany(form_data) {
    try {
      return await this.model.insertMany(form_data);
    } catch (error) {
      throw new Error("Failed to insert data");
    }
  }

  async updateMany(filtered_query, form_data) {
    try {
      return await this.model.updateMany(filtered_query, form_data);
    } catch (error) {
      throw new Error("Failed to update data");
    }
  }

  async deleteMany(filtered_query) {
    try {
      return await this.model.deleteMany(filtered_query);
    } catch (error) {
      throw new Error("Failed to delete data");
    }
  }

  async updateOne(filtered_query, form_data) {
    try {
      return await this.model.updateOne(filtered_query, form_data);
    } catch (error) {
      throw new Error("Failed to update data");
    }
  }

  async count() {
    try {
      return await this.model.countDocuments();
    } catch (error) {
      throw new Error("Failed to count documents");
    }
  }
}

module.exports = MongoRepository;
