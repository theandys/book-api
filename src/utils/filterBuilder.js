const buildBookFilters = (query) => {
    const filters = {};

    // keyword search
    if (query.keyword) {
        filters.$or = [
            { title: { $regex: query.keyword, $options: "i" } },
            { author: { $regex: query.keyword, $options: "i" } },
            { publisher: { $regex: query.keyword, $options: "i" } },
        ];
    }

    // filter by genre
    if (query.genre) {
        filters.genre = { $regex: query.genre, $options: "i" };
    }

    // year filter (from - to)
    if (query.yearFrom || query.yearTo) {
        filters.year = {};
        if (query.yearFrom) {
            filters.year.$gte = Number(query.yearFrom);
        }
        if (query.yearTo) {
            filters.year.$lte = Number(query.yearTo);
        }
    }

    return filters;
};

const buildBookSorts = (query) => {
    if (query.sort) {
        const sortField = query.sort;
        const sortOrder = query.order === "asc" ? 1 : -1;

        return { [sortField]: sortOrder };
    }
    return { createdAt: -1 }; // default sort by createdAt descending
};

export { buildBookFilters, buildBookSorts };