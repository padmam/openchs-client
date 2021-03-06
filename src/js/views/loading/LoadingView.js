import Path, {PathRoot} from '../../framework/routing/Path'
import {ProgressBarAndroid, View, Text} from 'react-native'
import React, {Component} from 'react';
import TypedTransition from '../../framework/routing/TypedTransition'
import DiseaseListView from "./../diseaseList/DiseaseListView"
import AppState from '../../hack/AppState'

@PathRoot
@Path('/loadingView')
class LoadingView extends Component {
    static contextTypes = {
        navigator: React.PropTypes.func.isRequired
    };

    render() {
        if (AppState.loadingCompleted) {
            return (<View />);
        }

        var fileLoaded = false;
        AppState.loadingCompleted = false;
        const intervalID = setInterval(() => {
            AppState.loadingCompleted = true;
            clearInterval(intervalID);
            TypedTransition.from(this).to(DiseaseListView);
        }, 3000);

        return (
            <View>
                <Text style={{flex: 0.6, fontSize: 20, color: '#0C59CF'}}>{"Loading"}</Text>
                <ProgressBarAndroid />
            </View>
        );
    }
}

export default LoadingView;