'use strict';

module.exports = function(passport) {
    require('./strategies/local')(passport);
    require('./strategies/google')(passport);
    require('./strategies/facebook')(passport);
};
