const paginate = (query, { page = 1, pageSize = 10}) => {
    const limit = Number(pageSize);
    const skip = limit * (Number(page) - 1) ;

    return {
        limit,
        skip,
    };
};

const getPaginationMeta = ({ totalItems, page, pageSize }) => {
    return {
        currentPage: Number(page),
        totalPages: Math.ceil(totalItems / pageSize),
        totalData: totalItems,
    };
};

export { paginate, getPaginationMeta };