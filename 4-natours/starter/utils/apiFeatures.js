class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryStr = queryString;
  }

  filter() {
    const excludedQuery = ['page', 'limit', 'sort', 'fields'];

    // Filtering
    let queryStr = { ...this.queryStr };
    excludedQuery.forEach((el) => delete queryStr[el]);
    const regex = /(gt|gte|lt|lte)/gi;
    queryStr = JSON.stringify(queryStr);
    queryStr = queryStr.replace(regex, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  // Sorting
  sorting() {
    if (this.queryStr.sort) {
      this.query.sort(this.queryStr.sort.replace(',', ' '));
    } else {
      this.query.sort('-createdAt');
    }
    return this;
  }

  // select Fields
  fields() {
    if (this.queryStr.fields) {
      this.query.select(this.queryStr.fields.replace(',', ' '));
    } else {
      this.query.select('-__v');
    }
    return this;
  }

  // Pagination
  pagination() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
