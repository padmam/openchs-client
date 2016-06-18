import Path from '../../routing/Path';
import React, {Component, View, Text, StyleSheet} from 'react-native';
import TypedTransition from "../../routing/TypedTransition";

@Path('/ConclusionListView')
class ConclusionListView extends Component {
    static propTypes = {
        params: React.PropTypes.object.isRequired
    };

    static contextTypes = {
        navigator: React.PropTypes.func.isRequired,
        getService: React.PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    onQuestionnaireNamePress = () => {
        TypedTransition.from(this).with({
            questionnaireName: AppState.questionnaireAnswers.questionnaireName
        }).to(ConclusionListView);
    };

    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dssService = this.context.getService("decisionSupportSessionService");
        var sessions = dssService.getAll(this.props.questionnaireName);
        const dsClone = ds.cloneWithRows(sessions);

        return (
            <View>
                <AppHeader title={`All ${this.props.questionnaireName} Details`}/>
            </View>
        );
    }
}

export default ConclusionListView;