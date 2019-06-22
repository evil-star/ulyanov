const smartgrid = require('smart-grid');

const settings = {
    filename: "smart-grid",
    outputStyle: "sass",
    columns: 12,
    offset: '15px',
    container: {
        maxWidth: '1140px',
        fields: '15px'
    },
    breakPoints: {
        md: {
            width: "992px",
            fields: "15px"
        },
        sm: {
            width: "768px",
            fields: "15px"
        },
        xs: {
            width: "576px",
            fields: "15px"
        }
    },
    oldSizeStyle: false
};

smartgrid('./app/libs/smartgrid', settings);