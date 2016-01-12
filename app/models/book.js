var mongoose = require('mongoose');
var Schema = mongoose.Schema;  

var BookSchema = new Schema({
  issue: { type: Number, default: 0 },
  description: { type: String, default: '', trim: true },
  series: { type: String, trim: true },
  publisher: { type: String, trim: true },
  dateOnSale: { type: Date },
  writers: [{ firstName: String, lastName: String }],
  artists: [{ firstName: String, lastName: String }],
  coverArtists: [{ firstName: String, lastName: String }],
  coverImageUrl: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);