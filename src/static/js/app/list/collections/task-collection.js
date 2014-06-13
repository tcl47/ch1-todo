define(function(require, exports, module) {

    var Task = require('app/list/models/task');

    var TaskCollection = Backbone.Collection.extend({

        model: Task,

        // get all incompleted tasks
        getActive: function() {
            return this.reject(this._isCompleted);
        },

        // get all completed tasks
        getCompleted: function() {
            return this.filter(this._isCompleted);
        },

        _isCompleted: function(item) {
            return item.isCompleted();
        }
        
    });

    return TaskCollection;
    
});