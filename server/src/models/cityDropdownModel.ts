import mongoose, { Schema } from 'mongoose';

const cityDropdownSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    districts: [
        {
            zip: { type: String },
            name: { type: String },
        },
    ],
});

const CityDropdown = mongoose.model('CityDropdown', cityDropdownSchema);

export default CityDropdown;
