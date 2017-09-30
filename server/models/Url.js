const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

const urlSchema = new Schema({
    _id: {type: Number, index: true},
    original_url: String,
    created_at: Date
});

urlSchema.pre('save', function(next){
    var doc = this;
    counter.findByIdAndUpdate('url_count', {$inc: {seq: 1} }, 
        {upsert: true, new: true },
        function(error, result) {
            if (error)
                return next(error);
            doc.created_at = new Date();
            doc._id = result.seq;
            next();
        });
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;