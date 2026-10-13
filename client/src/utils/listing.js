export const CONDITIONS = ['Brand New', 'Like New', 'Gently Used', 'Heavy Wear'];

export const LAB_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const GEAR_TYPES = ['Single Speed', 'Geared'];

export const getProductHighlights = (product) => {
    if (!product) return [];

    const highlights = [];
    if (product.condition) highlights.push(product.condition);
    if (product.campus) highlights.push(product.campus);

    switch (product.category) {
        case 'Textbooks':
            if (product.courseCode) highlights.push(product.courseCode);
            if (product.author) highlights.push(product.author);
            if (product.edition) highlights.push(`${product.edition} ed.`);
            break;
        case 'Notes':
            if (product.semester) highlights.push(product.semester);
            if (product.professor) highlights.push(product.professor);
            if (product.academicYear) highlights.push(product.academicYear);
            break;
        case 'Lab':
            if (product.size) highlights.push(`Size ${product.size}`);
            if (product.department) highlights.push(product.department);
            break;
        case 'Bicycles':
            if (product.bicycleBrand) highlights.push(product.bicycleBrand);
            if (product.gearType) highlights.push(product.gearType);
            if (product.lockIncluded === true) highlights.push('Lock included');
            if (product.lockIncluded === false) highlights.push('No lock');
            break;
        default:
            break;
    }

    return highlights;
};

export const getCardHighlight = (product) => {
    if (!product) return '';
    if (product.category === 'Textbooks' && product.courseCode) return product.courseCode;
    if (product.category === 'Notes' && product.semester) return product.semester;
    if (product.category === 'Lab' && product.size) return `Size ${product.size}`;
    if (product.category === 'Bicycles' && product.gearType) return product.gearType;
    return product.condition || product.campus || '';
};
