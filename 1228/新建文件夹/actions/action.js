import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var AppActions = {
    Handle_Click:function(button_id){
        AppDispatcher.dispatch({
            actionType:clickSidebar,
            button_id:button_id
        });
    }
}

module.exports = AppActions;