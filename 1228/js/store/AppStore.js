import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

var _app = {};

AppDispatcher.register(function(action){
   var button_id = this.props.button_id;
    switch (action.actionType){
        case "AppConstants.clickSidebar":{
            switch(button_id){
                case "1":{

                }
                    break;
                case "2":{

                }
                    break;
                case "3":{

                }
                    break;
                default:break;
            }
        }
    }
});