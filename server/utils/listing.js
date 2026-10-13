export const PRODUCT_CATEGORY_PATHS = ['Textbooks', 'Lab', 'Notes', 'Bicycles', 'Misc'];

export const CONDITIONS = ['Brand New', 'Like New', 'Gently Used', 'Heavy Wear'];

export const LAB_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const GEAR_TYPES = ['Single Speed', 'Geared'];

export const CATEGORY_ATTRIBUTE_FIELDS = {
    Textbooks: ['author', 'edition', 'courseCode'],
    Notes: ['semester', 'professor', 'academicYear'],
    Lab: ['size', 'department'],
    Bicycles: ['bicycleBrand', 'gearType', 'lockIncluded'],
    Misc: [],
};

const isFilled = (value) => {
    if (typeof value === 'boolean') return true;
    if (value === 0) return true;
    return String(value ?? '').trim().length > 0;
};

export const buildListingPayload = (raw = {}) => {
    const category = String(raw.category || '').trim();
    const payload = {
        name: String(raw.name || '').trim(),
        description: Array.isArray(raw.description)
            ? raw.description
            : String(raw.description || '').split('\n').filter(Boolean),
        price: Number(raw.price),
        offerPrice: Number(raw.offerPrice),
        category,
        campus: String(raw.campus || '').trim(),
        condition: String(raw.condition || '').trim(),
        inStock: raw.inStock !== false,
    };

    const allowedFields = CATEGORY_ATTRIBUTE_FIELDS[category] || [];
    for (const field of allowedFields) {
        if (field === 'lockIncluded') {
            payload.lockIncluded = raw.lockIncluded === true || raw.lockIncluded === 'true';
        } else if (raw[field] !== undefined && raw[field] !== null && raw[field] !== '') {
            payload[field] = typeof raw[field] === 'string' ? raw[field].trim() : raw[field];
        }
    }

    return payload;
};

export const validateListingPayload = (payload) => {
    if (!payload.name) return 'Listing title is required';
    if (!payload.description?.length) return 'Description is required';
    if (!Number.isFinite(payload.price) || payload.price < 0) return 'Valid price is required';
    if (!Number.isFinite(payload.offerPrice) || payload.offerPrice < 0) return 'Valid offer price is required';
    if (!PRODUCT_CATEGORY_PATHS.includes(payload.category)) return 'Select a valid campus category';
    if (!payload.campus) return 'Campus / hostel name is required';
    if (!CONDITIONS.includes(payload.condition)) return 'Select a valid condition';

    const requiredFields = CATEGORY_ATTRIBUTE_FIELDS[payload.category] || [];
    for (const field of requiredFields) {
        if (!isFilled(payload[field])) {
            return `${field} is required for ${payload.category} listings`;
        }
    }

    if (payload.category === 'Lab' && payload.size && !LAB_SIZES.includes(payload.size)) {
        return 'Select a valid lab coat / equipment size';
    }
    if (payload.category === 'Bicycles' && payload.gearType && !GEAR_TYPES.includes(payload.gearType)) {
        return 'Select a valid bicycle gear type';
    }

    return null;
};
