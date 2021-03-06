import {View, Text, StyleSheet, ListView} from 'react-native';
import React, {Component} from 'react';
import Path from '../../framework/routing/Path';
import AppState from '../../hack/AppState'
import AppHeader from '../primitives/AppHeader';
import * as CHSStyles from "../primitives/GlobalStyles"
import WizardButtons from '../primitives/WizardButtons'
import ConfirmationView from "./ConfirmationView";

@Path('/DecisionView')
class DecisionView extends Component {
    constructor(props, context) {
        super(props, context);
        this.I18n = context.getService("messageService").getI18n();
    }

    static propTypes = {
        params: React.PropTypes.object.isRequired
    };

    static contextTypes = {
        navigator: React.PropTypes.func.isRequired,
        getService: React.PropTypes.func.isRequired
    };

    static styles = StyleSheet.create({
        summary: {
            fontSize: 24,
            color: '#0C59CF'
        },
        decision: {
            fontSize: 20,
            color: '#0C59CF'
        }
    });

    renderAlert(decision) {
        if (decision.alert !== undefined) {
            return (<Text style={{fontSize: 26, marginTop: 10, color: '#ff0000'}}>{decision.alert}</Text>);
        }
    }

    renderDecisions(decisions) {
        return decisions.map((decision) => {
            return this.renderDecision(decision);
        });
    }

    renderDecision(decision) {
        return (
            <View>
                <Text style={DecisionView.styles.summary}>{this.I18n.t(decision.name)}</Text>
                <Text style={DecisionView.styles.decision}>{decision.value}</Text>
                {this.renderAlert(decision)}
            </View>
        );
    }

    render() {
        const decision = this.context.getService("decisionConfigService")
            .getDecisionConfig(AppState.questionnaireAnswers.questionnaireName);
        var param = AppState.questionnaireAnswers;
        this.decisions = eval(`${decision.decisionCode} getDecision(param);`);
        return (
            <View>
                <AppHeader title={AppState.questionnaireAnswers.questionnaireName}
                           onTitlePressed={this.onViewSavedSessionsPress}
                           parent={this}
                />
                <View style={CHSStyles.Global.mainSection}>
                    {this.renderDecisions(this.decisions)}
                    <WizardButtons hasQuestionBefore={true} nextParams={{decisions: this.decisions}} parent={this}
                                   nextView={ConfirmationView}/>
                </View>
            </View>
        );
    }
}

export default DecisionView;